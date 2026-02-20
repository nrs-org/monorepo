export function assert(cond: boolean, msg?: string): asserts cond {
  if (!cond) throw new Error(msg || "Assertion failed");
}

/**
 * Epsilon value for numerical comparisons and tolerances.
 * Used for floating point comparisons, small factor thresholds, etc.
 */
export const EPSILON = 1e-4;

export function signedPow(x: number, p: number): number {
  if (x >= 0) return Math.pow(x, p);
  return -Math.pow(-x, p);
}

/**
 * Combine numbers using signed power when factor is very small.
 * Returns the value with largest absolute value that doesn't cancel out.
 */
function combinePowSmallFactor(numbers: number[]): number {
  // Group values by their absolute value (with epsilon tolerance)
  const groups: Array<{ abs: number; values: number[] }> = [];

  for (const x of numbers) {
    const abs = Math.abs(x);

    // Find existing group with similar absolute value
    let found = false;
    for (const group of groups) {
      if (Math.abs(group.abs - abs) < EPSILON) {
        group.values.push(x);
        found = true;
        break;
      }
    }

    // Create new group if not found
    if (!found) {
      groups.push({ abs, values: [x] });
    }
  }

  // Sort groups by absolute value in descending order
  groups.sort((a, b) => b.abs - a.abs);

  // Find the first group that doesn't cancel
  for (const group of groups) {
    const sum = group.values.reduce((a, b) => a + b, 0);

    // If this group doesn't cancel, return the first value
    if (Math.abs(sum) >= EPSILON) {
      return group.values[0];
    }
  }

  // All values cancel
  return 0;
}

export function combinePow(numbers: number[], factor: number) {
  if (factor < EPSILON) {
    return combinePowSmallFactor(numbers);
  }
  const sum = numbers
    .map((x) => signedPow(x, 1.0 / factor))
    .reduce((a, b) => a + b, 0.0);
  return signedPow(sum, factor);
}
