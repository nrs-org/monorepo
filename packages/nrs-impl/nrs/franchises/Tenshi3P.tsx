/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-5549" title="Tenshi no 3P!">
      <P.Contains id="A-MAL-34177" />
      <P.Contains id="M-VGMDB-AL-68189" />
      <P.Contains id="M-VGMDB-AL-69018" />
    </P.Entry>
    <P.Entry id="A-MAL-34177" title="Tenshi no 3P!">
      <P.Source adb={34177} ks={12624} al={97683} mal={34177} />
      <P.BestGirl name="Sakura Toriumi" />
      {/* OP is catJAM osugame */}
      {/* the map was made by the gigachad mapper: https://www.youtube.com/watch?v=QJJYpsA5tv8 */}
      {/* fuck the ED i hate that map */}
      <P.Visual type="animated" base={0.5} unique={0.3} />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.FeatureMusic id="M-VGMDB-AL-68189-1" />
      <P.FeatureMusic id="M-VGMDB-AL-69018-1" />
      <P.Writing character={0.3} story={0.4} pacing={0.6} originality={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-68189" title="Habataki no Birthday / Baby's breath">
      <P.Contains id="M-VGMDB-AL-68189-1" />
      <P.Visual type="albumArt" base={0.5} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-68189-1" title="Habataki no Birthday">
      <P.MusicConsumedProgress length="4:32" />
      <P.Music base={0.45} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-69018" title="Kusabi / Baby's breath">
      <P.Contains id="M-VGMDB-AL-69018-1" />
      <P.Visual type="albumArt" base={0.5} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-69018-1" title="Kusabi">
      {/* Length source: https://music.apple.com/jp/album/e6-a5-94-single/1268529061?l=en */}
      <P.MusicConsumedProgress length="4:26" generatedBy="user" />
      <P.Music base={0.26} />
    </P.Entry>
  </P.Document>
);
