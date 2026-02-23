/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-6424" title="Stella no Mahou">
      <P.Contains id="A-MAL-32555" />
      <P.Contains id="M-VGMDB-AL-60899" />
    </P.Entry>
    <P.Entry id="A-MAL-32555" title="Stella no Mahou">
      <P.Source adb={32555} ks={11756} al={21597} mal={32555} />
      {/* i love music composers */}
      <P.BestGirl name="Kayo Fujikawa" />
      <P.Visual type="animated" base={0.5} unique={0.4} />
      <P.AnimeConsumedProgress status="Completed" boredom={0.9} episodes={12} />
      <P.NEI base={0.5} emotions="AP" />
      <P.NEI base={0.2} emotions="CP" />
      <P.FeatureMusic id="M-VGMDB-AL-60899-1" />
      <P.Writing character={0.3} story={0.3} pacing={0.6} originality={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-60899" title="God Save The Girls / Shino Shimoji">
      <P.Contains id="M-VGMDB-AL-60899-1" />
      <P.Visual type="albumArt" base={0.2} unique={0.2} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-60899-1" title="God Save The Girls">
      <P.MusicConsumedProgress length="4:19" />
      <P.Music base={0.53} />
      <P.OsuSong personal={0.25} community={0} />
    </P.Entry>
  </P.Document>
);
