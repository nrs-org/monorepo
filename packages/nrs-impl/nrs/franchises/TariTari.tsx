/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-4296" title="TARI TARI">
      <P.Contains id="A-MAL-13333" />
    </P.Entry>
    <P.Entry id="A-MAL-13333" title="Tari Tari">
      <P.Source adb={13333} ks={6941} al={13333} mal={13333} />
      <P.BestGirl name="Konatsu Miyamoto" />
      {/* pa works is the best atmospheric farmer */}
      <P.Cry emotions="CU" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.Visual type="animated" base={0.4} unique={0.3} />
      <P.KilledBy id="F-VGMDB-7059" potential={0.6} effect={0.5} />
      <P.Writing character={0.5} story={0.5} pacing={0.8} originality={0.8} />
    </P.Entry>
  </P.Document>
);
