import { describe, it, expect } from "bun:test";
import { indexEntry } from "../src/data";

describe("data utils", () => {
  it("indexEntry makes a map from entries", () => {
    const items = [
      { id: "a", DAH_meta: {} },
      { id: "b", DAH_meta: {} },
    ];
    const m = indexEntry(items as any);
    expect(m.get("a")?.id).toBe("a");
    expect(m.get("b")?.id).toBe("b");
  });
});
