import { describe, it, expect } from "bun:test";
import type { Entry } from "@nrs-org/core";
import { makeEntryMeta } from "@nrs-org/core";
import DAH_entry_type, { StandardEntryType } from "../index";

describe("ext-dah-entry-type", () => {
  it("constructs and has no dependencies", () => {
    const ext = DAH_entry_type();
    expect(ext.dependencies?.() ?? []).toEqual([]);
  });

  it("sets and gets type on entry DAH_meta", () => {
    const ext = DAH_entry_type();
    const e: Entry = { id: "e1", DAH_meta: makeEntryMeta() };
    expect(ext.getType(e.DAH_meta)).toBeUndefined();
    ext.setType(e.DAH_meta, StandardEntryType.Anime);
    expect(ext.getType(e.DAH_meta)).toBe(StandardEntryType.Anime);
    // ensure value is stored directly on DAH_meta
    expect(e.DAH_meta.DAH_entry_type).toBe(StandardEntryType.Anime);
    ext.setType(e.DAH_meta, undefined);
    expect(ext.getType(e.DAH_meta)).toBeUndefined();
    expect(e.DAH_meta).not.toContainKey("DAH_entry_type");
  });

  it("works with NonStandardEntryType", () => {
    const ext = DAH_entry_type();
    const e: Entry = { id: "e2", DAH_meta: makeEntryMeta() };
    ext.setType(e.DAH_meta, "Other:TestType");
    expect(ext.getType(e.DAH_meta)).toBe("Other:TestType");
  });
});
