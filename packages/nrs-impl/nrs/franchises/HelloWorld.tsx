/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="A-MAL-38816" title="Hello World">
      <P.Source adb={38816} ks={42030} al={106240} mal={38816} />
      <P.BestGirl name="Ichijou Ruka" />
      {/* oh fuck */}
      <P.BestGirl name="Ruri Ichigyou" />
      <P.AnimeConsumedProgress
        status="Completed"
        boredom={1}
        episodes={1}
        episodeDuration="1:37:00"
      />
      {/* the cg kinda help with making the anime unique lol */}
      <P.Visual type="animated" base={0.4} unique={0.6} />
      <P.Writing character={0.6} story={0.4} pacing={0.5} originality={0.8} />
    </P.Entry>
    <P.Entry id="A-MAL-40295" title="Another World">
      <P.Source adb={40295} ks={42527} al={111733} mal={40295} />
      <P.BestGirl name="Ruri Ichigyou" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={3} />
      {/* the cg kinda help with making the anime unique lol */}
      <P.Visual type="animated" base={0.4} unique={0.6} />
      <P.Writing character={0.6} story={0.4} pacing={0.5} originality={0.7} />
    </P.Entry>
    <P.AEI base={0.9} emotions="CU">
      <P.Contributor id="A-MAL-38816" factor={0.4} />
      <P.Contributor id="A-MAL-40295" factor={0.6} />
    </P.AEI>
  </P.Document>
);
