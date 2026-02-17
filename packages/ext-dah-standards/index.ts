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

export interface ExtConfigDAHStandards {
  /** Average anime episode duration in milliseconds (default: 20 minutes) */
  averageAnimeEpisodeDuration?: DurationMs;
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
  config: ExtConfigDAHStandards = {},
): DAH_standards {
  const averageAnimeEpisodeDuration =
    config.averageAnimeEpisodeDuration ?? Duration.fromMinutes(20);

  // -- private helpers --

  function irMeta(
    meta: Omit<IrSourceMeta, "extension" | "version"> & Record<string, unknown>,
  ): Record<string, unknown> {
    return {
      DAH_ir_source: {
        extension: "DAH_standards",
        version: "1.1.1",
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
        (baseScore * Math.pow(f, 0.9)) / combinedFactor;
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
      return this.emotion(context, contributors, 4.0, emotions, "cry");
    },

    pads(
      context: Context,
      contributors: Contributors,
      periods: DatePeriod[],
      emotions: WeightedEmotions,
      singlePADS = true,
    ): Impact {
      const a = 0.3;
      const p = 1.3;
      const dur = periodsLength(periods);
      const days = Duration.toDays(dur);
      const base = a * Math.pow(Math.min(10, days), p);

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
      const base = mapClampThrow(Math.abs(factor), 0.0, 1.0, 2.0, 3.0) * sign;
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
      const base = mapClampThrow(Math.abs(factor), 0.0, 1.0, 0.0, 2.0) * sign;
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
      const base = 1.2 * Math.pow(days / 90, MP.factorWeight);
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
      return this.emotion(context, contributors, 3.5, [[AP, 1.0]], "ehi");
    },

    epi(context: Context, contributors: Contributors, factor: number): Impact {
      const base = mapClampThrow(factor, 0.0, 1.0, 3.5, 4.5);
      return this.emotion(context, contributors, base, [[AP, 1.0]], "epi", {
        epiArgs: { factor },
      });
    },

    jumpscare(context: Context, contributors: Contributors): Impact {
      return this.emotion(context, contributors, 1.0, [[MP, 1.0]], "jumpscare");
    },

    sleeplessNight(context: Context, contributors: Contributors): Impact {
      return this.emotion(
        context,
        contributors,
        4.0,
        [[MP, 1.0]],
        "sleeplessNight",
      );
    },

    politics(context: Context, contributors: Contributors): Impact {
      return {
        contributors,
        score: vectorFromFactors(context, [[Additional, 0.75]]),
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
        score: vectorFromFactors(context, [[Additional, newField ? 2.0 : 1.0]]),
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
        if (duration < Duration.fromMinutes(10)) {
          return ["tiny", 0.1, Duration.fromMinutes(5)];
        } else if (duration < Duration.fromHours(2)) {
          return ["short", 0.3, Duration.fromHours(2)];
        } else {
          return ["long", 1.0, averageAnimeEpisodeDuration * 12];
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
        score: vectorFromFactors(context, [[Boredom, -0.5]]),
        DAH_meta: impactMeta({ name: "dropped" }),
      };
    },

    meme(
      context: Context,
      contributors: Contributors,
      strength: number,
      periods: DatePeriod[],
    ): Impact {
      if (strength < 0.0 || strength >= 2.0) {
        throw new Error(`strength=${strength} not in [0, 2) range`);
      }

      const dur = periodsLength(periods);
      const days = Duration.toDays(dur);
      const base = strength * Math.pow(days / 120, AP.factorWeight) * 4.0;

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
        score: vectorFromFactors(context, [[AM, musicBase * 3.0]]),
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
        ((base * (unique + 2.0)) / 3.0) * visualType.factor * 2.0;

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
      const personalFactor = mapClampThrow(personal, 0.0, 1.0, 0.0, 0.5);
      const communityFactor = mapClampThrow(community, 0.0, 1.0, 0.0, 0.2);

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

      const M = 4.0;
      const baseScore =
        ((M * (characterComplexity + storyQuality)) / 2) *
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
                i === AM.factorIndex ? 0.2 : 0,
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
        references: new Map([[reference, new ScalarMatrix(0.2)]]),
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
      const base = 0.4;
      const weights = [
        [AP, 0.2],
        [AU, 0.1],
        [CP, 0.05],
        [CU, 0.05],
        [MP, 0.2],
        [MU, 0.1],
        [AV, 0.0],
        [AL, 0.1],
        [AM, 0.1],
        [Boredom, 0.1],
        [Additional, 0.0],
      ] as const;

      const diag = Array.from({ length: 11 }, () => 0);
      for (const [f, w] of weights) {
        diag[f.factorIndex] = w * potential * effect * base;
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
        references: new Map([[reference, new ScalarMatrix(0.0)]]),
        DAH_meta: relationMeta({ name: "gateOpen" }),
      };
    },
  };
}
