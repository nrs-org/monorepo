import { describe, it, expect } from "bun:test";
import DAH_entry_progress, { type EntryProgressMeta } from "../index";
import { makeEntryMeta } from "@nrs-org/core";

describe("DAH_entry_progress extension (no validation)", () => {
  const ext = DAH_entry_progress();

  it("set/get/clear round-trip", () => {
    const base = makeEntryMeta();
    const progress: EntryProgressMeta = {
      status: "Watching",
      length_seconds: 1234,
    };
    ext.setProgress(base, progress);
    expect(ext.getProgress(base)).toEqual(progress);
    // clear
    ext.setProgress(base, undefined);
    expect(ext.getProgress(base)).toBeUndefined();
  });
});
