import type {
  EntryMeta,
  ImpactMeta,
  Meta,
  RelationMeta,
  ResultMeta,
} from "./data";

export function makeEntryMeta(m: Meta = {}): EntryMeta {
  return { ...m, DAH_meta_owner: "entry" };
}

export function makeImpactMeta(m: Meta = {}): ImpactMeta {
  return { ...m, DAH_meta_owner: "impact" };
}

export function makeRelationMeta(m: Meta = {}): RelationMeta {
  return { ...m, DAH_meta_owner: "relation" };
}

export function makeResultMeta(m: Meta = {}): ResultMeta {
  return { ...m, DAH_meta_owner: "result" };
}
