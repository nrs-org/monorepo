import type { Context, Entry, Impact, Relation, Id } from "@nrs-org/core";

/**
 * The render context passed explicitly through the JSX closure chain by
 * `buildData()`. All element handlers read and mutate this struct during a
 * single synchronous render pass. No global or module-level state is used.
 */
export interface RenderContext {
  /** The NRS processing context (carries extensions). */
  context: Context;
  /** Accumulates entries keyed by their Id. */
  entries: Map<Id, Entry>;
  /** Accumulates impacts in document order. */
  impacts: Impact[];
  /** Accumulates relations in document order. */
  relations: Relation[];
  /**
   * Set to the current entry while inside an `<Entry>` element's children.
   * `null` outside any `<Entry>`.
   */
  currentEntry: Entry | null;
  /**
   * Set to the current impact while evaluating an impact element's children
   * (needed so `<ValidatorSuppress>` can annotate the impact).
   * `null` outside any impact element.
   */
  currentImpact: Impact | null;
}
