/**
 * NRSX components for `@nrs-org/ext-dah-validator-suppress`.
 *
 * Provides the `ValidatorSuppress` JSX component, which annotates the nearest
 * suppressible context (current impact or entry meta) with validator rule
 * suppressions.
 *
 * Usage:
 * ```tsx
 * import { ValidatorSuppress } from "@nrs-org/ext-dah-validator-suppress/nrsx";
 * ```
 */

import { assert } from "@nrs-org/core";

import type { ExtDAH_validator_suppress } from "./index.ts";

import {
  type EntryNode,
  type ImpactNode,
  type RelationNode,
  type RenderContext,
} from "@nrs-org/nrsx";

export interface ValidatorSuppressProps {
  /** Space- or comma-separated list of rule names to suppress. */
  rules: string;
  /** Human-readable reason for the suppression. */
  reason?: string;
}

/**
 * Annotates the nearest suppressible context (current impact or entry)
 * to suppress the named validator rules.
 *
 * Requires `DAH_validator_suppress` to be registered in the context;
 * silently no-ops if absent.
 */
export function ValidatorSuppress(
  props: ValidatorSuppressProps,
): EntryNode & ImpactNode & RelationNode {
  return ((rc: RenderContext) => {
    const suppressExt = rc.context.extensions["DAH_validator_suppress"] as
      | ExtDAH_validator_suppress
      | undefined;
    if (!suppressExt) return;

    const meta = rc.currentImpact?.DAH_meta ?? rc.currentEntry?.DAH_meta;
    assert(
      meta !== undefined,
      "nrsx: <ValidatorSuppress> must be inside an <Entry> or impact element",
    );

    const reason = props.reason ?? "(suppressed via nrsx)";
    for (const rule of props.rules.split(/[\s,]+/).filter(Boolean)) {
      suppressExt.addSuppression(meta, rule, reason);
    }
    // we don't have a helper for this in nrsx, so we will have to cast manually
  }) as EntryNode & ImpactNode & RelationNode;
}
