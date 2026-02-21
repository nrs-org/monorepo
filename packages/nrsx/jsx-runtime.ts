/**
 * JSX runtime for `@nrs-org/nrsx`.
 *
 * This file is the target of the `jsxImportSource` directive in tsconfig.json.
 * TypeScript/Bun imports `@nrs-org/nrsx/jsx-runtime` automatically when
 * processing `.tsx` files that use `jsxImportSource: "@nrs-org/nrsx"`.
 *
 * Design: every JSX element must be a **function component** (PascalCase).
 * Intrinsic string tags are intentionally unsupported — writing a lowercase
 * tag produces a TypeScript error via the empty `IntrinsicElements` interface.
 *
 * Each component function returns a branded `() => void` closure. Closures
 * are deferred: they only mutate the render context when called by their
 * parent container (`Document` or `Entry`). This eliminates the need for
 * user-visible thunks around entry children.
 */

import type { NrsxNode } from "./types";

// Re-export node types so consumers can import them from the runtime path.
export type {
  DocumentNode,
  EntryNode,
  ImpactNode,
  RelationNode,
  NrsxNode,
} from "./types";

// ---------------------------------------------------------------------------
// JSX element type
// ---------------------------------------------------------------------------

/** Union of all valid return types from nrsx component functions. */
export type JSXElement = NrsxNode;

// ---------------------------------------------------------------------------
// JSX factory
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = any;

/**
 * Called by the TypeScript/Bun JSX transform for every JSX element.
 *
 * Only function components are supported. Passing a string tag (lowercase
 * intrinsic element) throws at runtime and is a TypeScript error at
 * compile time via the empty `IntrinsicElements` interface below.
 */
export function jsx(
  tag: ((props: AnyProps) => JSXElement) | string | symbol,
  props: AnyProps,
): JSXElement {
  if (typeof tag === "function") {
    return tag(props);
  }
  throw new Error(
    `nrsx: intrinsic elements are not supported — use component functions (e.g. <Entry> not <entry>). Got: <${String(tag)}>`,
  );
}

/** Alias — same as `jsx`, used by the transform for multi-child elements. */
export const jsxs = jsx;

/** Dev-mode alias — same as `jsx`. */
export const jsxDEV = jsx;

// ---------------------------------------------------------------------------
// Global JSX namespace
// ---------------------------------------------------------------------------

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    /** The return type of all nrsx component functions. */
    type Element = JSXElement;

    /** Tells TypeScript which prop holds children. */
    interface ElementChildrenAttribute {
      children: unknown;
    }

    /**
     * Intentionally empty — nrsx has no intrinsic string elements.
     * Any lowercase tag will produce a TypeScript compile error:
     *   "Property 'foo' does not exist on type 'IntrinsicElements'"
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements {}
  }
}
