/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-3554" title="Charlotte">
      <P.Contains id="A-MAL-28999" />
    </P.Entry>
    <P.Entry id="A-MAL-28999" title="Charlotte">
      <P.Source adb={28999} ks={10103} al={20997} mal={28999} />
      <P.BestGirl name="Nao Tomori" />
      <P.Visual type="animated" base={0.5} unique={0.1} />
      {/* max AEI debatable */}
      <P.MaxAEIPADS length={3} emotions="CU" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.Writing character={0.6} story={0.4} pacing={0.6} originality={0.75} />
    </P.Entry>
  </P.Document>
);
