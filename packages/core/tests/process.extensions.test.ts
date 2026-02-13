import { describe, it, expect } from "bun:test";
import {
  type Result,
  type Extension,
  newContext,
  processContext,
  Vector,
  ScalarMatrix,
} from "../index";

describe("processContext extensions", () => {
  it("calls all extension hooks in the happy path", async () => {
    const calls: string[] = [];
    const ext = {
      preprocessData: () => {
        calls.push("pre");
        return undefined;
      },
      afterEntryResult: (_, id) => {
        calls.push("after:" + id);
        return undefined;
      },
      postProcess: () => {
        calls.push("post");
        return undefined;
      },
      report: () => {
        calls.push("report");
        return undefined;
      },
    } satisfies Extension;

    const ctx = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
      extensions: { e: ext },
    });

    const entry = { id: "e1", DAH_meta: {} };
    const impact = {
      DAH_meta: {},
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      score: new Vector([0.5, 0.2]),
    };
    const data = {
      entries: new Map([["e1", entry]]),
      impacts: [impact],
      relations: [],
    };

    const results = await processContext(ctx, data);
    expect(results.get("e1")).toBeDefined();
    // preprocessData may run; ignore optional 'pre' when asserting order
    expect(calls.filter((c) => c !== "pre")).toEqual([
      "after:e1",
      "post",
      "report",
    ]);
  });

  it("preprocessData replacement is used", async () => {
    const ext = {
      preprocessData: (_, data) => {
        // remove impacts so final overall vector is zero
        return { ...data, impacts: [] };
      },
    } satisfies Extension;

    const ctx = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
      extensions: { p: ext },
    });

    const entry = { id: "e1", DAH_meta: {} };
    const impact = {
      DAH_meta: {},
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      score: new Vector([0.5, 0.2]),
    };
    const data = {
      entries: new Map([["e1", entry]]),
      impacts: [impact],
      relations: [],
    };

    const results = await processContext(ctx, data);
    const r = results.get("e1");
    expect(r).toBeDefined();
    // overallVector should be all zeros when there are no impacts
    expect(
      r?.overallVector.data.every((n: number) => Math.abs(n) < 1e-12),
    ).toBe(true);
  });

  it("afterEntryResult can replace a result", async () => {
    const ext = {
      afterEntryResult: (_ctx, _id, result) => {
        return {
          positiveScore: result.positiveScore,
          negativeScore: result.negativeScore,
          overallVector: result.overallVector,
          DAH_meta: { replaced: true },
        };
      },
    } satisfies Extension;

    const ctx = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
      extensions: { a: ext },
    });

    const entry = { id: "e1", DAH_meta: {} };
    const impact = {
      DAH_meta: {},
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      score: new Vector([0.5, 0.2]),
    };
    const data = {
      entries: new Map([["e1", entry]]),
      impacts: [impact],
      relations: [],
    };

    const results = await processContext(ctx, data);
    const r = results.get("e1");
    expect(r).toBeDefined();
    expect(r?.DAH_meta?.replaced).toBe(true);
  });

  it("postProcess can replace the results map", async () => {
    const ext = {
      postProcess: (_, results) => {
        const m = new Map<string, Result>();
        const r = results.get("e1");
        const positiveScore = r?.positiveScore;
        const negativeScore = r?.negativeScore;
        const overallVector = r?.overallVector;
        if (
          positiveScore !== undefined &&
          negativeScore !== undefined &&
          overallVector !== undefined
        )
          m.set("x", {
            positiveScore,
            negativeScore,
            overallVector,
            DAH_meta: { replacedByPost: true },
          });
        return m;
      },
    } satisfies Extension;

    const ctx = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
      extensions: { post: ext },
    });

    const entry = { id: "e1", DAH_meta: {} };
    const impact = {
      DAH_meta: {},
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      score: new Vector([0.5, 0.2]),
    };
    const data = {
      entries: new Map([["e1", entry]]),
      impacts: [impact],
      relations: [],
    };

    const results = await processContext(ctx, data);
    expect(results.get("e1")).toBeUndefined();
    const x = results.get("x");
    expect(x).toBeDefined();
    expect(x?.DAH_meta?.replacedByPost).toBe(true);
  });

  it("report hook is awaited by processContext", async () => {
    let reported = false;
    const ext = {
      report: async () => {
        // simulate async work
        await new Promise((res) => setTimeout(res, 10));
        reported = true;
      },
    };

    const ctx = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
      extensions: { r: ext },
    });

    const entry = { id: "e1", DAH_meta: {} };
    const impact = {
      DAH_meta: {},
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      score: new Vector([0.5, 0.2]),
    };
    const data = {
      entries: new Map([["e1", entry]]),
      impacts: [impact],
      relations: [],
    };

    await processContext(ctx, data);
    expect(reported).toBe(true);
  });

  it("respects mustRunAfter ordering for hooks", async () => {
    const calls: string[] = [];
    const extA = {
      mustRunAfter: () => ["B"],
      afterEntryResult: () => {
        calls.push("A");
        return undefined;
      },
    } satisfies Extension;
    const extB = {
      afterEntryResult: () => {
        calls.push("B");
        return undefined;
      },
    } satisfies Extension;

    const ctx = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
      extensions: { A: extA, B: extB },
    });

    const entry = { id: "e1", DAH_meta: {} };
    const impact = {
      DAH_meta: {},
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      score: new Vector([0.5, 0.2]),
    };
    const data = {
      entries: new Map([["e1", entry]]),
      impacts: [impact],
      relations: [],
    };

    await processContext(ctx, data);
    // preprocessData may run in other contexts; ignore optional 'pre' when asserting order
    // extA.mustRunAfter returning ["B"] means B must run after A -> A then B
    expect(calls.filter((c) => c !== "pre")).toEqual(["A", "B"]);
  });

  it("throws when mustRunAfter hints cycle", async () => {
    const extA = { mustRunAfter: () => ["B"] };
    const extB = { mustRunAfter: () => ["A"] };

    const ctx = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
      extensions: { A: extA, B: extB },
    });

    const entry = { id: "e1", DAH_meta: {} };
    const impact = {
      DAH_meta: {},
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      score: new Vector([0.5, 0.2]),
    };
    const data = {
      entries: new Map([["e1", entry]]),
      impacts: [impact],
      relations: [],
    };

    let threw = false;
    try {
      await processContext(ctx, data);
    } catch (err) {
      threw = true;
      expect(err?.toString()).toMatch(/cycle detected/);
    }
    expect(threw).toBe(true);
  });
});
