import type { Matrix, Vector } from "./math";

export type Id = string;
export type Meta = Record<string, unknown>;

// tag indicating who "owns" this meta; when omitted the meta may be nested
export type MetaOwner = "entry" | "impact" | "relation" | "result" | undefined;

// Tagged meta types — DAH_meta_owner is optional to allow nested metas that don't
// explicitly set an owner. It's a regular property (will be serialized).
export type EntryMeta = Meta & { DAH_meta_owner: "entry" };
export type ImpactMeta = Meta & { DAH_meta_owner: "impact" };
export type RelationMeta = Meta & { DAH_meta_owner: "relation" };
export type ResultMeta = Meta & { DAH_meta_owner: "result" };

export interface HasMeta<M extends Meta = Meta> {
  DAH_meta: M;
}

export interface Entry extends HasMeta<EntryMeta> {
  id: Id;
}

export interface Impact extends HasMeta<ImpactMeta> {
  contributors: Map<Id, Matrix>;
  score: Vector;
}

export interface Relation extends HasMeta<RelationMeta> {
  contributors: Map<Id, Matrix>;
  references: Map<Id, Matrix>;
}

export interface Data {
  entries: Map<Id, Entry>;
  impacts: Impact[];
  relations: Relation[];
}

export interface Result extends HasMeta<ResultMeta> {
  positiveScore: Vector;
  negativeScore: Vector;
  overallVector: Vector;
}

export function indexEntry(entries: Iterable<Entry>): Map<Id, Entry> {
  const map = new Map<Id, Entry>();
  for (const entry of entries) map.set(entry.id, entry);
  return map;
}
