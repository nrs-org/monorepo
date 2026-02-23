/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-6418" title="Shichisei no Subaru">
      <P.Contains id="A-MAL-36316" />
      <P.Contains id="M-VGMDB-AL-78478-1" />
    </P.Entry>
    <P.Entry id="A-MAL-36316" title="Shichisei no Subaru">
      <P.Source adb={36316} ks={40893} al={100085} mal={36316} />
      <P.BestGirl name="Asahi Kuga" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.8} episodes={12} />
      {/* The drama in this anime is executed fairly well. */}
      {/* (It only exists in the first episodes tho) */}
      <P.AEI base={0.1} emotions="CU" />
      <P.Visual type="animated" base={0.6} unique={0.2} />
      <P.FeatureMusic id="M-VGMDB-AL-78478-1" />
      <P.Writing character={0.3} story={0.4} pacing={0.7} originality={0.7} />
    </P.Entry>
  </P.Document>
);
