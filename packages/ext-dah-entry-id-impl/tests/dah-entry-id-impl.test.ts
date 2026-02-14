import { describe, it, expect } from "bun:test";
import DAH_entry_id_impl, {
  type MusicIdLiteral,
  type AnimeIdLiteral,
  type ParsedAnime,
  type ParsedCustom,
  type ParsedGeneric,
} from "../index";
import { makeEntryMeta, newContext, Vector } from "@nrs-org/core";

describe("ext-dah-entry-id-impl", () => {
  it("constructs and reports dependency", () => {
    const ext = DAH_entry_id_impl();
    expect(ext.dependencies?.() ?? []).toEqual(["DAH_entry_id"]);
  });

  it("parses anime id", () => {
    const ext = DAH_entry_id_impl();
    const id = "A-MAL-12345" satisfies AnimeIdLiteral;
    const p = ext.parseEntryId(id);
    expect(p).toBeTruthy();
    expect(p?.kind).toBe("anime");
    expect(ext.validateEntryId(id)).toBe(true);
  });

  it("parses music id with subtype", () => {
    const ext = DAH_entry_id_impl();
    const id = "M-VGMDB-AL-89363-2" satisfies MusicIdLiteral; // album 89363 track 2
    const p = ext.parseEntryId(id);
    expect(p).toBeTruthy();
    expect(p?.kind).toBe("music");
    expect(ext.validateEntryId(id)).toBe(true);
  });

  it("rejects bad ids", () => {
    const ext = DAH_entry_id_impl();
    expect(ext.parseEntryId("Z-FOO-1")).toBeUndefined();
    expect(ext.validateEntryId("Z-FOO-1")).toBe(false);
  });

  it("parses anime id with suffix and timestamp-custom forms", () => {
    const ext = DAH_entry_id_impl();
    // this ID does not satisfies AnimeIdLiteral,
    // but it is still technically a valid ID according to DAH_entry_id_impl
    const id = "A-MAL-12345-some-extra";
    const p = ext.parseEntryId(id);
    expect(p).toBeTruthy();
    expect(p?.kind).toBe("anime");
    expect((p as ParsedAnime)?.suffix).toBe("some-extra");

    // timestamp-style custom id with and without 'T'
    const t1 = "A-20070405T143050";
    const t2 = "A-20070405143050";
    const pc1 = ext.parseEntryId(t1);
    const pc2 = ext.parseEntryId(t2);
    expect(pc1).toBeTruthy();
    expect(pc2).toBeTruthy();
    expect(pc1?.kind).toBe("custom");
    expect((pc1 as ParsedCustom)?.rankedTimestamp).toBe("20070405T143050");
  });

  it("parses music custom timestamp and rejects bad music forms", () => {
    const ext = DAH_entry_id_impl();
    const ts = "M-20220101T000000-extra-rest";
    const p = ext.parseEntryId(ts);
    expect(p).toBeTruthy();
    expect(p?.kind).toBe("custom");
    expect((p as ParsedCustom)?.rest).toBe("extra-rest");

    // wrong db and wrong subtype
    expect(ext.parseEntryId("M-FOO-AL-1")).toBeUndefined();
    expect(ext.parseEntryId("M-VGMDB-XX-1")).toBeUndefined();
  });

  it("parses visual novel and generic/gf/o cases", () => {
    const ext = DAH_entry_id_impl();
    const v = "V-VNDB-42";
    const pv = ext.parseEntryId(v);
    expect(pv).toBeTruthy();
    expect(pv?.kind).toBe("visual-novel");

    // wrong VN db
    expect(ext.parseEntryId("V-FOO-1")).toBeUndefined();

    // generic L/F/G
    const l = "L-AL-987";
    const pl = ext.parseEntryId(l);
    expect(pl).toBeTruthy();
    expect(pl?.kind).toBe("generic");
    expect((pl as ParsedGeneric).components[0]).toBe("AL");

    // GF case with extra components
    const gf = "GF-MAL-123-xyz";
    const pgf = ext.parseEntryId(gf);
    expect(pgf).toBeTruthy();
    expect(pgf?.kind).toBe("generic");
    expect((pgf as ParsedGeneric).components).toEqual(["MAL", "123", "xyz"]);

    // O prefix timestamp custom
    expect(ext.parseEntryId("O-20200101T123000")).toBeTruthy();
  });

  it("rejects short/insufficient-token forms for prefixes", () => {
    const ext = DAH_entry_id_impl();
    // too-short anime (needs at least A-DB-ID)
    expect(ext.parseEntryId("A-AL")).toBeUndefined();
    // too-short music (needs M-VGMDB-AL|AR-<id>)
    expect(ext.parseEntryId("M-VGMDB-AL")).toBeUndefined();
    // too-short VN
    expect(ext.parseEntryId("V-VNDB")).toBeUndefined();
    // too-short generic L
    expect(ext.parseEntryId("L-AL")).toBeUndefined();
    // O non-timestamp should be rejected here (timestamp handled earlier)
    expect(ext.parseEntryId("O-foo")).toBeUndefined();
    // GF too short
    expect(ext.parseEntryId("GF-AL")).toBeUndefined();
  });

  it("preprocessData validates entries and honours config", async () => {
    const ext = DAH_entry_id_impl();
    const good = { id: "A-MAL-1", DAH_meta: makeEntryMeta() };
    const bad = { id: "Z-FOO-1", DAH_meta: makeEntryMeta() };
    const dataGood = {
      entries: new Map([["a", good]]),
      impacts: [],
      relations: [],
    };
    const ctx = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
      extensions: {
        DAH_entry_id_impl: ext,
      },
    });
    expect(() => ext.preprocessData?.(ctx, dataGood)).not.toThrow();

    const dataBad = {
      entries: new Map([
        ["a", good],
        ["b", bad],
      ]),
      impacts: [],
      relations: [],
    };
    expect(() => ext.preprocessData?.(ctx, dataBad)).toThrow();

    // when validation disabled, no throw
    const extNoVal = DAH_entry_id_impl({ validateEntries: false });
    const ctxNoVal = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
      extensions: {
        DAH_entry_id_impl: extNoVal,
      },
    });
    expect(() => extNoVal.preprocessData?.(ctxNoVal, dataBad)).not.toThrow();
  });

  it("throws when parsing with throwOnInvalid", () => {
    const ext = DAH_entry_id_impl();
    expect(() => ext.parseEntryId("Z-FOO-1", true)).toThrow();
    expect(() => ext.validateEntryId("Z-FOO-1", true)).toThrow();
  });
});
