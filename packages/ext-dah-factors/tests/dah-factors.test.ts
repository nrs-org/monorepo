import { newContext } from "@nrs-org/core";
import DAH_factors from "../index";
import { describe, it, expect } from "bun:test";

describe("DAH_factors", () => {
  it("returns default weights correctly", () => {
    const ext = DAH_factors();
    expect(ext.getFactorCombineWeightVector().data).toEqual([
      0.3, 0.4, 0.35, 0.35, 0.4, 0.5, 0.4, 0.1, 0.3, 0.05, 1.0,
    ]);
  });

  it("overrides factor weights when given in config", () => {
    const ext = DAH_factors({ factorWeights: { AU: 0.9, CP: 2.0 } });
    expect(ext.getFactorCombineWeightVector().data).toEqual([
      0.9, 0.4, 0.35, 0.35, 0.4, 2.0, 0.4, 0.1, 0.3, 0.05, 1.0,
    ]);
  });

  it("returns default subscore weights", () => {
    const ext = DAH_factors();
    expect(ext.getSubscoreWeights().data).toEqual([0.6, 0.7, 0.05, 1.0]);
  });

  it("overrides subscore weights when given in config", () => {
    const ext = DAH_factors({
      subscoreWeights: { Emotion: 1.2, Art: 0.5 },
    });
    expect(ext.getSubscoreWeights().data).toEqual([1.2, 0.5, 0.05, 1.0]);
  });

  it("set context factor score weights correctly", () => {
    const ext = DAH_factors();
    const ctx = newContext({
      extensions: [ext],
    });
    expect(ctx.factorScoreCombineWeight.data).toEqual([
      0.3, 0.4, 0.35, 0.35, 0.4, 0.5, 0.4, 0.1, 0.3, 0.05, 1.0,
    ]);
  });
});
