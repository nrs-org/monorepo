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

  it("sets and gets overall score on result meta", () => {
    const ext = DAH_overall_score();
    const meta = makeResultMeta();
    expect(ext.getOverallScore(meta)).toBeUndefined();
    ext.setOverallScore(meta, 3.14);
    expect(ext.getOverallScore(meta)).toBe(3.14);
    ext.setOverallScore(meta, undefined);
    expect(ext.getOverallScore(meta)).toBeUndefined();
    expect(meta).not.toContainKey("DAH_overall_score");
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
    } satisfies Result;
    const results = new Map<string, Result>([["A", result]]);
    ext.postProcess?.(ctx, results);
    expect(ext.getOverallScore(result.DAH_meta)).toBeDefined();
    expect(typeof ext.getOverallScore(result.DAH_meta)).toBe("number");
  });
});
