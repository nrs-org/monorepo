import { describe, it, expect } from "bun:test";
import DAH_entry_contains from "../index";
import { identityMatrix, newContext, Vector } from "@nrs-org/core";
import DAH_ir_source from "@nrs-org/ext-dah-ir-source";

describe("ext-dah-entry-contains", () => {
  it("constructs and has no dependencies", () => {
    const ext = DAH_entry_contains();
    expect(ext.dependencies?.() ?? []).toEqual(["DAH_meta"]);
  });

  it("produces a relation and injects DAH_ir_source if extension is enabled", async () => {
    const ext = DAH_entry_contains();
    const irSourceExt = DAH_ir_source();
    const contribs = new Map([["c1", identityMatrix]]);
    const ctx = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
      extensions: [ext, irSourceExt],
    });
    const rel = ext.entryContains(ctx, contribs, "child1");
    expect(rel.contributors).toBe(contribs);
    expect(rel.references.has("child1")).toBe(true);
    expect(rel.references.get("child1")).toBe(identityMatrix);
    expect(rel.DAH_meta.DAH_ir_source).toBeDefined();
    const src = rel.DAH_meta.DAH_ir_source as Record<string, string>;
    expect(typeof src.extension).toBe("string");
    expect(src.extension).toBe("DAH_entry_contains");
    expect(src.name).toBe("entry_contains");
    expect(src.version).toBe("1.0.0");
  });

  it("does not inject DAH_ir_source if extension not enabled", async () => {
    const ext = DAH_entry_contains();
    const contribs = new Map([["c1", identityMatrix]]);
    const ctx = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
      extensions: [ext],
    });
    const rel = ext.entryContains(ctx, contribs, "child1");
    expect(rel.contributors).toBe(contribs);
    expect(rel.references.has("child1")).toBe(true);
    expect(rel.references.get("child1")).toBe(identityMatrix);
    expect(rel.DAH_meta.DAH_ir_source).toBeUndefined();
  });
});
