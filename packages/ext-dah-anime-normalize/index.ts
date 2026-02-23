/**
 * `DAH_anime_normalize` extension.
 *
 * Converts raw `DAH_overall_score` values into a 1–10 MAL-equivalent scale
 * using piecewise-linear interpolation over 10 keyframe base animes
 * (A-MAL-1 through A-MAL-10).
 *
 * The base anime data is defined as an nrsx document in `data.tsx` and
 * processed at construction time using the same context configuration provided
 * by the caller. No pre-generated JSON file is used.
 *
 * ## Algorithm
 *
 * 1. Build a base-anime `Context` with the same extensions as the caller's
 *    context (or a custom one via `baseAnimeContextConfig`).
 * 2. Run `buildData` + `processContext` on the base anime document.
 * 3. Extract the ten `DAH_overall_score` values for A-MAL-1…A-MAL-10 as
 *    interpolation breakpoints.
 * 4. In `postProcess`, for every result apply piecewise-linear interpolation:
 *    scores below MAL-1's breakpoint clamp to 1, above MAL-10's clamp to 10,
 *    otherwise interpolate between adjacent breakpoints to a value in [1, 10].
 */

import {
  assert,
  newContext,
  processContext,
  type Context,
  type Id,
  type Result,
  type ResultMeta,
} from "@nrs-org/core";
import type { ContextConfig, HookName } from "@nrs-org/core";
import { buildData } from "@nrs-org/nrsx";

import { baseAnimeDocument } from "./data.tsx";
import DAH_factors from "@nrs-org/ext-dah-factors";
import DAH_standards from "@nrs-org/ext-dah-standards";
import DAH_overall_score, {
  type ExtDAH_overall_score,
} from "@nrs-org/ext-dah-overall-score";
import DAH_entry_progress from "@nrs-org/ext-dah-entry-progress";
import DAH_validator_suppress from "@nrs-org/ext-dah-validator-suppress";

// ---------------------------------------------------------------------------
// Base anime IDs — the ten interpolation keyframes.
// ---------------------------------------------------------------------------

const BASE_ANIME_IDS: readonly Id[] = [
  "A-MAL-1",
  "A-MAL-2",
  "A-MAL-3",
  "A-MAL-4",
  "A-MAL-5",
  "A-MAL-6",
  "A-MAL-7",
  "A-MAL-8",
  "A-MAL-9",
  "A-MAL-10",
];

// ---------------------------------------------------------------------------
// Extension config
// ---------------------------------------------------------------------------

export interface DAH_anime_normalizeConfig {
  /**
   * Override the context used to score the base animes. When omitted the
   * caller's own context config is reused so the keyframe scores are computed
   * under the same settings.
   */
  baseAnimeContextConfig?: ContextConfig;
}

function defaultContextConfig(): ContextConfig {
  return {
    extensions: [
      DAH_factors(),
      DAH_standards(),
      DAH_entry_progress(),
      DAH_overall_score(),
      DAH_validator_suppress(),
    ],
  };
}

// ---------------------------------------------------------------------------
// Extension factory
// ---------------------------------------------------------------------------

export default function DAH_anime_normalize(
  config: DAH_anime_normalizeConfig = {},
) {
  // `baseAnimeScores` is populated lazily on the first `postProcess` call so
  // that the context is fully constructed before we try to use it.
  let baseAnimeScores: number[] | null = null;

  /**
   * Piecewise-linear interpolation over the 10 keyframe scores.
   * Returns a value in [1, 10].
   */
  function normalizeScore(overallScore: number, scores: number[]): number {
    const first = scores[0] ?? -Infinity;
    const last = scores[scores.length - 1] ?? Infinity;
    if (overallScore <= first) return 1.0;
    if (overallScore >= last) return 10.0;

    for (let i = 1; i < scores.length; i++) {
      const lo = scores[i - 1] ?? -Infinity;
      const hi = scores[i] ?? Infinity;
      if (hi > overallScore) {
        return i + (overallScore - lo) / (hi - lo);
      }
    }

    // Unreachable — guard for type safety.
    return 10.0;
  }

  return {
    name: "DAH_anime_normalize",

    dependencies(): string[] {
      return ["DAH_factors", "DAH_overall_score", "DAH_standards"];
    },

    /**
     * Must run after `DAH_overall_score` so that `DAH_overall_score` is
     * already populated on each result before we read it.
     */
    mustRunAfter(extensions: string[], hookName: HookName): string[] {
      if (hookName !== "postProcess") return [];
      return extensions.filter((e) => e === "DAH_overall_score");
    },

    /** Sets the normalized score on a result's meta, or removes it when `undefined`. */
    setNormalizedScore(meta: ResultMeta, score: number | undefined): void {
      if (score === undefined) {
        delete meta.DAH_anime_normalize;
      } else {
        meta.DAH_anime_normalize = { score };
      }
    },

    /** Returns the normalized MAL-equivalent score (1–10) from a result's meta, or `undefined` if not set. */
    getNormalizedScore(meta: ResultMeta): number | undefined {
      const entry = meta["DAH_anime_normalize"];
      if (typeof entry === "object" && entry !== null && "score" in entry) {
        const score = (entry as { score: unknown }).score;
        return typeof score === "number" ? score : undefined;
      }
      return undefined;
    },

    async postProcess(
      context: Context,
      results: Map<Id, Result>,
    ): Promise<Map<Id, Result>> {
      // Lazily compute base anime scores on first call.
      if (baseAnimeScores === null) {
        const baseCtx =
          config.baseAnimeContextConfig !== undefined
            ? newContext(config.baseAnimeContextConfig)
            : newContext(defaultContextConfig());
        const overallScoreExt = baseCtx.extensions["DAH_overall_score"] as
          | ExtDAH_overall_score
          | undefined;
        assert(
          overallScoreExt !== undefined,
          "DAH_anime_normalize requires DAH_overall_score in the context.",
        );

        const data = buildData(baseCtx, baseAnimeDocument);
        const baseResults = await processContext(baseCtx, data);

        baseAnimeScores = BASE_ANIME_IDS.map((id) => {
          const result = baseResults.get(id);
          const score =
            result !== undefined
              ? overallScoreExt.getOverallScore(result.DAH_meta)
              : undefined;
          assert(
            score !== undefined,
            `Base anime "${id}" is missing DAH_overall_score.`,
          );
          return score;
        });
      }

      const scores = baseAnimeScores;
      const overallScoreExt = context.extensions["DAH_overall_score"] as
        | ExtDAH_overall_score
        | undefined;
      assert(
        overallScoreExt !== undefined,
        "DAH_anime_normalize requires DAH_overall_score in the context.",
      );

      for (const result of results.values()) {
        const overallScore = overallScoreExt.getOverallScore(result.DAH_meta);
        if (overallScore === undefined) continue;
        this.setNormalizedScore(
          result.DAH_meta,
          normalizeScore(overallScore, scores),
        );
      }

      return results;
    },
  };
}

export type ExtDAH_anime_normalize = ReturnType<typeof DAH_anime_normalize>;
