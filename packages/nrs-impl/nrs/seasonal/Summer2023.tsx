/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* "everyone is down bad for the MC" the anime */}
    <P.Entry
      id="A-MAL-53438"
      title="Higeki no Genkyou to Naru Saikyou Gedou Last Boss Joou wa Tami no Tame ni Tsukushimasu."
    >
      <P.Source adb={17688} al={156040} ks={46689} mal={53438} />
      <P.BestGirl name="Tiara Royal Ivy" />
      <P.FeatureMusic id="M-VGMDB-AL-130741-1" />
      {/* iirc some stuff is sad */}
      {/* not much tho */}
      <P.NEI base={0.3} emotions="CU" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.9} episodes={12} />
      <P.Visual type="animated" base={0.5} unique={0.3} />
      <P.Writing character={0.5} story={0.3} pacing={0.8} originality={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-130741" title="Kyuseishu / Tsukuyomi">
      <P.Contains id="M-VGMDB-AL-130741-1" />
      <P.Source
        urls={[
          {
            name: "itunes-japan",
            src: "https://music.apple.com/jp/album/1692905181",
          },
          { name: "linkfire", src: "https://tsukuyomi.lnk.to/kyuseishu" },
          {
            name: "mora-aac",
            src: "https://mora.jp/package/43000005/VE3WT-10466/",
          },
          { name: "mysound.jp", src: "https://mysound.jp/song/9854815/" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/2xiK0zF6CJjJqCqSHwgMsM",
          },
          {
            name: "spotify-jp",
            src: "https://open.spotify.com/album/6U2J876mV2hxeSVr0KjRdV",
          },
          { name: "vgmdb", src: "https://vgmdb.net/album/130741" },
          {
            name: "youtube-music",
            src: "https://www.youtube.com/watch?v=0I25axTqk5w",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.2} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-130741-1" title="救世主">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/3nDjI1uPbjBvqZNEA3F57Q",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=0I25axTqk5w",
          },
        ]}
      />
      <P.Music base={0.35} />
      <P.MusicConsumedProgress length="3:17" />
    </P.Entry>
  </P.Document>
);
