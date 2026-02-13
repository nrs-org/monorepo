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

  // Optional serializer hook that can produce artifacts from `data` and
  // `results` (e.g. JSON, diagnostics). Return value is intentionally
  // unconstrained; core will not rely on it.
  serialize?: (
    data: Data,
    results: Map<Id, Result>,
  ) => unknown | Promise<unknown>;
}
