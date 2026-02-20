import { type EntryMeta, type Extension } from "@nrs-org/core";

export interface AdditionalSources {
  id_MyAnimeList?: number;
  id_AniList?: number;
  id_Kitsu?: number;
  id_AniDB?: number;
  id_VNDB?: number;
  vgmdb?: VGMDBSource;
  youtube?: YoutubeSource;
  spotify?: SpotifySource;
  urls?: URLSource[];
}

export interface VGMDBSource {
  artist?: number;
  album?: number;
  disc?: number;
  track?: number;
  product?: number;
}

export interface URLSource {
  name: string;
  src: string;
  // Meta fields can be extended if needed
}

export type YoutubeSource =
  | YoutubeVideoSource
  | YoutubePlaylistSource
  | YoutubeUserSource;

export interface YoutubeVideoSource {
  video: string;
  from?: string; // Duration as string (ISO8601 or seconds)
  to?: string; // Duration as string (ISO8601 or seconds)
}

export interface YoutubePlaylistSource {
  playlist: string;
}

export type YoutubeUserSource =
  | { channelId: string; channelHandle?: string }
  | { channelHandle: string };

export type SpotifySource =
  | { track: string }
  | { album: string }
  | { artist: string };

export interface DAH_additional_sources extends Extension {
  setAdditionalSources(
    meta: EntryMeta,
    sources: AdditionalSources | undefined,
  ): void;
  getAdditionalSources(meta: EntryMeta): AdditionalSources | undefined;
}

export default function DAH_additional_sources(): DAH_additional_sources {
  return {
    name: "DAH_additional_sources",
    dependencies(): string[] {
      return ["DAH_meta"];
    },
    setAdditionalSources(
      meta: EntryMeta,
      sources: AdditionalSources | undefined,
    ): void {
      if (sources === undefined) {
        delete meta.DAH_additional_sources;
      } else {
        meta.DAH_additional_sources = sources;
      }
    },
    getAdditionalSources(meta: EntryMeta): AdditionalSources | undefined {
      return meta.DAH_additional_sources as AdditionalSources | undefined;
    },
  };
}
