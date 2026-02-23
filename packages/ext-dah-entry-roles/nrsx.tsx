/**
 * NRSX components for `@nrs-org/ext-dah-entry-roles`.
 *
 * Provides:
 * - `Role` — adds a contributor role to the current entry/impact/relation.
 * - `Musicvar` — overrides MusicVars (score weighting variables) for the
 *   current entry's roles calculation.
 *
 * Usage:
 * ```tsx
 * import { Role, Musicvar } from "@nrs-org/ext-dah-entry-roles/nrsx";
 * ```
 */

import { assert } from "@nrs-org/core";

import type { MusicVars, EntryRoles, ExtDAH_entry_roles } from "./index.ts";

import { asImpact, type ImpactNode, type RenderContext } from "@nrs-org/nrsx";

// ---------------------------------------------------------------------------
// Role component
// ---------------------------------------------------------------------------

export interface RoleProps {
  /** ID of the contributor entry being attributed. */
  id: string;
  /**
   * Role expression string — one or more role types joined by `+`,
   * with optional `*factor` or `/factor` modifiers.
   * Examples: `"vocal"`, `"compose+arrange"`, `"vocal*0.5"`.
   */
  roles: string;
}

/**
 * Attributes one or more roles to an entry/impact/relation contributor.
 *
 * Must be used inside an `<Entry>` (or on an impact/relation component that
 * supports role attribution). Requires `DAH_entry_roles` in the context.
 */
export function Role(props: RoleProps): ImpactNode {
  return asImpact((rc: RenderContext) => {
    assert(rc.currentEntry !== null, "nrsx: <Role> must be inside an <Entry>");

    const ext = rc.context.extensions["DAH_entry_roles"] as
      | ExtDAH_entry_roles
      | undefined;
    if (!ext) return;

    const parsedRoles = ext.parseRoleExpressionString(props.roles);
    ext.addRole(rc.currentEntry, props.id, parsedRoles);
  });
}

// ---------------------------------------------------------------------------
// Musicvar component
// ---------------------------------------------------------------------------

export interface MusicvarProps {
  /** Vocal vs. lyrics weight (default: 0.5) */
  vocallyrics?: number;
  /** Lyrics vs. music weight (default: 0.1) */
  lyricsmusic?: number;
  /** Emotional lyrics weight (default: 0.2) */
  emolyrics?: number;
  /** Arrangement weight (default: 0.5) */
  arrange?: number;
  /** Instrumental performance weight (default: 1/3) */
  instperform?: number;
  /**
   * Whether this entry is a "feat." (featured artist) track.
   * Affects the image weight (default: false, or inferred from title).
   */
  feat?: boolean;
}

/**
 * Overrides MusicVars (score-weighting variables) for the current entry's
 * role calculation. Only the specified fields are overridden; others retain
 * their defaults.
 *
 * Must be used inside an `<Entry>`. Requires `DAH_entry_roles` in the context.
 */
export function Musicvar(props: MusicvarProps): ImpactNode {
  return asImpact((rc: RenderContext) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Musicvar> must be inside an <Entry>",
    );

    // DAH_entry_roles may not be registered — silently no-op if absent.
    const ext = rc.context.extensions["DAH_entry_roles"] as
      | ExtDAH_entry_roles
      | undefined;
    if (!ext) return;

    // Retrieve or initialise the EntryRoles metadata bag.
    const meta = rc.currentEntry.DAH_meta as Record<string, unknown>;
    let entryRoles = meta["DAH_entry_roles"] as EntryRoles<string> | undefined;
    if (entryRoles === undefined) {
      entryRoles = { roles: {} };
      meta["DAH_entry_roles"] = entryRoles;
    }

    // Merge in the provided overrides.
    const overrides: MusicVars = {};
    if (props.vocallyrics !== undefined)
      overrides.vocallyrics = props.vocallyrics;
    if (props.lyricsmusic !== undefined)
      overrides.lyricsmusic = props.lyricsmusic;
    if (props.emolyrics !== undefined) overrides.emolyrics = props.emolyrics;
    if (props.arrange !== undefined) overrides.arrange = props.arrange;
    if (props.instperform !== undefined)
      overrides.instperform = props.instperform;
    if (props.feat !== undefined) overrides.feat = props.feat;

    entryRoles.musicVars = { ...entryRoles.musicVars, ...overrides };
  });
}
