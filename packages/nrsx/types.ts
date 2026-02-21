/**
 * Branded node types for the nrsx JSX runtime.
 *
 * Each node is a `(rc: RenderContext) => void` closure that, when called,
 * performs the corresponding mutation on the provided `RenderContext`.
 * Brands are type-level only (`unique symbol`) — zero runtime overhead.
 *
 * ## Nesting rules
 *
 * The specific branded types narrow what components *return*, giving
 * precise types at function-call boundaries:
 *   - `buildData` requires `() => DocumentNode`
 *   - `Entry(...)` returns `EntryNode`
 *   - impact components return `ImpactNode`
 *   - relation components return `RelationNode`
 *
 * Due to how TypeScript's JSX transform works, JSX child expressions always
 * widen to `JSX.Element` (= `NrsxNode`). Children props therefore accept
 * `NrsxNode`, and incorrect nesting (e.g. Entry inside Entry) is caught at
 * runtime by assertions in the component bodies.
 */

import type { RenderContext } from "./context";

declare const _document: unique symbol;
declare const _entry: unique symbol;
declare const _impact: unique symbol;
declare const _relation: unique symbol;

/** Returned by `Document(...)`. Only accepted by `buildData`. */
export type DocumentNode = ((rc: RenderContext) => void) & {
  readonly [_document]: true;
};

/** Returned by `Entry(...)`. Valid as a child of `Document`. */
export type EntryNode = ((rc: RenderContext) => void) & {
  readonly [_entry]: true;
};

/** Returned by impact components (Cry, Visual, Writing, …). */
export type ImpactNode = ((rc: RenderContext) => void) & {
  readonly [_impact]: true;
};

/** Returned by relation components (FeatureMusic, Remix, KilledBy). */
export type RelationNode = ((rc: RenderContext) => void) & {
  readonly [_relation]: true;
};

/**
 * Union of all nrsx node types. Used as `JSX.Element` so that the TypeScript
 * JSX transform can type all JSX expressions uniformly.
 */
export type NrsxNode = DocumentNode | EntryNode | ImpactNode | RelationNode;

// ---------------------------------------------------------------------------
// Internal casting helpers — used only by element implementations.
// ---------------------------------------------------------------------------

/** Cast a plain closure to `DocumentNode`. */
export function asDocument(fn: (rc: RenderContext) => void): DocumentNode {
  return fn as DocumentNode;
}

/** Cast a plain closure to `EntryNode`. */
export function asEntry(fn: (rc: RenderContext) => void): EntryNode {
  return fn as EntryNode;
}

/** Cast a plain closure to `ImpactNode`. */
export function asImpact(fn: (rc: RenderContext) => void): ImpactNode {
  return fn as ImpactNode;
}

/** Cast a plain closure to `RelationNode`. */
export function asRelation(fn: (rc: RenderContext) => void): RelationNode {
  return fn as RelationNode;
}

/** Normalise a children prop (undefined | T | T[]) into a flat T[]. */
export function toArray<T>(children: T | T[] | undefined): T[] {
  if (children === undefined) return [];
  return Array.isArray(children) ? children : [children];
}
