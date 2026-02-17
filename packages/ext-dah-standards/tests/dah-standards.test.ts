import { describe, it, expect } from "bun:test";
import { newContext, ScalarMatrix, DiagonalMatrix } from "@nrs-org/core";
import DAH_factors, {
  AP,
  MP,
  AU,
  AM,
  AV,
  AL,
  Boredom,
  Additional,
} from "@nrs-org/ext-dah-factors";
import DAH_standards, {
  Sign,
  VisualType,
  Duration,
  type DatePeriod,
} from "../index";

function makeCtx() {
  const factors = DAH_factors();
  const standards = DAH_standards();
  const ctx = newContext({ extensions: [factors, standards] });
  return { ctx, standards };
}

function contribs(id = "entry1") {
  return new Map([[id, new ScalarMatrix(1.0)]]);
}

// ---- basic construction & dependencies ----

describe("DAH_standards", () => {
  it("has correct name and dependencies", () => {
    const ext = DAH_standards();
    expect(ext.name).toBe("DAH_standards");
    expect(ext.dependencies?.()).toEqual(["DAH_factors"]);
  });
});

// ---- emotion ----

describe("emotion", () => {
  it("creates an emotion impact with correct meta", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.emotion(ctx, contribs(), 3.0, [[AP, 0.8]]);
    expect(impact.score.data.length).toBe(11);
    expect(impact.DAH_meta.DAH_meta_owner).toBe("impact");
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    expect(ir.extension).toBe("DAH_standards");
    expect(ir.version).toBe("1.1.1");
    expect(ir.name).toBe("emotion");
  });

  it("produces a non-zero score at the AP index", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.emotion(ctx, contribs(), 3.0, [[AP, 1.0]]);
    expect(impact.score.data[AP.factorIndex]).toBeGreaterThan(0);
  });

  it("throws on empty emotions", () => {
    const { ctx, standards } = makeCtx();
    expect(() => standards.emotion(ctx, contribs(), 3.0, [])).toThrow(
      "empty emotion list",
    );
  });

  it("supports multiple emotions", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.emotion(ctx, contribs(), 2.0, [
      [AP, 0.5],
      [MP, 0.8],
    ]);
    expect(impact.score.data[AP.factorIndex]).toBeGreaterThan(0);
    expect(impact.score.data[MP.factorIndex]).toBeGreaterThan(0);
  });
});

// ---- cry ----

describe("cry", () => {
  it("creates a cry impact with base 4.0", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.cry(ctx, contribs(), [[AP, 1.0]]);
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    expect(ir.name).toBe("cry");
    const emotionArgs = ir.emotionArgs as { base: number };
    expect(emotionArgs.base).toBe(4.0);
  });
});

// ---- pads ----

describe("pads", () => {
  it("computes score from period durations", () => {
    const { ctx, standards } = makeCtx();
    const periods: DatePeriod[] = [
      { type: "duration", length: Duration.fromDays(3) },
    ];
    const impact = standards.pads(ctx, contribs(), periods, [[MP, 1.0]]);
    expect(impact.score.data[MP.factorIndex]).toBeGreaterThan(0);
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    expect(ir.name).toBe("pads");
  });

  it("supports fromto periods", () => {
    const { ctx, standards } = makeCtx();
    const from = Date.now();
    const to = from + Duration.fromDays(5);
    const periods: DatePeriod[] = [{ type: "fromto", from, to }];
    const impact = standards.pads(ctx, contribs(), periods, [[AP, 1.0]]);
    expect(impact.score.data[AP.factorIndex]).toBeGreaterThan(0);
  });

  it("caps days at 10 for the score formula", () => {
    const { ctx, standards } = makeCtx();
    // Very long period: 100 days should be capped at 10 days internally
    const shortPeriods: DatePeriod[] = [
      { type: "duration", length: Duration.fromDays(10) },
    ];
    const longPeriods: DatePeriod[] = [
      { type: "duration", length: Duration.fromDays(100) },
    ];
    const impactShort = standards.pads(ctx, contribs(), shortPeriods, [
      [AP, 1.0],
    ]);
    const impactLong = standards.pads(ctx, contribs(), longPeriods, [
      [AP, 1.0],
    ]);
    expect(impactShort.score.data[AP.factorIndex]).toBeCloseTo(
      impactLong.score.data[AP.factorIndex] ?? 0,
      10,
    );
  });
});

// ---- aei / nei ----

describe("aei", () => {
  it("maps factor 0 → base 2.0 for positive sign", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.aei(ctx, contribs(), 0.0, Sign.Positive, [
      [AP, 1.0],
    ]);
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    expect(ir.name).toBe("aei");
    const args = ir.emotionArgs as { base: number };
    expect(args.base).toBeCloseTo(2.0, 10);
  });

  it("maps factor 1 → base 3.0 for positive sign", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.aei(ctx, contribs(), 1.0, Sign.Positive, [
      [AP, 1.0],
    ]);
    const args = (impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>)
      .emotionArgs as { base: number };
    expect(args.base).toBeCloseTo(3.0, 10);
  });

  it("inverts base for negative sign", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.aei(ctx, contribs(), 0.5, Sign.Negative, [
      [AP, 1.0],
    ]);
    const args = (impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>)
      .emotionArgs as { base: number };
    expect(args.base).toBeLessThan(0);
  });

  it("throws for factor out of [0,1] range", () => {
    const { ctx, standards } = makeCtx();
    expect(() =>
      standards.aei(ctx, contribs(), 1.5, Sign.Positive, [[AP, 1.0]]),
    ).toThrow("out of bounds");
  });
});

describe("nei", () => {
  it("maps factor 0 → base 0.0", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.nei(ctx, contribs(), 0.0, Sign.Positive, [
      [AP, 1.0],
    ]);
    const args = (impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>)
      .emotionArgs as { base: number };
    expect(args.base).toBeCloseTo(0.0, 10);
  });

  it("maps factor 1 → base 2.0", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.nei(ctx, contribs(), 1.0, Sign.Positive, [
      [AP, 1.0],
    ]);
    const args = (impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>)
      .emotionArgs as { base: number };
    expect(args.base).toBeCloseTo(2.0, 10);
  });
});

// ---- maxAEIPADS / cryPADS ----

describe("maxAEIPADS", () => {
  it("returns two impacts", () => {
    const { ctx, standards } = makeCtx();
    const periods: DatePeriod[] = [
      { type: "duration", length: Duration.fromDays(2) },
    ];
    const results = standards.maxAEIPADS(ctx, contribs(), periods, [[AP, 1.0]]);
    expect(results.length).toBe(2);
    const names = results.map(
      (r) => (r.DAH_meta["DAH_ir_source"] as Record<string, unknown>).name,
    );
    expect(names).toEqual(["aei", "pads"]);
  });
});

describe("cryPADS", () => {
  it("returns two impacts", () => {
    const { ctx, standards } = makeCtx();
    const periods: DatePeriod[] = [
      { type: "duration", length: Duration.fromDays(1) },
    ];
    const results = standards.cryPADS(ctx, contribs(), periods, [[MP, 1.0]]);
    expect(results.length).toBe(2);
    const names = results.map(
      (r) => (r.DAH_meta["DAH_ir_source"] as Record<string, unknown>).name,
    );
    expect(names).toEqual(["cry", "pads"]);
  });
});

// ---- waifu ----

describe("waifu", () => {
  it("creates a waifu impact using MP factor", () => {
    const { ctx, standards } = makeCtx();
    const periods: DatePeriod[] = [
      { type: "duration", length: Duration.fromDays(90) },
    ];
    const impact = standards.waifu(ctx, contribs(), "TestWaifu", periods);
    expect(impact.score.data[MP.factorIndex]).toBeGreaterThan(0);
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    expect(ir.name).toBe("waifu");
    const waifuArgs = ir.waifuArgs as { waifu: string };
    expect(waifuArgs.waifu).toBe("TestWaifu");
  });
});

// ---- ehi / epi ----

describe("ehi", () => {
  it("creates an EHI impact with base 3.5 on AP", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.ehi(ctx, contribs());
    expect(impact.score.data[AP.factorIndex]).toBeGreaterThan(0);
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    expect(ir.name).toBe("ehi");
  });
});

describe("epi", () => {
  it("maps factor 0→3.5, 1→4.5", () => {
    const { ctx, standards } = makeCtx();
    const low = standards.epi(ctx, contribs(), 0.0);
    const high = standards.epi(ctx, contribs(), 1.0);
    const lowArgs = (low.DAH_meta["DAH_ir_source"] as Record<string, unknown>)
      .emotionArgs as { base: number };
    const highArgs = (high.DAH_meta["DAH_ir_source"] as Record<string, unknown>)
      .emotionArgs as { base: number };
    expect(lowArgs.base).toBeCloseTo(3.5, 10);
    expect(highArgs.base).toBeCloseTo(4.5, 10);
  });
});

// ---- jumpscare / sleeplessNight ----

describe("jumpscare", () => {
  it("creates a jumpscare impact on MP", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.jumpscare(ctx, contribs());
    expect(impact.score.data[MP.factorIndex]).toBeGreaterThan(0);
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    expect(ir.name).toBe("jumpscare");
  });
});

describe("sleeplessNight", () => {
  it("creates a sleeplessNight impact on MP with base 4.0", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.sleeplessNight(ctx, contribs());
    expect(impact.score.data[MP.factorIndex]).toBeGreaterThan(0);
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    expect(ir.name).toBe("sleeplessNight");
  });
});

// ---- politics ----

describe("politics", () => {
  it("creates a politics impact on Additional with value 0.75", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.politics(ctx, contribs());
    expect(impact.score.data[Additional.factorIndex]).toBe(0.75);
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    expect(ir.name).toBe("politics");
  });
});

// ---- interestField ----

describe("interestField", () => {
  it("uses 2.0 for new field", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.interestField(ctx, contribs(), true);
    expect(impact.score.data[Additional.factorIndex]).toBe(2.0);
  });

  it("uses 1.0 for existing field", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.interestField(ctx, contribs(), false);
    expect(impact.score.data[Additional.factorIndex]).toBe(1.0);
  });
});

// ---- consumed / animeConsumed ----

describe("consumed", () => {
  it("computes boredom score for tiny duration", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.consumed(
      ctx,
      contribs(),
      0.5,
      Duration.fromMinutes(3),
    );
    expect(impact.score.data[Boredom.factorIndex]).toBeGreaterThan(0);
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    const args = ir.consumedArgs as { baseType: string };
    expect(args.baseType).toBe("tiny");
  });

  it("computes boredom score for short duration", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.consumed(
      ctx,
      contribs(),
      0.5,
      Duration.fromMinutes(60),
    );
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    const args = ir.consumedArgs as { baseType: string };
    expect(args.baseType).toBe("short");
  });

  it("computes boredom score for long duration", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.consumed(
      ctx,
      contribs(),
      0.5,
      Duration.fromHours(5),
    );
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    const args = ir.consumedArgs as { baseType: string };
    expect(args.baseType).toBe("long");
  });
});

describe("animeConsumed", () => {
  it("delegates to consumed with episode-scaled duration", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.animeConsumed(ctx, contribs(), 0.3, 12);
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    expect(ir.name).toBe("animeConsumed");
    const acArgs = ir.animeConsumedArgs as {
      episodes: number;
      episodeDurationMs: number;
    };
    expect(acArgs.episodes).toBe(12);
    expect(acArgs.episodeDurationMs).toBe(Duration.fromMinutes(20));
  });

  it("uses custom episode duration when provided", () => {
    const { ctx, standards } = makeCtx();
    const customDur = Duration.fromMinutes(45);
    const impact = standards.animeConsumed(ctx, contribs(), 0.3, 6, customDur);
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    const acArgs = ir.animeConsumedArgs as {
      episodeDurationMs: number;
    };
    expect(acArgs.episodeDurationMs).toBe(customDur);
  });
});

// ---- dropped ----

describe("dropped", () => {
  it("creates negative boredom score", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.dropped(ctx, contribs());
    expect(impact.score.data[Boredom.factorIndex]).toBe(-0.5);
  });
});

// ---- meme ----

describe("meme", () => {
  it("creates a meme impact on AP", () => {
    const { ctx, standards } = makeCtx();
    const periods: DatePeriod[] = [
      { type: "duration", length: Duration.fromDays(30) },
    ];
    const impact = standards.meme(ctx, contribs(), 1.0, periods);
    expect(impact.score.data[AP.factorIndex]).toBeGreaterThan(0);
  });

  it("throws for strength >= 2.0", () => {
    const { ctx, standards } = makeCtx();
    const periods: DatePeriod[] = [
      { type: "duration", length: Duration.fromDays(1) },
    ];
    expect(() => standards.meme(ctx, contribs(), 2.0, periods)).toThrow(
      "not in [0, 2)",
    );
  });

  it("throws for strength < 0", () => {
    const { ctx, standards } = makeCtx();
    const periods: DatePeriod[] = [
      { type: "duration", length: Duration.fromDays(1) },
    ];
    expect(() => standards.meme(ctx, contribs(), -0.1, periods)).toThrow(
      "not in [0, 2)",
    );
  });
});

// ---- additional ----

describe("additional", () => {
  it("creates an additional impact with custom value and description", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.additional(ctx, contribs(), 1.5, "test desc");
    expect(impact.score.data[Additional.factorIndex]).toBe(1.5);
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    const args = ir.additionalArgs as { description: string };
    expect(args.description).toBe("test desc");
  });
});

// ---- music ----

describe("music", () => {
  it("scores AM at musicBase * 3.0", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.music(ctx, contribs(), 0.5);
    expect(impact.score.data[AM.factorIndex]).toBeCloseTo(1.5, 10);
  });
});

// ---- visual ----

describe("visual", () => {
  it("computes visual score correctly", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.visual(
      ctx,
      contribs(),
      VisualType.Animated,
      0.8,
      0.5,
    );
    // base=0.8, unique=0.5, factor=1.0
    // visualScore = ((0.8 * (0.5 + 2.0)) / 3.0) * 1.0 * 2.0
    const expected = ((0.8 * 2.5) / 3.0) * 1.0 * 2.0;
    expect(impact.score.data[AV.factorIndex]).toBeCloseTo(expected, 10);
  });

  it("applies visual type factor", () => {
    const { ctx, standards } = makeCtx();
    const animated = standards.visual(
      ctx,
      contribs(),
      VisualType.Animated,
      1.0,
      0.0,
    );
    const albumArt = standards.visual(
      ctx,
      contribs(),
      VisualType.AlbumArt,
      1.0,
      0.0,
    );
    expect(animated.score.data[AV.factorIndex]).toBeGreaterThan(
      albumArt.score.data[AV.factorIndex] ?? 0,
    );
  });
});

// ---- osuSong ----

describe("osuSong", () => {
  it("combines personal and community factors on AP", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.osuSong(ctx, contribs(), 1.0, 1.0);
    // personalFactor = 0.5, communityFactor = 0.2
    expect(impact.score.data[AP.factorIndex]).toBeCloseTo(0.7, 10);
  });

  it("throws for out of range personal", () => {
    const { ctx, standards } = makeCtx();
    expect(() => standards.osuSong(ctx, contribs(), 1.5, 0.5)).toThrow(
      "out of bounds",
    );
  });
});

// ---- writing ----

describe("writing", () => {
  it("computes writing score on AL factor", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.writing(ctx, contribs(), 0.8, 0.9, 0.7, 0.5);
    expect(impact.score.data[AL.factorIndex]).toBeGreaterThan(0);
    const ir = impact.DAH_meta["DAH_ir_source"] as Record<string, unknown>;
    expect(ir.name).toBe("writing");
  });

  it("max params give expected score", () => {
    const { ctx, standards } = makeCtx();
    const impact = standards.writing(ctx, contribs(), 1.0, 1.0, 1.0, 1.0);
    // M=4, cc=1, sq=1, p=1, o=1 → 4 * 1 * 1 * 1 = 4
    expect(impact.score.data[AL.factorIndex]).toBeCloseTo(4.0, 10);
  });
});

// ---- featureMusic ----

describe("featureMusic", () => {
  it("creates a relation with AM diagonal at 0.2", () => {
    const { ctx, standards } = makeCtx();
    const relation = standards.featureMusic(ctx, contribs(), "ref1");
    expect(relation.references.has("ref1")).toBe(true);
    const matrix = relation.references.get("ref1");
    expect(matrix).toBeInstanceOf(DiagonalMatrix);
    if (matrix instanceof DiagonalMatrix) {
      expect(matrix.data[AM.factorIndex]).toBe(0.2);
      // Other factors should be 0
      expect(matrix.data[AP.factorIndex]).toBe(0);
    }
  });
});

// ---- remix ----

describe("remix", () => {
  it("creates a relation with scalar 0.2", () => {
    const { ctx, standards } = makeCtx();
    const relation = standards.remix(ctx, contribs(), "ref1");
    expect(relation.references.has("ref1")).toBe(true);
    const matrix = relation.references.get("ref1");
    expect(matrix).toBeInstanceOf(ScalarMatrix);
    if (matrix instanceof ScalarMatrix) {
      expect(matrix.data).toBe(0.2);
    }
  });
});

// ---- killedBy ----

describe("killedBy", () => {
  it("creates a diagonal relation matrix with weighted factors", () => {
    const { ctx, standards } = makeCtx();
    const relation = standards.killedBy(ctx, contribs(), "ref1", 1.0, 1.0);
    const matrix = relation.references.get("ref1");
    expect(matrix).toBeInstanceOf(DiagonalMatrix);
    if (matrix instanceof DiagonalMatrix) {
      const base = 0.4;
      expect(matrix.data[AP.factorIndex]).toBeCloseTo(0.2 * base, 10);
      expect(matrix.data[AU.factorIndex]).toBeCloseTo(0.1 * base, 10);
      expect(matrix.data[AV.factorIndex]).toBeCloseTo(0.0 * base, 10);
    }
  });
});

// ---- gateOpen ----

describe("gateOpen", () => {
  it("creates a relation with scalar 0.0", () => {
    const { ctx, standards } = makeCtx();
    const relation = standards.gateOpen(ctx, contribs(), "ref1");
    const matrix = relation.references.get("ref1");
    expect(matrix).toBeInstanceOf(ScalarMatrix);
    if (matrix instanceof ScalarMatrix) {
      expect(matrix.data).toBe(0.0);
    }
  });
});

// ---- Duration helpers ----

describe("Duration", () => {
  it("converts correctly", () => {
    expect(Duration.fromMinutes(1)).toBe(60_000);
    expect(Duration.fromHours(1)).toBe(3_600_000);
    expect(Duration.fromDays(1)).toBe(86_400_000);
    expect(Duration.toDays(86_400_000)).toBe(1);
  });
});

// ---- VisualType ----

describe("VisualType", () => {
  it("Animated has factor 1.0", () => {
    expect(VisualType.Animated.factor).toBe(1.0);
    expect(VisualType.Animated.name).toBe("animated");
  });

  it("AlbumArt has factor 0.25", () => {
    expect(VisualType.AlbumArt.factor).toBe(0.25);
    expect(VisualType.AlbumArt.name).toBe("albumArt");
  });
});
