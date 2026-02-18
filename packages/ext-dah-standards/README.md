# DAH_standards Extension

This package implements the DAH_standards extension for NRS, based on the reference implementation and adapted for use in the monorepo.

The extension provides standard impact and relation helpers for creating NRS entries, including emotion-based impacts, time-based scores (PADS, waifu), media-type impacts (music, visual, writing), and relation types (featureMusic, remix, killedBy, gateOpen).

All numeric constants used in score formulas are configurable via the `ExtConfigDAHStandards` config object passed to the factory function.

## Usage

```ts
import DAH_standards, {
  Sign,
  VisualType,
  Duration,
} from "@nrs-org/ext-dah-standards";
import { AP, MP } from "@nrs-org/ext-dah-factors";

// All parameters are optional; defaults match the reference implementation
const ext = DAH_standards({
  cryBase: 5.0,          // override cry base score (default 4.0)
  musicMultiplier: 4.0,  // override music multiplier (default 3.0)
});
const ctx = newContext({ extensions: [DAH_factors(), ext] });

// Create an emotion impact
const impact = ext.emotion(ctx, contributors, 3.0, [
  [AP, 0.8],
  [MP, 0.5],
]);

// Create a cry impact
const cry = ext.cry(ctx, contributors, [[AP, 1.0]]);

// Create an AEI impact
const aei = ext.aei(ctx, contributors, 0.5, Sign.Positive, [[AP, 1.0]]);

// Create a visual impact
const vis = ext.visual(ctx, contributors, VisualType.Animated, 0.8, 0.5);

// Create a PADS impact with duration periods
const pads = ext.pads(
  ctx,
  contributors,
  [{ type: "duration", length: Duration.fromDays(3) }],
  [[MP, 1.0]],
);
```

## Configuration

Every magic number is exposed as an optional config key on `ExtConfigDAHStandards`. All keys are optional; when omitted the reference default is used.

| Key                            | Default          | Used by          |
| ------------------------------ | ---------------- | ---------------- |
| `averageAnimeEpisodeDuration`  | 20 min (ms)      | consumed, animeConsumed |
| `emotionPowerExponent`         | 0.9              | emotion vector   |
| `cryBase`                      | 4.0              | cry              |
| `padsCoeffA`                   | 0.3              | pads             |
| `padsCoeffP`                   | 1.3              | pads             |
| `padsMaxDays`                  | 10               | pads             |
| `aeiOutMin` / `aeiOutMax`      | 2.0 / 3.0        | aei              |
| `neiOutMin` / `neiOutMax`      | 0.0 / 2.0        | nei              |
| `waifuMultiplier`              | 1.2              | waifu            |
| `waifuDayDivisor`              | 90               | waifu            |
| `ehiBase`                      | 3.5              | ehi              |
| `epiOutMin` / `epiOutMax`      | 3.5 / 4.5        | epi              |
| `jumpscareBase`                | 1.0              | jumpscare        |
| `sleeplessNightBase`           | 4.0              | sleeplessNight   |
| `politicsScore`                | 0.75             | politics         |
| `interestFieldNewScore`        | 2.0              | interestField    |
| `interestFieldExistingScore`   | 1.0              | interestField    |
| `consumedTinyThreshold`        | 10 min (ms)      | consumed         |
| `consumedTinyBaseScore`        | 0.1              | consumed         |
| `consumedTinyBaseDuration`     | 5 min (ms)       | consumed         |
| `consumedShortThreshold`       | 2 hr (ms)        | consumed         |
| `consumedShortBaseScore`       | 0.3              | consumed         |
| `consumedShortBaseDuration`    | 2 hr (ms)        | consumed         |
| `consumedLongBaseScore`        | 1.0              | consumed         |
| `consumedLongEpisodeMultiplier`| 12               | consumed         |
| `droppedScore`                 | -0.5             | dropped          |
| `memeDayDivisor`               | 120              | meme             |
| `memeMultiplier`               | 4.0              | meme             |
| `memeMaxStrength`              | 2.0              | meme             |
| `musicMultiplier`              | 3.0              | music            |
| `visualUniqueOffset`           | 2.0              | visual           |
| `visualDivisor`                | 3.0              | visual           |
| `visualMultiplier`             | 2.0              | visual           |
| `osuPersonalMax`               | 0.5              | osuSong          |
| `osuCommunityMax`              | 0.2              | osuSong          |
| `writingMultiplier`            | 4.0              | writing          |
| `featureMusicWeight`           | 0.2              | featureMusic     |
| `remixWeight`                  | 0.2              | remix            |
| `killedByBase`                 | 0.4              | killedBy         |
| `killedByWeights`              | (per-factor obj)  | killedBy         |
| `gateOpenWeight`               | 0.0              | gateOpen         |
| `irVersion`                    | "1.1.1"          | IR source meta   |

## Impact Methods

| Method         | Description                                |
| -------------- | ------------------------------------------ |
| emotion        | Generic emotion-based impact               |
| cry            | Crying impact (base 4.0)                   |
| pads           | Post-anime depression syndrome             |
| aei            | Aesthetic emotional impact                 |
| nei            | Narrative emotional impact                 |
| maxAEIPADS     | Combination of max AEI + PADS              |
| cryPADS        | Combination of cry + PADS                  |
| waifu          | Waifu-based impact                         |
| ehi            | Extreme happiness impact                   |
| epi            | Extreme pleasure impact                    |
| jumpscare      | Jumpscare impact                           |
| sleeplessNight | Sleepless night impact                     |
| politics       | Political content impact                   |
| interestField  | Interest field impact                      |
| consumed       | Generic content consumption boredom impact |
| animeConsumed  | Anime-specific consumption boredom impact  |
| dropped        | Dropped content impact                     |
| meme           | Meme impact                                |
| additional     | Additional score impact                    |
| music          | Music quality impact                       |
| visual         | Visual quality impact                      |
| osuSong        | osu! song impact                           |
| writing        | Writing quality impact                     |

## Relation Methods

| Method       | Description                               |
| ------------ | ----------------------------------------- |
| featureMusic | Feature music relation (AM factor at 0.2) |
| remix        | Remix relation (scalar 0.2)               |
| killedBy     | KilledBy relation (weighted diagonal)     |
| gateOpen     | Gate open relation (scalar 0.0)           |

## License

See LICENSE file in repository root.
