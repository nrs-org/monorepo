import { type Context, type Data } from "@nrs-org/core";

// Type-level ID pieces
export type TypePrefix = "A" | "M" | "L" | "V" | "F" | "G" | "GF" | "O";

export type AnimeDb = "MAL" | "AL" | "ADB" | "KS";
export type VgmdbSubtype = "AL" | "AR";
export type Vgmdb = "VGMDB";
export type Vndb = "VNDB";
type DbType = AnimeDb | Vgmdb | Vndb;

export type AnimeIdLiteral = `A-${AnimeDb}-${number}`;
export type MusicIdLiteral =
  | `M-${Vgmdb}-AL-${number}`
  | `M-${Vgmdb}-AL-${number}-${number}`
  | `M-${Vgmdb}-AR-${number}`;
export type VisualNovelIdLiteral = `V-${Vndb}-${number}`;
export type FranchiseIdLiteral = `F-${DbType}-${number}`;
export type GameIdLiteral = `G-${DbType}-${number}`;
export type GameFromFranchiseIdLiteral = `GF-${DbType}-${number}`;
export type MangaLightNovelIdLiteral = `L-${AnimeDb}-${number}`;

export type CustomIdLiteral = `${TypePrefix}-${string}`;

export type EntryIdLiteral =
  | AnimeIdLiteral
  | MusicIdLiteral
  | VisualNovelIdLiteral
  | FranchiseIdLiteral
  | GameIdLiteral
  | GameFromFranchiseIdLiteral
  | MangaLightNovelIdLiteral
  | CustomIdLiteral;

// Parsed representations
export interface ParsedBase {
  raw: string;
  typePrefix: TypePrefix;
  kind: string;
}

export interface ParsedAnime extends ParsedBase {
  kind: "anime";
  db: AnimeDb | string;
  entryId: string;
  suffix?: string | undefined;
}

export interface ParsedMusic extends ParsedBase {
  kind: "music";
  db: Vgmdb | string;
  subtype?: VgmdbSubtype | string;
  entryId: string;
  suffix?: string | undefined; // e.g., track number
}

export interface ParsedVN extends ParsedBase {
  kind: "visual-novel";
  db: Vndb | string;
  entryId: string;
}

export interface ParsedGeneric extends ParsedBase {
  kind: "generic";
  components: string[];
}

export interface ParsedCustom extends ParsedBase {
  kind: "custom";
  rankedTimestamp?: string;
  rest?: string | undefined;
}

export type EntryIdParsed =
  | ParsedAnime
  | ParsedMusic
  | ParsedVN
  | ParsedCustom
  | ParsedGeneric;

export interface IdImplConfig {
  validateEntries?: boolean; // default true
}

// helper tables
const ANIME_DB_SET = new Set<string>(["MAL", "AL", "ADB", "KS"]);
const VGMDB_SUB_SET = new Set<string>(["AL", "AR"]);

function isTimestampLike(s: string) {
  // Very permissive: ISO-like without separators: YYYYMMDD[T]HHMMSS or similar
  return /^\d{8}T?\d{6}$/.test(s);
}

function makeParsedGeneric(
  raw: string,
  typePrefix: TypePrefix,
  tokens: string[],
): ParsedGeneric {
  return { raw, typePrefix, kind: "generic", components: tokens.slice(1) };
}

// Runtime parse + validation
export function parseEntryId(id: string): EntryIdParsed | undefined {
  const tokens = id.split("-");
  if (tokens.length === 0) return undefined;

  const type = tokens[0];
  if (type === undefined) return undefined;
  if (!["A", "M", "L", "V", "F", "G", "GF", "O"].includes(type))
    return undefined;

  // Generic timestamp-style IDs for any prefix, e.g. A-20070405T143050 or GF-20070405T143050
  // Also accept timestamp + additional suffix components (rest).
  if (
    tokens.length >= 2 &&
    tokens[1] !== undefined &&
    isTimestampLike(tokens[1])
  ) {
    const ranked = tokens[1];
    const rest = tokens.length > 2 ? tokens.slice(2).join("-") : undefined;
    return {
      raw: id,
      typePrefix: type as TypePrefix,
      kind: "custom",
      rankedTimestamp: ranked,
      rest,
    } as ParsedCustom;
  }

  // Single-letter types
  switch (type) {
    case "A": {
      // A-<DB>-<entry>-<suffix*> OR A-<rankedTimestamp> (custom id)
      // per-prefix timestamp handling is covered by the generic timestamp
      // handler above; fall through to standard anime parsing below.

      if (tokens.length >= 3) {
        const db = tokens[1] ?? "";
        const entryId = tokens[2] ?? "";
        const suffix =
          tokens.length > 3 ? tokens.slice(3).join("-") : undefined;
        if (!ANIME_DB_SET.has(db)) return undefined;
        return {
          raw: id,
          typePrefix: "A",
          kind: "anime",
          db,
          entryId,
          suffix,
        } satisfies ParsedAnime;
      }
      return undefined;
    }
    case "M": {
      // M-VGMDB-AL|AR-<entry>-<maybe suffix>
      // per-prefix timestamp handling is covered by the generic timestamp
      // handler above; proceed to standard music parsing below.

      if (tokens.length >= 4) {
        const db = tokens[1] ?? "";
        const subtype = tokens[2] ?? "";
        const entryId = tokens[3] ?? "";
        const suffix =
          tokens.length > 4 ? tokens.slice(4).join("-") : undefined;
        if (db !== "VGMDB") return undefined;
        if (!VGMDB_SUB_SET.has(subtype)) return undefined;
        return {
          raw: id,
          typePrefix: "M",
          kind: "music",
          db,
          subtype,
          entryId,
          suffix,
        } satisfies ParsedMusic;
      }
      return undefined;
    }
    case "V": {
      // V-VNDB-<entry>
      if (tokens.length >= 3) {
        const db = tokens[1] ?? "";
        const entryId = tokens[2] ?? "";
        if (db !== "VNDB") return undefined;
        return {
          raw: id,
          typePrefix: "V",
          kind: "visual-novel",
          db,
          entryId,
        } satisfies ParsedVN;
      }
      return undefined;
    }
    case "L":
    case "F":
    case "G": {
      // L-<db>-<entry>-... generic standard style
      if (tokens.length >= 3) return makeParsedGeneric(id, type, tokens);
      return undefined;
    }
    case "O": {
      // per-prefix timestamp handling is covered by the generic timestamp
      // handler above; O-specific parsing falls through to rejection for
      // non-timestamp forms.
      return undefined;
    }
    case "GF": {
      // GF-<franchise-db>-<id>-maybe-suffix
      if (tokens.length >= 3) {
        return {
          raw: id,
          typePrefix: "GF",
          kind: "generic",
          components: tokens.slice(1),
        };
      }
      return undefined;
    }
  }

  // Unknown ID
  return undefined;
}

export default function DAH_entry_id_impl(config?: IdImplConfig) {
  const validateEntries = config?.validateEntries ?? true;
  return {
    name: "DAH_entry_id_impl",
    dependencies(): string[] {
      return ["DAH_entry_id"];
    },
    preprocessData(_: Context, data: Data) {
      if (validateEntries) {
        for (const entry of data.entries.values()) {
          this.validateEntryId(entry.id, true);
        }
      }
      return undefined;
    },
    parseEntryId(id: string, throwOnInvalid = false) {
      const parsed = parseEntryId(id);
      if (!parsed && throwOnInvalid) throw new Error(`invalid entry id: ${id}`);
      return parsed;
    },
    validateEntryId(id: string, throwOnInvalid = false) {
      return this.parseEntryId(id, throwOnInvalid) !== undefined;
    },
  };
}

export type ExtDAH_entry_id_impl = ReturnType<typeof DAH_entry_id_impl>;
