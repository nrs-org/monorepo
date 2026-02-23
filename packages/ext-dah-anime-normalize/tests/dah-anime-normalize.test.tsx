/** @jsxImportSource @nrs-org/nrsx */
import { describe, it, expect, beforeAll } from "bun:test";
import {
  newContext,
  processContext,
  makeResultMeta,
  type Result,
} from "@nrs-org/core";
import { buildData } from "@nrs-org/nrsx";
import { Document, Entry } from "@nrs-org/nrsx/elements";
import DAH_factors from "@nrs-org/ext-dah-factors";
import DAH_standards from "@nrs-org/ext-dah-standards";
import DAH_ir_source from "@nrs-org/ext-dah-ir-source";
import DAH_entry_progress from "@nrs-org/ext-dah-entry-progress";
import DAH_overall_score from "@nrs-org/ext-dah-overall-score";
import DAH_validator_suppress from "@nrs-org/ext-dah-validator-suppress";
import { AnimeConsumedProgress } from "@nrs-org/ext-dah-entry-progress/nrsx";
import {
  Additional,
  Visual,
  Writing,
  Cry,
} from "@nrs-org/ext-dah-standards/nrsx";
import DAH_anime_normalize from "../index.ts";
import { baseAnimeDocument } from "../data.tsx";

// ---------------------------------------------------------------------------
// baseAnimeDocument — structural sanity checks
// ---------------------------------------------------------------------------

describe("baseAnimeDocument", () => {
  it("renders 14 entries (10 anime + 4 music)", () => {
    const ctx = newContext({
      extensions: [
        DAH_factors(),
        DAH_standards(),
        DAH_ir_source(),
        DAH_entry_progress(),
        DAH_overall_score(),
        DAH_validator_suppress(),
      ],
    });
    const data = buildData(ctx, baseAnimeDocument);
    expect(data.entries.size).toBe(14);
    for (let i = 1; i <= 10; i++) {
      expect(data.entries.has(`A-MAL-${i}`)).toBe(true);
    }
    for (let i = 1; i <= 4; i++) {
      expect(data.entries.has(`M-VGMDB-${i}`)).toBe(true);
    }
  });

  it("base anime scores are strictly increasing after processContext", async () => {
    const overallScoreExt = DAH_overall_score();
    const ctx = newContext({
      extensions: [
        DAH_factors(),
        DAH_standards(),
        DAH_ir_source(),
        DAH_entry_progress(),
        overallScoreExt,
        DAH_validator_suppress(),
      ],
    });
    const data = buildData(ctx, baseAnimeDocument);
    const results = await processContext(ctx, data);

    let prev = -Infinity;
    for (let i = 1; i <= 10; i++) {
      const r = results.get(`A-MAL-${i}`);
      expect(r).toBeDefined();
      const score = overallScoreExt.getOverallScore((r as Result).DAH_meta);
      expect(score).toBeGreaterThan(prev);
      prev = score as number;
    }
  });
});

// ---------------------------------------------------------------------------
// DAH_anime_normalize postProcess
// ---------------------------------------------------------------------------

describe("DAH_anime_normalize", () => {
  it("attaches a normalized score to every result", async () => {
    const normalizeExt = DAH_anime_normalize();
    const ctx = newContext({
      extensions: [
        DAH_factors(),
        DAH_standards(),
        DAH_ir_source(),
        DAH_entry_progress(),
        DAH_overall_score(),
        DAH_validator_suppress(),
        normalizeExt,
      ],
    });
    const data = buildData(ctx, () => (
      <Document>
        <Entry id="E-1" title="Test Anime">
          <AnimeConsumedProgress
            status="Completed"
            boredom={1.0}
            episodes={12}
          />
          <Visual type="animated" base={0.5} unique={0.4} />
          <Writing character={0.6} story={0.6} pacing={0.8} originality={0.6} />
        </Entry>
      </Document>
    ));
    const results = await processContext(ctx, data);
    const r = results.get("E-1") as Result;
    expect(r).toBeDefined();
    expect(typeof normalizeExt.getNormalizedScore(r.DAH_meta)).toBe("number");
  });

  it("normalized score is in [1, 10]", async () => {
    const normalizeExt = DAH_anime_normalize();
    const ctx = newContext({
      extensions: [
        DAH_factors(),
        DAH_standards(),
        DAH_ir_source(),
        DAH_entry_progress(),
        DAH_overall_score(),
        DAH_validator_suppress(),
        normalizeExt,
      ],
    });
    const data = buildData(ctx, () => (
      <Document>
        <Entry id="E-1" title="Test Anime">
          <AnimeConsumedProgress
            status="Completed"
            boredom={1.0}
            episodes={12}
          />
          <Visual type="animated" base={0.5} unique={0.4} />
          <Writing character={0.6} story={0.6} pacing={0.8} originality={0.6} />
        </Entry>
      </Document>
    ));
    const results = await processContext(ctx, data);
    const score = normalizeExt.getNormalizedScore(
      (results.get("E-1") as Result).DAH_meta,
    );
    expect(score).toBeGreaterThanOrEqual(1.0);
    expect(score).toBeLessThanOrEqual(10.0);
  });

  it("a very bad anime clamps to score 1", async () => {
    const normalizeExt = DAH_anime_normalize();
    const ctx = newContext({
      extensions: [
        DAH_factors(),
        DAH_standards(),
        DAH_ir_source(),
        DAH_entry_progress(),
        DAH_overall_score(),
        DAH_validator_suppress(),
        normalizeExt,
      ],
    });
    // Score far below MAL-1 keyframe
    const data = buildData(ctx, () => (
      <Document>
        <Entry id="E-BAD" title="Absolutely Terrible">
          <AnimeConsumedProgress
            status="Abandoned"
            boredom={0.0}
            episodes={12}
          />
          <Additional value={-3} note="unwatchable" />
        </Entry>
      </Document>
    ));
    const results = await processContext(ctx, data);
    const score = normalizeExt.getNormalizedScore(
      (results.get("E-BAD") as Result).DAH_meta,
    );
    expect(score).toBe(1.0);
  });

  it("a masterpiece-level anime returns score close to 10", async () => {
    const normalizeExt = DAH_anime_normalize();
    const ctx = newContext({
      extensions: [
        DAH_factors(),
        DAH_standards(),
        DAH_ir_source(),
        DAH_entry_progress(),
        DAH_overall_score(),
        DAH_validator_suppress(),
        normalizeExt,
      ],
    });
    // Mirror MAL-10 entry to get a score near or equal to 10
    const data = buildData(ctx, baseAnimeDocument);
    const results = await processContext(ctx, data);
    // The top keyframe itself maps to exactly 10
    expect(
      normalizeExt.getNormalizedScore(
        (results.get("A-MAL-10") as Result).DAH_meta,
      ),
    ).toBe(10.0);
  });

  it("the 10 base animes normalize to exactly 1..10 after self-processing", async () => {
    const normalizeExt = DAH_anime_normalize();
    const ctx = newContext({
      extensions: [
        DAH_factors(),
        DAH_standards(),
        DAH_ir_source(),
        DAH_entry_progress(),
        DAH_overall_score(),
        DAH_validator_suppress(),
        normalizeExt,
      ],
    });
    const data = buildData(ctx, baseAnimeDocument);
    const results = await processContext(ctx, data);

    for (let i = 1; i <= 10; i++) {
      const score = normalizeExt.getNormalizedScore(
        (results.get(`A-MAL-${i}`) as Result).DAH_meta,
      );
      // Each keyframe maps to its own MAL level (within floating-point precision)
      expect(score).toBeCloseTo(i, 5);
    }
  });

  it("higher-quality anime gets a higher normalized score than lower-quality", async () => {
    const normalizeExt = DAH_anime_normalize();
    const ctx = newContext({
      extensions: [
        DAH_factors(),
        DAH_standards(),
        DAH_ir_source(),
        DAH_entry_progress(),
        DAH_overall_score(),
        DAH_validator_suppress(),
        normalizeExt,
      ],
    });
    const data = buildData(ctx, () => (
      <Document>
        <Entry id="E-LOW" title="Low Quality">
          <AnimeConsumedProgress
            status="Abandoned"
            boredom={0.3}
            episodes={12}
          />
          <Visual type="animated" base={0.2} unique={0.2} />
        </Entry>
        <Entry id="E-HIGH" title="High Quality">
          <AnimeConsumedProgress
            status="Completed"
            boredom={1.0}
            episodes={12}
          />
          <Visual type="animated" base={0.7} unique={0.5} />
          <Cry emotions="CU" />
          <Writing character={0.8} story={0.8} pacing={0.9} originality={0.8} />
        </Entry>
      </Document>
    ));
    const results = await processContext(ctx, data);
    const low = normalizeExt.getNormalizedScore(
      (results.get("E-LOW") as Result).DAH_meta,
    );
    const high = normalizeExt.getNormalizedScore(
      (results.get("E-HIGH") as Result).DAH_meta,
    );
    expect(high).toBeGreaterThan(low as number);
  });

  it("throws if DAH_overall_score is not registered", () => {
    // `DAH_anime_normalize` declares `DAH_overall_score` as a dependency, so
    // `newContext` will throw immediately at construction time — before any
    // data is built or processed.
    expect(() =>
      newContext({
        extensions: [
          DAH_factors(),
          DAH_standards(),
          DAH_ir_source(),
          DAH_entry_progress(),
          DAH_validator_suppress(),
          // no DAH_overall_score
          DAH_anime_normalize(),
        ],
      }),
    ).toThrow("DAH_overall_score");
  });

  it("sets and gets normalized score on result meta", () => {
    const ext = DAH_anime_normalize();
    const meta = makeResultMeta();
    expect(ext.getNormalizedScore(meta)).toBeUndefined();
    ext.setNormalizedScore(meta, 7.5);
    expect(ext.getNormalizedScore(meta)).toBe(7.5);
    ext.setNormalizedScore(meta, undefined);
    expect(ext.getNormalizedScore(meta)).toBeUndefined();
    expect(meta).not.toContainKey("DAH_anime_normalize");
  });
});

// ---------------------------------------------------------------------------
// Ordering — DAH_anime_normalize must run after DAH_overall_score
// ---------------------------------------------------------------------------

describe("mustRunAfter", () => {
  it("declares mustRunAfter DAH_overall_score", () => {
    const ext = DAH_anime_normalize();
    const after = ext.mustRunAfter(
      ["DAH_factors", "DAH_overall_score", "DAH_anime_normalize"],
      "postProcess",
    );
    expect(after).toContain("DAH_overall_score");
  });

  it("does not include unrelated extensions", () => {
    const ext = DAH_anime_normalize();
    const after = ext.mustRunAfter(
      ["DAH_factors", "DAH_standards"],
      "postProcess",
    );
    expect(after).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// baseAnimeContextConfig override
// ---------------------------------------------------------------------------

describe("baseAnimeContextConfig override", () => {
  let defaultScores: number[];
  let overrideScores: number[];

  beforeAll(async () => {
    // Default: use the caller's context implicitly
    const normalizeExt = DAH_anime_normalize();
    const ctx = newContext({
      extensions: [
        DAH_factors(),
        DAH_standards(),
        DAH_ir_source(),
        DAH_entry_progress(),
        DAH_overall_score(),
        DAH_validator_suppress(),
        normalizeExt,
      ],
    });
    const data = buildData(ctx, baseAnimeDocument);
    const results = await processContext(ctx, data);
    defaultScores = Array.from({ length: 10 }, (_, i) => {
      const r = results.get(`A-MAL-${i + 1}`) as Result;
      return normalizeExt.getNormalizedScore(r.DAH_meta) ?? 0;
    });

    // Override: custom context config (same extensions, so scores should match)
    const baseAnimeContextConfig = {
      extensions: [
        DAH_factors(),
        DAH_standards(),
        DAH_ir_source(),
        DAH_entry_progress(),
        DAH_overall_score(),
        DAH_validator_suppress(),
      ],
    };
    const normalizeExt2 = DAH_anime_normalize({ baseAnimeContextConfig });
    const ctx2 = newContext({
      extensions: [
        DAH_factors(),
        DAH_standards(),
        DAH_ir_source(),
        DAH_entry_progress(),
        DAH_overall_score(),
        DAH_validator_suppress(),
        normalizeExt2,
      ],
    });
    const data2 = buildData(ctx2, baseAnimeDocument);
    const results2 = await processContext(ctx2, data2);
    overrideScores = Array.from({ length: 10 }, (_, i) => {
      const r = results2.get(`A-MAL-${i + 1}`) as Result;
      return normalizeExt2.getNormalizedScore(r.DAH_meta) ?? 0;
    });
  });

  it("produces the same keyframe scores regardless of context source", () => {
    for (let i = 0; i < 10; i++) {
      expect(overrideScores[i]).toBeCloseTo(defaultScores[i] ?? 0, 5);
    }
  });
});
