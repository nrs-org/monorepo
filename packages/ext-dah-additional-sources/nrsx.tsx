/**
 * NRSX components for `@nrs-org/ext-dah-additional-sources`.
 *
 * Provides the `Source` JSX component, which sets additional external source
 * IDs and URLs on the current entry via `ext-dah-additional-sources`.
 *
 * Usage:
 * ```tsx
 * import { Source } from "@nrs-org/ext-dah-additional-sources/nrsx";
 * ```
 */

import { assert } from "@nrs-org/core";

import type {
  AdditionalSources,
  VGMDBSource,
  URLSource,
  ExtDAH_additional_sources,
} from "./index.ts";

import { asImpact, type ImpactNode, type RenderContext } from "@nrs-org/nrsx";

export interface SourceProps {
  /** MyAnimeList ID */
  mal?: number;
  /** AniList ID */
  al?: number;
  /** Kitsu ID */
  ks?: number;
  /** AniDB ID */
  adb?: number;
  /** VNDB ID */
  vndb?: number;
  /** VGMDB source reference */
  vgmdb?: VGMDBSource;
  /** Additional URL sources */
  urls?: URLSource[];
}

/**
 * Sets additional external source identifiers on the current entry.
 *
 * Requires `DAH_additional_sources` to be registered in the context;
 * silently no-ops if absent.
 */
export function Source(props: SourceProps): ImpactNode {
  return asImpact((rc: RenderContext) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Source> must be inside an <Entry>",
    );

    const ext = rc.context.extensions["DAH_additional_sources"] as
      | ExtDAH_additional_sources
      | undefined;
    if (!ext) return;

    const sources: AdditionalSources = {};
    if (props.mal !== undefined) sources.id_MyAnimeList = props.mal;
    if (props.al !== undefined) sources.id_AniList = props.al;
    if (props.ks !== undefined) sources.id_Kitsu = props.ks;
    if (props.adb !== undefined) sources.id_AniDB = props.adb;
    if (props.vndb !== undefined) sources.id_VNDB = props.vndb;
    if (props.vgmdb !== undefined) sources.vgmdb = props.vgmdb;
    if (props.urls !== undefined) sources.urls = props.urls;

    ext.setAdditionalSources(rc.currentEntry.DAH_meta, sources);
  });
}
