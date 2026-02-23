/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-5485" title="Imouto sae Ireba Ii.">
      <P.Contains id="A-MAL-35413" />
      <P.Contains id="M-VGMDB-AL-70621" />
    </P.Entry>
    <P.Entry id="A-MAL-35413" title="Imouto sae Ireba Ii.">
      <P.Source adb={35413} ks={11207} al={98596} mal={35413} />
      <P.BestGirl name="Miyako Shirakawa" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.Visual type="animated" base={0.6} unique={0.2} />
      <P.NEI base={0.5} emotions="AP" />
      <P.FeatureMusic id="M-VGMDB-AL-70621-1" />
      {/* <gateOpen id="F-VGMDB-3275" /> */}
      <P.Writing character={0.4} story={0.5} pacing={0.5} originality={0.8} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-70621"
      title="Ashita no Kimi sae Ireba Ii. / ChouCho"
    >
      <P.Contains id="M-VGMDB-AL-70621-1" />
      <P.Visual type="albumArt" base={0.5} unique={0.2} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-70621-1" title="Ashita no Kimi sae Ireba Ii.">
      <P.MusicConsumedProgress length="5:04" />
      <P.Music base={0.6} />
      <P.OsuSong personal={0.5} community={0.1} />
    </P.Entry>
  </P.Document>
);
