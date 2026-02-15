import { Vector, type Extension } from "@nrs-org/core";

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

export interface DAH_factorsConfig {
  // Optionally override combine weights for factors and subscores
  factorWeights?: Partial<Record<FactorShortName, number>>;
  subscoreWeights?: Partial<Record<SubscoreName, number>>;
}

export type DAH_factors = Extension & {
  getFactorCombineWeightVector(): Vector;
  getSubscoreWeights(): Vector;
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
  };
}
