import {
  type Context,
  type Id,
  type Impact,
  type ImpactMeta,
  type Matrix,
  type Relation,
  type RelationMeta,
  type Extension,
  Vector,
  ScalarMatrix,
  DiagonalMatrix,
  newZeroVector,
  combinePow,
  assert,
  makeImpactMeta,
  makeRelationMeta,
} from "@nrs-org/core";
import {
  AU,
  AP,
  MU,
  MP,
  CU,
  CP,
  AL,
  AV,
  AM,
  Boredom,
  Additional,
  Emotion,
  type Factor,
} from "@nrs-org/ext-dah-factors";
import type { IrSourceMeta } from "@nrs-org/ext-dah-ir-source";

// ---------------------------------------------------------------------------
// Duration helpers (millisecond-based, avoids external deps)
// ---------------------------------------------------------------------------

/** Duration in milliseconds */
export type DurationMs = number;

/** Helpers to create durations from human-friendly units. */
export const Duration = {
  fromMinutes(m: number): DurationMs {
    return m * 60_000;
  },
  fromHours(h: number): DurationMs {
    return h * 3_600_000;
  },
  fromDays(d: number): DurationMs {
    return d * 86_400_000;
  },
  fromMillis(ms: number): DurationMs {
    return ms;
  },
  toDays(ms: DurationMs): number {
    return ms / 86_400_000;
  },
} as const;

// ---------------------------------------------------------------------------
// Date period types
// ---------------------------------------------------------------------------

export interface FromToPeriod {
  type: "fromto";
  /** millisecond timestamp */
  from: number;
  /** millisecond timestamp */
  to: number;
}

export interface DurationPeriod {
  type: "duration";
  /** length in milliseconds */
  length: DurationMs;
}

export type DatePeriod = FromToPeriod | DurationPeriod;

// ---------------------------------------------------------------------------
// Emotion / visual / other supporting types
// ---------------------------------------------------------------------------

export type EmotionFactor = Factor;
export type WeightedEmotions = [EmotionFactor, number][];
export type Contributors = Map<Id, Matrix>;

export enum Sign {
  Positive = 1,
  Negative = -1,
}

export type VisualTypeName =
  | "animated"
  | "rpg3dGame"
  | "animatedShort"
  | "animatedMV"
  | "visualNovel"
  | "manga"
  | "animatedGachaCardArt"
  | "gachaCardArt"
  | "lightNovel"
  | "semiAnimatedMV"
  | "staticMV"
  | "albumArt";

export class VisualType {
  static readonly Animated = new VisualType("animated", 1.0);
  static readonly RPG3DGame = new VisualType("rpg3dGame", 1.0);
  static readonly AnimatedShort = new VisualType("animatedShort", 0.8);
  static readonly AnimatedMV = new VisualType("animatedMV", 0.8);
  static readonly VisualNovel = new VisualType("visualNovel", 0.8);
  static readonly Manga = new VisualType("manga", 0.8);
  static readonly AnimatedGachaCardArt = new VisualType(
    "animatedGachaCardArt",
    0.7,
  );
  static readonly GachaCardArt = new VisualType("gachaCardArt", 0.6);
  static readonly LightNovel = new VisualType("lightNovel", 0.5);
  static readonly SemiAnimatedMV = new VisualType("semiAnimatedMV", 0.5);
  static readonly StaticMV = new VisualType("staticMV", 0.3);
  static readonly AlbumArt = new VisualType("albumArt", 0.25);

  private constructor(
    public readonly name: VisualTypeName,
    public readonly factor: number,
  ) {}
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

/** Per-factor weights used by the killedBy relation. */
export interface KilledByWeights {
  AP?: number;
  AU?: number;
  CP?: number;
  CU?: number;
  MP?: number;
  MU?: number;
  AV?: number;
  AL?: number;
  AM?: number;
  Boredom?: number;
  Additional?: number;
}

export interface DAH_standardsConfig {
  /** Average anime episode duration in milliseconds (default: 20 minutes) */
  averageAnimeEpisodeDuration?: DurationMs;

  /** Exponent used when combining emotion weights (default: 0.9) */
  emotionPowerExponent?: number;

  /** Base score for cry impacts (default: 4.0) */
  cryBase?: number;

  /** PADS amplitude coefficient (default: 0.3) */
  padsCoeffA?: number;
  /** PADS power coefficient (default: 1.3) */
  padsCoeffP?: number;
  /** PADS maximum days cap (default: 10) */
  padsMaxDays?: number;

  /** AEI output minimum (factor=0) (default: 2.0) */
  aeiOutMin?: number;
  /** AEI output maximum (factor=1) (default: 3.0) */
  aeiOutMax?: number;

  /** NEI output minimum (factor=0) (default: 0.0) */
  neiOutMin?: number;
  /** NEI output maximum (factor=1) (default: 2.0) */
  neiOutMax?: number;

  /** Waifu base multiplier (default: 1.2) */
  waifuMultiplier?: number;
  /** Waifu day divisor (default: 90) */
  waifuDayDivisor?: number;

  /** EHI base score (default: 3.5) */
  ehiBase?: number;

  /** EPI output minimum (factor=0) (default: 3.5) */
  epiOutMin?: number;
  /** EPI output maximum (factor=1) (default: 4.5) */
  epiOutMax?: number;

  /** Jumpscare base score (default: 1.0) */
  jumpscareBase?: number;

  /** Sleepless night base score (default: 4.0) */
  sleeplessNightBase?: number;

  /** Politics additional score (default: 0.75) */
  politicsScore?: number;

  /** Interest field score for a new field (default: 2.0) */
  interestFieldNewScore?: number;
  /** Interest field score for an existing field (default: 1.0) */
  interestFieldExistingScore?: number;

  /** Consumed tiny threshold in ms (default: 10 minutes) */
  consumedTinyThreshold?: DurationMs;
  /** Consumed tiny base score (default: 0.1) */
  consumedTinyBaseScore?: number;
  /** Consumed tiny base duration in ms (default: 5 minutes) */
  consumedTinyBaseDuration?: DurationMs;
  /** Consumed short threshold in ms (default: 2 hours) */
  consumedShortThreshold?: DurationMs;
  /** Consumed short base score (default: 0.3) */
  consumedShortBaseScore?: number;
  /** Consumed short base duration in ms (default: 2 hours) */
  consumedShortBaseDuration?: DurationMs;
  /** Consumed long base score (default: 1.0) */
  consumedLongBaseScore?: number;
  /** Consumed long episode multiplier (default: 12) */
  consumedLongEpisodeMultiplier?: number;

  /** Dropped boredom score (default: -0.5) */
  droppedScore?: number;

  /** Meme day divisor (default: 120) */
  memeDayDivisor?: number;
  /** Meme final multiplier (default: 4.0) */
  memeMultiplier?: number;
  /** Meme max strength (default: 2.0) */
  memeMaxStrength?: number;

  /** Music score multiplier (default: 3.0) */
  musicMultiplier?: number;

  /** Visual unique-offset added to unique parameter (default: 2.0) */
  visualUniqueOffset?: number;
  /** Visual divisor (default: 3.0) */
  visualDivisor?: number;
  /** Visual final multiplier (default: 2.0) */
  visualMultiplier?: number;

  /** osuSong personal max output (default: 0.5) */
  osuPersonalMax?: number;
  /** osuSong community max output (default: 0.2) */
  osuCommunityMax?: number;

  /** Writing base multiplier M (default: 4.0) */
  writingMultiplier?: number;

  /** featureMusic AM relation weight (default: 0.2) */
  featureMusicWeight?: number;

  /** remix scalar weight (default: 0.2) */
  remixWeight?: number;

  /** killedBy base multiplier (default: 0.4) */
  killedByBase?: number;
  /** killedBy per-factor weights */
  killedByWeights?: KilledByWeights;

  /** gateOpen scalar weight (default: 0.0) */
  gateOpenWeight?: number;

  /** IR source metadata version string (default: "1.1.1") */
  irVersion?: string;
}

// ---------------------------------------------------------------------------
// Metadata argument types (used in IR source meta)
// ---------------------------------------------------------------------------

export type EmotionWeights = Partial<Record<string, number>>;

export interface EmotionArgs {
  base: number;
  emotions: EmotionWeights;
}

export type PeriodMeta =
  | { type: "duration"; durationMs: number }
  | { type: "fromto"; from: number; to: number; durationMs: number };

export interface PADSArgs {
  durationMs: number;
  days: number;
  periods: PeriodMeta[];
}

export interface ConsumedArgs {
  boredom: number;
  durationMs: number;
  baseType: "tiny" | "short" | "long";
  baseScore: number;
  baseDurationMs: number;
  ratio: number;
}

export interface XEIArgs {
  factor: number;
  sign: "positive" | "negative";
}

export interface WaifuArgs {
  waifu: string;
  durationMs: number;
  days: number;
  periods: PeriodMeta[];
}

export interface EPIArgs {
  factor: number;
}

export interface MemeArgs {
  strength: number;
  periods: PeriodMeta[];
  durationMs: number;
}

export interface AdditionalArgs {
  description: string;
}

export interface MusicArgs {
  musicBase: number;
}

export interface VisualArgs {
  visualType: VisualTypeName;
  base: number;
  unique: number;
}

export interface OsuSongArgs {
  personal: number;
  community: number;
}

export interface WritingArgs {
  characterComplexity: number;
  storyQuality: number;
  pacing: number;
  originality: number;
}

export interface AnimeConsumedArgs {
  episodes: number;
  episodeDurationMs: number;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function mapClampThrow(
  inp: number,
  iMin: number,
  iMax: number,
  oMin: number,
  oMax: number,
): number {
  const factor = (inp - iMin) / (iMax - iMin);
  if (factor < 0.0 || factor > 1.0) {
    throw new Error(
      `value out of bounds: ${factor} not in [${iMin}, ${iMax}] range`,
    );
  }
  return oMin + (oMax - oMin) * factor;
}

function vectorFromFactors(
  context: Context,
  values: [Factor, number][],
): Vector {
  const vec = newZeroVector(context);
  for (const [f, value] of values) {
    vec.data[f.factorIndex] = value;
  }
  return vec;
}

// ---------------------------------------------------------------------------
// Extension type
// ---------------------------------------------------------------------------

export type DAH_standards = Extension & {
  emotion(
    context: Context,
    contributors: Contributors,
    base: number,
    emotions: WeightedEmotions,
    name?: string,
    meta?: Record<string, unknown>,
  ): Impact;

  cry(
    context: Context,
    contributors: Contributors,
    emotions: WeightedEmotions,
  ): Impact;

  pads(
    context: Context,
    contributors: Contributors,
    periods: DatePeriod[],
    emotions: WeightedEmotions,
    singlePADS?: boolean,
  ): Impact;

  xei(
    context: Context,
    contributors: Contributors,
    name: string,
    factor: number,
    sign: Sign,
    base: number,
    emotions: WeightedEmotions,
  ): Impact;

  aei(
    context: Context,
    contributors: Contributors,
    factor: number,
    sign: Sign,
    emotions: WeightedEmotions,
  ): Impact;

  nei(
    context: Context,
    contributors: Contributors,
    factor: number,
    sign: Sign,
    emotions: WeightedEmotions,
  ): Impact;

  maxAEIPADS(
    context: Context,
    contributors: Contributors,
    periods: DatePeriod[],
    emotions: WeightedEmotions,
  ): Impact[];

  cryPADS(
    context: Context,
    contributors: Contributors,
    periods: DatePeriod[],
    emotions: WeightedEmotions,
  ): Impact[];

  waifu(
    context: Context,
    contributors: Contributors,
    waifu: string,
    periods: DatePeriod[],
  ): Impact;

  ehi(context: Context, contributors: Contributors): Impact;

  epi(context: Context, contributors: Contributors, factor: number): Impact;

  jumpscare(context: Context, contributors: Contributors): Impact;
  sleeplessNight(context: Context, contributors: Contributors): Impact;
  politics(context: Context, contributors: Contributors): Impact;

  interestField(
    context: Context,
    contributors: Contributors,
    newField: boolean,
  ): Impact;

  consumed(
    context: Context,
    contributors: Contributors,
    boredom: number,
    duration: DurationMs,
    name?: string,
    meta?: Record<string, unknown>,
  ): Impact;

  animeConsumed(
    context: Context,
    contributors: Contributors,
    boredom: number,
    episodes: number,
    episodeDuration?: DurationMs,
  ): Impact;

  dropped(context: Context, contributors: Contributors): Impact;

  meme(
    context: Context,
    contributors: Contributors,
    strength: number,
    periods: DatePeriod[],
  ): Impact;

  additional(
    context: Context,
    contributors: Contributors,
    value: number,
    description: string,
  ): Impact;

  music(
    context: Context,
    contributors: Contributors,
    musicBase: number,
  ): Impact;

  visual(
    context: Context,
    contributors: Contributors,
    visualType: VisualType,
    base: number,
    unique: number,
  ): Impact;

  osuSong(
    context: Context,
    contributors: Contributors,
    personal: number,
    community: number,
  ): Impact;

  writing(
    context: Context,
    contributors: Contributors,
    characterComplexity: number,
    storyQuality: number,
    pacing: number,
    originality: number,
  ): Impact;

  featureMusic(
    context: Context,
    contributors: Contributors,
    reference: Id,
  ): Relation;

  remix(context: Context, contributors: Contributors, reference: Id): Relation;

  killedBy(
    context: Context,
    contributors: Contributors,
    reference: Id,
    potential: number,
    effect: number,
  ): Relation;

  gateOpen(
    context: Context,
    contributors: Contributors,
    reference: Id,
  ): Relation;
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export default function DAH_standards(
  config: DAH_standardsConfig = {},
): DAH_standards {
  const averageAnimeEpisodeDuration =
    config.averageAnimeEpisodeDuration ?? Duration.fromMinutes(20);

  // Resolve all configurable constants with defaults
  const emotionPowerExponent = config.emotionPowerExponent ?? 0.9;
  const cryBase = config.cryBase ?? 4.0;
  const padsCoeffA = config.padsCoeffA ?? 0.3;
  const padsCoeffP = config.padsCoeffP ?? 1.3;
  const padsMaxDays = config.padsMaxDays ?? 10;
  const aeiOutMin = config.aeiOutMin ?? 2.0;
  const aeiOutMax = config.aeiOutMax ?? 3.0;
  const neiOutMin = config.neiOutMin ?? 0.0;
  const neiOutMax = config.neiOutMax ?? 2.0;
  const waifuMultiplier = config.waifuMultiplier ?? 1.2;
  const waifuDayDivisor = config.waifuDayDivisor ?? 90;
  const ehiBase = config.ehiBase ?? 3.5;
  const epiOutMin = config.epiOutMin ?? 3.5;
  const epiOutMax = config.epiOutMax ?? 4.5;
  const jumpscareBase = config.jumpscareBase ?? 1.0;
  const sleeplessNightBase = config.sleeplessNightBase ?? 4.0;
  const politicsScore = config.politicsScore ?? 0.75;
  const interestFieldNewScore = config.interestFieldNewScore ?? 2.0;
  const interestFieldExistingScore = config.interestFieldExistingScore ?? 1.0;
  const consumedTinyThreshold =
    config.consumedTinyThreshold ?? Duration.fromMinutes(10);
  const consumedTinyBaseScore = config.consumedTinyBaseScore ?? 0.1;
  const consumedTinyBaseDuration =
    config.consumedTinyBaseDuration ?? Duration.fromMinutes(5);
  const consumedShortThreshold =
    config.consumedShortThreshold ?? Duration.fromHours(2);
  const consumedShortBaseScore = config.consumedShortBaseScore ?? 0.3;
  const consumedShortBaseDuration =
    config.consumedShortBaseDuration ?? Duration.fromHours(2);
  const consumedLongBaseScore = config.consumedLongBaseScore ?? 1.0;
  const consumedLongEpisodeMultiplier =
    config.consumedLongEpisodeMultiplier ?? 12;
  const droppedScore = config.droppedScore ?? -0.5;
  const memeDayDivisor = config.memeDayDivisor ?? 120;
  const memeMultiplier = config.memeMultiplier ?? 4.0;
  const memeMaxStrength = config.memeMaxStrength ?? 2.0;
  const musicMultiplier = config.musicMultiplier ?? 3.0;
  const visualUniqueOffset = config.visualUniqueOffset ?? 2.0;
  const visualDivisor = config.visualDivisor ?? 3.0;
  const visualMultiplier = config.visualMultiplier ?? 2.0;
  const osuPersonalMax = config.osuPersonalMax ?? 0.5;
  const osuCommunityMax = config.osuCommunityMax ?? 0.2;
  const writingMultiplier = config.writingMultiplier ?? 4.0;
  const featureMusicWeight = config.featureMusicWeight ?? 0.2;
  const remixWeight = config.remixWeight ?? 0.2;
  const killedByBase = config.killedByBase ?? 0.4;
  const killedByWeightsResolved = {
    AP: config.killedByWeights?.AP ?? 0.2,
    AU: config.killedByWeights?.AU ?? 0.1,
    CP: config.killedByWeights?.CP ?? 0.05,
    CU: config.killedByWeights?.CU ?? 0.05,
    MP: config.killedByWeights?.MP ?? 0.2,
    MU: config.killedByWeights?.MU ?? 0.1,
    AV: config.killedByWeights?.AV ?? 0.0,
    AL: config.killedByWeights?.AL ?? 0.1,
    AM: config.killedByWeights?.AM ?? 0.1,
    Boredom: config.killedByWeights?.Boredom ?? 0.1,
    Additional: config.killedByWeights?.Additional ?? 0.0,
  };
  const gateOpenWeight = config.gateOpenWeight ?? 0.0;
  const irVersion = config.irVersion ?? "1.1.1";

  // -- private helpers --

  function irMeta(
    meta: Omit<IrSourceMeta, "extension" | "version"> & Record<string, unknown>,
  ): Record<string, unknown> {
    return {
      DAH_ir_source: {
        extension: "DAH_standards",
        version: irVersion,
        ...meta,
      },
    };
  }

  function impactMeta(
    meta: Omit<IrSourceMeta, "extension" | "version"> & Record<string, unknown>,
  ): ImpactMeta {
    return makeImpactMeta({ ...irMeta(meta) });
  }

  function relationMeta(
    meta: Omit<IrSourceMeta, "extension" | "version"> & Record<string, unknown>,
  ): RelationMeta {
    return makeRelationMeta({ ...irMeta(meta) });
  }

  function emotionVector(
    context: Context,
    baseScore: number,
    emotions: WeightedEmotions,
  ): Vector {
    assert(emotions.length > 0, "empty emotion list");

    const contribFactors = emotions.map(([, f]) => f);
    const combinedFactor = combinePow(contribFactors, Emotion.subscoreWeight);

    const vec = newZeroVector(context);
    for (const [emo, f] of emotions) {
      vec.data[emo.factorIndex] =
        (baseScore * Math.pow(f, emotionPowerExponent)) / combinedFactor;
    }
    return vec;
  }

  function emotionPairsToObject(emotions: WeightedEmotions): EmotionWeights {
    return Object.fromEntries(
      emotions.map(([emo, weight]) => [emo.name, weight]),
    );
  }

  function emotionMeta(base: number, emotions: WeightedEmotions): EmotionArgs {
    return { base, emotions: emotionPairsToObject(emotions) };
  }

  function periodLength(period: DatePeriod): DurationMs {
    switch (period.type) {
      case "duration":
        return period.length;
      case "fromto":
        return period.to - period.from;
    }
  }

  function periodsLength(periods: Iterable<DatePeriod>): DurationMs {
    let total = 0;
    for (const p of periods) {
      total += periodLength(p);
    }
    return total;
  }

  function periodMetaEntry(period: DatePeriod): PeriodMeta {
    switch (period.type) {
      case "duration":
        return { type: "duration", durationMs: period.length };
      case "fromto":
        return {
          type: "fromto",
          from: period.from,
          to: period.to,
          durationMs: period.to - period.from,
        };
    }
  }

  // -- extension object --

  return {
    name: "DAH_standards",
    dependencies() {
      return ["DAH_factors"];
    },

    emotion(
      context: Context,
      contributors: Contributors,
      base: number,
      emotions: WeightedEmotions,
      name = "emotion",
      meta: Record<string, unknown> = {},
    ): Impact {
      return {
        contributors,
        score: emotionVector(context, base, emotions),
        DAH_meta: impactMeta({
          name,
          emotionArgs: emotionMeta(base, emotions),
          ...meta,
        }),
      };
    },

    cry(
      context: Context,
      contributors: Contributors,
      emotions: WeightedEmotions,
    ): Impact {
      return this.emotion(context, contributors, cryBase, emotions, "cry");
    },

    pads(
      context: Context,
      contributors: Contributors,
      periods: DatePeriod[],
      emotions: WeightedEmotions,
      singlePADS = true,
    ): Impact {
      const dur = periodsLength(periods);
      const days = Duration.toDays(dur);
      const base =
        padsCoeffA * Math.pow(Math.min(padsMaxDays, days), padsCoeffP);

      const impact = this.emotion(
        context,
        contributors,
        base,
        emotions,
        "pads",
        {
          padsArgs: {
            durationMs: dur,
            days,
            periods: periods.map((pr) => periodMetaEntry(pr)),
          },
        },
      );

      if (!singlePADS) {
        const suppressExt = context.extensions[
          "DAH_validator_suppress"
        ] as unknown as
          | {
              suppressRule?: (impact: Impact, rule: string) => void;
            }
          | undefined;
        if (suppressExt?.suppressRule) {
          suppressExt.suppressRule(impact, "dah-lone-pads");
        }
      }

      return impact;
    },

    xei(
      context: Context,
      contributors: Contributors,
      name: string,
      factor: number,
      sign: Sign,
      base: number,
      emotions: WeightedEmotions,
    ): Impact {
      return this.emotion(context, contributors, base, emotions, name, {
        xeiArgs: {
          factor,
          sign: sign > 0 ? "positive" : "negative",
        },
      });
    },

    aei(
      context: Context,
      contributors: Contributors,
      factor: number,
      sign: Sign,
      emotions: WeightedEmotions,
    ): Impact {
      const base =
        mapClampThrow(Math.abs(factor), 0.0, 1.0, aeiOutMin, aeiOutMax) * sign;
      return this.xei(
        context,
        contributors,
        "aei",
        factor,
        sign,
        base,
        emotions,
      );
    },

    nei(
      context: Context,
      contributors: Contributors,
      factor: number,
      sign: Sign,
      emotions: WeightedEmotions,
    ): Impact {
      const base =
        mapClampThrow(Math.abs(factor), 0.0, 1.0, neiOutMin, neiOutMax) * sign;
      return this.xei(
        context,
        contributors,
        "nei",
        factor,
        sign,
        base,
        emotions,
      );
    },

    maxAEIPADS(
      context: Context,
      contributors: Contributors,
      periods: DatePeriod[],
      emotions: WeightedEmotions,
    ): Impact[] {
      return [
        this.aei(context, contributors, 1.0, Sign.Positive, emotions),
        this.pads(context, contributors, periods, emotions, false),
      ];
    },

    cryPADS(
      context: Context,
      contributors: Contributors,
      periods: DatePeriod[],
      emotions: WeightedEmotions,
    ): Impact[] {
      return [
        this.cry(context, contributors, emotions),
        this.pads(context, contributors, periods, emotions, false),
      ];
    },

    waifu(
      context: Context,
      contributors: Contributors,
      waifu: string,
      periods: DatePeriod[],
    ): Impact {
      const dur = periodsLength(periods);
      const days = Duration.toDays(dur);
      const base =
        waifuMultiplier * Math.pow(days / waifuDayDivisor, MP.factorWeight);
      return this.emotion(context, contributors, base, [[MP, 1.0]], "waifu", {
        waifuArgs: {
          waifu,
          durationMs: dur,
          days,
          periods: periods.map((pr) => periodMetaEntry(pr)),
        },
      });
    },

    ehi(context: Context, contributors: Contributors): Impact {
      return this.emotion(context, contributors, ehiBase, [[AP, 1.0]], "ehi");
    },

    epi(context: Context, contributors: Contributors, factor: number): Impact {
      const base = mapClampThrow(factor, 0.0, 1.0, epiOutMin, epiOutMax);
      return this.emotion(context, contributors, base, [[AP, 1.0]], "epi", {
        epiArgs: { factor },
      });
    },

    jumpscare(context: Context, contributors: Contributors): Impact {
      return this.emotion(
        context,
        contributors,
        jumpscareBase,
        [[MP, 1.0]],
        "jumpscare",
      );
    },

    sleeplessNight(context: Context, contributors: Contributors): Impact {
      return this.emotion(
        context,
        contributors,
        sleeplessNightBase,
        [[MP, 1.0]],
        "sleeplessNight",
      );
    },

    politics(context: Context, contributors: Contributors): Impact {
      return {
        contributors,
        score: vectorFromFactors(context, [[Additional, politicsScore]]),
        DAH_meta: impactMeta({ name: "politics" }),
      };
    },

    interestField(
      context: Context,
      contributors: Contributors,
      newField: boolean,
    ): Impact {
      return {
        contributors,
        score: vectorFromFactors(context, [
          [
            Additional,
            newField ? interestFieldNewScore : interestFieldExistingScore,
          ],
        ]),
        DAH_meta: impactMeta({ name: "interestField" }),
      };
    },

    consumed(
      context: Context,
      contributors: Contributors,
      boredom: number,
      duration: DurationMs,
      name = "consumed",
      meta: Record<string, unknown> = {},
    ): Impact {
      const [baseType, baseScore, baseDuration] = ((): [
        "tiny" | "short" | "long",
        number,
        DurationMs,
      ] => {
        if (duration < consumedTinyThreshold) {
          return ["tiny", consumedTinyBaseScore, consumedTinyBaseDuration];
        } else if (duration < consumedShortThreshold) {
          return ["short", consumedShortBaseScore, consumedShortBaseDuration];
        } else {
          return [
            "long",
            consumedLongBaseScore,
            averageAnimeEpisodeDuration * consumedLongEpisodeMultiplier,
          ];
        }
      })();

      const ratio = duration / baseDuration;
      const boredomScore =
        boredom * baseScore * Math.pow(ratio, Boredom.factorWeight);

      return {
        contributors,
        score: vectorFromFactors(context, [[Boredom, boredomScore]]),
        DAH_meta: impactMeta({
          name,
          consumedArgs: {
            boredom,
            durationMs: duration,
            baseType,
            baseScore,
            baseDurationMs: baseDuration,
            ratio,
          },
          ...meta,
        }),
      };
    },

    animeConsumed(
      context: Context,
      contributors: Contributors,
      boredom: number,
      episodes: number,
      episodeDuration?: DurationMs,
    ): Impact {
      const epDur = episodeDuration ?? averageAnimeEpisodeDuration;
      return this.consumed(
        context,
        contributors,
        boredom,
        epDur * episodes,
        "animeConsumed",
        {
          animeConsumedArgs: {
            episodes,
            episodeDurationMs: epDur,
          },
        },
      );
    },

    dropped(context: Context, contributors: Contributors): Impact {
      return {
        contributors,
        score: vectorFromFactors(context, [[Boredom, droppedScore]]),
        DAH_meta: impactMeta({ name: "dropped" }),
      };
    },

    meme(
      context: Context,
      contributors: Contributors,
      strength: number,
      periods: DatePeriod[],
    ): Impact {
      if (strength < 0.0 || strength >= memeMaxStrength) {
        throw new Error(
          `strength=${strength} not in [0, ${memeMaxStrength}) range`,
        );
      }

      const dur = periodsLength(periods);
      const days = Duration.toDays(dur);
      const base =
        strength *
        Math.pow(days / memeDayDivisor, AP.factorWeight) *
        memeMultiplier;

      return this.emotion(context, contributors, base, [[AP, 1.0]], "meme", {
        memeArgs: {
          strength,
          periods: periods.map((pr) => periodMetaEntry(pr)),
          durationMs: dur,
        },
      });
    },

    additional(
      context: Context,
      contributors: Contributors,
      value: number,
      description: string,
    ): Impact {
      return {
        contributors,
        score: vectorFromFactors(context, [[Additional, value]]),
        DAH_meta: impactMeta({
          name: "additional",
          additionalArgs: { description },
        }),
      };
    },

    music(
      context: Context,
      contributors: Contributors,
      musicBase: number,
    ): Impact {
      return {
        contributors,
        score: vectorFromFactors(context, [[AM, musicBase * musicMultiplier]]),
        DAH_meta: impactMeta({
          name: "music",
          musicArgs: { musicBase },
        }),
      };
    },

    visual(
      context: Context,
      contributors: Contributors,
      visualType: VisualType,
      base: number,
      unique: number,
    ): Impact {
      const visualScore =
        ((base * (unique + visualUniqueOffset)) / visualDivisor) *
        visualType.factor *
        visualMultiplier;

      return {
        contributors,
        score: vectorFromFactors(context, [[AV, visualScore]]),
        DAH_meta: impactMeta({
          name: "visual",
          visualArgs: {
            visualType: visualType.name,
            base,
            unique,
          },
        }),
      };
    },

    osuSong(
      context: Context,
      contributors: Contributors,
      personal: number,
      community: number,
    ): Impact {
      const personalFactor = mapClampThrow(
        personal,
        0.0,
        1.0,
        0.0,
        osuPersonalMax,
      );
      const communityFactor = mapClampThrow(
        community,
        0.0,
        1.0,
        0.0,
        osuCommunityMax,
      );

      return {
        contributors,
        score: vectorFromFactors(context, [
          [AP, personalFactor + communityFactor],
        ]),
        DAH_meta: impactMeta({
          name: "osuSong",
          osuSongArgs: { personal, community },
        }),
      };
    },

    writing(
      context: Context,
      contributors: Contributors,
      characterComplexity: number,
      storyQuality: number,
      pacing: number,
      originality: number,
    ): Impact {
      characterComplexity = mapClampThrow(
        characterComplexity,
        0.0,
        1.0,
        0.0,
        1.0,
      );
      storyQuality = mapClampThrow(storyQuality, 0.0, 1.0, 0.0, 1.0);
      pacing = mapClampThrow(pacing, 0.0, 1.0, 0.0, 1.0);
      originality = mapClampThrow(originality, 0.0, 1.0, 0.0, 1.0);

      const baseScore =
        ((writingMultiplier * (characterComplexity + storyQuality)) / 2) *
        ((1 + pacing) / 2) *
        ((1 + originality) / 2);
      return {
        contributors,
        score: vectorFromFactors(context, [[AL, baseScore]]),
        DAH_meta: impactMeta({
          name: "writing",
          writingArgs: {
            characterComplexity,
            storyQuality,
            pacing,
            originality,
          },
        }),
      };
    },

    featureMusic(
      _context: Context,
      contributors: Contributors,
      reference: Id,
    ): Relation {
      return {
        contributors,
        references: new Map([
          [
            reference,
            new DiagonalMatrix(
              Array.from({ length: 11 }, (_, i) =>
                i === AM.factorIndex ? featureMusicWeight : 0,
              ),
            ),
          ],
        ]),
        DAH_meta: relationMeta({ name: "featureMusic" }),
      };
    },

    remix(
      _context: Context,
      contributors: Contributors,
      reference: Id,
    ): Relation {
      return {
        contributors,
        references: new Map([[reference, new ScalarMatrix(remixWeight)]]),
        DAH_meta: relationMeta({ name: "remix" }),
      };
    },

    killedBy(
      _context: Context,
      contributors: Contributors,
      reference: Id,
      potential: number,
      effect: number,
    ): Relation {
      const weights = [
        [AP, killedByWeightsResolved.AP],
        [AU, killedByWeightsResolved.AU],
        [CP, killedByWeightsResolved.CP],
        [CU, killedByWeightsResolved.CU],
        [MP, killedByWeightsResolved.MP],
        [MU, killedByWeightsResolved.MU],
        [AV, killedByWeightsResolved.AV],
        [AL, killedByWeightsResolved.AL],
        [AM, killedByWeightsResolved.AM],
        [Boredom, killedByWeightsResolved.Boredom],
        [Additional, killedByWeightsResolved.Additional],
      ] as const;

      const diag = Array.from({ length: 11 }, () => 0);
      for (const [f, w] of weights) {
        diag[f.factorIndex] = w * potential * effect * killedByBase;
      }

      return {
        contributors,
        references: new Map([[reference, new DiagonalMatrix(diag)]]),
        DAH_meta: relationMeta({ name: "killedBy" }),
      };
    },

    gateOpen(
      _context: Context,
      contributors: Contributors,
      reference: Id,
    ): Relation {
      return {
        contributors,
        references: new Map([[reference, new ScalarMatrix(gateOpenWeight)]]),
        DAH_meta: relationMeta({ name: "gateOpen" }),
      };
    },
  };
}
