/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-7481" title="Bokutachi wa Benkyou ga Dekinai">
      <P.Contains id="A-MAL-38186" />
      <P.Contains id="A-MAL-40004" />
      <P.Contains id="M-VGMDB-AL-85537" />
      <P.Contains id="M-VGMDB-AL-88884" />
    </P.Entry>
    <P.Entry id="A-MAL-38186" title="Bokutachi wa Benkyou ga Dekinai">
      <P.Source adb={38186} ks={41956} al={103900} mal={38186} />
      <P.BestGirl name="Mafuyu Kirisu" />
      {/* le bang bang zenryoku i love you girl lol */}
      {/* "this is a little bit better than gotoubun" */}
      <P.AEI base={0.75} emotions="AP" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.Visual type="animated" base={0.4} unique={0.7} />
      <P.FeatureMusic id="M-VGMDB-AL-85537-1" />
      <P.Writing character={0.4} story={0.6} pacing={0.6} originality={0.5} />
    </P.Entry>
    <P.Entry id="A-MAL-40004" title="Bokutachi wa Benkyou ga Dekinai!">
      <P.Source adb={40004} ks={42414} al={110229} mal={40004} />
      <P.BestGirl name="Fumino Furuhashi" />
      {/* va jokes aside, fumino is best girl */}
      {/* "this is a little bit better than gotoubun" lmfao copy paste error */}
      {/* is what i'm thinking but fall 2019 is just another trash season lol */}
      <P.AEI base={0.7} emotions="AP" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.Visual type="animated" base={0.4} unique={0.7} />
      <P.FeatureMusic id="M-VGMDB-AL-88884-1" />
      <P.Writing character={0.4} story={0.6} pacing={0.6} originality={0.4} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-85537"
      title="Seishun Seminar/Never Give It Up!! / Study"
    >
      <P.Contains id="M-VGMDB-AL-85537-1" />
      <P.Visual type="albumArt" base={0.4} unique={0.7} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-85537-1" title="Seishun Seminar">
      <P.MusicConsumedProgress length="4:15" />
      <P.Music base={0.32} />
      <P.OsuSong personal={0.2} community={0} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-88884" title="Can now, Can now / Study">
      <P.Contains id="M-VGMDB-AL-88884-1" />
      <P.Visual type="albumArt" base={0.4} unique={0.7} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-88884-1" title="Can now, Can now">
      <P.MusicConsumedProgress length="4:02" />
      <P.Music base={0.25} />
      <P.OsuSong personal={0.1} community={0} />
    </P.Entry>
  </P.Document>
);
