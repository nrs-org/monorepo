/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-3124" title="SHIROBAKO">
      <P.Contains id="A-MAL-25835" />
      <P.Contains id="A-MAL-37804" />
    </P.Entry>
    <P.Entry id="A-MAL-25835" title="Shirobako">
      <P.Source adb={10779} al={20812} ks={8698} mal={25835} />
      {/* mid tbh */}
      {/* asmr girl */}
      <P.BestGirl name="Ema Yasuhara" />
      <P.Visual type="animated" base={0.5} unique={0.3} />
      <P.AnimeConsumedProgress status="Completed" boredom={0.8} episodes={24} />
      {/* there are some memes like "spreading misinformation" etc. etc. */}
      <P.NEI base={0.3} emotions="AP" />
      <P.Writing character={0.8} story={0.8} pacing={0.8} originality={0.9} />
    </P.Entry>
    <P.Entry id="A-MAL-37804" title="Shirobako Movie">
      <P.Source adb={14061} al={101574} ks={41255} mal={37804} />
      {/* asmr girl */}
      <P.BestGirl name="Ema Yasuhara" />
      <P.Visual type="animated" base={0.5} unique={0.3} />
      <P.AnimeConsumedProgress
        status="Completed"
        boredom={0.9}
        episodes={1}
        episodeDuration="2:00:00"
      />
      {/* bla bla bla post-nozsism cultural renaissance */}
      <P.AEI base={0.5} emotions="CP" />
      <P.Writing character={0.6} story={0.6} pacing={0.8} originality={0.9} />
    </P.Entry>
  </P.Document>
);
