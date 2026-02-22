/**
 * nrsx core component functions.
 *
 * This file contains only the extension-agnostic structural components:
 * `Document` and `Entry`. Impact and relation components live in the
 * extension packages that produce them (e.g. `@nrs-org/ext-dah-standards`).
 *
 * Each function is a JSX component (PascalCase) that returns a branded
 * `(rc: RenderContext) => void` closure. The closure captures the props and,
 * when called by its parent container (`Document` or `Entry`) with the active
 * `RenderContext`, mutates that context. Nothing is executed at JSX call time —
 * only closures are built, preserving correct evaluation order without
 * user-visible thunks. No global state is used.
 */

import { assert, makeEntryMeta } from "@nrs-org/core";
import type { Entry } from "@nrs-org/core";

import type { Context } from "@nrs-org/core";

import {
  asDocument,
  asEntry,
  toArray,
  type NrsxNode,
  type DocumentNode,
  type EntryNode,
} from "./types";

// ---------------------------------------------------------------------------
// Document
// ---------------------------------------------------------------------------

export interface DocumentProps {
  /** The NRS processing context (carries extensions). */
  context: Context;
  /** Top-level nodes: entries, standalone impacts, or relations. */
  children?: NrsxNode | NrsxNode[];
}

/**
 * Root container component. Accepts any top-level `DocumentChildNode`
 * children (entries, impacts, relations). Pass to `buildData` as the
 * return value of the render function.
 */
export function Document(props: DocumentProps): DocumentNode {
  return asDocument((rc) => {
    for (const child of toArray(props.children)) child(rc);
  });
}

// ---------------------------------------------------------------------------
// Entry
// ---------------------------------------------------------------------------

export interface EntryProps {
  id: string;
  /**
   * @deprecated Use `<EntryTitle />` from `@nrs-org/ext-dah-entry-title` instead.
   * Kept for backward-compatibility — requires `DAH_entry_title` extension to be
   * registered in the context, silently no-ops if absent.
   */
  title?: string;
  /**
   * @deprecated Use `<EntryType />` from `@nrs-org/ext-dah-entry-type` instead.
   * Kept for backward-compatibility — requires `DAH_entry_type` extension to be
   * registered in the context, silently no-ops if absent.
   */
  entrytype?: string;
  /** Impact and relation nodes that belong to this entry. */
  children?: NrsxNode | NrsxNode[];
}

/**
 * Defines an NRS entry (anime, music track, etc.) and scopes its impact
 * and relation children. Children closures are called after `currentEntry`
 * is set on the render context, so all child components can reference it.
 *
 * The `title` and `entrytype` props are soft-coupled to `DAH_entry_title` and
 * `DAH_entry_type` extensions respectively — they are no-ops when those
 * extensions are absent. Prefer using `<EntryTitle />` and `<EntryType />`
 * child components from the respective extension packages instead.
 */
export function Entry(props: EntryProps): EntryNode {
  return asEntry((rc) => {
    assert(rc.currentEntry === null, "nrsx: <Entry> elements cannot be nested");

    const entry: Entry = {
      id: props.id,
      DAH_meta: makeEntryMeta(),
    };

    rc.currentEntry = entry;

    // Soft-coupled backward-compat: set title via extension if available.
    if (props.title !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const titleExt = rc.context.extensions["DAH_entry_title"] as any;
      if (titleExt) {
        titleExt.setTitle(entry.DAH_meta, props.title);
      }
    }

    // Soft-coupled backward-compat: set entry type via extension if available.
    if (props.entrytype !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const typeExt = rc.context.extensions["DAH_entry_type"] as any;
      if (typeExt) {
        typeExt.setType(entry.DAH_meta, props.entrytype);
      }
    }

    // Call each child closure now that currentEntry is set.
    for (const child of toArray(props.children)) child(rc);

    rc.entries.set(entry.id, entry);
    rc.currentEntry = null;
  });
}
