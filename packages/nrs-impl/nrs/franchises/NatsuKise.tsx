/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-5817" title="natsuiro kiseki">
      <P.Contains id="A-MAL-12119" />
      <P.Contains id="A-MAL-15431" />
    </P.Entry>
    <P.Entry id="A-MAL-12119" title="Natsu-iro Kiseki">
      <P.Source adb={12119} ks={6667} al={12119} mal={12119} />
      <P.BestGirl name="Saki Mizukoshi" />
      {/* something something rst something cp-based */}
      <P.NEI base={0.5} emotions="CU-0.5:CP-0.5" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.Visual type="animated" base={0.5} unique={0.4} />
      <P.Writing character={0.4} story={0.4} pacing={0.7} originality={0.6} />
    </P.Entry>
    <P.Entry id="A-MAL-15431" title="Natsu-iro Kiseki: 15-kaime no Natsuyasumi">
      <P.Source ks={7255} al={15431} mal={15431} />
      <P.ValidatorSuppress rules="dah-no-anime-altsrc" />
      <P.BestGirl name="Saki Mizukoshi" />
      <P.AnimeConsumedProgress
        status="Completed"
        boredom={0.8}
        episodes={1}
        episodeDuration="7:00"
      />
      <P.Visual type="animated" base={0.5} unique={0.4} />
      <P.Writing character={0.3} story={0.2} pacing={0.8} originality={0.4} />
    </P.Entry>
  </P.Document>
);
