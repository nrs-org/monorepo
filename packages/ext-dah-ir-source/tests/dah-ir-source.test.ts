import { describe, it, expect } from "bun:test";
import DAH_ir_source, { type IrSourceMeta } from "../index";
import type { EntryMeta } from "@nrs-org/core";

describe("DAH_ir_source extension", () => {
  const ext = DAH_ir_source();
  const sampleMeta: EntryMeta = {};
  const sampleValue: IrSourceMeta = {
    extension: "DAH_ir_source",
    version: "1.0.0",
    name: "ir_source",
  };

  it("sets the metadata field", () => {
    ext.setIrSource(sampleMeta, sampleValue);
    expect(sampleMeta["DAH_ir_source"]).toEqual(sampleValue);
  });

  it("gets the metadata field (type-safe)", () => {
    ext.setIrSource(sampleMeta, sampleValue);
    const got = ext.getIrSource(sampleMeta);
    expect(got).toEqual(sampleValue);
  });

  it("deletes the metadata field (set undefined)", () => {
    ext.setIrSource(sampleMeta, sampleValue);
    ext.setIrSource(sampleMeta, undefined);
    expect(sampleMeta["DAH_ir_source"]).toBeUndefined();
  });

  it("returns undefined if field is missing or wrong type", () => {
    const badMeta: EntryMeta = { DAH_ir_source: { invalid: true } };
    expect(ext.getIrSource({})).toBeUndefined();
    expect(ext.getIrSource(badMeta)).toBeUndefined();
  });
});
