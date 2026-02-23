/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-9895" title="Blue Archive">
      <P.Contains id="M-VGMDB-AL-117861" />
      <P.Contains id="M-VGMDB-AL-126116" />
      <P.Contains id="M-VGMDB-AL-108549" />
      <P.Contains id="M-VGMDB-AL-121695" />
      <P.Contains id="G-VGMDB-9895" />
      {/* "onsen but actually meta" */}
      {/* (yes the game exists but it will likely not be played for a while) */}
      {/* no way edm in 2023 pogpega */}
      {/* this is literally 2018 */}
      <P.Meme strength={0.7} from="2023-01-01" to="2023-04-01" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-117861"
      title="Blue Archive Original Soundtrack Vol.1 ~Longing for the memorable days~"
    >
      <P.Contains id="M-VGMDB-AL-117861-4" />
      {/* pogpega le cat 2023 */}
      <P.Visual type="albumArt" base={0.4} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-117861-4" title="Shooting Stars">
      <P.Music base={0.5} />
      <P.MusicConsumedProgress length="2:00" />
      <P.Remix id="M-20230608T133428" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-126116"
      title="Blue Archive Original Soundtrack Vol.3 ~Reaching for the precious time~"
    >
      <P.Contains id="M-VGMDB-AL-126116-4" />
      <P.Contains id="M-VGMDB-AL-126116-24" />
      {/* hfiumi buff (without hfiumi base is 0.3) */}
      <P.Visual type="albumArt" base={0.5} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-126116-4" title="Hifumi Daisuki">
      <P.MusicConsumedProgress length="2:29" />
      <P.Music base={0.51} />
      {/* :crying emoji: */}
      {/* i love leah kate */}
      {/* https://osu.ppy.sh/beatmapsets/1933124#osu/3994310 :skull: */}
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-126116-24" title="RE Aoharu">
      {/* idk what this feeling is lmfao */}
      <P.AEI base={0.5} emotions="MU-0.5:CP-0.5" />
      <P.MusicConsumedProgress length="2:21" />
      <P.Music base={0.57} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-108549" title="Clear Morning / Yui Ogura">
      <P.Contains id="M-VGMDB-AL-108549-1" />
      <P.Visual type="albumArt" base={0.2} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-108549-1" title="Clear Morning">
      <P.MusicConsumedProgress length="4:38" />
      {/* me catjamming to the beat drop */}
      {/* :catJAMMER: :EDM: :catJAMMER: :EDM: :catJAMMER: :EDM: :catJAMMER: */}
      <P.Music base={0.43} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-121695"
      title="KAGAYAKI✦SUMMER DAYS / Abydos High School Countermeasure Council"
    >
      <P.Contains id="M-VGMDB-AL-121695-1" />
      <P.Visual type="albumArt" base={0.3} unique={0.2} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-121695-1" title="Kagayaki Summer Days">
      <P.MusicConsumedProgress length="4:22" />
      <P.Music base={0.44} />
    </P.Entry>
    <P.Entry id="G-VGMDB-9895" title="Blue Archive">
      {/* yet another gacha game waiting to be dead xddd */}
      {/* let enjoy it while it lasts */}
      <P.FeatureMusic id="M-VGMDB-AL-126116" />
      {/* rob the bank xd */}
      <P.NEI base={0.8} emotions="AP" />
      {/* pretty weak char design */}
      {/* somewhat good art tho */}
      {/* (sherryposters gtfo) */}
      <P.Visual type="animatedGachaCardArt" base={0.5} unique={0.5} />
      {/* idk much about the story */}
      <P.ValidatorSuppress rules="dah-no-writing-impact" />
    </P.Entry>
    <P.Entry
      id="M-20230608T133428"
      title="Shooting Stars (long ver.)"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=zZOR65TjZLU",
          },
        ]}
      />
      <P.Music base={0.6} />
      <P.MusicConsumedProgress length="5:12" />
    </P.Entry>
  </P.Document>
);
