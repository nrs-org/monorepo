/**
 * @nrs-org/nrsx — JSX/TSX DSL for building NRS data structures.
 *
 * This package is extension-agnostic. It provides the JSX runtime, the
 * `buildData` function, and the structural `Document` and `Entry` components.
 *
 * Impact and relation components live in their respective extension packages:
 * - `@nrs-org/ext-dah-standards` — `Cry`, `Visual`, `Music`, `Writing`, etc.
 * - `@nrs-org/ext-dah-entry-progress` — `AnimeConsumedProgress`
 * - `@nrs-org/ext-dah-validator-suppress` — `ValidatorSuppress`
 *
 * Usage:
 * ```tsx
 * import { buildData } from "@nrs-org/nrsx";
 * import { Document, Entry } from "@nrs-org/nrsx/elements";
 * import { Visual, Cry } from "@nrs-org/ext-dah-standards/nrsx";
 * // tsconfig.json must set: "jsxImportSource": "@nrs-org/nrsx"
 *
 * const data = buildData(ctx, () => (
 *   <Document>
 *     <Entry id="A-MAL-1" title="Appalling Anime">
 *       <Cry emotions="AU" />
 *       <Visual type="animated" base={0.5} unique={0.4} />
 *     </Entry>
 *   </Document>
 * ));
 * ```
 */

import { assert } from "@nrs-org/core";
import type { Context, Data, Id, Entry, Impact, Relation } from "@nrs-org/core";

import type { RenderContext } from "./context";
import type { NrsxNode } from "./types";

/**
 * Evaluate a TSX render function and collect the resulting NRS data.
 *
 * @param context - An NRS processing context with the required extensions.
 * @param fn - A zero-argument function that renders a `<Document>` tree and
 *   returns an `NrsxNode`. The returned closure is executed synchronously
 *   with a freshly created `RenderContext` — no global state is used.
 * @returns A `Data` object containing entries, impacts, and relations.
 */
export function buildData(context: Context, fn: () => NrsxNode): Data {
  assert(
    context !== null && context !== undefined,
    "nrsx: buildData() requires a valid Context",
  );

  const rc: RenderContext = {
    context,
    entries: new Map<Id, Entry>(),
    impacts: [] as Impact[],
    relations: [] as Relation[],
    currentEntry: null,
    currentImpact: null,
  };

  // fn() builds the closure tree (no mutations yet), then we call the
  // returned DocumentNode closure with the render context to execute
  // the full render synchronously.
  fn()(rc);

  return { entries: rc.entries, impacts: rc.impacts, relations: rc.relations };
}

// Re-export node types.
export type {
  DocumentNode,
  EntryNode,
  ImpactNode,
  RelationNode,
  NrsxNode,
} from "./types";

// Re-export casting helpers — needed by extension packages to implement
// their own NRSX components without depending on nrsx internals directly.
export { asImpact, asRelation, asEntry, asDocument } from "./types";

// Re-export RenderContext type — needed by extension component implementations.
export type { RenderContext } from "./context";
