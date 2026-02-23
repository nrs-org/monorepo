// Lightweight Extension types for core processing
import type { Context } from "./process";
import type { Data, Id, Result } from "./data";
import { Graph, alg } from "graphlib";
import type { Vector } from "./math";

// Single interface for all extensions. Keep it small and async-friendly.
export type HookName =
  | "getFactorScoreWeights"
  | "preprocessData"
  | "afterEntryResult"
  | "postProcess"
  | "report";

export interface Extension {
  name: string;

  // Optional dependency declaration by extension name.
  dependencies?: () => string[];

  // Optional per-extension ordering hint. When present this function is
  // called with the list of enabled extension names and the hook being
  // ordered and should return the list of extension names that THIS
  // extension must run after for that hook. This allows extension authors
  // to express ordering constraints that are independent of `dependencies()`.
  // The core will aggregate these hints when computing final ordering.
  mustRunAfter?: (extensions: string[], hook: HookName) => string[];

  getFactorScoreWeights?: () => Vector | undefined;

  // Called before any processing begins. May mutate `data` or return a
  // replacement `Data` object. Async allowed.
  preprocessData?: (
    context: Context,
    data: Data,
  ) => Data | Promise<Data> | undefined;

  // Called after an individual entry's result is computed. May return a
  // replacement `Result`.
  afterEntryResult?: (
    context: Context,
    entryId: Id,
    result: Result,
  ) => Result | Promise<Result> | undefined;

  // Called after all results are computed. May mutate `results` or return a
  // replacement `Map<Id, Result>`. Async allowed.
  postProcess?: (
    context: Context,
    results: Map<Id, Result>,
  ) => Map<Id, Result> | Promise<Map<Id, Result>> | undefined;

  // Optional reporting/finalization hook that can produce artifacts from
  // `data` and `results` (e.g. JSON, diagnostics). Return value is
  // intentionally unconstrained; core will not rely on it.
  report?: (data: Data, results: Map<Id, Result>) => void | Promise<void>;
}

// Compute a deterministic invocation order for a given hook across all
// enabled extensions. Extensions that do not implement the hook are filtered
// out of the returned list, but their ordering hints (mustRunAfter) still
// influence the final order. This returns a stable ordering even when cycles
// exist by falling back to a deterministic Kahn-like ordering.
export function computeHookOrder(
  enabled: Record<string, Extension | undefined>,
  hook: HookName,
): string[] {
  // Build graph from all enabled extensions' mustRunAfter hints for this hook.
  // mustRunAfter(extensions, hook) returns the list of extensions that the
  // current extension must run AFTER. We add edges "other -> name" so that
  // topsort places `other` before `name`, meaning `name` runs after `other`.
  const g = new Graph({ directed: true });
  const names = Object.keys(enabled);
  for (const name of names) g.setNode(name);
  for (const [name, ext] of Object.entries(enabled)) {
    if (!ext) continue;
    const after = ext.mustRunAfter?.(names, hook) ?? [];
    for (const other of after) {
      if (!g.hasNode(other)) continue; // ignore hints about disabled extensions
      g.setEdge(other, name);
    }
  }

  try {
    const order = alg.topsort(g).map((n) => n.toString());
    return order.filter((name) => {
      const ext = enabled[name];
      return (
        !!ext &&
        typeof (ext as unknown as Record<string, unknown>)[hook] === "function"
      );
    });
  } catch {
    throw new Error(`cycle detected in extension ordering for hook '${hook}'`);
  }
}
