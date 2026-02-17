# DAH_standards Extension

This package implements the DAH_standards extension for NRS, based on the reference implementation and adapted for use in the monorepo.

The extension provides standard impact and relation helpers for creating NRS entries, including emotion-based impacts, time-based scores (PADS, waifu), media-type impacts (music, visual, writing), and relation types (featureMusic, remix, killedBy, gateOpen).

## Usage

```ts
import DAH_standards, {
  Sign,
  VisualType,
  Duration,
} from "@nrs-org/ext-dah-standards";
import { AP, MP } from "@nrs-org/ext-dah-factors";

const ext = DAH_standards();
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
