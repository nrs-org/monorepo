/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="L-MAL-110953" title="Neeko wa Tsurai yo" entrytype="Manga">
      {/* Yes, I hate capitalism and its foes, how could you tell? */}
      {/* i love aitsuki nakuru */}
      <P.BestGirl name="Nemuko Niito" />
      <P.Visual type="manga" base={0.6} unique={0.3} />
      {/* 38/41 chapters */}
      {/* about 2hr of value idk */}
      <P.ConsumedProgress status="Consuming" boredom={1} duration="2:00:00" />
      <P.MaxAEIPADS emotions="MP-0.1:CU-0.3:CP-0.6" />
      {/* didn't realize that i kinda want an anime daughter ngl */}
      {/* anti-lovists in shambles rn */}
      {/* (the dqc daughter meme comes from here kekw) */}
      <P.Writing character={0.6} story={0.3} pacing={0.8} originality={0.9} />
    </P.Entry>
    <P.Entry id="A-MAL-52092" title="My Home Hero">
      <P.Source adb={17471} al={151189} ks={46209} mal={52092} />
      {/* nah im not making that :clueless: daughter the best girl aint nah bro */}
      <P.ValidatorSuppress rules="dah-no-best-girl" />
      <P.AEI base={0.2} emotions="AP" />
      <P.Visual type="animated" base={0.2} unique={0.4} />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.Writing character={0.3} story={0.3} pacing={0.8} originality={0.8} />
    </P.Entry>
    <P.Entry id="A-MAL-48981" title="Mahou Shoujo Magical Destroyers">
      <P.Source adb={16320} al={134131} ks={44586} mal={48981} />
      <P.BestGirl name="Pink" />
      <P.NEI base={0.8} emotions="AP" />
      <P.Visual type="animated" base={0.3} unique={0.6} />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.FeatureMusic id="M-VGMDB-AL-128439-1" />
      <P.Writing character={0.4} story={0.3} pacing={0.8} originality={0.6} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-128439" title="MAGICAL DESTROYER / Aimi">
      <P.Contains id="M-VGMDB-AL-128439-1" />
      <P.Source
        urls={[{ name: "vgmdb", src: "https://vgmdb.net/album/128439" }]}
      />
      <P.Visual type="albumArt" base={0.2} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-128439-1" title="MAGICAL DESTROYER">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=eY6UODku6Og",
          },
        ]}
      />
      <P.Music base={0.5} />
      <P.MusicConsumedProgress length="3:47" />
    </P.Entry>
    <P.Entry id="A-MAL-50871" title="Alice Gear Aegis Expansion">
      <P.Source adb={17147} al={144188} ks={43845} mal={50871} />
      <P.BestGirl name="Nodoka Takahata" />
      <P.NEI base={0.9} emotions="AP" />
      <P.Visual type="animated" base={0.6} unique={0.1} />
      {/* blame ksdgk */}
      <P.AnimeConsumedProgress status="Abandoned" boredom={0.8} episodes={10} />
      <P.Dropped />
      <P.FeatureMusic id="M-VGMDB-AL-127924-1" />
      <P.FeatureMusic id="M-VGMDB-AL-127927-1" />
      <P.Writing character={0.4} story={0.3} pacing={0.8} originality={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-127924" title="Dash and Go! / Aina Suzuki">
      <P.Contains id="M-VGMDB-AL-127924-1" />
      <P.Source
        urls={[{ name: "vgmdb", src: "https://vgmdb.net/album/127924" }]}
      />
      <P.Visual type="albumArt" base={0.2} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-127924-1" title="Dash and Go!">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=NbHSXce7uRw",
          },
        ]}
      />
      <P.Music base={0.4} />
      <P.MusicConsumedProgress length="4:15" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-127927" title="Just a little bit / Marina Horiuchi">
      <P.Contains id="M-VGMDB-AL-127927-1" />
      <P.Source
        urls={[{ name: "vgmdb", src: "https://vgmdb.net/album/127927" }]}
      />
      <P.Visual type="albumArt" base={0.2} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-127927-1" title="Just a little bit">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=Jo9H4MohmGc",
          },
        ]}
      />
      <P.Music base={0.5} />
      <P.MusicConsumedProgress length="3:48" />
    </P.Entry>
  </P.Document>
);
