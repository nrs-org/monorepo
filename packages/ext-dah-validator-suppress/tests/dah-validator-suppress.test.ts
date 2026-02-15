import { describe, it, expect } from "bun:test";
import DAH_validator_suppress from "../index";
import type { ValidatorSuppression } from "../index";
import { makeEntryMeta } from "@nrs-org/core";

describe("DAH_validator_suppress extension", () => {
  const ext = DAH_validator_suppress();

  it("adds a suppression correctly (empty -> 1)", () => {
    const meta = makeEntryMeta();
    const updated = ext.addSuppression(meta, "FOO_RULE", "For a good reason.");
    const arr = updated.DAH_validator_suppress as ValidatorSuppression[];
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBe(1);
    expect(arr[0]).toEqual({ rule: "FOO_RULE", reason: "For a good reason." });
    // immutability
    expect(meta.DAH_validator_suppress).toBeUndefined();
  });

  it("throws on duplicate rule", () => {
    const meta = makeEntryMeta();
    const m2 = ext.addSuppression(meta, "FOO", "a");
    expect(() => ext.addSuppression(m2, "FOO", "again")).toThrow(/Duplicate/);
  });

  it("throws on blank reason", () => {
    const meta = makeEntryMeta();
    expect(() => ext.addSuppression(meta, "FOO", " ")).toThrow(/reason/);
    expect(() => ext.addSuppression(meta, "FOO", "")).toThrow(/reason/);
  });

  it("throws for legacy suppression (array of string)", () => {
    const meta = makeEntryMeta({
      DAH_validator_suppress: ["FOO"],
    });
    expect(() => ext.addSuppression(meta, "BAR", "invalid legacy")).toThrow(
      /Malformed/,
    );
    expect(() => ext.isRuleSuppressed(meta, "FOO")).toThrow(/Malformed/);
    expect(() => ext.finalizeSuppressions(meta, new Set())).toThrow(
      /Malformed/,
    );
  });

  it("isRuleSuppressed returns correct values, marks used", () => {
    let meta = makeEntryMeta();
    meta = ext.addSuppression(meta, "FOO", "Testing FOO");
    meta = ext.addSuppression(meta, "BAR", "Testing BAR");
    const used = new Set<string>();
    expect(ext.isRuleSuppressed(meta, "FOO", used)).toBe(true);
    expect(ext.isRuleSuppressed(meta, "BAR", used)).toBe(true);
    expect(ext.isRuleSuppressed(meta, "BAZ", used)).toBe(false);
    // Used set should now have "FOO" and "BAR"
    expect(used.has("FOO")).toBe(true);
    expect(used.has("BAR")).toBe(true);
    expect(used.has("BAZ")).toBe(false);
  });

  it("finalizeSuppressions passes if all suppressions used", () => {
    let meta = makeEntryMeta();
    meta = ext.addSuppression(meta, "A", "X");
    meta = ext.addSuppression(meta, "B", "Y");
    const used = new Set(["A", "B"]);
    expect(() => ext.finalizeSuppressions(meta, used)).not.toThrow();
  });

  it("finalizeSuppressions throws if unused", () => {
    let meta = makeEntryMeta();
    meta = ext.addSuppression(meta, "A", "reason");
    meta = ext.addSuppression(meta, "B", "other reason");
    const used = new Set(["A"]);
    expect(() => ext.finalizeSuppressions(meta, used)).toThrow(/unused/);
  });

  it("does nothing if there are no suppressions", () => {
    const meta = makeEntryMeta();
    expect(() => ext.finalizeSuppressions(meta, new Set())).not.toThrow();
  });
});
