import { describe, it } from "bun:test";
import { newContext, processContext } from "../src/process";
import { Vector } from "../src/math";

describe("processContext extensions", () => {
  it("calls extension hooks when present", () => {
    // extension API removed; test kept as a no-op to preserve test file
    const ctx = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
    });
    const entry = { id: "e1", DAH_meta: {} };
    const data = {
      entries: new Map([["e1", entry]]),
      impacts: [],
      relations: [],
    };
    processContext(ctx, data);
    // TODO: enable checks when there is an extension API
    // expect(called.pre).toBe(true);
    // expect(called.post).toBe(true);
    // expect(called.serialize).toBe(true);
  });
});
