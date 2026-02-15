import { describe, it, expect } from "bun:test";
import type { Entry } from "@nrs-org/core";
import { makeEntryMeta } from "@nrs-org/core";
import DAH_additional_sources, { type AdditionalSources } from "../index";

describe("ext-dah-additional-sources", () => {
  it("constructs and has no dependencies", () => {
    const ext = DAH_additional_sources();
    expect(ext.dependencies?.() ?? []).toEqual([]);
  });

  it("sets and gets additional sources on DAH_meta", () => {
    const ext = DAH_additional_sources();
    const e: Entry = { id: "e1", DAH_meta: makeEntryMeta() };
    expect(ext.getAdditionalSources(e.DAH_meta)).toBeUndefined();
    const sources: AdditionalSources = {
      id_MyAnimeList: 123,
      urls: [
        { name: "AniList", src: "https://anilist.co/anime/1" },
        { name: "Kitsu", src: "https://kitsu.io/anime/1" },
      ],
      vgmdb: { album: 1001 },
    };
    ext.setAdditionalSources(e.DAH_meta, sources);
    expect(ext.getAdditionalSources(e.DAH_meta)).toStrictEqual(sources);
    // ensure value is stored directly on DAH_meta
    expect(e.DAH_meta.DAH_additional_sources).toStrictEqual(sources);
    ext.setAdditionalSources(e.DAH_meta, undefined);
    expect(ext.getAdditionalSources(e.DAH_meta)).toBeUndefined();
    expect(e.DAH_meta).not.toContainKey("DAH_additional_sources");
  });

  it("accepts Youtube and Spotify sources", () => {
    const ext = DAH_additional_sources();
    const e: Entry = { id: "e2", DAH_meta: makeEntryMeta() };
    const sources: AdditionalSources = {
      youtube: { video: "ytVideoID", from: "30", to: "60" },
      spotify: { track: "spotifyTrackID" },
    };
    ext.setAdditionalSources(e.DAH_meta, sources);
    expect(ext.getAdditionalSources(e.DAH_meta)).toStrictEqual(sources);
  });
});
