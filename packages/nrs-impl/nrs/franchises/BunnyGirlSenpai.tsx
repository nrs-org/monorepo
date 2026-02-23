/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-6852" title="Seishun Buta Yarou Series">
      <P.Contains id="A-MAL-37450" />
      <P.Contains id="M-VGMDB-AL-80253-1" />
    </P.Entry>
    <P.Entry
      id="A-MAL-37450"
      title="Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai"
    >
      <P.Source adb={37450} ks={41056} al={101291} mal={37450} />
      <P.BestGirl name="Shouko Makinohara" />
      <P.AnimeConsumedProgress status="Abandoned" boredom={0.7} episodes={9} />
      <P.Dropped />
      {/* plot kinda ok */}
      <P.NEI base={0.5} emotions="AP" />
      <P.Visual type="animated" base={0.6} unique={0.15} />
      <P.FeatureMusic id="M-VGMDB-AL-80253-1" />
      <P.Writing character={0.5} story={0.7} pacing={0.65} originality={0.75} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-80253" title="Kimi no Sei / the peggies">
      <P.Contains id="M-VGMDB-AL-80253-1" />
      {/* tf is this lol */}
      <P.Visual type="albumArt" base={0.1} unique={0.6} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-80253-1" title="Kimi no Sei">
      <P.MusicConsumedProgress length="4:24" />
      <P.Music base={0.14} />
    </P.Entry>
  </P.Document>
);
