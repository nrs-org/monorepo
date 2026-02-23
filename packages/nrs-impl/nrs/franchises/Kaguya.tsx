/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* i thought this was blacklisted, but it seems that was not the case */}
    <P.Entry
      id="F-VGMDB-7021"
      title="Kaguya-sama wa Kokurasetai ~Tensaitachi no Ren'ai Zunousen~"
    >
      <P.Contains id="M-VGMDB-AL-83397" />
      <P.Contains id="M-VGMDB-AL-116977" />
      <P.Contains id="A-MAL-37999" />
      <P.Contains id="A-MAL-40591" />
      <P.Contains id="A-MAL-43608" />
      {/* kaguyashit my behated */}
      {/* but I got tired of the constant spamming of redditors */}
      {/* (more like jealous with its popularity, so it got hated) */}
      {/* also the ideology in this anime is kinda fucked. */}
      {/* and it's also kinda boring too */}
      {/* and now 6.xx became the meta, rst + sb69 top 2, le boat analogy lol */}
      <P.AEI base={-0.5} emotions="AU">
        <P.Contributor id="A-MAL-37999" factor={0.25} />
        <P.Contributor id="A-MAL-40591" factor={0.5} />
        <P.Contributor id="A-MAL-43608" factor={0.25} />
      </P.AEI>
      {/* these are ranked just to help to carry the AEI for s1 */}
      {/* also the funny rina hidaka girl too lmfao */}
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-83397"
      title="Chikatto Chika Chika♡ / Chika Fujiwara (CV. Konomi Kohara)"
    >
      <P.Contains id="M-VGMDB-AL-83397-1" />
      <P.Visual type="albumArt" base={0.5} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-83397-1" title="Chikatto Chika Chika♡">
      <P.MusicConsumedProgress length="2:58" />
      <P.Music base={0.32} />
      <P.OsuSong personal={0.5} community={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-116977" title="KAGUYA ♡ ULTRA BEST">
      <P.Contains id="M-VGMDB-AL-116977-11" />
      <P.Visual type="albumArt" base={0.5} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-116977-11" title="ありがとう。">
      <P.MusicConsumedProgress length="4:14" />
      {/* the grass-touching experience */}
      <P.Music base={0.35} />
      <P.Role id="M-VGMDB-AR-8480" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="A-MAL-37999"
      title="Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen"
    >
      <P.Source adb={37999} ks={41373} al={101921} mal={37999} />
      <P.BestGirl name="Ai Hayasaka" />
      {/* https://en.wikipedia.org/wiki/Yumiri_Hanamori#:~:text=On%20November%201%2C%202019%2C%20it%20was%20announced%20that%20Hanamori%20would%20be%20%22graduating%22%20from%20Re%3AStage!%20due%20to%20a%20knee%20injury. */}
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={9} />
      <P.Dropped />
      {/* ep12 of this thing was watched, sure, but the other last episodes */}
      {/* (9-11 or some shit) were ditches because bla bla bla */}
      <P.ValidatorSuppress rules="dah-no-dropped-impact" />
      <P.Visual type="animated" base={0.5} unique={0.4} />
      <P.FeatureMusic id="M-VGMDB-AL-83397-1" />
      {/* domestic kanojo war arc */}
      <P.Meme strength={0.25} length={90} />
      <P.Writing character={0.4} story={0.6} pacing={0.8} originality={0.6} />
    </P.Entry>
    <P.Entry
      id="A-MAL-40591"
      title="Kaguya-sama wa Kokurasetai? Tensai-tachi no Renai Zunousen"
    >
      <P.Source adb={40591} ks={42632} al={112641} mal={40591} />
      <P.BestGirl name="Kobachi Osaragi" />
      {/* tatoe asu de sekai ga owattemo */}
      {/* koukai shinai yo kimi ni deaeta koto */}
      <P.Visual type="animated" base={0.5} unique={0.4} />
      <P.AnimeConsumedProgress status="Planned" boredom={0} episodes={0} />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Writing character={0.4} story={0.6} pacing={0.8} originality={0.5} />
    </P.Entry>
    <P.Entry
      id="A-MAL-43608"
      title="Kaguya-sama wa Kokurasetai: Ultra Romantic"
    >
      <P.Source adb={43608} ks={43691} al={125367} mal={43608} />
      {/* imagine almost every anime losing to this shit lol y'all sucks (the MAL top 2 thing) */}
      {/* (rst still better copium) */}
      <P.BestGirl name="Kobachi Osaragi" />
      {/* It happened so suddenly, but from now on */}
      {/* I want you to quietly listen to what I’ll say */}
      {/* Just for now I’ll say “goodbye” to my cowardly heart */}
      <P.Visual type="animated" base={0.5} unique={0.4} />
      <P.AnimeConsumedProgress status="Planned" boredom={0} episodes={0} />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Writing character={0.4} story={0.6} pacing={0.8} originality={0.5} />
    </P.Entry>
  </P.Document>
);
