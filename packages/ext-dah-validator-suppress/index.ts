import { type Extension } from "@nrs-org/core";

export type EntryMeta = Record<string, unknown> & { DAH_meta_owner: "entry" };

/**
 * DAH_validator_suppress Extension
 * Suppresses validator rules for a DAH entry based on explicit requests in meta.
 * Only allows strict array of {rule, reason} objects. Throws errors for contract violations.
 */

// Suppression descriptor type
export interface ValidatorSuppression {
  rule: string;
  reason: string;
}

export type DAH_validator_suppress = Extension & {
  addSuppression(meta: EntryMeta, rule: string, reason: string): EntryMeta;
  isRuleSuppressed(
    meta: EntryMeta,
    rule: string,
    usedSet?: Set<string>,
  ): boolean;
  finalizeSuppressions(meta: EntryMeta, usedSet: Set<string>): void;
};

// Extension export pattern
function DAH_validator_suppress(): DAH_validator_suppress {
  return {
    name: "DAH_validator_suppress",
    dependencies() {
      return ["DAH_meta"];
    },
    /**
     * Adds a validator rule suppression for a given rule with an explicit reason.
     * Throws on invalid/blank reason, duplicate rules, or malformed meta.
     * Returns a new EntryMeta (never mutates).
     */
    addSuppression(meta: EntryMeta, rule: string, reason: string): EntryMeta {
      if (typeof reason !== "string" || !reason.trim()) {
        throw new Error(
          `Cannot suppress rule '${rule}': reason must be non-blank string.`,
        );
      }
      // Defensive deep (shallow) clone
      const newMeta = { ...meta };
      const meta_suppress =
        meta.DAH_validator_suppress !== undefined
          ? meta.DAH_validator_suppress
          : [];
      if (
        meta_suppress !== undefined &&
        (!Array.isArray(meta_suppress) ||
          meta_suppress.some(
            (item) =>
              typeof item !== "object" ||
              item === null ||
              typeof item.rule !== "string" ||
              typeof item.reason !== "string",
          ))
      ) {
        throw new Error(
          `Malformed DAH_validator_suppress: strictly requires array of {rule, reason}`,
        );
      }
      if (meta_suppress.some((item) => item.rule === rule)) {
        throw new Error(
          `Duplicate suppression: rule '${rule}' is already suppressed in meta.`,
        );
      }
      // Strict new object
      newMeta.DAH_validator_suppress = [...meta_suppress, { rule, reason }];
      return newMeta;
    },
    /**
     * Checks if a rule is suppressed. If suppressed and a usedSet is provided, increments usage tracking.
     * Throws for legacy or malformed suppression fields. Never mutates.
     */
    isRuleSuppressed(
      meta: EntryMeta,
      rule: string,
      usedSet?: Set<string>,
    ): boolean {
      const arr = meta.DAH_validator_suppress;
      if (arr === undefined) return false;
      if (
        !Array.isArray(arr) ||
        arr.some(
          (item) =>
            typeof item !== "object" ||
            item === null ||
            typeof item.rule !== "string" ||
            typeof item.reason !== "string" ||
            !item.reason.trim(),
        )
      ) {
        throw new Error(
          `Malformed DAH_validator_suppress field on entry meta: must be array of {rule, reason}`,
        );
      }
      const found = arr.some((item) => item.rule === rule);
      if (found && usedSet) usedSet.add(rule);
      return found;
    },
    /**
     * After validation, throws if any suppression is declared but not used.
     */
    finalizeSuppressions(meta: EntryMeta, usedSet: Set<string>): void {
      const arr = meta.DAH_validator_suppress;
      if (!arr) return; // nothing to check
      if (
        !Array.isArray(arr) ||
        arr.some(
          (item) =>
            typeof item !== "object" ||
            item === null ||
            typeof item.rule !== "string" ||
            typeof item.reason !== "string" ||
            !item.reason.trim(),
        )
      ) {
        throw new Error(
          `Malformed DAH_validator_suppress field on entry meta: must be array of {rule, reason}`,
        );
      }
      const unused: string[] = arr
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
