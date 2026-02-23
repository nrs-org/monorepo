/**
 * NRSX components for `@nrs-org/ext-dah-entry-bestgirl`.
 *
 * Provides the `BestGirl` JSX component, which sets the best-girl metadata
 * on the current entry via `ext-dah-entry-bestgirl`.
 *
 * Usage:
 * ```tsx
 * import { BestGirl } from "@nrs-org/ext-dah-entry-bestgirl/nrsx";
 * ```
 */

import { assert } from "@nrs-org/core";

import type { ExtDAH_entry_bestGirl } from "./index.ts";

import { asImpact, type ImpactNode, type RenderContext } from "@nrs-org/nrsx";

export interface BestGirlProps {
  /** Name of the best girl character for this entry. */
  name: string;
  /** Provenance annotation — `"user"` if manually curated. */
  generatedBy?: string;
}

/**
 * Annotates the current entry with a "best girl" character name.
 *
 * Requires `DAH_entry_bestGirl` to be registered in the context;
 * silently no-ops if absent.
 */
export function BestGirl(props: BestGirlProps): ImpactNode {
  return asImpact((rc: RenderContext) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <BestGirl> must be inside an <Entry>",
    );

    const ext = rc.context.extensions["DAH_entry_bestGirl"] as
      | ExtDAH_entry_bestGirl
      | undefined;
    if (!ext) return;

    ext.setBestGirl(rc.currentEntry.DAH_meta, props.name);
  });
}
