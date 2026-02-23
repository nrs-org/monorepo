import type {
  Context,
  Entry,
  Impact,
  Relation,
  Id,
  Vector,
} from "@nrs-org/core";

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
  /**
   * Accumulates contributor entries while evaluating children of an impact/relation
   * component. Set to a fresh Map before calling child closures, then read by the
   * parent component after children execute. `null` outside any impact/relation element.
   *
   * Keys are entry id strings; values are scalar factors (typically 1.0).
   * The impact/relation component converts this to a `Contributors` Map using
   * `ScalarMatrix` before passing it to the extension method.
   */
  currentContributors: Map<string, number> | null;
  /**
   * Set to the score vector being built while evaluating children of a
   * `<RegularImpact>` / `<Score>` pair. `<Component>` children write individual
   * factor values into this vector. `null` outside any such context.
   */
  currentScore: Vector | null;
}
