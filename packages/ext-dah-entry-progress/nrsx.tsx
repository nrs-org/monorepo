/**
 * NRSX components for `@nrs-org/ext-dah-entry-progress`.
 *
 * Provides the `AnimeConsumedProgress` JSX component, which sets entry progress
 * metadata via `ext-dah-entry-progress` and records an `animeConsumed` impact
 * via `ext-dah-standards`.
 *
 * Usage:
 * ```tsx
 * import { AnimeConsumedProgress } from "@nrs-org/ext-dah-entry-progress/nrsx";
 * ```
 */

import { assert, ScalarMatrix } from "@nrs-org/core";

import type { ProgressStatus, ExtDAH_entry_progress } from "./index.ts";
import type { ExtDAH_standards } from "@nrs-org/ext-dah-standards";

import { asImpact, type ImpactNode, type RenderContext } from "@nrs-org/nrsx";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Retrieve a typed extension from the context, throwing if absent. */
function getExt<T>(rc: RenderContext, name: string): T {
  const ext = rc.context.extensions[name] as T | undefined;
  assert(
    ext !== undefined,
    `nrsx: required extension "${name}" is not registered in the context`,
  );
  return ext;
}

/**
 * Parse an episode duration string `MM:SS` or `HH:MM:SS` into milliseconds.
 */
function parseEpisodeDuration(s: string): number {
  const parts = s.split(":").map(Number);
  assert(
    parts.length === 2 || parts.length === 3,
    `nrsx: invalid episodeDuration "${s}" — expected MM:SS or HH:MM:SS`,
  );
  if (parts.length === 2) {
    const [mm, ss] = parts as [number, number];
    return (mm * 60 + ss) * 1000;
  }
  const [hh, mm, ss] = parts as [number, number, number];
  return (hh * 3600 + mm * 60 + ss) * 1000;
}

// ---------------------------------------------------------------------------
// AnimeConsumedProgress component
// ---------------------------------------------------------------------------

export interface AnimeConsumedProgressProps {
  status: ProgressStatus;
  boredom: number;
  episodes: number;
  /** Duration string in `MM:SS` or `HH:MM:SS` format. */
  episodeDuration?: string;
}

/**
 * Anime consumption progress metadata + consumed impact.
 *
 * Sets entry progress metadata via `ext-dah-entry-progress` (if registered)
 * and records an `animeConsumed` impact via `ext-dah-standards`.
 */
export function AnimeConsumedProgress(
  props: AnimeConsumedProgressProps,
): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <AnimeConsumedProgress> must be inside an <Entry>",
    );

    const progressExt = rc.context.extensions["DAH_entry_progress"] as
      | ExtDAH_entry_progress
      | undefined;
    if (progressExt) {
      progressExt.setProgress(rc.currentEntry.DAH_meta, {
        status: props.status,
        DAH_meta: {},
      });
    }

    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    const episodeDurationMs =
      props.episodeDuration !== undefined
        ? parseEpisodeDuration(props.episodeDuration)
        : undefined;

    rc.impacts.push(
      standards.animeConsumed(
        rc.context,
        new Map([[rc.currentEntry.id, new ScalarMatrix(1.0)]]),
        props.boredom,
        props.episodes,
        episodeDurationMs,
      ),
    );
  });
}
