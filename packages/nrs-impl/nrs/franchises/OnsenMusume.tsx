/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* le funny franchise, lack content therefore low score */}
    {/* translate stuff for me if u want score to go up */}
    <P.Entry id="F-VGMDB-6439" title="Onsen Musume">
      <P.Contains id="M-VGMDB-AL-75349" />
      <P.Contains id="M-20220125T063355-1" />
      <P.Contains id="M-VGMDB-AL-75344" />
      <P.Contains id="M-VGMDB-AL-124011" />
      <P.Meme strength={0.3} length={45} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-75349" title="Hop Step Jump! / SPRiNGS">
      <P.Contains id="M-VGMDB-AL-75349-1" />
      <P.Visual type="albumArt" base={0.75} unique={0.25} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-75349-1" title="Hop Step Jump!">
      <P.MusicConsumedProgress length="4:59" generatedBy="user" />
      <P.Music base={0.56} />
      <P.Role id="M-20220125T063355-1" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-20220125T063355-1" title="SPRiNGS" entrytype="MusicArtist" />
    <P.Entry id="M-VGMDB-AL-75344" title="Tsuioku Kaleidoscope / SPRiNGS">
      <P.Contains id="M-VGMDB-AL-75344-1" />
      <P.Contains id="M-VGMDB-AL-75344-2" />
      <P.Contains id="M-VGMDB-AL-75344-3" />
      <P.Contains id="M-VGMDB-AL-75344-4" />
      <P.Contains id="M-VGMDB-AL-75344-5" />
      <P.Visual type="albumArt" base={0.75} unique={0.25} />
      {/* Length source: https://open.spotify.com/album/7iKl9h6FUWmHhRE7tg8yJh */}
      {/* 2-4 are subunit songs */}
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-75344-1" title="純情-SAKURA-">
      <P.MusicConsumedProgress length="3:44" generatedBy="user" />
      {/* https://www.youtube.com/watch?v=X2Q-bCS_IRs */}
      <P.Visual type="animatedMV" base={0.75} unique={0.25} />
      <P.Music base={0.54} />
      <P.Role id="M-20220125T063355-1" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-75344-2" title="ロマンスの林檎">
      <P.MusicConsumedProgress length="4:20" generatedBy="user" />
      <P.Music base={0.59} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-75344-3" title="SILENT VOICES">
      <P.MusicConsumedProgress length="4:58" generatedBy="user" />
      <P.Music base={0.41} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-75344-4" title="おはようジャポニカ">
      <P.MusicConsumedProgress length="4:26" generatedBy="user" />
      <P.Music base={0.56} />
      <P.Role id="M-VGMDB-AR-18208" roles="vocal/3+image_feat/3" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-75344-5" title="さよなら花火">
      <P.MusicConsumedProgress length="4:01" generatedBy="user" />
      <P.Music base={0.2} />
      <P.Role id="M-20220125T063355-1" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-124011" title="Yuuyuu Smile Power / Ambassador">
      <P.Contains id="M-VGMDB-AL-124011-1" />
      <P.Source
        urls={[
          {
            name: "itunes",
            src: "https://music.apple.com/jp/album/1649484785",
          },
          {
            name: "mora",
            src: "https://mora.jp/package/43000033/PA00107094-0-1/",
          },
          { name: "nextone.link", src: "https://nex-tone.link/A00107094" },
          { name: "ototoy", src: "https://ototoy.jp/_/default/p/1405067" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/3TkhbfUmSWZyNllFPdMEqP",
          },
          {
            name: "spotify-jp",
            src: "https://open.spotify.com/album/3maLDodJtNB17LhWeLgwcd",
          },
          { name: "vgmdb", src: "https://vgmdb.net/album/124011" },
        ]}
      />
      <P.Visual type="albumArt" base={0.75} unique={0.25} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-124011-1" title="Yuuyuu Smile Power">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/0L1cinOuOj1Pxm0R4WSyir",
          },
        ]}
      />
      <P.Music base={0.4} />
      <P.MusicConsumedProgress length="3:25" />
      <P.Role id="M-VGMDB-AR-40119" roles="inst" />
    </P.Entry>
  </P.Document>
);
