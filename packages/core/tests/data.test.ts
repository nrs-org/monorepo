import { describe, it, expect } from "bun:test";
import { indexEntry } from "../src/data";
import { makeEntryMeta } from "../src/meta-helpers";

describe("data utils", () => {
  it("indexEntry makes a map from entries", () => {
    const items = [
      { id: "a", DAH_meta: makeEntryMeta() },
      { id: "b", DAH_meta: makeEntryMeta() },
    ];
    const m = indexEntry(items);
    expect(m.get("a")?.id).toBe("a");
    expect(m.get("b")?.id).toBe("b");
  });
});
