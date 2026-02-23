/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* the funny visual novel that got fucked by e2e lmfao */}
    <P.Entry id="F-VGMDB-8817" title="ATRI -My Dear Moments-">
      <P.Contains id="V-VNDB-27448" />
      <P.Contains id="M-VGMDB-AL-100754" />
    </P.Entry>
    <P.Entry id="V-VNDB-27448" title="ATRI -My Dear Moments-">
      <P.BestGirl name="Atri" />
      {/* wait wtf */}
      {/* minamo's va is the same person as aone's va */}
      {/* based rst reference */}
      {/* sad plot twist thingy */}
      <P.AEI base={0.8} emotions="CU-0.8:AP-0.2" />
      {/* sadge */}
      <P.ConsumedProgress
        status="Abandoned"
        boredom={0.8}
        duration="10:00:00"
      />
      <P.Dropped />
      <P.Visual type="visualNovel" base={0.7} unique={0.15} />
      <P.Meme strength={0.5} length={10} />
      <P.FeatureMusic id="M-VGMDB-AL-100754" />
      <P.Writing character={0.4} story={0.6} pacing={0.8} originality={0.75} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-100754"
      title="ATRI -My Dear Moments- Original Soundtrack"
    >
      <P.Visual type="albumArt" base={0.7} unique={0.15} />
      {/* like the aokana soundtrack album */}
      <P.Music base={0.6} />
    </P.Entry>
  </P.Document>
);
