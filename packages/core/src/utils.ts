export function assert(cond: boolean, msg?: string): asserts cond {
  if (!cond) throw new Error(msg || "Assertion failed");
}

export function signedPow(x: number, p: number): number {
  if (x >= 0) return Math.pow(x, p);
  return -Math.pow(-x, p);
}

export function combinePow(numbers: number[], factor: number) {
  if (factor < 1e-4) {
    // For very small factors, return the value with largest absolute value
    // but if values cancel out (sum to 0), return 0
    return numbers.reduce((a, b) => {
      const absA = Math.abs(a);
      const absB = Math.abs(b);
      if (absA > absB) return a;
      // If |a| <= |b|, check if they cancel (sum close to 0)
      if (Math.abs(a + b) < 1e-10) return 0;
      return b;
    }, 0.0);
  }
  const sum = numbers
    .map((x) => signedPow(x, 1.0 / factor))
    .reduce((a, b) => a + b, 0.0);
  return signedPow(sum, factor);
}
