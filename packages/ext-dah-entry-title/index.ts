import { assert, type EntryMeta, type Extension } from "@nrs-org/core";

export interface DAH_entry_title extends Extension {
  setTitle(meta: EntryMeta, title: string | undefined): void;
  getTitle(meta: EntryMeta): string | undefined;
}

export default function DAH_entry_title(): DAH_entry_title {
  return {
    name: "DAH_entry_title",
    dependencies(): string[] {
      return ["DAH_meta"];
    },
    setTitle(meta: EntryMeta, title: string | undefined): void {
      if (title === undefined) {
        delete meta.DAH_entry_title;
      } else {
        meta.DAH_entry_title = title;
      }
    },

    getTitle(meta: EntryMeta): string | undefined {
      const title = meta.DAH_entry_title;
      assert(typeof title === "string" || title === undefined);
      return title;
    },
  };
}
