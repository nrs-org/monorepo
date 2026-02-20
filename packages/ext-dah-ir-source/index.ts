import { type ImpactMeta, type RelationMeta } from "@nrs-org/core";

/**
 * Type for the DAH_ir_source metadata field.
 */
export interface IrSourceMeta {
  extension: string;
  version: string;
  name: string;
}

export type IrMeta = ImpactMeta | RelationMeta;

/**
 * Helper to set the DAH_ir_source field on entry metadata.
 */
/**
 * The DAH_ir_source extension: registers the metadata field and provides helpers.
 */
export default function DAH_ir_source() {
  return {
    name: "DAH_ir_source",
    dependencies(): string[] {
      return ["DAH_meta"];
    },

    setIrSource(meta: IrMeta, value: IrSourceMeta | undefined): void {
      if (value === undefined) {
        delete meta["DAH_ir_source"];
      } else {
        meta["DAH_ir_source"] = value;
      }
    },
    getIrSource(meta: IrMeta): IrSourceMeta | undefined {
      return meta["DAH_ir_source"] as IrSourceMeta | undefined;
    },
  };
}

export type ExtDAH_ir_source = ReturnType<typeof DAH_ir_source>;
