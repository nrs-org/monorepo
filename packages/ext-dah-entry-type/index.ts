import { type EntryMeta } from "@nrs-org/core";

export type EntryType = StandardEntryType | NonStandardEntryType;

export type NonStandardEntryType = "Other" | `Other:${string}`;

export enum StandardEntryType {
  Anime = "Anime",
  Manga = "Manga",
  LightNovel = "LightNovel",
  LightNovelGeneric = "LightNovelGeneric",
  VisualNovel = "VisualNovel",
  MusicGeneric = "MusicGeneric",
  MusicAlbum = "MusicAlbum",
  MusicArtist = "MusicArtist",
  MusicTrack = "MusicTrack",
  MusicAlbumTrack = "MusicAlbumTrack",
  Franchise = "Franchise",
  Game = "Game",
}

export default function DAH_entry_type() {
  return {
    name: "DAH_entry_type",
    dependencies(): string[] {
      return ["DAH_meta"];
    },
    setType(meta: EntryMeta, type: EntryType | undefined): void {
      if (type === undefined) {
        delete meta.DAH_entry_type;
      } else {
        meta.DAH_entry_type = type;
      }
    },
    getType(meta: EntryMeta): EntryType | undefined {
      return meta.DAH_entry_type as EntryType | undefined;
    },
  };
}

export type ExtDAH_entry_type = ReturnType<typeof DAH_entry_type>;
