import { type EntryMeta, type Extension } from "@nrs-org/core";

export type ProgressStatus =
  | "Completed"
  | "Watching"
  | "Dropped"
  | "On-hold"
  | "Unwatched";

export interface EntryProgressMeta {
  status: ProgressStatus;
  length_seconds?: number;
  episode?: number;
}

export type DAH_entry_progress = Extension & {
  getProgress(meta: EntryMeta): EntryProgressMeta | undefined;
  setProgress(meta: EntryMeta, value: EntryProgressMeta | undefined): void;
};

export default function DAH_entry_progress(): DAH_entry_progress {
  return {
    name: "DAH_entry_progress",
    dependencies() {
      return ["DAH_meta"];
    },
    // Get the entry progress object or undefined
    getProgress(meta: EntryMeta): EntryProgressMeta | undefined {
      return meta.DAH_entry_progress as EntryProgressMeta | undefined;
    },
    /**
     * Set (or clear) entry progress. Returns a new EntryMeta. If value is undefined, deletes the key.
     */
    setProgress(meta: EntryMeta, value: EntryProgressMeta | undefined) {
      if (value === undefined) {
        delete meta.DAH_entry_progress;
      } else {
        meta.DAH_entry_progress = value;
      }
    },
  };
}
