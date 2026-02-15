import { assert, type EntryMeta, type Extension } from "@nrs-org/core";

export interface DAH_entry_bestGirl extends Extension {
  setBestGirl(meta: EntryMeta, name: string | undefined): void;
  getBestGirl(meta: EntryMeta): string | undefined;
}

export default function DAH_entry_bestGirl(): DAH_entry_bestGirl {
  return {
    name: "DAH_entry_bestGirl",
    dependencies(): string[] {
      return ["DAH_meta"];
    },
    setBestGirl(meta: EntryMeta, name: string | undefined): void {
      if (name === undefined) {
        delete meta.DAH_entry_bestGirl;
      } else {
        meta.DAH_entry_bestGirl = name;
      }
    },

    getBestGirl(meta: EntryMeta): string | undefined {
      const name = meta.DAH_entry_bestGirl;
      assert(typeof name === "string" || name === undefined);
      return name;
    },
  };
}
