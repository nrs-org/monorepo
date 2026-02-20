import { type Extension, combinePow } from "@nrs-org/core";
import {
  Emotion,
  Art,
  BoredomGroup,
  AdditionalGroup,
} from "@nrs-org/ext-dah-factors";

interface Factor {
  factorIndex: number;
}

export default function DAH_overall_score(): Extension {
  return {
    name: "DAH_overall_score",
    dependencies() {
      return ["DAH_factors"];
    },
    postProcess(_, results) {
      for (const result of results.values()) {
        result.DAH_meta.DAH_overall_score = [
          Emotion,
          Art,
          BoredomGroup,
          AdditionalGroup,
        ]
          .map((subscore) =>
            combinePow(
              subscore.factors.map((f: Factor) => {
                return result.overallVector.data[f.factorIndex] ?? 0;
              }),
              subscore.subscoreWeight,
            ),
          )
          .reduce((a, b) => a + b, 0);
      }
      return results;
    },
  };
}
