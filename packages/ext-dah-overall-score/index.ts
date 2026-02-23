import {
  combinePow,
  type Context,
  type Id,
  type Result,
  type ResultMeta,
} from "@nrs-org/core";
import {
  Emotion,
  Art,
  BoredomGroup,
  AdditionalGroup,
} from "@nrs-org/ext-dah-factors";

interface Factor {
  factorIndex: number;
}

export default function DAH_overall_score() {
  return {
    name: "DAH_overall_score",
    dependencies() {
      return ["DAH_factors"];
    },

    /** Sets the overall score on a result's meta, or removes it when `undefined`. */
    setOverallScore(meta: ResultMeta, score: number | undefined): void {
      if (score === undefined) {
        delete meta.DAH_overall_score;
      } else {
        meta.DAH_overall_score = score;
      }
    },

    /** Returns the overall score from a result's meta, or `undefined` if not set. */
    getOverallScore(meta: ResultMeta): number | undefined {
      const score = meta["DAH_overall_score"];
      return typeof score === "number" ? score : undefined;
    },

    postProcess(_: Context, results: Map<Id, Result>) {
      for (const result of results.values()) {
        const score = [Emotion, Art, BoredomGroup, AdditionalGroup]
          .map((subscore) =>
            combinePow(
              subscore.factors.map((f: Factor) => {
                return result.overallVector.data[f.factorIndex] ?? 0;
              }),
              subscore.subscoreWeight,
            ),
          )
          .reduce((a, b) => a + b, 0);
        this.setOverallScore(result.DAH_meta, score);
      }
      return results;
    },
  };
}

export type ExtDAH_overall_score = ReturnType<typeof DAH_overall_score>;
