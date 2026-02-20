import { type EntryMeta } from "@nrs-org/core";

export default function DAH_entry_title() {
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
      return meta.DAH_entry_title as string | undefined;
    },
  };
}

export type ExtDAH_entry_title = ReturnType<typeof DAH_entry_title>;
