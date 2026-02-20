import { describe, it, expect } from "bun:test";
import { signedPow, combinePow } from "../src/utils";

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

describe("combinePow", () => {
  it("should combine positive numbers correctly", () => {
    const result = combinePow([2, 3], 2);
    // With factor 2: (2^0.5 + 3^0.5)^2 = (sqrt(2) + sqrt(3))^2
    const expected = Math.pow(Math.sqrt(2) + Math.sqrt(3), 2);
    expect(result).toBeCloseTo(expected, 10);
  });

  it("should combine negative numbers using signed power", () => {
    const result = combinePow([-2, -3], 2);
    // With signed power: (signedPow(-2, 0.5) + signedPow(-3, 0.5))^2
    // = (-sqrt(2) + -sqrt(3))^2 = -(sqrt(2) + sqrt(3))^2
    const expected = -Math.pow(Math.sqrt(2) + Math.sqrt(3), 2);
    expect(result).toBeCloseTo(expected, 10);
  });

  it("should combine mixed-sign numbers correctly", () => {
    const result = combinePow([4, -1], 2);
    // signedPow(4, 0.5) + signedPow(-1, 0.5) = 2 + (-1) = 1
    // signedPow(1, 2) = 1
    expect(result).toBeCloseTo(1, 10);
  });

  it("should handle factor close to zero (max behavior)", () => {
    const result = combinePow([5, -10, 3], 1e-5);
    // Should return the value with largest absolute value with its sign
    expect(result).toBe(-10);
  });

  it("should handle zero values", () => {
    const result = combinePow([0, 2, 0], 2);
    expect(result).toBeCloseTo(2, 10);
  });

  it("should be associative with signed power", () => {
    // Test that order doesn't matter for the result
    const a = combinePow([2, -3, 1], 2);
    const b = combinePow([-3, 2, 1], 2);
    expect(a).toBeCloseTo(b, 10);
  });
});
