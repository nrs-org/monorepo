import {
  Vector,
  type Extension,
  ScalarMatrix,
  DiagonalMatrix,
  RegularMatrix,
  type Matrix,
} from "@nrs-org/core";

// Factor interface and implementation
export interface Factor<SN = string, N = string> {
  shortName: SN;
  name: N;
  factorWeight: number;
  factorIndex: number;
}

export function factor<SN extends string, N extends string>(
  shortName: SN,
  name: N,
  weight: number,
  index: number,
): Factor<SN, N> {
  return { shortName, name, factorWeight: weight, factorIndex: index };
}

// Factor groups/definitions (reference values)
export const AU = factor("AU", "ActivatedUnpleasant", 0.3, 0);
export const AP = factor("AP", "ActivatedPleasant", 0.4, 1);
export const MU = factor("MU", "ModerateUnpleasant", 0.35, 2);
export const MP = factor("MP", "ModeratePleasant", 0.35, 3);
export const CU = factor("CU", "CalmingUnpleasant", 0.4, 4);
export const CP = factor("CP", "CalmingPleasant", 0.5, 5);
export const AL = factor("AL", "Language", 0.4, 6);
export const AV = factor("AV", "Visual", 0.1, 7);
export const AM = factor("AM", "Music", 0.3, 8);

export const Boredom = factor("B", "Boredom", 0.05, 9);
export const Additional = factor("A", "Additional", 1.0, 10);

export const Emotion = {
  subscoreWeight: 0.6,
  subscoreIndex: 0,
  factors: [AU, AP, MU, MP, CU, CP] as const,
};

export const Art = {
  subscoreWeight: 0.7,
  subscoreIndex: 1,
  factors: [AL, AV, AM] as const,
};

export const BoredomGroup = {
  subscoreWeight: 0.05,
  subscoreIndex: 2,
  factors: [Boredom] as const,
};

export const AdditionalGroup = {
  subscoreWeight: 1.0,
  subscoreIndex: 3,
  factors: [Additional] as const,
};

export const factorScores = [
  AU,
  AP,
  MU,
  MP,
  CU,
  CP,
  AL,
  AV,
  AM,
  Boredom,
  Additional,
] as const;

export type FactorShortName = (typeof factorScores)[number]["shortName"];
export type SubscoreName = "Emotion" | "Art" | "Boredom" | "Additional";
export type MatrixKey =
  | FactorShortName
  | `${FactorShortName}_${FactorShortName}`;

export interface DAH_factorsConfig {
  // Optionally override combine weights for factors and subscores
  factorWeights?: Partial<Record<FactorShortName, number>>;
  subscoreWeights?: Partial<Record<SubscoreName, number>>;
}

export type DAH_factors = Extension & {
  getFactorCombineWeightVector(): Vector;
  getSubscoreWeights(): Vector;

  getFactor(name: string): Factor | undefined;
  getSubscore(
    name: string,
  ):
    | typeof Emotion
    | typeof Art
    | typeof BoredomGroup
    | typeof AdditionalGroup
    | undefined;

  newVector(input?: Partial<Record<FactorShortName, number>>): Vector;
  newMatrix(input?: Partial<Record<MatrixKey, number>>): Matrix;
};

export default function DAH_factors(
  config: DAH_factorsConfig = {},
): DAH_factors {
  return {
    name: "DAH_factors",
    dependencies() {
      return [];
    },
    getFactorScoreWeights() {
      return this.getFactorCombineWeightVector();
    },
    getFactorCombineWeightVector() {
      // Use config if present, fallback to hardcoded values
      return new Vector(
        factorScores.map(
          (factor) =>
            (config.factorWeights && config.factorWeights[factor.shortName]) ??
            factor.factorWeight,
        ),
      );
    },
    getSubscoreWeights() {
      // Canonical order: Emotion, Art, Boredom, Additional
      return new Vector([
        config.subscoreWeights?.Emotion ?? Emotion.subscoreWeight,
        config.subscoreWeights?.Art ?? Art.subscoreWeight,
        config.subscoreWeights?.Boredom ?? BoredomGroup.subscoreWeight,
        config.subscoreWeights?.Additional ?? AdditionalGroup.subscoreWeight,
      ]);
    },

    getFactor(name: string): Factor | undefined {
      return factorScores.find((f) => f.shortName === name || f.name === name);
    },

    getSubscore(
      name: string,
    ):
      | typeof Emotion
      | typeof Art
      | typeof BoredomGroup
      | typeof AdditionalGroup
      | undefined {
      switch (name) {
        case "Emotion":
          return Emotion;
        case "Art":
          return Art;
        case "Boredom":
          return BoredomGroup;
        case "Additional":
          return AdditionalGroup;
        default:
          return undefined;
      }
    },

    /**
     * Ergonomically construct a canonical-order Vector from factor short name mapping.
     * Omitted keys are set to 0.
     */
    newVector(input: Partial<Record<FactorShortName, number>> = {}): Vector {
      return new Vector(
        factorScores.map((f) => {
          const v = input[f.shortName as FactorShortName];
          return v ?? 0;
        }),
      );
    },

    /**
     * Create a matrix by named factor pairs only (AP_CP ≠ CP_AP, no symmetry assumed).
     * Input keys: X (diagonal for factor X) or X_Y for row X, column Y.
     * Missing values default to 0.
     * NOTE: AP_CP != CP_AP, no symmetry is assumed.
     * Mathematically, AP_CP: influence of source AP to target CP, not the other way around.
     * Returns DiagonalMatrix or RegularMatrix as appropriate, for ScalarMatrix,
     * the user is advised to use the core API function (or the constructor) instead
     * of this.
     */
    newMatrix(input: Partial<Record<MatrixKey, number>> = {}) {
      const N = factorScores.length;

      // Gather diagonals and off-diagonals
      const diagonalKeys = factorScores
        .map((f) => f.shortName)
        .filter((k) => Object.prototype.hasOwnProperty.call(input, k));
      const offDiagonalKeys = Object.keys(input).filter((k) => k.includes("_"));

      if (diagonalKeys.length === 0 && offDiagonalKeys.length === 0) {
        return new ScalarMatrix(0);
      }

      if (offDiagonalKeys.length === 0) {
        const diagonal = this.newVector(
          input as Partial<Record<FactorShortName, number>>,
        );
        return new DiagonalMatrix(diagonal.data);
      }

      // Build dense matrix
      const mat = Array.from({ length: N * N }, () => 0);
      for (const diagKey of diagonalKeys) {
        const factor = this.getFactor(diagKey as FactorShortName);
        if (factor === undefined) continue;
        mat[factor.factorIndex * N + factor.factorIndex] =
          input[diagKey as FactorShortName] ?? 0;
      }
      for (const nonDiagKey of offDiagonalKeys) {
        const split = nonDiagKey.split("_");
        if (split.length !== 2) continue;
        const [rowKey, colKey] = split;
        const rowFactor = this.getFactor(rowKey as FactorShortName);
        const colFactor = this.getFactor(colKey as FactorShortName);
        if (rowFactor === undefined || colFactor === undefined) continue;
        mat[rowFactor.factorIndex * N + colFactor.factorIndex] =
          input[nonDiagKey as MatrixKey] ?? 0;
      }
      return new RegularMatrix(mat);
    },
  };
}
