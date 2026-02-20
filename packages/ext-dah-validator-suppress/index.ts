import {
  type Extension,
  type EntryMeta,
  type ImpactMeta,
  type RelationMeta,
} from "@nrs-org/core";

type MetaType = EntryMeta | ImpactMeta | RelationMeta;

/**
 * DAH_validator_suppress Extension
 * Suppresses validator rules for a DAH entry based on explicit requests in meta.
 * Stores an array of {rule, reason} objects on the meta under `DAH_validator_suppress`.
 */

export interface ValidatorSuppression {
  rule: string;
  reason: string;
}

export type DAH_validator_suppress = Extension & {
  addSuppression(meta: MetaType, rule: string, reason: string): void;
  isRuleSuppressed(
    meta: MetaType,
    rule: string,
    usedSet?: Set<string>,
  ): boolean;
  finalizeSuppressions(meta: MetaType, usedSet: Set<string>): void;
};

function DAH_validator_suppress(): DAH_validator_suppress {
  return {
    name: "DAH_validator_suppress",
    dependencies() {
      return ["DAH_meta"];
    },
    /**
     * Adds a validator rule suppression for a given rule with an explicit reason.
     * Mutates the meta object in place.
     * Throws on blank reason or duplicate rules.
     */
    addSuppression(meta, rule, reason) {
      if (!reason.trim()) {
        throw new Error(
          `Cannot suppress rule '${rule}': reason must be non-blank string.`,
        );
      }
      const existing = (meta.DAH_validator_suppress ??
        []) as ValidatorSuppression[];
      if (existing.some((item) => item.rule === rule)) {
        throw new Error(
          `Duplicate suppression: rule '${rule}' is already suppressed in meta.`,
        );
      }
      existing.push({ rule, reason });
      meta.DAH_validator_suppress = existing;
    },
    /**
     * Checks if a rule is suppressed. If suppressed and a usedSet is provided,
     * adds the rule to the set for usage tracking.
     */
    isRuleSuppressed(meta, rule, usedSet) {
      const arr = meta.DAH_validator_suppress as
        | ValidatorSuppression[]
        | undefined;
      if (arr === undefined) return false;
      const found = arr.some((item) => item.rule === rule);
      if (found && usedSet) usedSet.add(rule);
      return found;
    },
    /**
     * After validation, throws if any suppression was declared but never used.
     */
    finalizeSuppressions(meta, usedSet) {
      const arr = meta.DAH_validator_suppress as
        | ValidatorSuppression[]
        | undefined;
      if (!arr) return;
      const unused = arr
        .map((item) => item.rule)
        .filter((rule) => !usedSet.has(rule));
      if (unused.length > 0) {
        throw new Error(
          `DAH_validator_suppress: The following suppressions were unused and must be removed: ${unused.join(", ")}`,
        );
      }
    },
  };
}

export default DAH_validator_suppress;
