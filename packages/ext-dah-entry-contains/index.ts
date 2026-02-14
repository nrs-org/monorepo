import {
  type Extension,
  type Context,
  type Id,
  type Matrix,
  type Relation,
  identityMatrix,
} from "@nrs-org/core";

import type { DAH_ir_source_extension } from "@nrs-org/ext-dah-ir-source";

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
      context: Context,
      contributors: Map<Id, Matrix>,
      childId: Id,
    ) {
      const meta: Record<string, unknown> = {};
      // Retrieve DAH_ir_source extension if available
      const irSourceExt = context.extensions?.["DAH_ir_source"] as
        | DAH_ir_source_extension
        | undefined;
      if (irSourceExt) {
        irSourceExt.setIrSource(meta, {
          extension: "DAH_entry_contains",
          version: "1.0.0",
          name: "entry_contains",
        });
      }
      return {
        contributors,
        references: new Map<Id, Matrix>([[childId, identityMatrix]]),
        DAH_meta: meta,
      } as Relation;
    },
  };
}
