import { describe, it, expect } from "bun:test";
import DAH_validator_suppress from "../index";
import type { ValidatorSuppression } from "../index";
import { makeEntryMeta } from "@nrs-org/core";

describe("DAH_validator_suppress extension", () => {
  const ext = DAH_validator_suppress();

  it("adds a suppression correctly (empty -> 1)", () => {
    const meta = makeEntryMeta();
    ext.addSuppression(meta, "FOO_RULE", "For a good reason.");
    const arr = meta.DAH_validator_suppress as ValidatorSuppression[];
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBe(1);
    expect(arr[0]).toEqual({ rule: "FOO_RULE", reason: "For a good reason." });
  });

  it("mutates the meta object in place", () => {
    const meta = makeEntryMeta();
    ext.addSuppression(meta, "A", "reason A");
    expect(meta.DAH_validator_suppress).toBeDefined();
    ext.addSuppression(meta, "B", "reason B");
    const arr = meta.DAH_validator_suppress as ValidatorSuppression[];
    expect(arr.length).toBe(2);
    expect(arr[0]).toEqual({ rule: "A", reason: "reason A" });
    expect(arr[1]).toEqual({ rule: "B", reason: "reason B" });
  });

  it("throws on duplicate rule", () => {
    const meta = makeEntryMeta();
    ext.addSuppression(meta, "FOO", "a");
    expect(() => ext.addSuppression(meta, "FOO", "again")).toThrow(/Duplicate/);
  });

  it("throws on blank reason", () => {
    const meta = makeEntryMeta();
    expect(() => ext.addSuppression(meta, "FOO", " ")).toThrow(/reason/);
    expect(() => ext.addSuppression(meta, "FOO", "")).toThrow(/reason/);
  });

  it("isRuleSuppressed returns correct values, marks used", () => {
    const meta = makeEntryMeta();
    ext.addSuppression(meta, "FOO", "Testing FOO");
    ext.addSuppression(meta, "BAR", "Testing BAR");
    const used = new Set<string>();
    expect(ext.isRuleSuppressed(meta, "FOO", used)).toBe(true);
    expect(ext.isRuleSuppressed(meta, "BAR", used)).toBe(true);
    expect(ext.isRuleSuppressed(meta, "BAZ", used)).toBe(false);
    expect(used.has("FOO")).toBe(true);
    expect(used.has("BAR")).toBe(true);
    expect(used.has("BAZ")).toBe(false);
  });

  it("finalizeSuppressions passes if all suppressions used", () => {
    const meta = makeEntryMeta();
    ext.addSuppression(meta, "A", "X");
    ext.addSuppression(meta, "B", "Y");
    const used = new Set(["A", "B"]);
    expect(() => ext.finalizeSuppressions(meta, used)).not.toThrow();
  });

  it("finalizeSuppressions throws if unused", () => {
    const meta = makeEntryMeta();
    ext.addSuppression(meta, "A", "reason");
    ext.addSuppression(meta, "B", "other reason");
    const used = new Set(["A"]);
    expect(() => ext.finalizeSuppressions(meta, used)).toThrow(/unused/);
  });

  it("does nothing if there are no suppressions", () => {
    const meta = makeEntryMeta();
    expect(() => ext.finalizeSuppressions(meta, new Set())).not.toThrow();
  });
});
