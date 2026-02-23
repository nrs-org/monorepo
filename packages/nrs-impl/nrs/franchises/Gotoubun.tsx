/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-9342" title="Gotoubun no Hanayome">
      <P.Contains id="A-MAL-38101" />
      <P.Contains id="A-MAL-39783" />
      <P.Contains id="M-VGMDB-AL-82284" />
    </P.Entry>
    <P.Entry id="A-MAL-38101" title="5-toubun no Hanayome">
      <P.Source adb={38101} ks={41966} al={103572} mal={38101} />
      {/* i miss yuyuyu's idke memes */}
      <P.BestGirl name="Itsuki Nakano" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      {/* fuwa fuwa doki doki */}
      <P.AEI base={0.5} emotions="AP" />
      <P.Visual type="animated" base={0.5} unique={0.5} />
      <P.FeatureMusic id="M-VGMDB-AL-82284" />
      <P.Writing character={0.7} story={0.7} pacing={0.6} originality={0.4} />
    </P.Entry>
    <P.Entry id="A-MAL-39783" title="5-toubun no Hanayome ∬">
      <P.Source adb={39783} ks={42324} al={109261} mal={39783} />
      {/* lmfao "muh yuyuyu idc" */}
      <P.BestGirl name="Itsuki Nakano" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      {/* at first I doubted that S2 will be as good as S1 */}
      {/* but it actually is */}
      <P.AEI base={0.25} emotions="AP" />
      <P.Visual type="animated" base={0.5} unique={0.5} />
      <P.Writing character={0.7} story={0.7} pacing={0.6} originality={0.3} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-82284"
      title="Gotoubun no Kimochi / Nakano-ke no Itsutsugo"
    >
      <P.Contains id="M-VGMDB-AL-82284-1" />
      <P.Visual type="albumArt" base={0.5} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-82284-1" title="Gotoubun no Kimochi">
      <P.MusicConsumedProgress length="3:42" />
      <P.Music base={0.34} />
      <P.Role id="M-VGMDB-AR-15361" roles="vocal/5+image_feat/5" />
      <P.Role id="M-VGMDB-AR-12726" roles="vocal/5+image_feat/5" />
      <P.Role id="M-VGMDB-AR-6783" roles="vocal/5+image_feat/5" />
    </P.Entry>
  </P.Document>
);
