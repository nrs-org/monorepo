export class Vector {
  data: number[];
  constructor(data: number[]) {
    this.data = [...data];
  }
  copy() {
    return new Vector(this.data);
  }
  add(other: Vector) {
    if (this.data.length !== other.data.length)
      throw new Error("dimension mismatch");
    for (let i = 0; i < this.data.length; ++i)
      this.data[i] = this.get(i) + other.get(i);
  }
  mul(scalar: number) {
    return new Vector(this.data.map((x) => x * scalar));
  }
  toJSON() {
    return this.data;
  }
  get(index: number) {
    const value = this.data[index];
    if (value === undefined) throw new Error("index out of bounds");
    return value;
  }
}

export class ScalarMatrix {
  data: number;
  constructor(data: number) {
    this.data = data;
  }
  copy() {
    return new ScalarMatrix(this.data);
  }
  get(i: number, j: number) {
    return i === j ? this.data : 0.0;
  }
  add(other: Matrix) {
    if (other instanceof ScalarMatrix)
      return new ScalarMatrix(this.data + other.data);
    return other.add(this);
  }
  mul<T extends Matrix | Vector>(rhs: T): T {
    return (
      rhs instanceof Vector ? this.matvecmul(rhs) : this.matmul(rhs)
    ) as T;
  }
  scale(f: number) {
    return new ScalarMatrix(this.data * f);
  }
  matvecmul(v: Vector) {
    return new Vector(v.data.map((x) => x * this.data));
  }
  matmul(other: Matrix) {
    if (other instanceof ScalarMatrix)
      return new ScalarMatrix(this.data * other.data);
    if (other instanceof DiagonalMatrix)
      return new DiagonalMatrix(other.data.map((x) => x * this.data));
    return new RegularMatrix(other.data.map((x) => x * this.data));
  }
  clamp01() {
    this.data = Math.min(1.0, this.data);
  }
  toJSON() {
    return this.data;
  }
}

export class DiagonalMatrix {
  data: number[];
  constructor(data: number[]) {
    this.data = [...data];
  }
  copy() {
    return new DiagonalMatrix(this.data);
  }
  get(i: number, j: number) {
    if (i !== j) return 0.0;
    const value = this.data[i];
    if (value === undefined) throw new Error("index out of bounds");
    return value;
  }
  getDiagonal(i: number) {
    return this.get(i, i);
  }
  add(matrix: Matrix) {
    if (matrix instanceof ScalarMatrix)
      return new DiagonalMatrix(this.data.map((x) => x + matrix.data));
    if (matrix instanceof DiagonalMatrix)
      return new DiagonalMatrix(
        this.data.map((x, i) => x + matrix.getDiagonal(i)),
      );
    return matrix.add(this);
  }
  mul<T extends Matrix | Vector>(rhs: T): T {
    return (
      rhs instanceof Vector ? this.matvecmul(rhs) : this.matmul(rhs)
    ) as T;
  }
  scale(f: number) {
    return new DiagonalMatrix(this.data.map((x) => x * f));
  }
  matvecmul(v: Vector) {
    return new Vector(v.data.map((x, i) => x * this.getDiagonal(i)));
  }
  matmul(matrix: Matrix) {
    if (matrix instanceof ScalarMatrix) return matrix.mul(this);
    if (matrix instanceof DiagonalMatrix)
      return new DiagonalMatrix(
        this.data.map((x, i) => x * matrix.getDiagonal(i)),
      );
    const n = this.data.length;
    return new RegularMatrix(
      matrix.data.map((x, i) => x * this.getDiagonal(i % n)),
    );
  }
  clamp01() {
    for (let i = 0; i < this.data.length; ++i)
      this.data[i] = Math.min(1.0, this.getDiagonal(i));
  }
  toJSON() {
    return this.data;
  }
}

export class RegularMatrix {
  data: number[];
  constructor(data: number[]) {
    this.data = [...data];
  }
  copy() {
    return new RegularMatrix(this.data);
  }
  get(i: number, j: number) {
    return this.getRaw(i * this.dimensions() + j);
  }
  getRaw(i: number) {
    const value = this.data[i];
    if (value === undefined) throw new Error("index out of bounds");
    return value;
  }
  dimensions() {
    const n = Math.floor(Math.sqrt(this.data.length));
    if (n * n !== this.data.length) throw new Error("invalid matrix size");
    return n;
  }
  add(matrix: Matrix) {
    if (matrix instanceof ScalarMatrix) {
      const n = this.dimensions();
      return new RegularMatrix(
        this.data.map((x, i) => x + (i % (n + 1) === 0 ? matrix.data : 0)),
      );
    }
    if (matrix instanceof DiagonalMatrix) {
      const n = this.dimensions();
      return new RegularMatrix(
        this.data.map(
          (x, i) =>
            x + (i % (n + 1) === 0 ? matrix.getDiagonal(i / (n + 1)) : 0),
        ),
      );
    }
    return new RegularMatrix(
      this.data.map((x, i) => x + (matrix as RegularMatrix).getRaw(i)),
    );
  }
  clamp01() {
    for (let i = 0; i < this.data.length; ++i)
      this.data[i] = Math.min(1.0, this.getRaw(i));
  }
  mul<T extends Matrix | Vector>(rhs: T): T {
    return (
      rhs instanceof Vector ? this.matvecmul(rhs) : this.matmul(rhs)
    ) as T;
  }
  scale(f: number) {
    return new RegularMatrix(this.data.map((x) => x * f));
  }
  matvecmul(vector: Vector) {
    const n = this.dimensions();
    return new Vector(
      vector.data.map((_, i) => {
        let sum = 0.0;
        for (let j = 0; j < n; ++j) {
          sum += this.get(i, j) * vector.data[j];
        }
        return sum;
      }),
    );
  }
  matmul(matrix: Matrix) {
    if (matrix instanceof ScalarMatrix) return matrix.mul(this);
    const n = this.dimensions();
    if (matrix instanceof DiagonalMatrix)
      return new RegularMatrix(
        this.data.map((x, i) => x * matrix.getDiagonal(i % n)),
      );
    const result = new RegularMatrix(new Array<number>(n * n).fill(0));
    for (let i = 0; i < n; ++i)
      for (let j = 0; j < n; ++j) {
        let total = 0;
        for (let k = 0; k < n; ++k)
          total += this.get(i, k) * (matrix as RegularMatrix).get(k, j);
        result.data[i * n + j] = total;
      }
    return result;
  }
  toJSON() {
    return this.data;
  }
}

export type Matrix = ScalarMatrix | DiagonalMatrix | RegularMatrix;

export const identityMatrix = new ScalarMatrix(1.0);
