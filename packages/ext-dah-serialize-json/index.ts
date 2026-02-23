/**
 * `DAH_serialize_json` extension.
 *
 * Implements JSON serialization of the NRS computation output:
 * entries, impacts, relations, and scores. Each can be written to an
 * independent output target, or all four combined into a single `bulk`
 * target.
 *
 * Each output field accepts a file path (string), a `WritableStream`, or an
 * array of either — all targets for a field receive the same JSON.
 *
 * Matrix keys use the monorepo `DAH_factors` convention (`AU_AP` for
 * off-diagonal entries), matching `DAH_factors.newMatrix()`.
 *
 * See spec: nrs/exts/DAH_serialize_json.md
 */

import type {
  Data,
  Entry,
  EntryMeta,
  Id,
  Impact,
  ImpactMeta,
  Matrix,
  Relation,
  RelationMeta,
  Result,
  ResultMeta,
} from "@nrs-org/core";
import {
  DiagonalMatrix,
  ScalarMatrix,
  RegularMatrix,
  Vector,
  EPSILON,
} from "@nrs-org/core";
import { factorScores, type FactorShortName } from "@nrs-org/ext-dah-factors";
import { open } from "fs/promises";
import { Writable } from "stream";

// ---------------------------------------------------------------------------
// JSON types
// ---------------------------------------------------------------------------

type JSONVector = Partial<Record<FactorShortName, number>>;

/** Off-diagonal key format: `"AU_AP"` (row_column). */
type JSONMatrixKey = FactorShortName | `${FactorShortName}_${FactorShortName}`;
type JSONMatrixObject = Partial<Record<JSONMatrixKey, number>>;

/** A scalar matrix serializes as a bare number; diagonal/regular as an object. */
type JSONMatrix = number | JSONMatrixObject;

interface JSONEntry {
  id: Id;
  DAH_meta: EntryMeta;
}

interface JSONImpact {
  contributors: Record<Id, JSONMatrix>;
  score: JSONVector;
  DAH_meta: ImpactMeta;
}

interface JSONRelation {
  contributors: Record<Id, JSONMatrix>;
  references: Record<Id, JSONMatrix>;
  DAH_meta: RelationMeta;
}

interface JSONResult {
  overallVector: JSONVector;
  DAH_meta: ResultMeta;
}

interface JSONBulk {
  entries: Record<Id, JSONEntry>;
  impacts: JSONImpact[];
  relations: JSONRelation[];
  scores: Record<Id, JSONResult>;
}

// ---------------------------------------------------------------------------
// Output target type
// ---------------------------------------------------------------------------

/**
 * An output target for a serialized section. Can be:
 * - a file path (string) — opened via `Bun.file(path).writer()`
 * - a `WritableStream` — written to directly
 * - an array of either, to fan-out to multiple targets
 */
export type OutputTarget =
  | string
  | WritableStream
  | (string | WritableStream)[];

// ---------------------------------------------------------------------------
// Extension config
// ---------------------------------------------------------------------------

export interface DAH_serialize_jsonConfig {
  /** Target(s) to write the entries map JSON to. */
  entries?: OutputTarget;
  /** Target(s) to write the impacts array JSON to. */
  impacts?: OutputTarget;
  /** Target(s) to write the relations array JSON to. */
  relations?: OutputTarget;
  /** Target(s) to write the scores map JSON to. */
  scores?: OutputTarget;
  /** Target(s) to write all four sections as a single JSON object to. */
  bulk?: OutputTarget;
  /** JSON indentation passed to `JSON.stringify`. */
  indent?: string | number;
}

// ---------------------------------------------------------------------------
// Internal helpers — conversion to JSON
// ---------------------------------------------------------------------------

const n = factorScores.length;

function _toJSONMatrix(m: Matrix): JSONMatrix {
  if (m instanceof ScalarMatrix) {
    return m.data;
  }

  const obj: JSONMatrixObject = {};

  if (m instanceof DiagonalMatrix) {
    for (let i = 0; i < n; i++) {
      const value = m.data[i] ?? 0;
      if (Math.abs(value) >= EPSILON) {
        const key = factorScores[i]?.shortName as FactorShortName | undefined;
        if (key !== undefined) obj[key] = value;
      }
    }
  } else {
    // RegularMatrix — row-major storage
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const value = m.data[i * n + j] ?? 0;
        if (Math.abs(value) >= EPSILON) {
          const rowName = factorScores[i]?.shortName;
          const colName = factorScores[j]?.shortName;
          if (rowName === undefined || colName === undefined) continue;
          const key: JSONMatrixKey =
            i === j
              ? (rowName as FactorShortName)
              : (`${rowName}_${colName}` as `${FactorShortName}_${FactorShortName}`);
          obj[key] = value;
        }
      }
    }
  }

  return obj;
}

function _toJSONVector(vector: Vector): JSONVector {
  const obj: JSONVector = {};
  for (let i = 0; i < n; i++) {
    const value = vector.data[i] ?? 0;
    if (Math.abs(value) >= EPSILON) {
      const key = factorScores[i]?.shortName as FactorShortName | undefined;
      if (key !== undefined) obj[key] = value;
    }
  }
  return obj;
}

// ---------------------------------------------------------------------------
// Internal helpers — conversion from JSON
// ---------------------------------------------------------------------------

function _fromJSONMatrix(matrix: JSONMatrix): Matrix {
  if (typeof matrix === "number") {
    return new ScalarMatrix(matrix);
  }

  // Read diagonal values first
  const diagonal = new Array<number>(n).fill(0);
  for (let i = 0; i < n; i++) {
    const key = factorScores[i]?.shortName as FactorShortName | undefined;
    if (key !== undefined) {
      diagonal[i] = matrix[key] ?? 0;
    }
  }

  // Check for off-diagonal entries
  let data: number[] | undefined = undefined;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const rowName = factorScores[i]?.shortName;
      const colName = factorScores[j]?.shortName;
      if (rowName === undefined || colName === undefined) continue;
      const key = `${rowName}_${colName}` as JSONMatrixKey;
      const value =
        (matrix as Partial<Record<JSONMatrixKey, number>>)[key] ?? 0;
      if (Math.abs(value) < EPSILON) continue;

      if (data === undefined) {
        data = new Array<number>(n * n).fill(0);
        for (let k = 0; k < n; k++) {
          data[k * (n + 1)] = diagonal[k] ?? 0;
        }
      }
      data[i * n + j] = value;
    }
  }

  if (data === undefined) {
    return new DiagonalMatrix(diagonal);
  }
  return new RegularMatrix(data);
}

function _fromJSONVector(jsonVector: JSONVector): Vector {
  const data = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    const key = factorScores[i]?.shortName as FactorShortName | undefined;
    data[i] = key !== undefined ? (jsonVector[key] ?? 0) : 0;
  }
  return new Vector(data);
}

// ---------------------------------------------------------------------------
// Internal helpers — entity serialization
// ---------------------------------------------------------------------------

function toJSONEntry(entry: Entry): JSONEntry {
  return { id: entry.id, DAH_meta: entry.DAH_meta };
}

function toJSONImpact(impact: Impact): JSONImpact {
  return {
    contributors: Object.fromEntries(
      [...impact.contributors.entries()].map(([id, m]) => [
        id,
        _toJSONMatrix(m),
      ]),
    ),
    score: _toJSONVector(impact.score),
    DAH_meta: impact.DAH_meta,
  };
}

function toJSONRelation(relation: Relation): JSONRelation {
  return {
    contributors: Object.fromEntries(
      [...relation.contributors.entries()].map(([id, m]) => [
        id,
        _toJSONMatrix(m),
      ]),
    ),
    references: Object.fromEntries(
      [...relation.references.entries()].map(([id, m]) => [
        id,
        _toJSONMatrix(m),
      ]),
    ),
    DAH_meta: relation.DAH_meta,
  };
}

function toJSONResult(result: Result): JSONResult {
  return {
    overallVector: _toJSONVector(result.overallVector),
    DAH_meta: result.DAH_meta,
  };
}

// ---------------------------------------------------------------------------
// Internal helpers — entity deserialization
// ---------------------------------------------------------------------------

function fromJSONEntry(entry: JSONEntry): Entry {
  return { id: entry.id, DAH_meta: entry.DAH_meta };
}

function fromJSONImpact(impact: JSONImpact): Impact {
  return {
    contributors: new Map(
      Object.entries(impact.contributors).map(([id, m]) => [
        id,
        _fromJSONMatrix(m),
      ]),
    ),
    score: _fromJSONVector(impact.score),
    DAH_meta: impact.DAH_meta,
  };
}

function fromJSONRelation(relation: JSONRelation): Relation {
  return {
    contributors: new Map(
      Object.entries(relation.contributors).map(([id, m]) => [
        id,
        _fromJSONMatrix(m),
      ]),
    ),
    references: new Map(
      Object.entries(relation.references).map(([id, m]) => [
        id,
        _fromJSONMatrix(m),
      ]),
    ),
    DAH_meta: relation.DAH_meta,
  };
}

function fromJSONResult(result: JSONResult): Result {
  return {
    overallVector: _fromJSONVector(result.overallVector),
    DAH_meta: result.DAH_meta,
  };
}

// ---------------------------------------------------------------------------
// Extension factory
// ---------------------------------------------------------------------------

/** Normalize an OutputTarget to a flat array of WritableStream instances. */
function resolveTargets(
  target: OutputTarget | undefined,
): Promise<WritableStream>[] {
  if (target === undefined) return [];
  const items = Array.isArray(target) ? target : [target];
  return items.map(async (item) => {
    if (typeof item === "string") {
      const sink = await open(item, "w");
      return Writable.toWeb(sink.createWriteStream());
    }
    return item;
  });
}

async function writeToStreams(
  streams: Promise<WritableStream>[],
  value: () => unknown,
  indent: string | number | undefined,
): Promise<void> {
  if (streams.length === 0) return;
  const json = JSON.stringify(value(), null, indent);
  const encoded = new TextEncoder().encode(json);
  await Promise.all(
    streams.map(async (stream) => {
      const writer = (await stream).getWriter();
      try {
        await writer.write(encoded);
      } finally {
        writer.releaseLock();
      }
    }),
  );
}

export default function DAH_serialize_json(
  config: DAH_serialize_jsonConfig = {},
) {
  return {
    name: "DAH_serialize_json",

    dependencies(): string[] {
      return ["DAH_serialize", "DAH_factors"];
    },

    // -------------------------------------------------------------------------
    // Conversion helpers — exposed as methods for external use
    // -------------------------------------------------------------------------

    /** Serializes a `Matrix` to its JSON representation. */
    toJSONMatrix(m: Matrix): JSONMatrix {
      return _toJSONMatrix(m);
    },

    /** Serializes a `Vector` to its JSON representation. */
    toJSONVector(vector: Vector): JSONVector {
      return _toJSONVector(vector);
    },

    /** Deserializes a JSON matrix representation back to a `Matrix`. */
    fromJSONMatrix(matrix: JSONMatrix): Matrix {
      return _fromJSONMatrix(matrix);
    },

    /** Deserializes a JSON vector representation back to a `Vector`. */
    fromJSONVector(jsonVector: JSONVector): Vector {
      return _fromJSONVector(jsonVector);
    },

    // -------------------------------------------------------------------------
    // Deserialization helpers — exposed as methods for external use
    // -------------------------------------------------------------------------

    /** Deserializes the entries JSON produced by `DAH_serialize_json`. */
    deserializeEntries(json: string): Map<Id, Entry> {
      const parsed = JSON.parse(json) as Record<string, JSONEntry>;
      return new Map(
        Object.entries(parsed).map(([id, entry]) => [id, fromJSONEntry(entry)]),
      );
    },

    /** Deserializes the impacts JSON produced by `DAH_serialize_json`. */
    deserializeImpacts(json: string): Impact[] {
      return (JSON.parse(json) as JSONImpact[]).map(fromJSONImpact);
    },

    /** Deserializes the relations JSON produced by `DAH_serialize_json`. */
    deserializeRelations(json: string): Relation[] {
      return (JSON.parse(json) as JSONRelation[]).map(fromJSONRelation);
    },

    /** Deserializes the scores JSON produced by `DAH_serialize_json`. */
    deserializeResults(json: string): Map<Id, Result> {
      const parsed = JSON.parse(json) as Record<string, JSONResult>;
      return new Map(
        Object.entries(parsed).map(([id, result]) => [
          id,
          fromJSONResult(result),
        ]),
      );
    },

    /** Deserializes the bulk JSON produced by `DAH_serialize_json`. */
    deserializeBulk(json: string): [Data, Map<Id, Result>] {
      const obj = JSON.parse(json) as JSONBulk;
      const data: Data = {
        entries: new Map(
          Object.entries(obj.entries).map(([id, entry]) => [
            id,
            fromJSONEntry(entry),
          ]),
        ),
        impacts: obj.impacts.map(fromJSONImpact),
        relations: obj.relations.map(fromJSONRelation),
      };
      const results = new Map(
        Object.entries(obj.scores).map(([id, result]) => [
          id,
          fromJSONResult(result),
        ]),
      );
      return [data, results];
    },

    // -------------------------------------------------------------------------
    // report hook
    // -------------------------------------------------------------------------

    async report(data: Data, results: Map<Id, Result>): Promise<void> {
      const entriesStreams = resolveTargets(config.entries);
      const impactsStreams = resolveTargets(config.impacts);
      const relationsStreams = resolveTargets(config.relations);
      const scoresStreams = resolveTargets(config.scores);
      const bulkStreams = resolveTargets(config.bulk);
      const { indent } = config;

      await Promise.all([
        writeToStreams(
          entriesStreams,
          () => {
            const entries: Record<Id, JSONEntry> = {};
            for (const [id, entry] of data.entries) {
              entries[id] = toJSONEntry(entry);
            }
            return entries;
          },
          indent,
        ),

        writeToStreams(
          impactsStreams,
          () => data.impacts.map(toJSONImpact),
          indent,
        ),

        writeToStreams(
          relationsStreams,
          () => data.relations.map(toJSONRelation),
          indent,
        ),

        writeToStreams(
          scoresStreams,
          () => {
            const scores: Record<Id, JSONResult> = {};
            for (const [id, result] of results) {
              scores[id] = toJSONResult(result);
            }
            return scores;
          },
          indent,
        ),

        writeToStreams(
          bulkStreams,
          () => {
            const entries: Record<Id, JSONEntry> = {};
            for (const [id, entry] of data.entries) {
              entries[id] = toJSONEntry(entry);
            }
            const bulk: JSONBulk = {
              entries,
              impacts: data.impacts.map(toJSONImpact),
              relations: data.relations.map(toJSONRelation),
              scores: Object.fromEntries(
                [...results.entries()].map(([id, r]) => [id, toJSONResult(r)]),
              ),
            };
            return bulk;
          },
          indent,
        ),
      ]);
    },
  };
}

export type ExtDAH_serialize_json = ReturnType<typeof DAH_serialize_json>;
