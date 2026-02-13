import { describe, it, expect } from "bun:test";
import {
  Vector,
  ScalarMatrix,
  RegularMatrix,
  DiagonalMatrix,
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
