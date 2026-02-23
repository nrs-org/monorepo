/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-2520" title="Love Lab">
      <P.Contains id="A-MAL-16353" />
      <P.Contains id="M-VGMDB-AL-40263" />
    </P.Entry>
    <P.Entry id="A-MAL-16353" title="Love Lab">
      <P.Source adb={16353} ks={7410} al={16353} mal={16353} />
      <P.BestGirl name="Riko Kurahashi" />
      <P.Visual type="animated" base={0.5} unique={0.3} />
      <P.AnimeConsumedProgress status="Completed" boredom={0.9} episodes={12} />
      <P.NEI base={0.5} emotions="AP" />
      <P.FeatureMusic id="M-VGMDB-AL-40263-1" />
      <P.Writing character={0.5} story={0.4} pacing={0.7} originality={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-40263" title="Love Lab Vol.2 Bonus CD">
      <P.Contains id="M-VGMDB-AL-40263-1" />
      <P.Visual type="albumArt" base={0.1} unique={0.2} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-40263-1" title="Best FriendS">
      <P.MusicConsumedProgress length="4:32" />
      <P.Music base={0.33} />
      <P.OsuSong personal={0.7} community={0.8} />
    </P.Entry>
  </P.Document>
);
