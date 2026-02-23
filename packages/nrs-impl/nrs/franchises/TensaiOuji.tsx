/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-10006" title="Tensai Ouji no Akaji Kokka Saiseijutsu">
      <P.Contains id="A-MAL-47159" />
      <P.Contains id="M-VGMDB-AL-116264" />
    </P.Entry>
    <P.Entry id="A-MAL-47159" title="Tensai Ouji no Akaji Kokka Saisei Jutsu">
      <P.Source adb={47159} ks={44020} al={129190} mal={47159} />
      <P.BestGirl name="Ninym Ralei" />
      {/* ngl main girl and mc relationship is wholesome af */}
      <P.NEI base={0.5} emotions="MP" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.8} episodes={12} />
      <P.Visual type="animated" base={0.5} unique={0.3} />
      {/* cool plot ig */}
      <P.NEI base={0.8} emotions="AP" />
      {/* arc 2 rst-sb69 era */}
      <P.KilledBy id="F-VGMDB-9540" potential={0.05} effect={0.05} />
      <P.KilledBy id="F-VGMDB-7059" potential={0.05} effect={0.05} />
      <P.KilledBy id="F-VGMDB-4499" potential={0.05} effect={0.2} />
      <P.Writing character={0.3} story={0.4} pacing={0.6} originality={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-116264" title="LEVEL / yanaginagi × THE SIXTH LIE">
      <P.Contains id="M-VGMDB-AL-116264-1" />
      <P.Visual type="albumArt" base={0.3} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-116264-1" title="LEVEL">
      <P.MusicConsumedProgress length="4:13" />
      <P.Music base={0.5} />
    </P.Entry>
  </P.Document>
);
