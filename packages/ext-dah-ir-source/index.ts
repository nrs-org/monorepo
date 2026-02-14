import { type EntryMeta, type Extension } from "@nrs-org/core";

/**
 * Type for the DAH_ir_source metadata field.
 */
export interface IrSourceMeta {
  extension: string;
  version: string;
  name: string;
}

/**
 * Helper to set the DAH_ir_source field on entry metadata.
 */
/**
 * The DAH_ir_source extension: registers the metadata field and provides helpers.
 */
export interface DAH_ir_source_extension extends Extension {
  setIrSource(meta: EntryMeta, value: IrSourceMeta | undefined): void;
  getIrSource(meta: EntryMeta): IrSourceMeta | undefined;
}

export default function DAH_ir_source(): DAH_ir_source_extension {
  return {
    name: "DAH_ir_source",
    dependencies(): string[] {
      return [];
    },
    setIrSource(meta: EntryMeta, value: IrSourceMeta | undefined): void {
      if (value === undefined) {
        delete meta["DAH_ir_source"];
      } else {
        meta["DAH_ir_source"] = value;
      }
    },
    getIrSource(meta: EntryMeta): IrSourceMeta | undefined {
      const val = meta["DAH_ir_source"];
      if (
        val &&
        typeof val === "object" &&
        typeof (val as Record<string, unknown>).extension === "string" &&
        typeof (val as Record<string, unknown>).version === "string" &&
        typeof (val as Record<string, unknown>).name === "string"
      ) {
        return val as IrSourceMeta;
      }
      return undefined;
    },
  };
}
