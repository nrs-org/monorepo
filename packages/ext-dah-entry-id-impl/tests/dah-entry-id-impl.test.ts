import { describe, it, expect } from "bun:test";
import DAH_entry_id_impl, {
  type MusicIdLiteral,
  type AnimeIdLiteral,
} from "../index";

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
});
