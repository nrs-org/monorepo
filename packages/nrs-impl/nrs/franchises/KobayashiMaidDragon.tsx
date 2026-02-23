/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-8954" title="Kobayashi-san Chi no Maid Dragon">
      <P.Contains id="M-VGMDB-AL-62516" />
      <P.Contains id="M-VGMDB-AL-110219" />
      <P.Contains id="A-MAL-33206" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-62516"
      title="Aozora no Rhapsody / fhána [Anime Edition]"
    >
      <P.Contains id="M-VGMDB-AL-62516-1" />
      <P.Visual type="albumArt" base={0.6} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-62516-1" title="青空のラプソディ">
      {/* Length source: https://open.spotify.com/album/7AA47NCwpqemraOTWD1oCV */}
      <P.MusicConsumedProgress length="4:38" generatedBy="user" />
      <P.Music base={0.3} />
      <P.Role id="M-VGMDB-AR-13857" roles="perform+inst+image" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-110219"
      title="Ai no Supreme! / fhána [Anime Edition]"
    >
      <P.Contains id="M-VGMDB-AL-110219-1" />
      <P.Visual type="albumArt" base={0.65} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-110219-1" title="Ai no Supreme!">
      <P.MusicConsumedProgress length="4:44" />
      <P.Music base={0.29} />
      {/* "why is the dude singing???" - some pp mapper */}
      <P.Meme strength={0.05} length={6} />
      <P.Role id="M-VGMDB-AR-13857" roles="perform+inst+image+lyrics*2/3" />
    </P.Entry>
    <P.Entry id="A-MAL-33206" title="Kobayashi-san Chi no Maid Dragon">
      <P.Source adb={33206} ks={12243} al={21776} mal={33206} />
      <P.BestGirl name="Tohru" generatedBy="user" />
      {/* funny ig idk tbh */}
      <P.NEI base={0.75} emotions="AP" />
      <P.Visual type="animated" base={0.6} unique={0.3} />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.FeatureMusic id="M-VGMDB-AL-62516-1" />
      <P.Writing character={0.4} story={0.6} pacing={0.8} originality={0.6} />
    </P.Entry>
  </P.Document>
);
