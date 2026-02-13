import type { Data, Id, Result } from "./data";
import type { Extension, HookName } from "./extension";
import { computeHookOrder } from "./extension";
import {
  Vector,
  DiagonalMatrix,
  RegularMatrix,
  ScalarMatrix,
  type Matrix,
} from "./math";
import { assert } from "./utils";
import { Graph, alg } from "graphlib";
import {
  identity,
  lusolve,
  matrix as mathjsMatrix,
  type Matrix as MathJsMatrix,
} from "mathjs";

function implicitExtensions() {
  return ["DAH_meta", "DAH_entry_id"];
}

export interface ContextAPI {
  newVector(data: number[]): Vector;
  newScalarMatrix(data: number): ScalarMatrix;
  newDiagonalMatrix(data: number[]): DiagonalMatrix;
  newRegularMatrix(data: number[]): RegularMatrix;
}

export interface Context {
  factorScoreCombineWeight: Vector;
  api: ContextAPI;
  // Optional enabled extensions map. Callers may provide extensions via
  // `newContext({ ..., extensions })` to enable extension hooks during
  // processing.
  extensions: Record<string, Extension>;
}

export interface ContextConfig {
  factorScoreCombineWeight?: Vector;
  extensions?: Record<string, Extension>;
}

export function newContext(config: ContextConfig): Context {
  const factorScoreCombineWeight = config.factorScoreCombineWeight;
  assert(
    factorScoreCombineWeight !== undefined,
    "factor score combine weight not specified",
  );
  const extensions = config.extensions ?? {};
  const availableExtensionNames = new Set<string>([
    ...Object.keys(extensions),
    ...implicitExtensions(),
  ]);
  for (const [extName, ext] of Object.entries(extensions)) {
    for (const dep of ext.dependencies?.() ?? []) {
      assert(
        availableExtensionNames.has(dep),
        `extension dependency "${dep}" of "${extName}" not found`,
      );
    }
  }
  return {
    factorScoreCombineWeight,
    api: {
      newVector: (d: number[]) => new Vector(d),
      newScalarMatrix: (n: number) => new ScalarMatrix(n),
      newDiagonalMatrix: (d: number[]) => new DiagonalMatrix(d),
      newRegularMatrix: (d: number[]) => new RegularMatrix(d),
    },
    extensions,
  };
}

export function newZeroVector(context: Context): Vector {
  return context.factorScoreCombineWeight.mul(0.0);
}

function embed(context: Context, vector: Vector): Vector {
  const v = new Vector(
    vector.data.map((v, i) =>
      Math.pow(v, 1 / context.factorScoreCombineWeight.get(i)),
    ),
  );
  assert(
    v.data.filter((n) => n !== n).length === 0,
    "Embedded vector contains NaN values",
  );
  return v;
}

function unembed(context: Context, vector: Vector): Vector {
  return new Vector(
    vector.data.map((v, i) =>
      Math.pow(v, context.factorScoreCombineWeight.get(i)),
    ),
  );
}

function constScoreCalc(
  context: Context,
  data: Data,
  sign: number,
): Map<Id, Vector> {
  const signedRelu = (vector: Vector) =>
    new Vector(vector.data.map((v) => Math.max(0, sign * v)));
  const impactEmbeddedScores = data.impacts.map((impact) => {
    return embed(context, signedRelu(impact.score));
  });

  const impactScores = new Map<Id, Vector>();
  for (const id of data.entries.keys())
    impactScores.set(id, newZeroVector(context));

  for (let i = 0; i < data.impacts.length; i++) {
    const impact = data.impacts[i];
    const embeddedScore = impactEmbeddedScores[i];
    // should not happen but eslint complains about this
    if (impact === undefined || embeddedScore === undefined) continue;
    for (const [entry, weight] of impact.contributors) {
      impactScores.get(entry)?.add(weight.mul(embeddedScore));
    }
  }

  return impactScores;
}

function topoSortEntries(_context: Context, data: Data): Id[][] {
  const entryGraph = new Graph({ directed: true });
  for (const id of data.entries.keys()) entryGraph.setNode(id);
  for (const relation of data.relations) {
    for (const contrib of relation.contributors.keys()) {
      if (!data.entries.has(contrib)) continue;
      for (const ref of relation.references.keys()) {
        if (!data.entries.has(ref)) continue;
        entryGraph.setEdge(ref, contrib);
      }
    }
  }

  const sccs = alg.tarjan(entryGraph);
  const idToScc = new Map<Id, number>();
  sccs.forEach((scc, i) => {
    for (const id of scc) idToScc.set(id, i);
  });

  const sccGraph = new Graph({ directed: true });
  for (let i = 0; i < sccs.length; i++) sccGraph.setNode(i.toString());

  for (const entry of data.entries.keys()) {
    const sccId = idToScc.get(entry);
    if (sccId === undefined) continue;
    const succs = entryGraph.successors(entry);
    if (!succs) continue;
    for (const succ of succs) {
      const succSccId = idToScc.get(succ);
      if (succSccId === undefined || succSccId === sccId) continue;
      sccGraph.setEdge(sccId.toString(), succSccId.toString());
    }
  }

  const order = alg.topsort(sccGraph);
  return order.map((id) => {
    const idx = parseInt(id);
    const scc = sccs[idx];
    assert(scc !== undefined, "SCC not found for id: " + id);
    return scc as Id[];
  });
}

function createRelationMaps(
  relations:
    | (Result & {
        contributors?: Map<Id, Matrix>;
        references?: Map<Id, Matrix>;
      })[]
    | unknown[],
): Map<Id, Map<Id, Matrix>> {
  const relationMaps = new Map<Id, Map<Id, Matrix>>();
  const addRelation = (contrib: Id, ref: Id, matrix: Matrix) => {
    let map = relationMaps.get(contrib);
    if (map === undefined) {
      map = new Map<Id, Matrix>();
      relationMaps.set(contrib, map);
    }
    const existingMatrix = map.get(ref);
    map.set(
      ref,
      existingMatrix === undefined ? matrix : existingMatrix.add(matrix),
    );
  };

  for (const relation of relations as {
    contributors: Map<Id, Matrix>;
    references: Map<Id, Matrix>;
  }[]) {
    for (const [contrib, contribWeight] of relation.contributors) {
      for (const [ref, refWeight] of relation.references) {
        const matrix = contribWeight.mul(refWeight) as Matrix;
        addRelation(contrib, ref, matrix);
      }
    }
  }

  return relationMaps;
}

async function runExtensionHooks(
  hookName: HookName,
  hookFn: (e: Extension) => Promise<void>,
  extensions?: Record<string, Extension>,
) {
  if (extensions === undefined) return;
  const order = computeHookOrder(extensions, hookName);
  for (const name of order) {
    const ext = extensions[name];
    if (ext === undefined) continue;
    await hookFn(ext);
  }
}

export async function processContext(
  context: Context,
  data: Data,
): Promise<Map<Id, Result>> {
  const embeddedTotalScores = new Map<Id, [Vector, Vector]>();
  let results = new Map<Id, Result>();

  const enabled = context.extensions ?? {};

  await runExtensionHooks(
    "preprocessData",
    async (ext) => {
      const ret = await ext.preprocessData?.(context, data);
      if (ret !== undefined) data = ret;
    },
    enabled,
  );

  const positiveConstScores = constScoreCalc(context, data, 1.0);
  const negativeConstScores = constScoreCalc(context, data, -1.0);
  const entrySccs = topoSortEntries(context, data);
  const relations = createRelationMaps(data.relations);

  for (const entryScc of entrySccs) {
    const idToIndexMap = new Map<Id, number>();
    entryScc.forEach((id, i) => idToIndexMap.set(id, i));

    const N = context.factorScoreCombineWeight.data.length;
    const size = N * entryScc.length;
    const equationMatrix: MathJsMatrix = identity(size) as MathJsMatrix;
    const subAssign = (i: number, j: number, amt: number) => {
      equationMatrix.set([i, j], equationMatrix.get([i, j]) - amt);
    };

    entryScc.forEach((entryId, i) => {
      const refs = relations.get(entryId);
      if (refs === undefined) return;

      for (const [ref, refWeight] of refs) {
        const embeddedRefScore = embeddedTotalScores.get(ref);
        if (embeddedRefScore !== undefined) {
          const [posRef, negRef] = embeddedRefScore;
          positiveConstScores
            .get(entryId)
            ?.add(refWeight.mul(posRef) as Vector);
          negativeConstScores
            .get(entryId)
            ?.add(refWeight.mul(negRef) as Vector);
        } else {
          const j = entryScc.indexOf(ref);
          assert(j >= 0);
          for (let ip = 0; ip < N; ++ip)
            for (let jp = 0; jp < N; ++jp) {
              const w = refWeight.get(ip, jp);
              subAssign(i * N + ip, j * N + jp, w);
            }
        }
      }
    });

    const equationRhsPos = new Array<number>(size).fill(0);
    const equationRhsNeg = new Array<number>(size).fill(0);

    entryScc.forEach((entryId, i) => {
      const positiveConst = positiveConstScores.get(entryId);
      const negativeConst = negativeConstScores.get(entryId);
      if (positiveConst === undefined || negativeConst === undefined) return;
      for (let j = 0; j < N; ++j) {
        equationRhsPos[i * N + j] = positiveConst.data[j] ?? 0;
        equationRhsNeg[i * N + j] = negativeConst.data[j] ?? 0;
      }
    });

    const positiveScores = lusolve(
      equationMatrix,
      mathjsMatrix(equationRhsPos),
    );
    const negativeScores = lusolve(
      equationMatrix,
      mathjsMatrix(equationRhsNeg),
    );

    for (let i = 0; i < entryScc.length; ++i) {
      const entryId = entryScc[i];
      if (entryId === undefined) continue;
      let result: Result = {
        positiveScore: newZeroVector(context),
        negativeScore: newZeroVector(context),
        overallVector: newZeroVector(context),
        DAH_meta: {},
      };
      for (let j = 0; j < N; ++j) {
        result.positiveScore.data[j] = positiveScores.get([i * N + j, 0]);
        result.negativeScore.data[j] = negativeScores.get([i * N + j, 0]);
      }

      embeddedTotalScores.set(entryId, [
        result.positiveScore,
        result.negativeScore,
      ]);
      result.positiveScore = unembed(context, result.positiveScore);
      result.negativeScore = unembed(context, result.negativeScore);
      result.overallVector.add(result.positiveScore);
      result.overallVector.add(result.negativeScore.mul(-1));

      // run afterEntryResult hooks for this entry in the computed order
      await runExtensionHooks(
        "afterEntryResult",
        async (ext) => {
          const r = await ext.afterEntryResult?.(context, entryId, result);
          if (r !== undefined) result = r;
        },
        enabled,
      );

      results.set(entryId, result);
    }
  }

  // run postProcess hooks in computed order; allow replacement of results
  await runExtensionHooks(
    "postProcess",
    async (ext) => {
      const r = await ext.postProcess?.(context, results);
      if (r !== undefined) results = r;
    },
    enabled,
  );

  // run report hooks
  await runExtensionHooks(
    "report",
    async (ext) => {
      await ext.report?.(data, results);
    },
    enabled,
  );

  return results;
}
