import { describe, it, expect, beforeAll } from "bun:test";
import { newContext } from "@nrs-org/core";
import type { Data } from "@nrs-org/core";

import DAH_factors from "@nrs-org/ext-dah-factors";
import DAH_standards from "@nrs-org/ext-dah-standards";
import DAH_ir_source from "@nrs-org/ext-dah-ir-source";
import DAH_entry_progress from "@nrs-org/ext-dah-entry-progress";
import DAH_entry_title from "@nrs-org/ext-dah-entry-title";
import DAH_entry_type from "@nrs-org/ext-dah-entry-type";
import DAH_validator_suppress from "@nrs-org/ext-dah-validator-suppress";

import { buildData } from "../index";
import {
  Document,
  Entry,
  Cry,
  PADS,
  CryPADS,
  MaxAEIPADS,
  AEI,
  NEI,
  EHI,
  EPI,
  Waifu,
  Jumpscare,
  SleeplessNight,
  Politics,
  Additional,
  Music,
  Visual,
  Writing,
  AnimeConsumedProgress,
  Dropped,
  Meme,
  FeatureMusic,
  Remix,
  KilledBy,
} from "../elements";

// ---------------------------------------------------------------------------
// Test context setup
// ---------------------------------------------------------------------------

function makeCtx() {
  return newContext({
    extensions: [
      DAH_factors(),
      DAH_standards(),
      DAH_ir_source(),
      DAH_entry_progress(),
      DAH_entry_title(),
      DAH_entry_type(),
      DAH_validator_suppress(),
    ],
  });
}

// ---------------------------------------------------------------------------
// Integration: a realistic multi-entry document
// ---------------------------------------------------------------------------

describe("buildData — integration", () => {
  let data: Data;
  const ctx = makeCtx();

  beforeAll(() => {
    data = buildData(ctx, () => (
      <Document context={ctx}>
        {/* Entry 1: anime with consumed progress, visual, writing */}
        <Entry id="E-ANIME-1" title="Test Anime 1">
          <AnimeConsumedProgress
            status="Completed"
            boredom={0.1}
            episodes={12}
          />
          <Visual type="animated" base={0.5} unique={0.4} />
          <Writing character={0.6} story={0.7} pacing={0.5} originality={0.4} />
        </Entry>

        {/* Entry 2: music track with cry+PADS */}
        <Entry id="E-MUSIC-1" title="Test Track 1">
          <Music base={0.8} />
          <CryPADS emotions="CU" length={7} />
        </Entry>

        {/* Entry 3: cry, ehi */}
        <Entry id="E-ANIME-2" title="Test Anime 2">
          <AnimeConsumedProgress
            status="Abandoned"
            boredom={0.5}
            episodes={3}
          />
          <Cry emotions="AU" />
          <EHI />
        </Entry>

        {/* Entry 4: aei + nei */}
        <Entry id="E-ANIME-3" title="Test Anime 3">
          <AnimeConsumedProgress
            status="Completed"
            boredom={0.0}
            episodes={24}
          />
          <AEI emotions="AP" base={0.8} />
          <NEI emotions="MU" base={0.3} />
        </Entry>

        {/* Entry 5: pads, additional, dropped */}
        <Entry id="E-ANIME-4" title="Test Anime 4">
          <AnimeConsumedProgress
            status="Abandoned"
            boredom={0.9}
            episodes={1}
          />
          <Dropped />
          <Additional value={-1.5} note="bad pacing" />
          <PADS emotions="MP" length={14} />
        </Entry>

        {/* Entry 6: waifu */}
        <Entry id="E-ANIME-5" title="Test Anime 5">
          <AnimeConsumedProgress
            status="Completed"
            boredom={0.2}
            episodes={13}
          />
          <Waifu waifu="TestWaifu" length={90} />
        </Entry>

        {/* Entry 7: jumpscare, sleeplessNight */}
        <Entry id="E-ANIME-6" title="Test Anime 6">
          <AnimeConsumedProgress
            status="Completed"
            boredom={0.0}
            episodes={25}
          />
          <Jumpscare />
          <SleeplessNight />
        </Entry>

        {/* Entry 8: politics, epi */}
        <Entry id="E-ANIME-7" title="Test Anime 7">
          <AnimeConsumedProgress
            status="Completed"
            boredom={0.1}
            episodes={12}
          />
          <Politics />
          <EPI base={0.6} />
        </Entry>

        {/* Entry 9: meme */}
        <Entry id="E-ANIME-8" title="Test Anime 8">
          <AnimeConsumedProgress
            status="Completed"
            boredom={0.3}
            episodes={12}
          />
          <Meme strength={1.5} length={30} />
        </Entry>

        {/* Entry 10: maxAEIPADS */}
        <Entry id="E-ANIME-9" title="Test Anime 9">
          <AnimeConsumedProgress
            status="Completed"
            boredom={0.0}
            episodes={12}
          />
          <MaxAEIPADS emotions="AP" length={5} />
        </Entry>

        {/* Entry 11: featureMusic relation */}
        <Entry id="E-MUSIC-2" title="Test Track 2">
          <Music base={0.6} />
          <FeatureMusic id="E-MUSIC-1" />
        </Entry>

        {/* Entry 12: remix relation */}
        <Entry id="E-MUSIC-3" title="Test Track 3 (Remix)">
          <Music base={0.5} />
          <Remix id="E-MUSIC-1" />
        </Entry>

        {/* Entry 13: killedBy relation */}
        <Entry id="E-ANIME-10" title="Test Anime 10">
          <AnimeConsumedProgress
            status="Completed"
            boredom={0.2}
            episodes={12}
          />
          <KilledBy id="E-ANIME-9" potential={0.8} effect={0.6} />
        </Entry>

        {/* Entry 14: custom episodeDuration */}
        <Entry id="E-ANIME-11" title="Test Anime 11">
          <AnimeConsumedProgress
            status="Completed"
            boredom={0.1}
            episodes={24}
            episodeDuration="23:30"
          />
        </Entry>
      </Document>
    ));
  });

  it("produces 14 entries", () => {
    expect(data.entries.size).toBe(14);
  });

  it("all entry IDs are present", () => {
    const ids = [
      "E-ANIME-1",
      "E-MUSIC-1",
      "E-ANIME-2",
      "E-ANIME-3",
      "E-ANIME-4",
      "E-ANIME-5",
      "E-ANIME-6",
      "E-ANIME-7",
      "E-ANIME-8",
      "E-ANIME-9",
      "E-MUSIC-2",
      "E-MUSIC-3",
      "E-ANIME-10",
      "E-ANIME-11",
    ];
    for (const id of ids) {
      expect(data.entries.has(id)).toBe(true);
    }
  });

  it("produces a non-zero impact count", () => {
    expect(data.impacts.length).toBeGreaterThan(0);
  });

  it("all impacts reference valid entry IDs", () => {
    for (const impact of data.impacts) {
      for (const id of impact.contributors.keys()) {
        expect(data.entries.has(id)).toBe(true);
      }
    }
  });

  it("produces featureMusic, remix, and killedBy relations", () => {
    expect(data.relations.length).toBe(3);
  });

  it("all relations reference valid entry IDs", () => {
    for (const rel of data.relations) {
      for (const id of rel.contributors.keys()) {
        expect(data.entries.has(id)).toBe(true);
      }
    }
  });

  it("E-ANIME-1 has a non-zero visual impact score", () => {
    const animeImpacts = data.impacts.filter((imp) =>
      imp.contributors.has("E-ANIME-1"),
    );
    const visualImpact = animeImpacts.find((imp) => {
      const meta = imp.DAH_meta as Record<string, unknown>;
      const ir = meta["DAH_ir_source"] as Record<string, unknown> | undefined;
      return ir?.name === "visual";
    });
    expect(visualImpact).toBeDefined();
    if (!visualImpact) throw new Error("visualImpact not found");
    expect(visualImpact.score.data.some((v: number) => v !== 0)).toBe(true);
  });

  it("E-MUSIC-1 cryPADS produces exactly 2 impacts (plus 1 music = 3 total)", () => {
    const musicImpacts = data.impacts.filter((imp) =>
      imp.contributors.has("E-MUSIC-1"),
    );
    // music (1) + cry (1) + pads (1) = 3 total for E-MUSIC-1
    expect(musicImpacts.length).toBe(3);
  });

  it("E-ANIME-4 dropped impact has a negative Boredom score", () => {
    const droppedImpact = data.impacts.find((imp) => {
      const meta = imp.DAH_meta as Record<string, unknown>;
      const ir = meta["DAH_ir_source"] as Record<string, unknown> | undefined;
      return ir?.name === "dropped" && imp.contributors.has("E-ANIME-4");
    });
    expect(droppedImpact).toBeDefined();
    if (!droppedImpact) throw new Error("droppedImpact not found");
    // Boredom is at factorIndex 9
    expect(droppedImpact.score.data[9]).toBeLessThan(0);
  });

  it("maxAEIPADS produces 2 impacts for E-ANIME-9 (plus 1 animeConsumed = 3 total)", () => {
    const animeImpacts = data.impacts.filter((imp) =>
      imp.contributors.has("E-ANIME-9"),
    );
    expect(animeImpacts.length).toBe(3);
  });

  it("buildData clears render context after completion", () => {
    // Calling buildData again should work without state bleed.
    const ctx2 = makeCtx();
    const data2 = buildData(ctx2, () => (
      <Document context={ctx2}>
        <Entry id="SOLO" title="Solo Entry">
          <AnimeConsumedProgress
            status="Completed"
            boredom={0.0}
            episodes={1}
          />
        </Entry>
      </Document>
    ));
    expect(data2.entries.size).toBe(1);
    expect(data2.entries.has("SOLO")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Unit: emotion string parsing (via Cry component)
// ---------------------------------------------------------------------------

describe("parseEmotions", () => {
  it("throws on unknown emotion factor", () => {
    const ctx = makeCtx();
    let threw = false;
    try {
      buildData(ctx, () => (
        <Document context={ctx}>
          <Entry id="E1" title="E1">
            <Cry emotions="INVALID_FACTOR_XYZ" />
          </Entry>
        </Document>
      ));
    } catch {
      threw = true;
    }
    expect(threw).toBe(true);
  });

  it("handles multi-emotion weighted string", () => {
    const ctx = makeCtx();
    const data = buildData(ctx, () => (
      <Document context={ctx}>
        <Entry id="E1" title="E1">
          <Cry emotions="AP-0.7:CU-0.3" />
        </Entry>
      </Document>
    ));
    const cryImpact = data.impacts.find((imp) => {
      const ir = (imp.DAH_meta as Record<string, unknown>)["DAH_ir_source"] as
        | Record<string, unknown>
        | undefined;
      return ir?.name === "cry";
    });
    expect(cryImpact).toBeDefined();
    if (!cryImpact) throw new Error("cryImpact not found");
    // Both AP (index 1) and CU (index 4) should be non-zero.
    expect(cryImpact.score.data[1]).toBeGreaterThan(0); // AP
    expect(cryImpact.score.data[4]).toBeGreaterThan(0); // CU
  });
});

// ---------------------------------------------------------------------------
// User-defined function components
// ---------------------------------------------------------------------------

describe("user-defined function components", () => {
  it("supports composing entries from custom components", () => {
    const ctx = makeCtx();

    // A reusable component that wraps common anime entry children.
    function StandardAnime({ id, title }: { id: string; title: string }) {
      return (
        <Entry id={id} title={title}>
          <AnimeConsumedProgress
            status="Completed"
            boredom={0.1}
            episodes={12}
          />
          <Visual type="animated" base={0.5} unique={0.3} />
        </Entry>
      );
    }

    const data = buildData(ctx, () => (
      <Document context={ctx}>
        <StandardAnime id="E-CUSTOM-1" title="Custom Anime A" />
        <StandardAnime id="E-CUSTOM-2" title="Custom Anime B" />
      </Document>
    ));

    expect(data.entries.size).toBe(2);
    expect(data.entries.has("E-CUSTOM-1")).toBe(true);
    expect(data.entries.has("E-CUSTOM-2")).toBe(true);
    // Each entry has 2 impacts: animeConsumed + visual
    const impacts1 = data.impacts.filter((i) =>
      i.contributors.has("E-CUSTOM-1"),
    );
    const impacts2 = data.impacts.filter((i) =>
      i.contributors.has("E-CUSTOM-2"),
    );
    expect(impacts1.length).toBe(2);
    expect(impacts2.length).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------

describe("error handling", () => {
  it("throws when <Entry> is nested", () => {
    const ctx = makeCtx();
    expect(() =>
      buildData(ctx, () => (
        <Document context={ctx}>
          <Entry id="OUTER" title="Outer">
            <Entry id="INNER" title="Inner" />
          </Entry>
        </Document>
      )),
    ).toThrow("nrsx: <Entry> elements cannot be nested");
  });

  it("throws when impact element is used outside <Entry>", () => {
    const ctx = makeCtx();
    expect(() =>
      buildData(ctx, () => (
        <Document context={ctx}>
          <Cry emotions="AP" />
        </Document>
      )),
    ).toThrow("nrsx: <Cry> must be inside an <Entry>");
  });

  it("throws on unknown visual type", () => {
    const ctx = makeCtx();
    expect(() =>
      buildData(ctx, () => (
        <Document context={ctx}>
          <Entry id="E1" title="E1">
            <Visual type={"badtype" as "animated"} base={0.5} unique={0.3} />
          </Entry>
        </Document>
      )),
    ).toThrow('nrsx: unknown visual type "badtype"');
  });

  it("clears render state even when fn() throws", () => {
    const ctx = makeCtx();
    expect(() =>
      buildData(ctx, () => {
        throw new Error("render exploded");
      }),
    ).toThrow("render exploded");

    // Subsequent call should still work.
    const data = buildData(ctx, () => (
      <Document context={ctx}>
        <Entry id="RECOVERY" title="Recovery">
          <AnimeConsumedProgress status="Completed" boredom={0} episodes={1} />
        </Entry>
      </Document>
    ));
    expect(data.entries.size).toBe(1);
  });
});
