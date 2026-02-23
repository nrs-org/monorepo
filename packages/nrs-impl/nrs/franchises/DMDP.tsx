/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-12890" title="Death Mount Dead Play">
      <P.Contains id="A-MAL-53613" />
      <P.Contains id="A-MAL-54743" />
      <P.Contains id="M-VGMDB-AL-128255" />
      <P.Contains id="M-VGMDB-AL-131500" />
    </P.Entry>
    <P.Entry id="A-MAL-53613" title="Dead Mount Death Play">
      <P.Source adb={17719} al={157198} ks={46760} mal={53613} />
      {/* (the only acceptable girl) */}
      <P.BestGirl name="Misaki Sakimiya" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.FeatureMusic id="M-VGMDB-AL-128255" />
      <P.AEI base={0.2} emotions="AP" />
      <P.Visual type="animated" base={0.3} unique={0.4} />
      <P.Writing character={0.3} story={0.8} pacing={0.7} originality={0.5} />
    </P.Entry>
    <P.Entry id="A-MAL-54743" title="Dead Mount Death Play Part 2">
      <P.Source adb={17915} al={162803} ks={47195} mal={54743} />
      {/* (the only acceptable girl) */}
      <P.BestGirl name="Misaki Sakimiya" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.FeatureMusic id="M-VGMDB-AL-131500" />
      <P.NEI base={0.8} emotions="AP" />
      <P.Visual type="animated" base={0.3} unique={0.4} />
      <P.Writing character={0.3} story={0.8} pacing={0.7} originality={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-128255" title="Nero / Sou">
      <P.Contains id="M-VGMDB-AL-128255-1" />
      <P.Source
        urls={[
          {
            name: "itunes-jp",
            src: "https://music.apple.com/jp/album/1677246395",
          },
          { name: "linkfire", src: "https://lnk.to/sou-nero" },
          {
            name: "mora-aac",
            src: "https://mora.jp/package/43000014/NOPA-4098/",
          },
          { name: "ototoy-flac", src: "https://ototoy.jp/_/default/p/1593774" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/1aCpGaeu7Ai7eiB4o22aip",
          },
          { name: "vgmdb", src: "https://vgmdb.net/album/128255" },
        ]}
      />
      <P.Visual type="albumArt" base={0.3} unique={0.6} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-128255-1" title="Nero">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/3abxvM4ptugLFRocd7dm5H",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=j5B0TF3d9Fc",
          },
        ]}
      />
      <P.Music base={0.3} />
      <P.MusicConsumedProgress length="3:29" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-131500" title="Scrap Art / Inori Minase">
      <P.Contains id="M-VGMDB-AL-131500-1" />
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/album/42jpClLjVy7znnAmzNUJfI",
          },
          { name: "vgmdb", src: "https://vgmdb.net/album/131500" },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_mu8RB6S10isRZeAwbG60i4GLbkimqjpLo",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.15} unique={0.1} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-131500-1" title="Scrap Art">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/4aH955P1E3svLs4NPNAewA",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=1xfM94Ik4ck",
          },
        ]}
      />
      <P.Music base={0.35} />
      <P.MusicConsumedProgress length="3:33" />
    </P.Entry>
  </P.Document>
);
