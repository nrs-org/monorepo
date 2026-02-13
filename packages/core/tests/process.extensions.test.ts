import { describe, it, expect } from "bun:test";
import { newContext, processContext } from "../src/process";
import { Vector } from "../src/math";

describe("processContext extensions", () => {
  it("calls extension hooks when present", () => {
    const called = { pre: false, post: false, serialize: false };
    const mockExts = {
      DAH_entry_roles: {
        preprocessData: (_ctx: any, _data: any) => {
          called.pre = true;
        },
      },
      DAH_overall_score: {
        postProcess: (_ctx: any, _results: any) => {
          called.post = true;
        },
      },
      DAH_serialize_json: {
        serialize: (_d: any, _r: any) => {
          called.serialize = true;
        },
      },
    };
    const ctx = newContext({
      extensions: mockExts,
      factorScoreCombineWeight: new Vector([1, 1]),
    });
    const entry = { id: "e1", DAH_meta: {} };
    const data = {
      entries: new Map([["e1", entry]]),
      impacts: [],
      relations: [],
    };
    processContext(ctx, data as any);
    expect(called.pre).toBe(true);
    expect(called.post).toBe(true);
    expect(called.serialize).toBe(true);
  });
});
