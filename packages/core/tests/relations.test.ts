import { describe, it, expect } from "bun:test";
import { newContext, processContext } from "../src/process";
import { Vector, ScalarMatrix } from "../src/math";

describe("processContext relations", () => {
  it("applies combined relation weights from multiple relations (non-cyclic)", async () => {
    const ctx = newContext({ factorScoreCombineWeight: new Vector([1, 1]) });

    const e1 = { id: "e1", DAH_meta: {} };
    const e2 = { id: "e2", DAH_meta: {} };

    const impactE1 = {
      DAH_meta: {},
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      score: new Vector([0.5, 0.2]),
    };

    const relA = {
      DAH_meta: {},
      contributors: new Map([["e2", new ScalarMatrix(1)]]),
      references: new Map([["e1", new ScalarMatrix(1)]]),
    };
    const relB = {
      DAH_meta: {},
      contributors: new Map([["e2", new ScalarMatrix(1)]]),
      references: new Map([["e1", new ScalarMatrix(2)]]),
    };

    const data = {
      entries: new Map([
        ["e1", e1],
        ["e2", e2],
      ]),
      impacts: [impactE1],
      relations: [relA, relB],
    };

    const res = await processContext(ctx, data);
    const r1 = res.get("e1");
    const r2 = res.get("e2");
    expect(r1).toBeDefined();
    expect(r2).toBeDefined();
    if (!r1 || !r2) throw new Error("results missing");
    for (let i = 0; i < 2; ++i) {
      const a = r2.overallVector.data[i];
      const b = r1.overallVector.data[i];
      expect(Math.abs(a - 3 * b)).toBeLessThan(1e-8);
    }
  });

  it("computes results for a two-node cyclic relation (SCC)", async () => {
    const ctx = newContext({ factorScoreCombineWeight: new Vector([1, 1]) });

    const e1 = { id: "e1", DAH_meta: {} };
    const e2 = { id: "e2", DAH_meta: {} };

    const impactE1 = {
      DAH_meta: {},
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      score: new Vector([0.4, 0.1]),
    };
    const impactE2 = {
      DAH_meta: {},
      contributors: new Map([["e2", new ScalarMatrix(1)]]),
      score: new Vector([0.2, 0.05]),
    };

    const r1 = {
      DAH_meta: {},
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      references: new Map([["e2", new ScalarMatrix(0.5)]]),
    };
    const r2 = {
      DAH_meta: {},
      contributors: new Map([["e2", new ScalarMatrix(1)]]),
      references: new Map([["e1", new ScalarMatrix(0.5)]]),
    };

    const data = {
      entries: new Map([
        ["e1", e1],
        ["e2", e2],
      ]),
      impacts: [impactE1, impactE2],
      relations: [r1, r2],
    };

    const res = await processContext(ctx, data);
    const ra = res.get("e1");
    const rb = res.get("e2");
    expect(ra).toBeDefined();
    expect(rb).toBeDefined();
    if (!ra || !rb) throw new Error("results missing");
    expect(ra.overallVector.data.length).toBe(2);
    expect(rb.overallVector.data.length).toBe(2);
    expect(ra.overallVector.data.every(Number.isFinite)).toBe(true);
    expect(rb.overallVector.data.every(Number.isFinite)).toBe(true);

    // Solve expected values using exact fractions to avoid floating literals
    // System per-dimension: (I - 0.5*J) x = b where J places 0.5 on off-diagonals
    // For dim 0: b = [0.4, 0.2] -> solutions: e1 = 2/3, e2 = 8/15
    // For dim 1: b = [0.1, 0.05] -> solutions: e1 = 1/6, e2 = 2/15
    const tol = 1e-9;
    const expectedE1 = [2 / 3, 1 / 6];
    const expectedE2 = [8 / 15, 2 / 15];
    for (let i = 0; i < 2; ++i) {
      expect(Math.abs(ra.overallVector.data[i] - expectedE1[i])).toBeLessThan(
        tol,
      );
      expect(Math.abs(rb.overallVector.data[i] - expectedE2[i])).toBeLessThan(
        tol,
      );
    }
    // negative scores should be (near) zero for these positive-only impacts
    expect(ra.negativeScore.data.every((v) => Math.abs(v) < tol)).toBe(true);
    expect(rb.negativeScore.data.every((v) => Math.abs(v) < tol)).toBe(true);
  });
});
