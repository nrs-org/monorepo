export function assert(cond: boolean, msg?: string): asserts cond {
  if (!cond) throw new Error(msg || "Assertion failed");
}

export function signedPow(x: number, p: number): number {
  if (x >= 0) return Math.pow(x, p);
  return -Math.pow(-x, p);
}

export function combinePow(numbers: number[], factor: number) {
  if (factor < 1e-4) {
    return numbers.reduce((a, b) => (Math.abs(a) > Math.abs(b) ? a : b), 0.0);
  }
  const sum = numbers
    .map((x) => signedPow(x, 1.0 / factor))
    .reduce((a, b) => a + b, 0.0);
  return signedPow(sum, factor);
}
