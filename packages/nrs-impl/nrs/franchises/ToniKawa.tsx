/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-10135" title="Tonikaku Kawaii">
      <P.Contains id="A-MAL-41389" />
      <P.Contains id="M-VGMDB-AL-104618" />
    </P.Entry>
    <P.Entry id="A-MAL-41389" title="Tonikaku Kawaii">
      <P.Source adb={41389} ks={43034} al={116267} mal={41389} />
      <P.BestGirl name="Tsukasa Yuzaki" />
      <P.Visual type="animated" base={0.4} unique={0.6} />
      <P.AnimeConsumedProgress status="Abandoned" boredom={0.8} episodes={1} />
      <P.Dropped />
      <P.KilledBy id="F-VGMDB-2588" potential={0.2} effect={0.5} />
      <P.FeatureMusic id="M-VGMDB-AL-104618" />
      <P.Writing character={0.3} story={0.4} pacing={0.8} originality={0.8} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-104618"
      title="Koi no Uta (feat. Tsukasa Yuzaki) / Yunomi"
    >
      <P.Contains id="M-VGMDB-AL-104618-1" />
      <P.Visual type="albumArt" base={0.4} unique={0.6} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-104618-1" title="Koi no Uta (feat. Yuzaki Tsukasa)">
      <P.MusicConsumedProgress length="3:29" />
      <P.Music base={0.4} />
      <P.Role id="M-VGMDB-AR-26898" roles="vocal/2+image_feat" />
      <P.Role id="M-VGMDB-AR-30942" roles="prod+image" />
    </P.Entry>
  </P.Document>
);
