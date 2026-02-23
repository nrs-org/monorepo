/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-2090" title="Sakurasou no Pet na Kanojo">
      <P.Contains id="A-MAL-13759" />
      <P.Contains id="M-VGMDB-AL-35015" />
    </P.Entry>
    <P.Entry id="A-MAL-13759" title="Sakura-sou no Pet na Kanojo">
      <P.Source adb={13759} ks={7023} al={13759} mal={13759} />
      <P.BestGirl name="Mashiro Shiina" />
      {/* This is a very good compoly story, meaning */}
      {/* there are a lot of truly sad moments in this */}
      {/* anime. But a lot of records have been lost and */}
      {/* idk why I'm sad. The previous impl gave AEI(5) */}
      <P.AEI base={0.75} emotions="CU" />
      {/* The group is kinda comfy ig */}
      <P.NEI base={0.5} emotions="MP" />
      {/* This and New Game! is recorded to be the */}
      {/* inspiration for me to learn programming */}
      {/* (see NewGame.kt) */}
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={24} />
      <P.Visual type="animated" base={0.5} unique={0.4} />
      <P.FeatureMusic id="M-VGMDB-AL-35015-1" />
      <P.Writing character={0.8} story={0.7} pacing={0.8} originality={0.8} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-35015"
      title="Kimi ga Yume wo Tsuretekita / Pet na Kanojotachi"
    >
      <P.Contains id="M-VGMDB-AL-35015-1" />
      <P.Visual type="albumArt" base={0.5} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-35015-1" title="Kimi ga Yume wo Tsuretekita">
      <P.MusicConsumedProgress length="4:17" />
      <P.Music base={0.32} />
    </P.Entry>
  </P.Document>
);
