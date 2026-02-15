import { describe, it, expect } from "bun:test";
import type { Entry } from "@nrs-org/core";
import { makeEntryMeta } from "@nrs-org/core";
import DAH_entry_bestGirl from "../index";

describe("ext-dah-entry-bestgirl", () => {
  it("constructs and has no dependencies", () => {
    const ext = DAH_entry_bestGirl();
    expect(ext.dependencies?.() ?? []).toEqual([]);
  });

  it("sets and gets best girl on entry DAH_meta", () => {
    const ext = DAH_entry_bestGirl();
    const e: Entry = { id: "e1", DAH_meta: makeEntryMeta() };
    expect(ext.getBestGirl(e.DAH_meta)).toBeUndefined();
    ext.setBestGirl(e.DAH_meta, "Yuno");
    expect(ext.getBestGirl(e.DAH_meta)).toBe("Yuno");
    // ensure value is stored directly on DAH_meta
    expect(e.DAH_meta.DAH_entry_bestGirl).toBe("Yuno");
    ext.setBestGirl(e.DAH_meta, undefined);
    expect(ext.getBestGirl(e.DAH_meta)).toBeUndefined();
    expect(e.DAH_meta).not.toContainKey("DAH_entry_bestGirl");
  });
});
