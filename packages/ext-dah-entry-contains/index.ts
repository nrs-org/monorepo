import {
  type Extension,
  type Context,
  type Id,
  type Matrix,
  type Relation,
  identityMatrix,
} from "@nrs-org/core";

export default function DAH_entry_contains(): Extension & {
  entryContains: (
    context: Context,
    contributors: Map<Id, Matrix>,
    childId: Id,
  ) => Relation;
} {
  return {
    name: "DAH_entry_contains",
    dependencies(): string[] {
      return [];
    },

    entryContains(
      _context: Context,
      contributors: Map<Id, Matrix>,
      childId: Id,
    ) {
      return {
        contributors,
        references: new Map<Id, Matrix>([[childId, identityMatrix]]),
        DAH_meta: {
          DAH_ir_source: {
            extension: "DAH_entry_contains",
            version: "1.0.0",
            name: "entry_contains",
          },
        },
      } as Relation;
    },
  };
}
