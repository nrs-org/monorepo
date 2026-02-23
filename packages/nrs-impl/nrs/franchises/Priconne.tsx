/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-7086" title="PRINCESS CONNECT!">
      <P.Contains id="A-MAL-39292" />
      <P.Contains id="A-MAL-42670" />
      <P.Contains id="M-VGMDB-AL-82981" />
    </P.Entry>
    <P.Entry id="A-MAL-39292" title="Princess Connect! Re:Dive">
      <P.Source adb={39292} ks={42892} al={107871} mal={39292} />
      <P.BestGirl name="Karyl" />
      <P.Visual type="animated" base={0.55} unique={0.25} />
      <P.AnimeConsumedProgress status="Completed" boredom={0.9} episodes={12} />
      {/* funny ig */}
      <P.NEI base={0.9} emotions="AP" />
      <P.Writing character={0.3} story={0.3} pacing={0.7} originality={0.5} />
    </P.Entry>
    <P.Entry id="A-MAL-42670" title="Princess Connect! Re:Dive Season 2">
      <P.Source adb={42670} ks={43600} al={122808} mal={42670} />
      <P.BestGirl name="Karyl" />
      <P.Visual type="animated" base={0.55} unique={0.25} />
      <P.AnimeConsumedProgress status="Completed" boredom={0.5} episodes={5} />
      {/* idk lol */}
      <P.NEI base={0.5} emotions="CP" />
      {/* funny ig */}
      <P.NEI base={0.75} emotions="AP" />
      <P.Writing character={0.3} story={0.3} pacing={0.7} originality={0.4} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-82981"
      title="PRINCESS CONNECT! Re:Dive PRICONNE CHARACTER SONG 07"
    >
      <P.Contains id="M-VGMDB-AL-82981-2" />
      <P.Visual type="albumArt" base={0.5} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-82981-2" title="Ding Dong Holy Night♪">
      <P.MusicConsumedProgress length="4:18" />
      <P.Music base={0.49} />
      <P.OsuSong personal={0.5} community={0} />
    </P.Entry>
  </P.Document>
);
