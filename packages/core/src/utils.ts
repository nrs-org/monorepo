export function assert(cond: boolean, msg?: string): asserts cond {
  if (!cond) throw new Error(msg || "Assertion failed");
}

export function signedPow(x: number, p: number): number {
  if (x >= 0) return Math.pow(x, p);
  return -Math.pow(-x, p);
}

export function combinePow(numbers: number[], factor: number) {
  if (factor < 1e-4) {
    // For very small factors, find values with largest absolute value
    // that don't cancel out
    
    // Group values by their absolute value
    const groups = new Map<number, number[]>();
    for (const x of numbers) {
      const abs = Math.abs(x);
      if (!groups.has(abs)) groups.set(abs, []);
      groups.get(abs)!.push(x);
    }
    
    // Sort absolute values in descending order
    const sortedAbs = Array.from(groups.keys()).sort((a, b) => b - a);
    
    // Find the first group that doesn't cancel
    for (const abs of sortedAbs) {
      const values = groups.get(abs)!;
      const sum = values.reduce((a, b) => a + b, 0);
      
      // If this group doesn't cancel, return the first value
      if (Math.abs(sum) >= 1e-10) {
        return values[0];
      }
    }
    
    // All values cancel
    return 0;
  }
  const sum = numbers
    .map((x) => signedPow(x, 1.0 / factor))
    .reduce((a, b) => a + b, 0.0);
  return signedPow(sum, factor);
}
