/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* i hate himeno sena */}
    <P.Entry id="F-VGMDB-8433" title="Nakitai Watashi wa Neko wo Kaburu">
      <P.Contains id="A-MAL-41168" />
      <P.Contains id="M-VGMDB-AL-99082" />
    </P.Entry>
    <P.Entry id="A-MAL-41168" title="Nakitai Watashi wa Neko wo Kaburu">
      <P.Source adb={41168} ks={42965} al={114963} mal={41168} />
      <P.BestGirl name="Miyo Sasaki" />
      {/* main girl pretty pog btw */}
      {/* i mean not as much as sena but whatever */}
      {/* cool story bro */}
      <P.Visual type="animated" base={0.6} unique={0.4} />
      <P.AnimeConsumedProgress
        status="Completed"
        boredom={1}
        episodes={1}
        episodeDuration="1:44:00"
      />
      <P.AEI base={0.1} emotions="MP-0.5:CU-0.5" />
      <P.FeatureMusic id="M-VGMDB-AL-99082-1" />
      <P.Writing character={0.4} story={0.4} pacing={0.7} originality={0.8} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-99082" title="Hana ni Bourei / Yorushika">
      <P.Contains id="M-VGMDB-AL-99082-1" />
      <P.Visual type="albumArt" base={0.2} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-99082-1" title="Hana ni Bourei">
      <P.MusicConsumedProgress length="4:00" />
      <P.Music base={0.45} />
    </P.Entry>
  </P.Document>
);
