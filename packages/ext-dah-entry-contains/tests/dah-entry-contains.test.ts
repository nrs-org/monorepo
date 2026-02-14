import { describe, it, expect } from "bun:test";
import DAH_entry_contains from "../index";
import { identityMatrix, newContext } from "@nrs-org/core";

describe("ext-dah-entry-contains", () => {
  it("constructs and has no dependencies", () => {
    const ext = DAH_entry_contains();
    expect(ext.dependencies?.() ?? []).toEqual([]);
  });

  it("produces a relation with contributors and identity reference", () => {
    const ext = DAH_entry_contains();
    const contribs = new Map([["c1", identityMatrix]]);
    const ctx = newContext({ extensions: [ext] });
    const rel = ext.entryContains(ctx, contribs, "child1");
    expect(rel.contributors).toBe(contribs);
    expect(rel.references.has("child1")).toBe(true);
    expect(rel.references.get("child1")).toBe(identityMatrix);
    // @ts-expect-error - casting would make this more complicated then necessary
    expect(rel.DAH_meta.DAH_ir_source.extension).toBe("DAH_entry_contains");
    // @ts-expect-error - casting would make this more complicated then necessary
    expect(rel.DAH_meta.DAH_ir_source.name).toBe("entry_contains");
  });
});
