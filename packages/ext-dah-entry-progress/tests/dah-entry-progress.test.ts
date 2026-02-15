import { describe, it, expect } from "bun:test";
import DAH_entry_progress, {
  type EntryProgressMeta,
  type ProgressUnit,
} from "../index";
import { makeEntryMeta } from "@nrs-org/core";

describe("DAH_entry_progress extension", () => {
  const ext = DAH_entry_progress();

  function makeUnit(
    id: string,
    value: number,
    unit: "seconds" | "minutes" | "hours",
  ): ProgressUnit {
    return {
      id,
      length: { value, unit },
      DAH_meta: {},
    };
  }

  it("set/get/clear round-trip", () => {
    const base = makeEntryMeta();
    const progress: EntryProgressMeta = {
      status: "Consuming",
      unitType: "episode",
      units: [makeUnit("1", 1234, "seconds")],
      DAH_meta: makeEntryMeta(),
    };
    ext.setProgress(base, progress);
    expect(ext.getProgress(base)).toEqual(progress);
    // clear
    ext.setProgress(base, undefined);
    expect(ext.getProgress(base)).toBeUndefined();
  });

  it("calculates total media length in seconds (units)", () => {
    const meta: EntryProgressMeta = {
      status: "Completed",
      unitType: "episode",
      units: [
        makeUnit("a", 60, "seconds"),
        makeUnit("b", 2, "minutes"),
        makeUnit("c", 1.5, "hours"),
      ],
      DAH_meta: makeEntryMeta(),
    };
    expect(ext.getTotalMediaLengthSeconds(meta)).toBe(60 + 120 + 5400);
  });

  it("calculates total media length in seconds (uniform unit length)", () => {
    const meta: EntryProgressMeta = {
      status: "Completed",
      unitType: "track",
      uniformUnitLength: { value: 2.5, unit: "minutes" },
      DAH_meta: makeEntryMeta(),
    };
    // 10 tracks
    expect(ext.getTotalMediaLengthSeconds(meta, 10)).toBe(2.5 * 60 * 10);
  });

  it("returns 0 if no known length", () => {
    const meta: EntryProgressMeta = {
      status: "Paused",
      DAH_meta: makeEntryMeta(),
    };
    expect(ext.getTotalMediaLengthSeconds(meta)).toBe(0);
  });

  it("skips units with invalid/missing length", () => {
    const meta: EntryProgressMeta = {
      status: "Completed",
      unitType: "episode",
      units: [
        // valid
        makeUnit("a", 1, "hours"),
        // @ts-expect-error explicit missing length
        { id: "b", DAH_meta: makeEntryMeta() },
        {
          id: "d",
          // @ts-expect-error malformed unit
          length: { value: 20, unit: "lightyears" },
          DAH_meta: makeEntryMeta(),
        },
      ],
      DAH_meta: makeEntryMeta(),
    };
    expect(ext.getTotalMediaLengthSeconds(meta)).toBe(3600);
  });
});
