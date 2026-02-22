/**
 * NRSX components for `@nrs-org/ext-dah-standards`.
 *
 * Imports from `@nrs-org/nrsx` for JSX infrastructure and provides JSX
 * components for every impact and relation produced by this extension.
 *
 * Usage:
 * ```tsx
 * import { Cry, Visual, Writing, FeatureMusic } from "@nrs-org/ext-dah-standards/nrsx";
 * ```
 *
 * All components follow the same pattern: they capture their props into a
 * deferred closure that, when executed by the nrsx render pass, calls the
 * corresponding `ext-dah-standards` method on the context.
 */

import { assert, ScalarMatrix } from "@nrs-org/core";
import type { Entry } from "@nrs-org/core";

import {
  Duration,
  Sign,
  VisualType,
  type DatePeriod,
  type WeightedEmotions,
  type VisualTypeName,
} from "./index.ts";
import type { ExtDAH_standards } from "./index.ts";

import { factorScores } from "@nrs-org/ext-dah-factors";
import type { Factor } from "@nrs-org/ext-dah-factors";

import {
  asImpact,
  asRelation,
  type ImpactNode,
  type RelationNode,
  type RenderContext,
} from "@nrs-org/nrsx";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Parse an emotion string like `"CU"` or `"AP-0.7:CU-0.3"` into a
 * `WeightedEmotions` array understood by `ext-dah-standards`.
 *
 * Grammar: `<shortName>(-<weight>)?(:<shortName>(-<weight>)?)*`
 * Single-emotion shorthand (no weight) uses weight 1.0.
 */
export function parseEmotions(raw: string): WeightedEmotions {
  const parts = raw.split(":");
  const result: WeightedEmotions = [];
  for (const part of parts) {
    const dashIdx = part.indexOf("-");
    let shortName: string;
    let weight: number;
    if (dashIdx === -1) {
      shortName = part;
      weight = 1.0;
    } else {
      shortName = part.slice(0, dashIdx);
      weight = parseFloat(part.slice(dashIdx + 1));
    }
    const f: Factor | undefined = factorScores.find(
      (fs: Factor) => fs.shortName === shortName,
    );
    assert(
      f !== undefined,
      `nrsx: unknown emotion factor shortName "${shortName}"`,
    );
    result.push([f, weight]);
  }
  assert(result.length > 0, "nrsx: empty emotions string");
  return result;
}

/**
 * Parse `length` / `from` / `to` props into a `DatePeriod[]` for pads-style
 * impacts.
 */
function parsePeriods(
  length?: number,
  from?: string,
  to?: string,
): DatePeriod[] {
  if (length !== undefined) {
    return [{ type: "duration", length: Duration.fromDays(length) }];
  }
  assert(
    from !== undefined && to !== undefined,
    "nrsx: pads/waifu/meme elements require either `length` or both `from` and `to` props",
  );
  return [{ type: "fromto", from: Date.parse(from), to: Date.parse(to) }];
}

/** Retrieve a typed extension from the context, throwing if absent. */
function getExt<T>(rc: RenderContext, name: string): T {
  const ext = rc.context.extensions[name] as T | undefined;
  assert(
    ext !== undefined,
    `nrsx: required extension "${name}" is not registered in the context`,
  );
  return ext;
}

/** Build a single-entry contributors Map for the current entry. */
function selfContribs(entry: Entry) {
  return new Map([[entry.id, new ScalarMatrix(1.0)]]);
}

// ---------------------------------------------------------------------------
// Lookup: VisualTypeName → VisualType instance
// ---------------------------------------------------------------------------

const VISUAL_TYPE_MAP: Record<VisualTypeName, VisualType> = {
  animated: VisualType.Animated,
  rpg3dGame: VisualType.RPG3DGame,
  animatedShort: VisualType.AnimatedShort,
  animatedMV: VisualType.AnimatedMV,
  visualNovel: VisualType.VisualNovel,
  manga: VisualType.Manga,
  animatedGachaCardArt: VisualType.AnimatedGachaCardArt,
  gachaCardArt: VisualType.GachaCardArt,
  lightNovel: VisualType.LightNovel,
  semiAnimatedMV: VisualType.SemiAnimatedMV,
  staticMV: VisualType.StaticMV,
  albumArt: VisualType.AlbumArt,
};

// ---------------------------------------------------------------------------
// Impact components
// ---------------------------------------------------------------------------

export interface CryProps {
  emotions: string;
}

/** Cry emotional impact. */
export function Cry(props: CryProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <Cry> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.impacts.push(
      standards.cry(
        rc.context,
        selfContribs(rc.currentEntry),
        parseEmotions(props.emotions),
      ),
    );
  });
}

// --

export interface PADSProps {
  emotions: string;
  length?: number;
  from?: string;
  to?: string;
}

/** PADS (Prolonged Affective Duration Score) impact. */
export function PADS(props: PADSProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <PADS> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.impacts.push(
      standards.pads(
        rc.context,
        selfContribs(rc.currentEntry),
        parsePeriods(props.length, props.from, props.to),
        parseEmotions(props.emotions),
      ),
    );
  });
}

// --

/** Combined Cry + PADS (produces two impacts). */
export function CryPADS(props: PADSProps): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <CryPADS> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    for (const impact of standards.cryPADS(
      rc.context,
      selfContribs(rc.currentEntry),
      parsePeriods(props.length, props.from, props.to),
      parseEmotions(props.emotions),
    )) {
      rc.impacts.push(impact);
    }
  });
}

// --

/** Combined MaxAEI + PADS (produces two impacts). */
export function MaxAEIPADS(props: PADSProps): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <MaxAEIPADS> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    for (const impact of standards.maxAEIPADS(
      rc.context,
      selfContribs(rc.currentEntry),
      parsePeriods(props.length, props.from, props.to),
      parseEmotions(props.emotions),
    )) {
      rc.impacts.push(impact);
    }
  });
}

// --

export interface AEIProps {
  emotions: string;
  /** Signed factor in [-1, 1]. Negative ⇒ Sign.Negative. */
  base: number;
}

/** Acute Emotional Impact (positive or negative). */
export function AEI(props: AEIProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <AEI> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    const sign = props.base >= 0 ? Sign.Positive : Sign.Negative;
    rc.impacts.push(
      standards.aei(
        rc.context,
        selfContribs(rc.currentEntry),
        Math.abs(props.base),
        sign,
        parseEmotions(props.emotions),
      ),
    );
  });
}

// --

export interface NEIProps {
  emotions: string;
  base: number;
}

/** Neutral Emotional Impact. */
export function NEI(props: NEIProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <NEI> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    const sign = props.base >= 0 ? Sign.Positive : Sign.Negative;
    rc.impacts.push(
      standards.nei(
        rc.context,
        selfContribs(rc.currentEntry),
        Math.abs(props.base),
        sign,
        parseEmotions(props.emotions),
      ),
    );
  });
}

// --

/** Extraordinary Hype Impact. */
export function EHI(): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <EHI> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.impacts.push(standards.ehi(rc.context, selfContribs(rc.currentEntry)));
  });
}

// --

export interface EPIProps {
  base: number;
}

/** Extraordinary Personal Impact. */
export function EPI(props: EPIProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <EPI> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.impacts.push(
      standards.epi(rc.context, selfContribs(rc.currentEntry), props.base),
    );
  });
}

// --

export interface WaifuProps {
  waifu: string;
  length?: number;
  from?: string;
  to?: string;
}

/** Waifu impact. */
export function Waifu(props: WaifuProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <Waifu> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.impacts.push(
      standards.waifu(
        rc.context,
        selfContribs(rc.currentEntry),
        props.waifu,
        parsePeriods(props.length, props.from, props.to),
      ),
    );
  });
}

// --

/** Jump-scare impact. */
export function Jumpscare(): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Jumpscare> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.impacts.push(
      standards.jumpscare(rc.context, selfContribs(rc.currentEntry)),
    );
  });
}

// --

/** Sleepless-night impact. */
export function SleeplessNight(): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <SleeplessNight> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.impacts.push(
      standards.sleeplessNight(rc.context, selfContribs(rc.currentEntry)),
    );
  });
}

// --

/** Politics impact. */
export function Politics(): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Politics> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.impacts.push(
      standards.politics(rc.context, selfContribs(rc.currentEntry)),
    );
  });
}

// --

export interface AdditionalProps {
  value: number;
  note?: string;
}

/** Arbitrary additional score impact. */
export function Additional(props: AdditionalProps): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Additional> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.impacts.push(
      standards.additional(
        rc.context,
        selfContribs(rc.currentEntry),
        props.value,
        props.note ?? "",
      ),
    );
  });
}

// --

export interface MusicProps {
  base: number;
}

/** Music quality impact. */
export function Music(props: MusicProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <Music> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.impacts.push(
      standards.music(rc.context, selfContribs(rc.currentEntry), props.base),
    );
  });
}

// --

export interface VisualProps {
  type: VisualTypeName;
  base: number;
  unique: number;
}

/** Visual quality impact. */
export function Visual(props: VisualProps): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Visual> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    const vt = VISUAL_TYPE_MAP[props.type];
    assert(vt !== undefined, `nrsx: unknown visual type "${props.type}"`);
    rc.impacts.push(
      standards.visual(
        rc.context,
        selfContribs(rc.currentEntry),
        vt,
        props.base,
        props.unique,
      ),
    );
  });
}

// --

export interface WritingProps {
  character: number;
  story: number;
  pacing: number;
  originality: number;
}

/** Writing quality impact. */
export function Writing(props: WritingProps): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Writing> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.impacts.push(
      standards.writing(
        rc.context,
        selfContribs(rc.currentEntry),
        props.character,
        props.story,
        props.pacing,
        props.originality,
      ),
    );
  });
}

// --

/** Dropped impact (negative boredom score). */
export function Dropped(): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Dropped> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.impacts.push(
      standards.dropped(rc.context, selfContribs(rc.currentEntry)),
    );
  });
}

// --

export interface MemeProps {
  strength: number;
  length?: number;
  from?: string;
  to?: string;
}

/** Meme impact. */
export function Meme(props: MemeProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <Meme> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.impacts.push(
      standards.meme(
        rc.context,
        selfContribs(rc.currentEntry),
        props.strength,
        parsePeriods(props.length, props.from, props.to),
      ),
    );
  });
}

// ---------------------------------------------------------------------------
// Relation components
// ---------------------------------------------------------------------------

export interface FeatureMusicProps {
  id: string;
}

/** Featured music relation (this entry features another). */
export function FeatureMusic(props: FeatureMusicProps): RelationNode {
  return asRelation((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <FeatureMusic> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.relations.push(
      standards.featureMusic(
        rc.context,
        selfContribs(rc.currentEntry),
        props.id,
      ),
    );
  });
}

// --

export interface RemixProps {
  id: string;
}

/** Remix relation. */
export function Remix(props: RemixProps): RelationNode {
  return asRelation((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <Remix> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.relations.push(
      standards.remix(rc.context, selfContribs(rc.currentEntry), props.id),
    );
  });
}

// --

export interface KilledByProps {
  id: string;
  potential: number;
  effect: number;
}

/** "Killed by" relation. */
export function KilledBy(props: KilledByProps): RelationNode {
  return asRelation((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <KilledBy> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.relations.push(
      standards.killedBy(
        rc.context,
        selfContribs(rc.currentEntry),
        props.id,
        props.potential,
        props.effect,
      ),
    );
  });
}
