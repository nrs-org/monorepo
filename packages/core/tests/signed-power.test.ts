import { describe, it, expect } from "bun:test";
import { signedPow } from "../src/utils";

describe("signedPow", () => {
  it("should handle positive numbers like regular power", () => {
    expect(signedPow(2, 2)).toBe(4);
    expect(signedPow(3, 3)).toBe(27);
    expect(signedPow(4, 0.5)).toBe(2);
  });

  it("should handle negative numbers with sign preservation", () => {
    expect(signedPow(-2, 2)).toBe(-4);
    expect(signedPow(-3, 3)).toBe(-27);
    expect(signedPow(-4, 0.5)).toBe(-2);
  });

  it("should handle zero", () => {
    expect(signedPow(0, 2)).toBe(0);
    expect(signedPow(0, 0.5)).toBe(0);
  });

  it("should preserve sign symmetry", () => {
    // signedPow(-x, p) should equal -signedPow(x, p)
    expect(signedPow(-5, 2)).toBe(-signedPow(5, 2));
    expect(signedPow(-8, 1 / 3)).toBeCloseTo(-signedPow(8, 1 / 3), 10);
  });

  it("should work with fractional powers", () => {
    // cube root of -8 should be -2
    expect(signedPow(-8, 1 / 3)).toBeCloseTo(-2, 10);
    // square root of -4 should be -2
    expect(signedPow(-4, 0.5)).toBe(-2);
  });

  it("should be invertible with reciprocal powers", () => {
    const value = 5;
    const power = 2.5;
    expect(signedPow(signedPow(value, power), 1 / power)).toBeCloseTo(
      value,
      10,
    );

    const negValue = -5;
    expect(signedPow(signedPow(negValue, power), 1 / power)).toBeCloseTo(
      negValue,
      10,
    );
  });
});
