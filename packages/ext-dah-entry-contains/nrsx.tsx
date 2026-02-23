/**
 * NRSX components for `@nrs-org/ext-dah-entry-contains`.
 *
 * Provides the `Contains` JSX component, which records an `entryContains`
 * relation via `ext-dah-entry-contains`.
 *
 * Usage:
 * ```tsx
 * import { Contains } from "@nrs-org/ext-dah-entry-contains/nrsx";
 * ```
 */

import { assert, ScalarMatrix } from "@nrs-org/core";

import type { ExtDAH_entry_contains } from "./index.ts";

import {
  asRelation,
  type RelationNode,
  type RenderContext,
} from "@nrs-org/nrsx";

export interface ContainsProps {
  /** ID of the child entry that this entry contains. */
  id: string;
  /**
   * Scalar contribution factor (default: 1.0).
   * Scales the contributor weight of the current entry in the relation.
   */
  factor?: number;
}

/**
 * Records a "contains" relation from the current entry to `id`.
 *
 * Requires `DAH_entry_contains` to be registered in the context.
 */
export function Contains(props: ContainsProps): RelationNode {
  return asRelation((rc: RenderContext) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Contains> must be inside an <Entry>",
    );

    const ext = rc.context.extensions["DAH_entry_contains"] as
      | ExtDAH_entry_contains
      | undefined;
    if (!ext) return;

    const factor = props.factor ?? 1.0;
    const relation = ext.entryContains(
      rc.context,
      new Map([[rc.currentEntry.id, new ScalarMatrix(factor)]]),
      props.id,
    );
    rc.relations.push(relation);
  });
}
