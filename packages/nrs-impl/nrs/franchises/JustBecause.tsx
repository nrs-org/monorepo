/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-5678" title="Just Because!">
      <P.Contains id="A-MAL-35639" />
      <P.Contains id="M-VGMDB-AL-70716-1" />
    </P.Entry>
    <P.Entry id="A-MAL-35639" title="Just Because!">
      <P.Source adb={35639} ks={13530} al={98820} mal={35639} />
      <P.BestGirl name="Mio Natsume" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      {/* Pretty decent drama */}
      <P.AEI base={0.5} emotions="CU" />
      <P.FeatureMusic id="M-VGMDB-AL-70716-1" />
      <P.Visual type="animated" base={0.4} unique={0.6} />
      <P.Writing character={0.4} story={0.4} pacing={0.5} originality={0.6} />
    </P.Entry>
  </P.Document>
);
