/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-6083" title="Arifureta Shokugyou de Sekaisaikyou">
      <P.Contains id="A-MAL-36882" />
      <P.Contains id="M-VGMDB-AL-86592-1" />
    </P.Entry>
    <P.Entry id="A-MAL-36882" title="Arifureta Shokugyou de Sekai Saikyou">
      <P.Source adb={36882} ks={14043} al={100668} mal={36882} />
      <P.BestGirl name="Yue" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.9} episodes={13} />
      {/* MC got dumped by his friends made me kinda angry */}
      <P.NEI base={0.25} emotions="AU" />
      <P.Visual type="animated" base={0.5} unique={0.1} />
      <P.FeatureMusic id="M-VGMDB-AL-86592-1" />
      <P.Writing character={0.2} story={0.2} pacing={0.5} originality={0.2} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-86592" title="FLARE / Void_Chords feat.LIO">
      <P.Contains id="M-VGMDB-AL-86592-1" />
      <P.Visual type="albumArt" base={0.05} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-86592-1" title="FLARE">
      <P.MusicConsumedProgress length="4:37" />
      <P.Music base={0.14} />
      <P.OsuSong personal={0.1} community={0.05} />
    </P.Entry>
  </P.Document>
);
