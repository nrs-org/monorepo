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

import {
  assert,
  ScalarMatrix,
  newZeroVector,
  makeImpactMeta,
} from "@nrs-org/core";
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
  asContributor,
  toArray,
  type ImpactNode,
  type RelationNode,
  type NrsxNode,
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

/** Parse a duration string `MM:SS` or `HH:MM:SS` into milliseconds. */
function parseDuration(s: string): number {
  const parts = s.split(":").map(Number);
  assert(
    parts.length === 2 || parts.length === 3,
    `nrsx: invalid duration "${s}" — expected MM:SS or HH:MM:SS`,
  );
  if (parts.length === 2) {
    const [mm, ss] = parts as [number, number];
    return (mm * 60 + ss) * 1000;
  }
  const [hh, mm, ss] = parts as [number, number, number];
  return (hh * 3600 + mm * 60 + ss) * 1000;
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

/**
 * Convert `rc.currentContributors` to a `Contributors` Map.
 * Falls back to `selfContribs(entry)` when no explicit contributors were provided.
 */
function resolveContribs(rc: RenderContext, entry: Entry) {
  if (rc.currentContributors !== null && rc.currentContributors.size > 0) {
    return new Map(
      [...rc.currentContributors.entries()].map(([id, f]) => [
        id,
        new ScalarMatrix(f),
      ]),
    );
  }
  return selfContribs(entry);
}

/**
 * Map a factor name in `"Group.Name"` or short-name form to a `Factor`.
 * Accepts nrsml-style names like `"Art.Language"`, `"Emotion.AP"`, as well as
 * bare short names like `"AL"`, `"AP"`.
 */
function parseFactor(name: string): Factor {
  const DOTTED: Record<string, string> = {
    "Emotion.AU": "AU",
    "Emotion.AP": "AP",
    "Emotion.MU": "MU",
    "Emotion.MP": "MP",
    "Emotion.CU": "CU",
    "Emotion.CP": "CP",
    "Art.Language": "AL",
    "Art.Visual": "AV",
    "Art.Music": "AM",
    "Boredom.B": "B",
    "Additional.A": "A",
  };
  const shortName = DOTTED[name] ?? name;
  const f = factorScores.find((fs: Factor) => fs.shortName === shortName);
  assert(f !== undefined, `nrsx: unknown factor "${name}"`);
  return f;
}

// ---------------------------------------------------------------------------
// Contributor component
// ---------------------------------------------------------------------------

export interface ContributorProps {
  id: string;
  /** Scalar contribution factor. Defaults to 1.0. */
  factor?: number;
}

/**
 * Registers an entry as a contributor to the enclosing impact/relation.
 * Must be used as a direct child of an impact or relation component.
 */
export function Contributor(props: ContributorProps): NrsxNode {
  return asContributor((rc) => {
    assert(
      rc.currentContributors !== null,
      "nrsx: <Contributor> must be a child of an impact or relation element",
    );
    rc.currentContributors.set(props.id, props.factor ?? 1.0);
  });
}

// ---------------------------------------------------------------------------
// RegularImpact / Score / Component
// ---------------------------------------------------------------------------

export interface ComponentProps {
  /** Factor name: `"Art.Language"`, `"Emotion.AP"`, or a bare short name like `"AL"`. */
  factor: string;
  /** Score value for this factor dimension. */
  value: number;
}

/**
 * Sets a single factor component on the score being built by a `<Score>` element.
 * Must be a direct child of `<Score>`.
 */
export function Component(props: ComponentProps): NrsxNode {
  return asContributor((rc) => {
    assert(
      rc.currentScore !== null,
      "nrsx: <Component> must be a child of a <Score> element",
    );
    const f = parseFactor(props.factor);
    rc.currentScore.data[f.factorIndex] = props.value;
  });
}

export interface ScoreProps {
  children?: NrsxNode | NrsxNode[];
}

/**
 * Populates the score of the enclosing `<RegularImpact>` via `<Component>` children.
 * Must be a direct child of `<RegularImpact>`.
 */
export function Score(props: ScoreProps): NrsxNode {
  return asContributor((rc) => {
    assert(
      rc.currentScore !== null,
      "nrsx: <Score> must be a child of a <RegularImpact> element",
    );
    for (const child of toArray(props.children)) child(rc);
  });
}

export interface RegularImpactProps {
  children?: NrsxNode | NrsxNode[];
}

/**
 * A raw score impact whose vector is specified directly via `<Score>` /
 * `<Component>` children. Does not go through any `ext-dah-standards` method.
 *
 * ```tsx
 * <RegularImpact>
 *   <Score>
 *     <Component factor="Art.Language" value={0.5} />
 *     <Component factor="Emotion.AP" value={0.3} />
 *   </Score>
 * </RegularImpact>
 * ```
 */
export function RegularImpact(props: RegularImpactProps): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <RegularImpact> must be inside an <Entry>",
    );
    const score = newZeroVector(rc.context);
    rc.currentScore = score;
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.currentScore = null;
    rc.impacts.push({
      contributors: contribs,
      score,
      DAH_meta: makeImpactMeta(),
    });
  });
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
  children?: NrsxNode | NrsxNode[];
}

/** Cry emotional impact. */
export function Cry(props: CryProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <Cry> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(
      standards.cry(rc.context, contribs, parseEmotions(props.emotions)),
    );
  });
}

// --

export interface PADSProps {
  emotions: string;
  length?: number;
  from?: string;
  to?: string;
  children?: NrsxNode | NrsxNode[];
}

/** PADS (Prolonged Affective Duration Score) impact. */
export function PADS(props: PADSProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <PADS> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(
      standards.pads(
        rc.context,
        contribs,
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
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    for (const impact of standards.cryPADS(
      rc.context,
      contribs,
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
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    for (const impact of standards.maxAEIPADS(
      rc.context,
      contribs,
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
  children?: NrsxNode | NrsxNode[];
}

/** Acute Emotional Impact (positive or negative). */
export function AEI(props: AEIProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <AEI> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    const sign = props.base >= 0 ? Sign.Positive : Sign.Negative;
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(
      standards.aei(
        rc.context,
        contribs,
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
  children?: NrsxNode | NrsxNode[];
}

/** Neutral Emotional Impact. */
export function NEI(props: NEIProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <NEI> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    const sign = props.base >= 0 ? Sign.Positive : Sign.Negative;
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(
      standards.nei(
        rc.context,
        contribs,
        Math.abs(props.base),
        sign,
        parseEmotions(props.emotions),
      ),
    );
  });
}

// --

/** Extraordinary Hype Impact. */
export function EHI(props: { children?: NrsxNode | NrsxNode[] }): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <EHI> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(standards.ehi(rc.context, contribs));
  });
}

// --

export interface EPIProps {
  base: number;
  children?: NrsxNode | NrsxNode[];
}

/** Extraordinary Personal Impact. */
export function EPI(props: EPIProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <EPI> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(standards.epi(rc.context, contribs, props.base));
  });
}

// --

export interface WaifuProps {
  waifu: string;
  length?: number;
  from?: string;
  to?: string;
  children?: NrsxNode | NrsxNode[];
}

/** Waifu impact. */
export function Waifu(props: WaifuProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <Waifu> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(
      standards.waifu(
        rc.context,
        contribs,
        props.waifu,
        parsePeriods(props.length, props.from, props.to),
      ),
    );
  });
}

// --

/** Jump-scare impact. */
export function Jumpscare(props: {
  children?: NrsxNode | NrsxNode[];
}): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Jumpscare> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(standards.jumpscare(rc.context, contribs));
  });
}

// --

/** Sleepless-night impact. */
export function SleeplessNight(props: {
  children?: NrsxNode | NrsxNode[];
}): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <SleeplessNight> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(standards.sleeplessNight(rc.context, contribs));
  });
}

// --

/** Politics impact. */
export function Politics(props: {
  children?: NrsxNode | NrsxNode[];
}): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Politics> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(standards.politics(rc.context, contribs));
  });
}

// --

export interface InterestFieldProps {
  /** `true` for a new interest field (score 2.0), `false` for an existing one (score 1.0). */
  new: boolean;
  children?: NrsxNode | NrsxNode[];
}

/** Interest-field impact (new or existing). */
export function InterestField(props: InterestFieldProps): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <InterestField> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(standards.interestField(rc.context, contribs, props.new));
  });
}

// --

export interface AdditionalProps {
  value: number;
  note?: string;
  children?: NrsxNode | NrsxNode[];
}

/** Arbitrary additional score impact. */
export function Additional(props: AdditionalProps): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Additional> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(
      standards.additional(rc.context, contribs, props.value, props.note ?? ""),
    );
  });
}

// --

export interface MusicProps {
  base: number;
  children?: NrsxNode | NrsxNode[];
}

/** Music quality impact. */
export function Music(props: MusicProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <Music> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(standards.music(rc.context, contribs, props.base));
  });
}

// --

export interface VisualProps {
  type: VisualTypeName;
  base: number;
  unique: number;
  children?: NrsxNode | NrsxNode[];
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
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(
      standards.visual(rc.context, contribs, vt, props.base, props.unique),
    );
  });
}

// --

export interface WritingProps {
  character: number;
  story: number;
  pacing: number;
  originality: number;
  children?: NrsxNode | NrsxNode[];
}

/** Writing quality impact. */
export function Writing(props: WritingProps): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Writing> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(
      standards.writing(
        rc.context,
        contribs,
        props.character,
        props.story,
        props.pacing,
        props.originality,
      ),
    );
  });
}

// --

export interface ConsumedProps {
  boredom: number;
  /** Total consumed duration in `MM:SS` or `HH:MM:SS` format. */
  length: string;
  children?: NrsxNode | NrsxNode[];
}

/** Consumed impact (boredom + duration, no progress metadata). */
export function Consumed(props: ConsumedProps): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Consumed> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(
      standards.consumed(
        rc.context,
        contribs,
        props.boredom,
        parseDuration(props.length),
      ),
    );
  });
}

// --

/** Dropped impact (negative boredom score). */
export function Dropped(props: {
  children?: NrsxNode | NrsxNode[];
}): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <Dropped> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(standards.dropped(rc.context, contribs));
  });
}

// --

export interface MemeProps {
  strength: number;
  length?: number;
  from?: string;
  to?: string;
  children?: NrsxNode | NrsxNode[];
}

/** Meme impact. */
export function Meme(props: MemeProps): ImpactNode {
  return asImpact((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <Meme> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(
      standards.meme(
        rc.context,
        contribs,
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
  children?: NrsxNode | NrsxNode[];
}

/** Featured music relation (this entry features another). */
export function FeatureMusic(props: FeatureMusicProps): RelationNode {
  return asRelation((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <FeatureMusic> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.relations.push(standards.featureMusic(rc.context, contribs, props.id));
  });
}

// --

export interface RemixProps {
  id: string;
  children?: NrsxNode | NrsxNode[];
}

/** Remix relation. */
export function Remix(props: RemixProps): RelationNode {
  return asRelation((rc) => {
    assert(rc.currentEntry !== null, "nrsx: <Remix> must be inside an <Entry>");
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.relations.push(standards.remix(rc.context, contribs, props.id));
  });
}

// --

export interface KilledByProps {
  id: string;
  potential: number;
  effect: number;
  children?: NrsxNode | NrsxNode[];
}

/** "Killed by" relation. */
export function KilledBy(props: KilledByProps): RelationNode {
  return asRelation((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <KilledBy> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.relations.push(
      standards.killedBy(
        rc.context,
        contribs,
        props.id,
        props.potential,
        props.effect,
      ),
    );
  });
}

// --

export interface OsuSongProps {
  /** Personal enjoyment factor (0–1, maps to 0–0.5 AP). */
  personal: number;
  /** Community/mapping quality factor (0–1, maps to 0–0.2 AP). */
  community?: number;
  children?: NrsxNode | NrsxNode[];
}

/** Osu! song impact — personal enjoyment + community mapping quality. */
export function OsuSong(props: OsuSongProps): ImpactNode {
  return asImpact((rc) => {
    assert(
      rc.currentEntry !== null,
      "nrsx: <OsuSong> must be inside an <Entry>",
    );
    const standards = getExt<ExtDAH_standards>(rc, "DAH_standards");
    rc.currentContributors = new Map();
    for (const child of toArray(props.children)) child(rc);
    const contribs = resolveContribs(rc, rc.currentEntry);
    rc.currentContributors = null;
    rc.impacts.push(
      standards.osuSong(
        rc.context,
        contribs,
        props.personal,
        props.community ?? 0,
      ),
    );
  });
}
