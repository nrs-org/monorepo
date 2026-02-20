import { describe, it, expect } from "bun:test";
import { makeEntryMeta, makeImpactMeta } from "../src/meta-helpers";
import { newContext, processContext } from "../src/process";
import { Vector, ScalarMatrix } from "../src/math";

describe("processContext with signed power (negative scores)", () => {
  it("handles negative impact scores correctly", async () => {
    const ctx = newContext({
      factorScoreCombineWeight: new Vector([2, 2]),
    });

    const entry = { id: "e1", DAH_meta: makeEntryMeta() };

    // Impact with negative score
    const impact = {
      DAH_meta: makeImpactMeta(),
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      score: new Vector([-3, -4]), // negative scores
    };

    const data = {
      entries: new Map([["e1", entry]]),
      impacts: [impact],
      relations: [],
    };

    const res = await processContext(ctx, data);
    const r = res.get("e1");

    expect(r).toBeDefined();
    expect(r?.overallVector.data.length).toBe(2);
    expect(r?.overallVector.data.every(Number.isFinite)).toBe(true);

    // The overall vector should have negative values
    expect(r?.overallVector.data[0]).toBeLessThan(0);
    expect(r?.overallVector.data[1]).toBeLessThan(0);
  });

  it("handles mixed positive and negative scores correctly", async () => {
    const ctx = newContext({
      factorScoreCombineWeight: new Vector([2, 2]),
    });

    const entry = { id: "e1", DAH_meta: makeEntryMeta() };

    // Impact with mixed scores
    const impact = {
      DAH_meta: makeImpactMeta(),
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      score: new Vector([3, -4]), // one positive, one negative
    };

    const data = {
      entries: new Map([["e1", entry]]),
      impacts: [impact],
      relations: [],
    };

    const res = await processContext(ctx, data);
    const r = res.get("e1");

    expect(r).toBeDefined();
    expect(r?.overallVector.data.length).toBe(2);
    expect(r?.overallVector.data.every(Number.isFinite)).toBe(true);

    // First dimension should be positive
    expect(r?.overallVector.data[0]).toBeGreaterThan(0);
    // Second dimension should be negative
    expect(r?.overallVector.data[1]).toBeLessThan(0);
  });

  it("combines multiple impacts with different signs", async () => {
    const ctx = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
    });

    const entry = { id: "e1", DAH_meta: makeEntryMeta() };

    const impact1 = {
      DAH_meta: makeImpactMeta(),
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      score: new Vector([2, 3]),
    };

    const impact2 = {
      DAH_meta: makeImpactMeta(),
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      score: new Vector([-1, 2]),
    };

    const data = {
      entries: new Map([["e1", entry]]),
      impacts: [impact1, impact2],
      relations: [],
    };

    const res = await processContext(ctx, data);
    const r = res.get("e1");

    expect(r).toBeDefined();
    expect(r?.overallVector.data.every(Number.isFinite)).toBe(true);

    // The result should be the combination of both impacts
    // With factor weight 1 (linear), this should be simple addition
    // First dimension: 2 + (-1) = 1
    // Second dimension: 3 + 2 = 5
    expect(r?.overallVector.data[0]).toBeCloseTo(1, 5);
    expect(r?.overallVector.data[1]).toBeCloseTo(5, 5);
  });
});
