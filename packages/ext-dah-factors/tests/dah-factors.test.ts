import { newContext } from "@nrs-org/core";
import DAH_factors, { factorScores } from "../index";
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

describe("getSubscore API", () => {
  it("returns correct subscore object given subscore name", () => {
    const ext = DAH_factors();
    const emotionSubscore = ext.getSubscore("Emotion");
    expect(emotionSubscore).toBeDefined();
    expect(emotionSubscore?.subscoreWeight).toBe(0.6);
    expect(emotionSubscore?.factors.map((f) => f.shortName)).toEqual([
      "AU",
      "AP",
      "MU",
      "MP",
      "CU",
      "CP",
    ]);

    const artSubscore = ext.getSubscore("Art");
    expect(artSubscore).toBeDefined();
    expect(artSubscore?.subscoreWeight).toBe(0.7);
    expect(artSubscore?.factors.map((f) => f.shortName)).toEqual([
      "AL",
      "AV",
      "AM",
    ]);

    const boredomSubscore = ext.getSubscore("Boredom");
    expect(boredomSubscore).toBeDefined();
    expect(boredomSubscore?.subscoreWeight).toBe(0.05);
    expect(boredomSubscore?.factors.map((f) => f.shortName)).toEqual(["B"]);

    const additionalSubscore = ext.getSubscore("Additional");
    expect(additionalSubscore).toBeDefined();
    expect(additionalSubscore?.subscoreWeight).toBe(1.0);
    expect(additionalSubscore?.factors.map((f) => f.shortName)).toEqual(["A"]);
  });

  it("returns undefined for unknown subscore name", () => {
    const ext = DAH_factors();
    expect(ext.getSubscore("Unknown")).toBeUndefined();
  });
});

describe("newVector API", () => {
  it("fills vector as expected with partial keys and zeros elsewhere", () => {
    const ext = DAH_factors();
    const v = ext.newVector({ AP: 4, CP: 9 });
    const idx = factorScores.map((f) => f.shortName);
    const expected = idx.map((sn) => (sn === "AP" ? 4 : sn === "CP" ? 9 : 0));
    expect(v.data).toEqual(expected);
  });

  it("returns all-zero vector for empty object", () => {
    const ext = DAH_factors();
    const v = ext.newVector({});
    expect(v.data).toEqual(Array(factorScores.length).fill(0));
  });
});

describe("newMatrix API", () => {
  it("returns DiagonalMatrix for non-scalar diagonal", () => {
    const ext = DAH_factors();
    const m = ext.newMatrix({ AU: 1, AP: 2 });
    expect(m.constructor.name).toBe("DiagonalMatrix");
    if (Array.isArray(m.data)) {
      expect(m.data.slice(0, 2)).toEqual([1, 2]);
    } else {
      throw new Error("Expected array for DiagonalMatrix.data");
    }
  });

  it("returns RegularMatrix for any off-diagonal present", () => {
    const ext = DAH_factors();
    const m = ext.newMatrix({ CP: 1, AU_AP: 3 });
    expect(m.constructor.name).toBe("RegularMatrix");
    // AU_AP is row 0, col 1
    // CP_CP (CP) is row 5, col 5
    if (Array.isArray(m.data)) {
      expect(m.data[0 * factorScores.length + 1]).toBe(3);
      expect(m.data[5 * factorScores.length + 5]).toBe(1);
    } else {
      throw new Error("Expected array for RegularMatrix.data");
    }
  });

  it("treats AP_CP and CP_AP as independent", () => {
    const ext = DAH_factors();
    const m = ext.newMatrix({ AP_CP: 1, CP_AP: 2 });
    expect(m.constructor.name).toBe("RegularMatrix");
    const iCP = factorScores.findIndex((f) => f.shortName === "CP");
    const iAP = factorScores.findIndex((f) => f.shortName === "AP");
    if (Array.isArray(m.data)) {
      expect(m.data[iAP * factorScores.length + iCP]).toBe(1);
      expect(m.data[iCP * factorScores.length + iAP]).toBe(2);
    } else {
      throw new Error("Expected array for RegularMatrix.data");
    }
  });

  it("fills zeros for missing diagonal and off-diagonals", () => {
    const ext = DAH_factors();
    const m = ext.newMatrix({});
    expect(m.constructor.name).toBe("ScalarMatrix");
    expect(m.data).toBe(0);
  });
});
