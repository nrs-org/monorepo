/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-4615" title="Kimi no Na wa">
      <P.Contains id="A-MAL-32281" />
      <P.Contains id="M-VGMDB-AL-82251" />
      {/* TODO: add music ig, too lazy to do that tho (and the music sucks) */}
      {/* "the music sucks" lmfao said the dude with 10 watame sparkles in plst2 */}
    </P.Entry>
    <P.Entry id="A-MAL-32281" title="Kimi no Na wa.">
      <P.Source adb={32281} ks={11614} al={21519} mal={32281} />
      <P.Visual type="animated" base={0.9} unique={0.75} />
      <P.BestGirl name="Miki Okudera" />
      {/* "Compensation for KnK-YrNa jealousy" */}
      <P.Additional value={0.75} />
      {/* 2017, the anime revolution ended with immense hate for this anime */}
      {/* that hate would then become the heisenberg uncertainty principle (HUP) */}
      {/* 2024, the best anime is currently rst, the icon of HUP */}
      {/* it would be so poetic if this anime can take back the reign lol */}
      <P.AEI base={0} emotions="MU" />
      {/* hope: girls can change the world */}
      <P.AEI base={1} emotions="CP" />
      {/* damn the ily hand part is cool ngl */}
      <P.Cry emotions="MP" />
      {/* bruh zoomers said that a 106-minute movie is boring */}
      <P.AnimeConsumedProgress
        status="Completed"
        boredom={1}
        episodes={1}
        episodeDuration="1:46:00"
      />
      <P.FeatureMusic id="M-VGMDB-AL-82251-12" />
      <P.Writing character={0.4} story={0.7} pacing={0.7} originality={0.9} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-82251" title="Ningen Kaika / RADWIMPS">
      <P.Contains id="M-VGMDB-AL-82251-12" />
      <P.Visual type="albumArt" base={0.15} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-82251-12" title="Sparkle (Original Version)">
      <P.Music base={0.8} />
      <P.MusicConsumedProgress length="6:55" />
      <P.AEI base={0.8} emotions="CU" />
      <P.Remix id="M-20230405T020401" />
      <P.Remix id="M-20230405T020402" />
    </P.Entry>
    {/* watame */}
    <P.Entry id="M-20230405T020401" title="Sparkle" entrytype="MusicTrack">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=SRQiuEjNEcQ",
          },
        ]}
      />
      {/* TODO: 3d cg should have its own visual type */}
      <P.Visual type="rpg3dGame" base={0.5} unique={0.2} />
      <P.Music base={0.78} />
      <P.MusicConsumedProgress length="6:53" />
      <P.Role id="M-20251125T015400" roles="vocal+image" />
    </P.Entry>
    {/* mio */}
    <P.Entry id="M-20230405T020402" title="Sparkle" entrytype="MusicTrack">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=2l_6oIGTrbg",
          },
        ]}
      />
      <P.Visual type="semiAnimatedMV" base={0.6} unique={0.2} />
      <P.Music base={0.75} />
      <P.MusicConsumedProgress length="6:51" />
      <P.Remix id="M-20240821T213821-1" />
    </P.Entry>
    <P.Entry id="F-VGMDB-7292" title="Tenki no Ko">
      <P.Contains id="A-MAL-38826" />
      <P.Contains id="M-VGMDB-AL-87003" />
    </P.Entry>
    <P.Entry id="A-MAL-38826" title="Tenki no Ko">
      <P.Source adb={38826} ks={42028} al={106286} mal={38826} />
      <P.BestGirl name="Hina Amano" />
      <P.Visual type="animated" base={0.6} unique={0.75} />
      <P.AnimeConsumedProgress
        status="Completed"
        boredom={1}
        episodes={1}
        episodeDuration="1:52:00"
      />
      <P.FeatureMusic id="M-VGMDB-AL-87003" />
      <P.Writing character={0.4} story={0.7} pacing={0.7} originality={0.9} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-87003" title="Tenki no Ko / RADWIMPS">
      <P.Contains id="M-VGMDB-AL-87003-28" />
      <P.Visual type="albumArt" base={0.5} unique={0.5} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-87003-28"
      title="Grand Escape (Movie edit) feat, Miura Toko"
    >
      <P.MusicConsumedProgress length="3:08" />
      <P.Music base={0.35} />
      <P.OsuSong personal={0.4} community={0} />
      <P.Remix id="M-20250221T163932-7" />
    </P.Entry>
  </P.Document>
);
