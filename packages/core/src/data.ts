import type { Matrix, Vector } from "./math";

export type Id = string;
export type Meta = Record<string, unknown>;

export interface HasMeta {
  DAH_meta: Meta;
}

export type EntryMeta = Meta;
export type ImpactMeta = Meta;
export type RelationMeta = Meta;
export type ResultMeta = Meta;

export interface Entry extends HasMeta {
  id: Id;
}

export interface Impact extends HasMeta {
  contributors: Map<Id, Matrix>;
  score: Vector;
}

export interface Relation extends HasMeta {
  contributors: Map<Id, Matrix>;
  references: Map<Id, Matrix>;
}

export interface Data {
  entries: Map<Id, Entry>;
  impacts: Impact[];
  relations: Relation[];
}

export interface Result extends HasMeta {
  positiveScore: Vector;
  negativeScore: Vector;
  overallVector: Vector;
}

export function indexEntry(entries: Iterable<Entry>): Map<Id, Entry> {
  const map = new Map<Id, Entry>();
  for (const entry of entries) map.set(entry.id, entry);
  return map;
}
