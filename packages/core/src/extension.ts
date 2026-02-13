// Lightweight Extension types for core processing
import type { Context } from "./process";
import type { Data, Id, Result } from "./data";

// Single interface for all extensions. Keep it small and async-friendly.
export interface Extension {
  // Optional dependency declaration by extension name.
  dependencies?: () => string[];

  // Called before any processing begins. May mutate `data` or return a
  // replacement `Data` object. Async allowed.
  preprocessData?: (
    context: Context,
    data: Data,
  ) => Data | Promise<Data> | undefined;

  // Called after all results are computed. May mutate `results` or return a
  // replacement `Map<Id, Result>`. Async allowed.
  postProcess?: (
    context: Context,
    results: Map<Id, Result>,
  ) => Map<Id, Result> | Promise<Map<Id, Result>> | undefined;

  // Optional reporting/finalization hook that can produce artifacts from
  // `data` and `results` (e.g. JSON, diagnostics). Return value is
  // intentionally unconstrained; core will not rely on it.
  report?: (data: Data, results: Map<Id, Result>) => unknown | Promise<unknown>;

  // Called before solving each strongly-connected component (SCC). May
  // mutate `data` or return a replacement `Data` for subsequent steps.
  beforeSolveScc?: (
    context: Context,
    scc: Id[],
    data: Data,
  ) => Data | Promise<Data> | undefined;

  // Called after an individual entry's result is computed. May return a
  // replacement `Result`.
  afterEntryResult?: (
    context: Context,
    entryId: Id,
    result: Result,
  ) => Result | Promise<Result> | undefined;
}

// Given a map of enabled extensions and a target extension name + hook,
// compute the list of extension names (subset of enabled) that must be run
// before the target. Currently this uses the `dependencies()` declarations
// and returns the transitive closure in topological order.
import { Graph, alg } from "graphlib";

export function computePrereqs(
  enabled: Record<string, Extension | undefined>,
  target: string,
  // hookName reserved for future hook-aware ordering rules
  _hookName?: keyof Extension,
): string[] {
  const g = new Graph({ directed: true });
  // consume parameter for future-proofing so linters don't complain
  void _hookName;
  // add nodes for all enabled
  for (const name of Object.keys(enabled)) g.setNode(name);
  // add edges dep -> name
  for (const [name, ext] of Object.entries(enabled)) {
    if (!ext || typeof ext.dependencies !== "function") continue;
    for (const dep of ext.dependencies()) {
      if (!g.hasNode(dep)) continue; // ignore external deps not enabled
      g.setEdge(dep, name);
    }
  }

  if (!g.hasNode(target)) return [];

  // collect nodes that have a path to target
  const preds = new Set<string>();
  const stack = [target];
  while (stack.length > 0) {
    const cur = stack.pop() as string;
    const inEdges = g.inEdges(cur) || [];
    for (const e of inEdges) {
      const src = e.v as string;
      if (!preds.has(src)) {
        preds.add(src);
        stack.push(src);
      }
    }
  }

  // topologically sort the subgraph induced by preds and return in order
  const sub = new Graph({ directed: true });
  for (const n of preds) sub.setNode(n);
  for (const e of g.edges() || []) {
    if (preds.has(e.v as string) && preds.has(e.w as string))
      sub.setEdge(e.v, e.w);
  }
  try {
    return alg.topsort(sub).map((n) => n.toString());
  } catch {
    throw new Error(`Extension dependency cycle detected for target ${target}`);
  }
}
