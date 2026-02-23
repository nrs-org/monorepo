/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-6142" title="toji no miko">
      <P.Contains id="A-MAL-35589" />
      <P.Contains id="M-VGMDB-AL-76254" />
    </P.Entry>
    <P.Entry id="A-MAL-35589" title="Toji no Miko">
      <P.Source adb={35589} ks={13710} al={98747} mal={35589} />
      <P.BestGirl name="Tagitsuhime" />
      {/* i hate my life */}
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={24} />
      {/* decent plot ngl */}
      <P.NEI base={0.8} emotions="AP" />
      <P.Visual type="animated" base={0.5} unique={0.4} />
      <P.FeatureMusic id="M-VGMDB-AL-76254-1" />
      <P.Writing character={0.6} story={0.8} pacing={0.7} originality={0.8} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-76254"
      title="Shinkakei Colors / Kanami Eto (CV: Kaede Hondo), Hiyori Jujo (CV: Saori Onishi), Mai Yanase (CV: Azumi Waki), Sayaka Itomi (CV: Hina Kino), Kaoru Mashiko (CV: Risae Matsuda), Eren Kohagura (CV: Eri Suzuki)"
    >
      <P.Contains id="M-VGMDB-AL-76254-1" />
      <P.Visual type="albumArt" base={0.5} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-76254-1" title="Shinkakei Colors">
      <P.Music base={0.5} />
      <P.MusicConsumedProgress length="4:22" />
    </P.Entry>
  </P.Document>
);
