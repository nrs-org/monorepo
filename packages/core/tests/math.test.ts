import { describe, it, expect } from "bun:test";
import {
  Vector,
  ScalarMatrix,
  RegularMatrix,
  DiagonalMatrix,
  identityMatrix,
} from "../src/math";

describe("math primitives", () => {
  it("vector add and mul", () => {
    const a = new Vector([1, 2]);
    const b = new Vector([3, 4]);
    a.add(b);
    expect(a.data).toEqual([4, 6]);
    const c = a.mul(0.5);
    expect(c.data).toEqual([2, 3]);
  });

  it("scalar matrix matvec and regular multiply", () => {
    const v = new Vector([2, 3]);
    const s = new ScalarMatrix(2);
    const sv = s.matvecmul(v);
    expect(sv.data).toEqual([4, 6]);

    const r = new RegularMatrix([1, 0, 0, 1]); // 2x2 identity
    const rv = r.matvecmul(v);
    expect(rv.data).toEqual([2, 3]);

    const d = new DiagonalMatrix([2, 3]);
    const dv = d.matvecmul(v);
    expect(dv.data).toEqual([4, 9]);
  });
});

describe("Vector", () => {
  it("should create a copy", () => {
    const v = new Vector([1, 2, 3]);
    const copy = v.copy();
    expect(copy.data).toEqual([1, 2, 3]);
    expect(copy).not.toBe(v);
    copy.data[0] = 99;
    expect(v.data[0]).toBe(1);
  });

  it("should get value at index", () => {
    const v = new Vector([1, 2, 3]);
    expect(v.get(0)).toBe(1);
    expect(v.get(1)).toBe(2);
    expect(v.get(2)).toBe(3);
  });

  it("should throw error for out of bounds index", () => {
    const v = new Vector([1, 2, 3]);
    expect(() => v.get(3)).toThrow("index out of bounds");
    expect(() => v.get(-1)).toThrow("index out of bounds");
  });

  it("should throw error for dimension mismatch in add", () => {
    const a = new Vector([1, 2]);
    const b = new Vector([1, 2, 3]);
    expect(() => a.add(b)).toThrow("dimension mismatch");
  });

  it("should serialize to JSON", () => {
    const v = new Vector([1, 2, 3]);
    expect(v.toJSON()).toEqual([1, 2, 3]);
  });

  it("should multiply by scalar", () => {
    const v = new Vector([2, 3, 4]);
    const result = v.mul(2);
    expect(result.data).toEqual([4, 6, 8]);
    expect(result).not.toBe(v);
  });
});

describe("ScalarMatrix", () => {
  it("should create a copy", () => {
    const m = new ScalarMatrix(5);
    const copy = m.copy();
    expect(copy.data).toBe(5);
    expect(copy).not.toBe(m);
  });

  it("should get diagonal and off-diagonal values", () => {
    const m = new ScalarMatrix(3);
    expect(m.get(0, 0)).toBe(3);
    expect(m.get(1, 1)).toBe(3);
    expect(m.get(2, 2)).toBe(3);
    expect(m.get(0, 1)).toBe(0);
    expect(m.get(1, 0)).toBe(0);
  });

  it("should add ScalarMatrix", () => {
    const a = new ScalarMatrix(2);
    const b = new ScalarMatrix(3);
    const result = a.add(b);
    expect(result).toBeInstanceOf(ScalarMatrix);
    expect((result as ScalarMatrix).data).toBe(5);
  });

  it("should add DiagonalMatrix", () => {
    const s = new ScalarMatrix(2);
    const d = new DiagonalMatrix([1, 2, 3]);
    const result = s.add(d);
    expect(result).toBeInstanceOf(DiagonalMatrix);
    expect((result as DiagonalMatrix).data).toEqual([3, 4, 5]);
  });

  it("should multiply vector", () => {
    const m = new ScalarMatrix(3);
    const v = new Vector([2, 4]);
    const result = m.mul(v);
    expect(result).toBeInstanceOf(Vector);
    expect(result.data).toEqual([6, 12]);
  });

  it("should multiply ScalarMatrix", () => {
    const a = new ScalarMatrix(2);
    const b = new ScalarMatrix(3);
    const result = a.mul(b);
    expect(result).toBeInstanceOf(ScalarMatrix);
    expect((result as ScalarMatrix).data).toBe(6);
  });

  it("should multiply DiagonalMatrix", () => {
    const s = new ScalarMatrix(2);
    const d = new DiagonalMatrix([1, 2, 3]);
    const result = s.mul(d);
    expect(result).toBeInstanceOf(DiagonalMatrix);
    expect((result as DiagonalMatrix).data).toEqual([2, 4, 6]);
  });

  it("should multiply RegularMatrix", () => {
    const s = new ScalarMatrix(2);
    const r = new RegularMatrix([1, 2, 3, 4]); // 2x2 matrix
    const result = s.mul(r);
    expect(result).toBeInstanceOf(RegularMatrix);
    expect((result as RegularMatrix).data).toEqual([2, 4, 6, 8]);
  });

  it("should scale", () => {
    const m = new ScalarMatrix(3);
    const result = m.scale(2);
    expect(result).toBeInstanceOf(ScalarMatrix);
    expect(result.data).toBe(6);
  });

  it("should clamp to [0, 1]", () => {
    const m = new ScalarMatrix(1.5);
    m.clamp01();
    expect(m.data).toBe(1.0);

    const m2 = new ScalarMatrix(0.5);
    m2.clamp01();
    expect(m2.data).toBe(0.5);
  });

  it("should serialize to JSON", () => {
    const m = new ScalarMatrix(5);
    expect(m.toJSON()).toBe(5);
  });

  it("should work as identity matrix", () => {
    expect(identityMatrix).toBeInstanceOf(ScalarMatrix);
    expect(identityMatrix.data).toBe(1.0);
  });
});

describe("DiagonalMatrix", () => {
  it("should create a copy", () => {
    const m = new DiagonalMatrix([1, 2, 3]);
    const copy = m.copy();
    expect(copy.data).toEqual([1, 2, 3]);
    expect(copy).not.toBe(m);
    copy.data[0] = 99;
    expect(m.data[0]).toBe(1);
  });

  it("should get diagonal and off-diagonal values", () => {
    const m = new DiagonalMatrix([1, 2, 3]);
    expect(m.get(0, 0)).toBe(1);
    expect(m.get(1, 1)).toBe(2);
    expect(m.get(2, 2)).toBe(3);
    expect(m.get(0, 1)).toBe(0);
    expect(m.get(1, 0)).toBe(0);
    expect(m.get(0, 2)).toBe(0);
  });

  it("should get diagonal value using getDiagonal", () => {
    const m = new DiagonalMatrix([1, 2, 3]);
    expect(m.getDiagonal(0)).toBe(1);
    expect(m.getDiagonal(1)).toBe(2);
    expect(m.getDiagonal(2)).toBe(3);
  });

  it("should throw error for out of bounds diagonal access", () => {
    const m = new DiagonalMatrix([1, 2, 3]);
    expect(() => m.getDiagonal(3)).toThrow("index out of bounds");
    expect(() => m.get(3, 3)).toThrow("index out of bounds");
  });

  it("should add ScalarMatrix", () => {
    const d = new DiagonalMatrix([1, 2, 3]);
    const s = new ScalarMatrix(5);
    const result = d.add(s);
    expect(result).toBeInstanceOf(DiagonalMatrix);
    expect((result as DiagonalMatrix).data).toEqual([6, 7, 8]);
  });

  it("should add DiagonalMatrix", () => {
    const a = new DiagonalMatrix([1, 2, 3]);
    const b = new DiagonalMatrix([4, 5, 6]);
    const result = a.add(b);
    expect(result).toBeInstanceOf(DiagonalMatrix);
    expect((result as DiagonalMatrix).data).toEqual([5, 7, 9]);
  });

  it("should add RegularMatrix", () => {
    const d = new DiagonalMatrix([1, 2]);
    const r = new RegularMatrix([10, 20, 30, 40]); // 2x2 matrix
    const result = d.add(r);
    expect(result).toBeInstanceOf(RegularMatrix);
    expect((result as RegularMatrix).data).toEqual([11, 20, 30, 42]);
  });

  it("should multiply vector", () => {
    const m = new DiagonalMatrix([2, 3, 4]);
    const v = new Vector([1, 2, 3]);
    const result = m.mul(v);
    expect(result).toBeInstanceOf(Vector);
    expect(result.data).toEqual([2, 6, 12]);
  });

  it("should multiply ScalarMatrix", () => {
    const d = new DiagonalMatrix([2, 3, 4]);
    const s = new ScalarMatrix(5);
    const result = d.mul(s);
    expect(result).toBeInstanceOf(DiagonalMatrix);
    expect((result as unknown as DiagonalMatrix).data).toEqual([10, 15, 20]);
  });

  it("should multiply DiagonalMatrix", () => {
    const a = new DiagonalMatrix([2, 3]);
    const b = new DiagonalMatrix([4, 5]);
    const result = a.mul(b);
    expect(result).toBeInstanceOf(DiagonalMatrix);
    expect((result as DiagonalMatrix).data).toEqual([8, 15]);
  });

  it("should multiply RegularMatrix", () => {
    const d = new DiagonalMatrix([2, 3]);
    const r = new RegularMatrix([1, 2, 3, 4]); // 2x2 matrix
    const result = d.mul(r);
    expect(result).toBeInstanceOf(RegularMatrix);
    expect((result as RegularMatrix).data).toEqual([2, 6, 6, 12]);
  });

  it("should scale", () => {
    const m = new DiagonalMatrix([1, 2, 3]);
    const result = m.scale(2);
    expect(result).toBeInstanceOf(DiagonalMatrix);
    expect(result.data).toEqual([2, 4, 6]);
  });

  it("should clamp to [0, 1]", () => {
    const m = new DiagonalMatrix([0.5, 1.5, 2.0]);
    m.clamp01();
    expect(m.data).toEqual([0.5, 1.0, 1.0]);
  });

  it("should serialize to JSON", () => {
    const m = new DiagonalMatrix([1, 2, 3]);
    expect(m.toJSON()).toEqual([1, 2, 3]);
  });
});

describe("RegularMatrix", () => {
  it("should create a copy", () => {
    const m = new RegularMatrix([1, 2, 3, 4]);
    const copy = m.copy();
    expect(copy.data).toEqual([1, 2, 3, 4]);
    expect(copy).not.toBe(m);
    copy.data[0] = 99;
    expect(m.data[0]).toBe(1);
  });

  it("should get value at position", () => {
    const m = new RegularMatrix([1, 2, 3, 4]); // 2x2 matrix
    expect(m.get(0, 0)).toBe(1);
    expect(m.get(0, 1)).toBe(2);
    expect(m.get(1, 0)).toBe(3);
    expect(m.get(1, 1)).toBe(4);
  });

  it("should get raw value by index", () => {
    const m = new RegularMatrix([10, 20, 30, 40]);
    expect(m.getRaw(0)).toBe(10);
    expect(m.getRaw(1)).toBe(20);
    expect(m.getRaw(2)).toBe(30);
    expect(m.getRaw(3)).toBe(40);
  });

  it("should throw error for out of bounds raw access", () => {
    const m = new RegularMatrix([1, 2, 3, 4]);
    expect(() => m.getRaw(4)).toThrow("index out of bounds");
    expect(() => m.getRaw(-1)).toThrow("index out of bounds");
  });

  it("should calculate dimensions", () => {
    const m2x2 = new RegularMatrix([1, 2, 3, 4]);
    expect(m2x2.dimensions()).toBe(2);

    const m3x3 = new RegularMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(m3x3.dimensions()).toBe(3);
  });

  it("should throw error for invalid matrix size", () => {
    const m = new RegularMatrix([1, 2, 3]); // Not a perfect square
    expect(() => m.dimensions()).toThrow("invalid matrix size");
  });

  it("should add ScalarMatrix", () => {
    const r = new RegularMatrix([1, 2, 3, 4]); // 2x2 matrix
    const s = new ScalarMatrix(10);
    const result = r.add(s);
    expect(result).toBeInstanceOf(RegularMatrix);
    expect((result as RegularMatrix).data).toEqual([11, 2, 3, 14]);
  });

  it("should add DiagonalMatrix", () => {
    const r = new RegularMatrix([1, 2, 3, 4]); // 2x2 matrix
    const d = new DiagonalMatrix([10, 20]);
    const result = r.add(d);
    expect(result).toBeInstanceOf(RegularMatrix);
    expect((result as RegularMatrix).data).toEqual([11, 2, 3, 24]);
  });

  it("should add RegularMatrix", () => {
    const a = new RegularMatrix([1, 2, 3, 4]);
    const b = new RegularMatrix([5, 6, 7, 8]);
    const result = a.add(b);
    expect(result).toBeInstanceOf(RegularMatrix);
    expect((result as RegularMatrix).data).toEqual([6, 8, 10, 12]);
  });

  it("should multiply vector", () => {
    const m = new RegularMatrix([1, 2, 3, 4]); // 2x2 matrix
    const v = new Vector([5, 6]);
    const result = m.mul(v);
    expect(result).toBeInstanceOf(Vector);
    expect(result.data).toEqual([17, 39]);
  });

  it("should multiply ScalarMatrix", () => {
    const r = new RegularMatrix([1, 2, 3, 4]);
    const s = new ScalarMatrix(2);
    const result = r.mul(s);
    expect(result).toBeInstanceOf(RegularMatrix);
    expect((result as unknown as RegularMatrix).data).toEqual([2, 4, 6, 8]);
  });

  it("should multiply DiagonalMatrix", () => {
    const r = new RegularMatrix([1, 2, 3, 4]); // 2x2 matrix [[1,2],[3,4]]
    const d = new DiagonalMatrix([2, 3]); // diagonal [[2,0],[0,3]]
    const result = r.mul(d);
    expect(result).toBeInstanceOf(RegularMatrix);
    // [[1,2],[3,4]] * [[2,0],[0,3]] = [[1*2+2*0, 1*0+2*3], [3*2+4*0, 3*0+4*3]]
    // = [[2, 6], [6, 12]]
    expect((result as unknown as RegularMatrix).data).toEqual([2, 6, 6, 12]);
  });

  it("should multiply RegularMatrix", () => {
    const a = new RegularMatrix([1, 2, 3, 4]); // 2x2 matrix
    const b = new RegularMatrix([5, 6, 7, 8]); // 2x2 matrix
    const result = a.mul(b);
    expect(result).toBeInstanceOf(RegularMatrix);
    // Row-major: [[1,2],[3,4]] * [[5,6],[7,8]] = [[19,22],[43,50]]
    expect((result as RegularMatrix).data).toEqual([19, 22, 43, 50]);
  });

  it("should scale", () => {
    const m = new RegularMatrix([1, 2, 3, 4]);
    const result = m.scale(3);
    expect(result).toBeInstanceOf(RegularMatrix);
    expect(result.data).toEqual([3, 6, 9, 12]);
  });

  it("should clamp to [0, 1]", () => {
    const m = new RegularMatrix([0.5, 1.5, 2.0, 0.8]);
    m.clamp01();
    expect(m.data).toEqual([0.5, 1.0, 1.0, 0.8]);
  });

  it("should serialize to JSON", () => {
    const m = new RegularMatrix([1, 2, 3, 4]);
    expect(m.toJSON()).toEqual([1, 2, 3, 4]);
  });

  it("should perform correct matrix-vector multiplication", () => {
    const m = new RegularMatrix([2, 0, 0, 3]); // 2x2 diagonal-like
    const v = new Vector([4, 5]);
    const result = m.matvecmul(v);
    // [2*4 + 0*5, 0*4 + 3*5] = [8, 15]
    expect(result.data).toEqual([8, 15]);
  });
});
