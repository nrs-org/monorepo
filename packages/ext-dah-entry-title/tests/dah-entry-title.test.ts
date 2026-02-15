import { describe, it, expect } from "bun:test";
import type { Entry } from "@nrs-org/core";
import { makeEntryMeta } from "@nrs-org/core";
import DAH_entry_title from "../index";

describe("ext-dah-entry-title", () => {
  it("constructs and has no dependencies", () => {
    const ext = DAH_entry_title();
    expect(ext.dependencies?.() ?? []).toEqual(["DAH_meta"]);
  });

  it("sets and gets title on entry DAH_meta", () => {
    const ext = DAH_entry_title();
    const e: Entry = { id: "e1", DAH_meta: makeEntryMeta() };
    expect(ext.getTitle(e.DAH_meta)).toBeUndefined();
    ext.setTitle(e.DAH_meta, "My Nice Title");
    expect(ext.getTitle(e.DAH_meta)).toBe("My Nice Title");
    // ensure value is stored directly on DAH_meta
    expect(e.DAH_meta.DAH_entry_title).toBe("My Nice Title");
    ext.setTitle(e.DAH_meta, undefined);
    expect(ext.getTitle(e.DAH_meta)).toBeUndefined();
    expect(e.DAH_meta).not.toContainKey("DAH_entry_title");
  });
});
