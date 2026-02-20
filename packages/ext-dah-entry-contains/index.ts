import {
  makeRelationMeta,
  type Context,
  type Id,
  type Matrix,
  type Relation,
  identityMatrix,
} from "@nrs-org/core";

import type { ExtDAH_ir_source } from "@nrs-org/ext-dah-ir-source";

export default function DAH_entry_contains() {
  return {
    name: "DAH_entry_contains",
    dependencies(): string[] {
      return ["DAH_meta"];
    },

    entryContains(
      context: Context,
      contributors: Map<Id, Matrix>,
      childId: Id,
    ) {
      const meta = makeRelationMeta();
      // Retrieve DAH_ir_source extension if available
      const irSourceExt = context.extensions?.["DAH_ir_source"] as
        | ExtDAH_ir_source
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

export type ExtDAH_entry_contains = ReturnType<typeof DAH_entry_contains>;
