import {
  type EntryMeta,
  type Extension,
  type HasMeta,
  type Id,
} from "@nrs-org/core";

export type MediaLengthUnit = "seconds" | "minutes" | "hours";

export interface MediaLength {
  value: number;
  unit: MediaLengthUnit;
}

/**
 * Universal status for entry progress tracking. Media-neutral.
 * Maps common terms (Watching/Reading/Playing) to "Consuming", "Plan to X" to "Planned", etc.
 *
 * Old => New
 * - Watching/Reading/Playing => Consuming
 * - Plan to Watch/Read/Play => Planned
 * - Completed => Completed
 * - On Hold => Paused
 * - Dropped => Abandoned
 * - Rewatching/Rereading/Replaying => Reconsuming
 */
export type ProgressStatus =
  | "Consuming"
  | "Planned"
  | "Completed"
  | "Paused"
  | "Abandoned"
  | "Reconsuming";

/**
 * Represents a single unit in a progress-tracked entry.
 * Works for episodes, chapters, tracks, quests, etc.
 */
export interface ProgressUnit extends HasMeta {
  /** Unique ID (string or number, can be non-contiguous for books/games) */
  id: string;
  /** Unit total length */
  length: MediaLength;
  /** NRS ID of the unit, if applicable (e.g. MAL episode ID, chapter ID, etc.) */
  nrsId?: Id;
  /** (Optional) Human-readable title (chapter name, quest name, etc.) */
  title?: string;
  /** (Optional) True if the unit is fully consumed */
  completed?: boolean;

  // (Optional) ISO8601 release datetime
  releasedAt?: string;
  /** (Optional) ISO8601 start timestamp */
  startedAt?: string;
  /** (Optional) ISO8601 end timestamp */
  completedAt?: string;
}

/**
 * Optional grouping of units. Volumes for manga, playlists for music, arcs, etc.
 */
export interface ProgressUnitGroup extends HasMeta {
  groupId: string;
  groupTitle?: string;
  /**
   * Up to consumers to crosslink. Not enforced by schema.
   */
  unitIds?: string[];
}

/**
 * Universal entry progress metadata.
 * All fields except status are optional/consumer-driven; no validation enforced.
 */
export interface EntryProgressMeta extends HasMeta {
  /** Overall engagement status (see ProgressStatus) */
  status: ProgressStatus;

  /** Main unit type for this work (e.g. "episode", "chapter", "track", "quest", ... ) */
  unitType?: string;
  /** Array of progress units (episodes, chapters, tracks, etc.) */
  units?: ProgressUnit[];
  /** (Optional) Uniform unit length for all units, e.g. { value: 24, unit: "minutes" } */
  uniformUnitLength?: MediaLength;
  /** (Optional) Groupings (volumes, playlists, arcs, discs, etc.) */
  groups?: ProgressUnitGroup[];
  /** (Optional) Quick-access for "currently viewing/reading/playing..." unit */
  /** Default to latest unit (fallback order: releasedAt -> ID natural order) */
  currentUnitId?: string;
}

export type DAH_entry_progress = Extension & {
  getProgress(meta: EntryMeta): EntryProgressMeta | undefined;
  setProgress(meta: EntryMeta, value: EntryProgressMeta | undefined): void;
  /**
   * Returns the total media length in seconds for the supplied progress meta.
   * If "units" present, sums their lengths; otherwise if uniformUnitLength is present and count given, totals that.
   * If neither are present, returns 0.
   */
  getTotalMediaLengthSeconds(
    meta: EntryProgressMeta,
    totalUnitCount?: number,
  ): number;
};

export default function DAH_entry_progress(): DAH_entry_progress {
  return {
    name: "DAH_entry_progress",
    dependencies() {
      return ["DAH_meta"];
    },
    /**
     * Get progress metadata for this entry, or undefined if not set
     */
    getProgress(meta: EntryMeta): EntryProgressMeta | undefined {
      return meta.DAH_entry_progress as EntryProgressMeta | undefined;
    },
    /**
     * Set or clear entry progress. If value is undefined, deletes the field.
     */
    setProgress(meta: EntryMeta, value: EntryProgressMeta | undefined) {
      if (value === undefined) {
        delete meta.DAH_entry_progress;
      } else {
        meta.DAH_entry_progress = value;
      }
    },
    /**
     * Calculate the total media length in seconds.
     * If "units" present, sums their lengths; otherwise if uniformUnitLength is present and count given, totals that.
     * If neither are present, returns 0.
     */
    getTotalMediaLengthSeconds(
      meta: EntryProgressMeta,
      totalUnitCount?: number,
    ): number {
      if (meta.units && meta.units.length > 0) {
        return meta.units.reduce((sum, unit) => {
          switch (unit.length.unit) {
            case "seconds":
              return sum + unit.length.value;
            case "minutes":
              return sum + unit.length.value * 60;
            case "hours":
              return sum + unit.length.value * 3600;
          }
        }, 0);
      }
      // Fallback: uniform length for all units, if count known
      if (meta.uniformUnitLength && totalUnitCount !== undefined) {
        const { value, unit } = meta.uniformUnitLength;
        switch (unit) {
          case "seconds":
            return value * totalUnitCount;
          case "minutes":
            return value * 60 * totalUnitCount;
          case "hours":
            return value * 3600 * totalUnitCount;
        }
      }
      // Nothing recognized
      return 0;
    },
  };
}

/**
 * Example usages:
 *
 * // Anime
 * const animeProgress: EntryProgressMeta = {
 *   status: "Completed",
 *   unitType: "episode",
 *   units: [ { id: 1, completed: true, length: { value: 1440, unit: "seconds" } }, ... ],
 *   uniformUnitLength: { value: 1440, unit: "seconds" }
 * };
 *
 * // Manga/book
 * const mangaProgress: EntryProgressMeta = {
 *   status: "Consuming",
 *   unitType: "chapter",
 *   units: [ { id: "Vol1-Ch1", completed: true, length: { value: 20, unit: "minutes" } }, { id: "Vol1-Ch2", completedLength: 15 } ],
 *   groups: [ { groupId: "Vol1", groupTitle: "Volume 1", unitIds: ["Vol1-Ch1", "Vol1-Ch2"] } ]
 * };
 *
 * // Game/Quest
 * const gameProgress: EntryProgressMeta = {
 *   status: "Paused",
 *   unitType: "quest",
 *   units: [ { id: 100, title: "Tutorial", completed: true, length: { value: 45, unit: "minutes" } }, { id: 101 } ]
 * };
 */
