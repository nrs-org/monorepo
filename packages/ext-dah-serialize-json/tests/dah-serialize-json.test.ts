import { describe, it, expect } from "bun:test";
import {
  makeEntryMeta,
  makeImpactMeta,
  makeRelationMeta,
  makeResultMeta,
  DiagonalMatrix,
  RegularMatrix,
  ScalarMatrix,
  Vector,
  newContext,
  processContext,
  type Data,
  type Result,
} from "@nrs-org/core";
import { factorScores } from "@nrs-org/ext-dah-factors";
import DAH_factors from "@nrs-org/ext-dah-factors";
import DAH_serialize from "@nrs-org/ext-dah-serialize";
import DAH_serialize_json from "../index.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Collect all bytes written to a WritableStream into a string. */
function captureStream(): { stream: WritableStream; getOutput: () => string } {
  const chunks: Uint8Array[] = [];
  const stream = new WritableStream({
    write(chunk: Uint8Array) {
      chunks.push(chunk);
    },
  });
  return {
    stream,
    getOutput: () => {
      const total = chunks.reduce((acc, c) => acc + c.length, 0);
      const buf = new Uint8Array(total);
      let offset = 0;
      for (const c of chunks) {
        buf.set(c, offset);
        offset += c.length;
      }
      return new TextDecoder().decode(buf);
    },
  };
}

const n = factorScores.length;

function zeroVector() {
  return new Vector(new Array<number>(n).fill(0));
}

function makeMinimalData(): Data {
  return {
    entries: new Map([
      ["E-1", { id: "E-1", DAH_meta: makeEntryMeta({ title: "Test" }) }],
    ]),
    impacts: [
      {
        contributors: new Map([["E-1", new ScalarMatrix(1.0)]]),
        score: zeroVector(),
        DAH_meta: makeImpactMeta(),
      },
    ],
    relations: [
      {
        contributors: new Map([["E-1", new ScalarMatrix(0.5)]]),
        references: new Map([
          ["E-1", new DiagonalMatrix(new Array<number>(n).fill(0.1))],
        ]),
        DAH_meta: makeRelationMeta(),
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// toJSONMatrix / fromJSONMatrix round-trip
// ---------------------------------------------------------------------------

describe("toJSONMatrix / fromJSONMatrix", () => {
  it("ScalarMatrix round-trips as a bare number", () => {
    const ext = DAH_serialize_json();
    const m = new ScalarMatrix(0.75);
    const json = ext.toJSONMatrix(m);
    expect(typeof json).toBe("number");
    expect(json).toBe(0.75);
    const back = ext.fromJSONMatrix(json);
    expect(back).toBeInstanceOf(ScalarMatrix);
    expect((back as ScalarMatrix).data).toBe(0.75);
  });

  it("DiagonalMatrix round-trips as an object with short-name keys", () => {
    const ext = DAH_serialize_json();
    const data = new Array<number>(n).fill(0);
    data[1] = 0.5; // AP
    data[5] = 0.3; // CP
    const m = new DiagonalMatrix(data);
    const json = ext.toJSONMatrix(m);
    expect(typeof json).toBe("object");
    const obj = json as Record<string, number>;
    expect(obj["AP"]).toBeCloseTo(0.5);
    expect(obj["CP"]).toBeCloseTo(0.3);
    const back = ext.fromJSONMatrix(json);
    expect(back).toBeInstanceOf(DiagonalMatrix);
    const diag = back as DiagonalMatrix;
    expect(diag.getDiagonal(1)).toBeCloseTo(0.5);
    expect(diag.getDiagonal(5)).toBeCloseTo(0.3);
  });

  it("RegularMatrix round-trips preserving off-diagonal entries", () => {
    const ext = DAH_serialize_json();
    const data = new Array<number>(n * n).fill(0);
    data[0] = 0.8; // AU diagonal
    data[1] = 0.2; // AU_AP off-diagonal (row 0, col 1)
    const m = new RegularMatrix(data);
    const json = ext.toJSONMatrix(m) as Record<string, number>;
    expect(json["AU"]).toBeCloseTo(0.8);
    expect(json["AU_AP"]).toBeCloseTo(0.2);
    const back = ext.fromJSONMatrix(json);
    expect(back).toBeInstanceOf(RegularMatrix);
    const reg = back as RegularMatrix;
    expect(reg.get(0, 0)).toBeCloseTo(0.8);
    expect(reg.get(0, 1)).toBeCloseTo(0.2);
  });

  it("near-zero values are omitted and round-trip to zero", () => {
    const ext = DAH_serialize_json();
    const data = new Array<number>(n).fill(0);
    data[0] = 1e-6; // below EPSILON, should be omitted
    data[2] = 0.5; // MU — should be kept
    const m = new DiagonalMatrix(data);
    const json = ext.toJSONMatrix(m) as Record<string, number>;
    expect(json["AU"]).toBeUndefined();
    expect(json["MU"]).toBeCloseTo(0.5);
    const back = ext.fromJSONMatrix(json) as DiagonalMatrix;
    expect(back.getDiagonal(0)).toBeCloseTo(0);
    expect(back.getDiagonal(2)).toBeCloseTo(0.5);
  });
});

// ---------------------------------------------------------------------------
// toJSONVector / fromJSONVector round-trip
// ---------------------------------------------------------------------------

describe("toJSONVector / fromJSONVector", () => {
  it("round-trips a Vector through JSON", () => {
    const ext = DAH_serialize_json();
    const data = new Array<number>(n).fill(0);
    data[3] = 0.6; // MP
    data[8] = 0.4; // AM
    const v = new Vector(data);
    const json = ext.toJSONVector(v);
    expect(json["MP"]).toBeCloseTo(0.6);
    expect(json["AM"]).toBeCloseTo(0.4);
    const back = ext.fromJSONVector(json);
    expect(back.data[3]).toBeCloseTo(0.6);
    expect(back.data[8]).toBeCloseTo(0.4);
    // all others should be 0
    for (let i = 0; i < n; i++) {
      if (i !== 3 && i !== 8) expect(back.data[i]).toBeCloseTo(0);
    }
  });

  it("zero vector serializes to an empty object", () => {
    const ext = DAH_serialize_json();
    const v = new Vector(new Array<number>(n).fill(0));
    expect(ext.toJSONVector(v)).toEqual({});
  });
});

// ---------------------------------------------------------------------------
// DAH_serialize_json extension object
// ---------------------------------------------------------------------------

describe("ext-dah-serialize-json construction", () => {
  it("has name DAH_serialize_json", () => {
    const ext = DAH_serialize_json();
    expect(ext.name).toBe("DAH_serialize_json");
  });

  it("depends on DAH_serialize and DAH_factors", () => {
    const ext = DAH_serialize_json();
    expect(ext.dependencies()).toContain("DAH_serialize");
    expect(ext.dependencies()).toContain("DAH_factors");
  });
});

// ---------------------------------------------------------------------------
// report hook — individual streams
// ---------------------------------------------------------------------------

describe("report hook — individual streams", () => {
  it("writes valid entries JSON", async () => {
    const { stream, getOutput } = captureStream();
    const ext = DAH_serialize_json({ entries: stream, indent: 2 });
    const data = makeMinimalData();
    const results = new Map<string, Result>();
    await ext.report(data, results);
    const parsed = JSON.parse(getOutput()) as Record<string, unknown>;
    expect(parsed["E-1"]).toBeDefined();
    expect((parsed["E-1"] as Record<string, unknown>)["id"]).toBe("E-1");
  });

  it("writes valid impacts JSON", async () => {
    const { stream, getOutput } = captureStream();
    const ext = DAH_serialize_json({ impacts: stream });
    const data = makeMinimalData();
    const results = new Map<string, Result>();
    await ext.report(data, results);
    const parsed = JSON.parse(getOutput()) as unknown[];
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBe(1);
  });

  it("writes valid relations JSON", async () => {
    const { stream, getOutput } = captureStream();
    const ext = DAH_serialize_json({ relations: stream });
    const data = makeMinimalData();
    const results = new Map<string, Result>();
    await ext.report(data, results);
    const parsed = JSON.parse(getOutput()) as unknown[];
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBe(1);
  });

  it("writes valid scores JSON", async () => {
    const { stream, getOutput } = captureStream();
    const ext = DAH_serialize_json({ scores: stream });
    const data = makeMinimalData();
    const results = new Map<string, Result>([
      ["E-1", { overallVector: zeroVector(), DAH_meta: makeResultMeta() }],
    ]);
    await ext.report(data, results);
    const parsed = JSON.parse(getOutput()) as Record<string, unknown>;
    expect(parsed["E-1"]).toBeDefined();
  });

  it("writes nothing when no streams configured", async () => {
    // Should not throw
    const ext = DAH_serialize_json();
    const data = makeMinimalData();
    const results = new Map<string, Result>();
    await expect(ext.report(data, results)).resolves.toBeUndefined();
  });

  it("fans out to multiple streams when an array is given", async () => {
    const capture1 = captureStream();
    const capture2 = captureStream();
    const ext = DAH_serialize_json({
      entries: [capture1.stream, capture2.stream],
    });
    const data = makeMinimalData();
    await ext.report(data, new Map());
    // Both should have received the same JSON
    expect(capture1.getOutput()).toBe(capture2.getOutput());
    const parsed = JSON.parse(capture1.getOutput()) as Record<string, unknown>;
    expect(parsed["E-1"]).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// report hook — bulk stream
// ---------------------------------------------------------------------------

describe("report hook — bulk stream", () => {
  it("writes all four sections in a single JSON object", async () => {
    const { stream, getOutput } = captureStream();
    const ext = DAH_serialize_json({ bulk: stream });
    const data = makeMinimalData();
    const results = new Map<string, Result>([
      ["E-1", { overallVector: zeroVector(), DAH_meta: makeResultMeta() }],
    ]);
    await ext.report(data, results);
    const parsed = JSON.parse(getOutput()) as Record<string, unknown>;
    expect(parsed["entries"]).toBeDefined();
    expect(parsed["impacts"]).toBeDefined();
    expect(parsed["relations"]).toBeDefined();
    expect(parsed["scores"]).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// deserialize* round-trips (via extension methods)
// ---------------------------------------------------------------------------

describe("deserializeEntries", () => {
  it("round-trips entries through JSON", async () => {
    const { stream, getOutput } = captureStream();
    const ext = DAH_serialize_json({ entries: stream });
    const data = makeMinimalData();
    await ext.report(data, new Map());
    const entries = ext.deserializeEntries(getOutput());
    expect(entries.has("E-1")).toBe(true);
    expect(entries.get("E-1")?.id).toBe("E-1");
  });
});

describe("deserializeImpacts", () => {
  it("round-trips impacts through JSON", async () => {
    const { stream, getOutput } = captureStream();
    const ext = DAH_serialize_json({ impacts: stream });
    const data = makeMinimalData();
    await ext.report(data, new Map());
    const impacts = ext.deserializeImpacts(getOutput());
    expect(impacts.length).toBe(1);
    expect(impacts[0]?.contributors.has("E-1")).toBe(true);
  });
});

describe("deserializeRelations", () => {
  it("round-trips relations through JSON", async () => {
    const { stream, getOutput } = captureStream();
    const ext = DAH_serialize_json({ relations: stream });
    const data = makeMinimalData();
    await ext.report(data, new Map());
    const relations = ext.deserializeRelations(getOutput());
    expect(relations.length).toBe(1);
    expect(relations[0]?.contributors.has("E-1")).toBe(true);
  });
});

describe("deserializeResults", () => {
  it("round-trips results through JSON", async () => {
    const v = new Vector(new Array<number>(n).fill(0));
    v.data[1] = 0.5; // AP
    const { stream, getOutput } = captureStream();
    const ext = DAH_serialize_json({ scores: stream });
    const results = new Map<string, Result>([
      ["E-1", { overallVector: v, DAH_meta: makeResultMeta() }],
    ]);
    await ext.report(makeMinimalData(), results);
    const back = ext.deserializeResults(getOutput());
    expect(back.has("E-1")).toBe(true);
    expect(back.get("E-1")?.overallVector.data[1]).toBeCloseTo(0.5);
  });
});

describe("deserializeBulk", () => {
  it("round-trips the full data+results through bulk JSON", async () => {
    const { stream, getOutput } = captureStream();
    const ext = DAH_serialize_json({ bulk: stream });
    const data = makeMinimalData();
    const results = new Map<string, Result>([
      ["E-1", { overallVector: zeroVector(), DAH_meta: makeResultMeta() }],
    ]);
    await ext.report(data, results);
    const [backData, backResults] = ext.deserializeBulk(getOutput());
    expect(backData.entries.has("E-1")).toBe(true);
    expect(backData.impacts.length).toBe(1);
    expect(backData.relations.length).toBe(1);
    expect(backResults.has("E-1")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Integration — report hook fires via processContext
// ---------------------------------------------------------------------------

describe("integration — DAH_serialize_json with processContext", () => {
  it("report hook is called after processContext and produces valid JSON", async () => {
    const { stream, getOutput } = captureStream();
    const ctx = newContext({
      extensions: [
        DAH_factors(),
        DAH_serialize(),
        DAH_serialize_json({ bulk: stream }),
      ],
    });
    const data: Data = {
      entries: new Map([["A", { id: "A", DAH_meta: makeEntryMeta() }]]),
      impacts: [
        {
          contributors: new Map([["A", new ScalarMatrix(1.0)]]),
          score: new Vector(new Array<number>(11).fill(0)),
          DAH_meta: makeImpactMeta(),
        },
      ],
      relations: [],
    };
    await processContext(ctx, data);
    const output = getOutput();
    expect(output.length).toBeGreaterThan(0);
    const parsed = JSON.parse(output) as Record<string, unknown>;
    expect(parsed["entries"]).toBeDefined();
    expect(parsed["scores"]).toBeDefined();
  });
});
