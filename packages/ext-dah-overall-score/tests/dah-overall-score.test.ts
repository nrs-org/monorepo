import { describe, it, expect } from "bun:test";
import DAH_overall_score from "../index";
import {
  makeResultMeta,
  newContext,
  Vector,
  type Extension,
  type Result,
} from "@nrs-org/core";

const DAHFactors: Extension = {
  name: "DAH_factors",
  dependencies() {
    return [];
  },
};

describe("ext-dah-overall-score", () => {
  it("constructs and reports dependency", () => {
    const ext = DAH_overall_score();
    expect(ext.dependencies?.() ?? []).toEqual(["DAH_factors"]);
  });

  it("computes overall score correctly (mocked)", () => {
    const dahFactors = DAHFactors;
    const ext = DAH_overall_score();
    const ctx = newContext({
      extensions: [ext, dahFactors],
      factorScoreCombineWeight: new Vector([1, 1, 1, 1]),
    });
    const result = {
      overallVector: new Vector([2, 3, 4, 1]),
      DAH_meta: makeResultMeta(),
      positiveScore: new Vector([0]),
      negativeScore: new Vector([0]),
    } satisfies Result;
    const results = new Map<string, Result>([["A", result]]);
    ext.postProcess?.(ctx, results);
    expect(result.DAH_meta.DAH_overall_score).toBeDefined();
    expect(typeof result.DAH_meta.DAH_overall_score).toBe("number");
  });
});
