import { describe, it, expect } from "bun:test";
import DAH_serialize from "../index";

describe("ext-dah-serialize", () => {
  it("constructs with name DAH_serialize", () => {
    const ext = DAH_serialize();
    expect(ext.name).toBe("DAH_serialize");
  });

  it("dependencies check", () => {
    const ext = DAH_serialize();
    expect(ext.dependencies()).toEqual(["DAH_entry_id"]);
  });
});
