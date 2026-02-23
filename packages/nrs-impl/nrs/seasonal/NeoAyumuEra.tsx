/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* google kano 2023 */}
    {/* new utaite just dropped */}
    {/* holy fuck i ran out of ideas */}
    <P.Entry id="M-VGMDB-AR-6799" title="nayuta">
      <P.Contains id="M-20230608T130823" />
      <P.Contains id="M-20230626T231018" />
      <P.Contains id="M-20230626T231039" />
      <P.Contains id="M-20230627T210215" />
      {/* 2023-04-24 is when nanahira released her M3 album xfd */}
      {/* so we may as well consider that point in time to be the start of */}
      {/* this shithelldamn stuff */}
      {/* Neo-Ayumu-era Arc 1 */}
      <P.Meme from="2023-04-24" to="2023-06-17" strength={0.75} />
      {/* from the incident onwards, the world has changed forever */}
      {/* arc 2 ended, skill issue tbh */}
      {/* Neo-Ayumu-era Arc 2 */}
      <P.Meme from="2023-06-18" to="2023-07-25" strength={1}>
        <P.Contributor id="M-VGMDB-AR-6799" factor={0.75} />
        <P.Contributor id="M-VGMDB-AR-35619" factor={0.25} />
      </P.Meme>
      {/* lmfao she basically become 2023 method and the polar apposite */}
      {/* of that kusogakkou */}
      {/* also neo-ayumu died so it's natural for her to be back */}
      {/* (see kano-era and rst-sb69 arc 3) */}
      {/* that and also m3 fall */}
      <P.Meme from="2023-10-01" to="2023-12-31" strength={0.95} />
      <P.Contains id="M-VGMDB-AR-57255" factor={1 / 3} />
    </P.Entry>
    <P.Entry
      id="M-20230608T130823"
      title="Ashita o Miageta Natsu no Owari / nayuta"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "niconico",
            src: "https://www.nicovideo.jp/watch/sm31812209",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=w1HcRM9UldU",
          },
        ]}
      />
      <P.Music base={0.7} />
      <P.MusicConsumedProgress length="5:47" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-20230626T231018"
      title="Ai Kotoba II (nayuta ver.)"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "niconico",
            src: "https://www.nicovideo.jp/watch/sm23151549",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=OphpSs9NP2A",
          },
        ]}
      />
      <P.MusicConsumedProgress length="4:27" />
      <P.Music base={0.45} />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-20230626T231039"
      title="Ai Kotoba III (nayuta ver.)"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "niconico",
            src: "https://www.nicovideo.jp/watch/sm34632239",
          },
        ]}
      />
      <P.MusicConsumedProgress length="4:07" />
      <P.Music base={0.4} />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-20230627T210215"
      title="Snow halation (nayuta Band Live ver.)"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/live/w6CqugOeVSw?feature=share&t=4800",
          },
        ]}
      />
      {/* AINT NO WAY BRO */}
      {/* she even sang love live songs */}
      <P.Music base={0.36} />
      <P.MusicConsumedProgress length="4:47" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image" />
    </P.Entry>
    <P.KilledBy id="M-20230730T110147" potential={0.1} effect={0.8}>
      <P.Contributor id="M-VGMDB-AR-35619" factor={0.7} />
      <P.Contributor id="M-VGMDB-AR-6799" factor={0.3} />
    </P.KilledBy>
    <P.Entry id="M-VGMDB-AL-74440" title="Sora ni Kakaru Kimi no Koe.">
      <P.Source
        urls={[{ name: "vgmdb", src: "https://vgmdb.net/album/74440" }]}
      />
      <P.Visual type="albumArt" base={0.6} unique={0.3} />
      <P.Contains id="M-VGMDB-AL-98575-4" />
      <P.Contains id="M-VGMDB-AL-98575-5" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-98575" title="Omoide wo Tsuzutta Uta wo Kimi e.">
      <P.Contains id="M-VGMDB-AL-98575-4" />
      <P.Contains id="M-VGMDB-AL-98575-5" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/cEQGHz8z" },
          {
            name: "melon-books",
            src: "https://www.melonbooks.co.jp/detail/detail.php?product_id=632198",
          },
          { name: "official", src: "https://7uta-5th.tumblr.com/" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/1Ewv1h8DISsD9nLTqmGNfq",
          },
          { name: "vgmdb", src: "https://vgmdb.net/album/98575" },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_neEZxgP7bnJf6HguZ2XILnxlJ3sa4-zQU",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.4} unique={0.6} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-98575-4" title="Azure Reunion">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/2SVV68qiA3bEel349jvqqV",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=61z0dzeVJ_0",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=y_9of3k1liU",
          },
        ]}
      />
      {/* impl_overridden */}
      <P.Music base={0.82} />
      <P.Remix id="M-VGMDB-AL-108194-5" />
      {/* CLC cope */}
      <P.AEI base={0.3} emotions="MU-0.1:MP-0.7:CP-0.2" />
      <P.MusicConsumedProgress length="5:05" />
      {/* azuring the reunion */}
      <P.Role id="M-VGMDB-AR-29487" roles="inst" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+lyrics+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-98575-5" title="空に架かる君の声。">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/0HJAI8o62S4sUMEKaZ7UfX",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=sLgtJA8NYSA",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=eTQusoa8TG4",
          },
        ]}
      />
      <P.NEI base={0.8} emotions="MP-0.7:CP-0.3" />
      <P.Music base={0.7} />
      <P.MusicConsumedProgress length="3:42" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal/7+lyrics+image/8" />
    </P.Entry>
    <P.Entry
      id="M-20230805T090752"
      title="Imaginary Arcadia"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20230805T090752-6" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/cD65nR6t" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/1urLf0n8xTdFyLQxx1mq2c",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_mFkW4AqUVuVU7QOnqI2ER2h2GpcRq5VPg",
          },
        ]}
      />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Visual type="albumArt" base={0.3} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-20230805T090752-6" title="Sympatheia" entrytype="MusicTrack">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/6sxIlIxZc0IyMenKXkJNeF",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=egmWJ917Nuc",
          },
        ]}
      />
      {/* (3:00) But,
                There is no place for me.
                Even when I tried,
                Even when I cried,
                I was alone,

                Gazing to the unknown
                Dreaming of someday
                This is the end... */}
      <P.AEI base={0.3} emotions="MU" />
      <P.Music base={0.5} />
      <P.MusicConsumedProgress length="4:02" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+lyrics+image/2" />
    </P.Entry>
    <P.Entry id="M-20230608T113548" title="Portray Blue" entrytype="MusicAlbum">
      <P.Contains id="M-20230608T113548-1" />
      <P.Contains id="M-20230608T113548-5" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/2s0zf19E" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/3O7fLuO9Y67sbtfi2JQgUm",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_kiOBgdfmbor7VgvMQvu6R9b2-cgCfSIdU",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.6} unique={0.3} />
      {/* EGAKEEEEEEEEEEEEEEEEEEE */}
    </P.Entry>
    <P.Entry
      id="M-20230608T113548-1"
      title="Blue Canvas"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/0ccl0oaCBvpMsWECQ7X11g",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=3pqE_O1Z84Y",
          },
        ]}
      />
      <P.Music base={0.6} />
      <P.MusicConsumedProgress length="4:18" />
      <P.Visual type="semiAnimatedMV" base={0.4} unique={0.3} />
      {/* this song is not meant to be funny */}
      {/* this song is not meant to be funny */}
      {/* this song is not meant to be funny */}
      {/* this song is not meant to be funny */}
      {/* this song is not meant to be funny */}
      {/* <aei base="0.1" emotions="AP" /> */}
      {/* this song was funny since duopoly arc 2 btw */}
      {/* wtf it had already been a year */}
      <P.Meme from="2022-08-14" to="2023-12-31" strength={0.2} />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+lyrics+image" />
    </P.Entry>
    <P.Entry id="M-20230608T113548-5" title="Blue Knots" entrytype="MusicTrack">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/3gxaFirqRciRqtCyNR5MYB",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=8ycpWfkL27A",
          },
        ]}
      />
      <P.Music base={0.45} />
      <P.MusicConsumedProgress length="4:10" />
      <P.Visual type="semiAnimatedMV" base={0.3} unique={0.5} />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+lyrics+image" />
    </P.Entry>
    {/* aka the hasegawa mii utaite */}
    <P.Entry id="M-VGMDB-AR-8196" title="Nanahira" />
    <P.Entry id="M-VGMDB-AL-108194" title="Nanairo Ribbon / Nanahira x nayuta">
      <P.Contains id="M-VGMDB-AL-108194-4" />
      <P.Contains id="M-VGMDB-AL-108194-5" />
      <P.Visual type="albumArt" base={0.4} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-108194-4" title="ラリリレル、リリロ、リラロ">
      <P.MusicConsumedProgress length="5:45" />
      <P.Music base={0.61} />
      <P.NEI base={0.3} emotions="CU" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image/2" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-108194-5" title="Azure Reunion">
      <P.MusicConsumedProgress length="5:06" />
      <P.Music base={0.75} />
      {/* CLC cope */}
      <P.NEI base={0.3} emotions="MU-0.1:MP-0.7:CP-0.2" />
      <P.Role id="M-VGMDB-AR-29487" roles="inst" />
      <P.Role id="M-VGMDB-AR-6799" roles="lyrics+image/2" />
      <P.Role id="M-VGMDB-AR-8196" roles="vocal+image/2" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-57255" title="La prière" />
    <P.Entry id="M-20230608T075843" title="Chronologue" entrytype="MusicAlbum">
      <P.Contains id="M-20230608T075843-1" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/fuSe95PY" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/2Re7EVovWvPuxp8NJaU6Dw",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_nxKLvKlM1QrbAKL-oU17lliuL-RzlFgos",
          },
        ]}
      />
    </P.Entry>
    <P.Entry
      id="M-20230608T075843-1"
      title="Chronologue"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/2wwpZghWrdjyt0p5wjQghm",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=SVfiA89fbN8",
          },
        ]}
      />
      <P.Visual type="semiAnimatedMV" base={0.6} unique={0.3} />
      {/* Length source: https://www.youtube.com/watch?v=S8MJvhgjXBY */}
      <P.MusicConsumedProgress length="6:57" />
      <P.Music base={0.55} />
      <P.Role id="M-VGMDB-AR-57255" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-20240314T142104" title="Glowings" entrytype="MusicAlbum">
      <P.Contains id="M-20240314T142104-1" />
      <P.Visual type="albumArt" base={0.5} unique={0.2} />
    </P.Entry>
    <P.Entry id="M-20240314T142104-1" title="Infinity Rage">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=fOlfE7ILlO0",
          },
        ]}
      />
      <P.Music base={0.3} />
      <P.MusicConsumedProgress length="4:05" />
      {/* vote for "infinity rizz" to be the worst meme in 2023 */}
      <P.NEI base={0.5} emotions="AP" />
    </P.Entry>
    <P.Entry
      id="M-20230608T085741"
      title="FROZEN QUALIA"
      entrytype="MusicArtist"
    >
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          {
            name: "tunecore",
            src: "https://www.tunecore.co.jp/artists/frozenqualia",
          },
        ]}
      />
    </P.Entry>
    <P.Entry id="M-20230611T145256" title="Road movie" entrytype="MusicAlbum">
      <P.Contains id="M-20230611T145256-1" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/vZS6UgGc" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/0T7j8otzRASzMhBDPuEtXb",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_kv8ppXfRqFLHbPGIqtRgdVW6tq2pokGNg",
          },
        ]}
      />
    </P.Entry>
    <P.Entry id="M-20230611T145256-1" title="M'aider">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/6Ccxsg8p7w4YKlTk9FsCZV",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=5zA-oYmye3Q",
          },
        ]}
      />
      <P.Music base={0.7} />
      <P.MusicConsumedProgress length="4:16" />
      <P.Role id="M-20230608T085741" roles="vocal+prod+image" />
    </P.Entry>
    {/* pogpega em trai son tung */}
    <P.Entry id="M-20230608T085650" title="Mono." entrytype="MusicArtist">
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "niconico", src: "https://www.nicovideo.jp/user/30344549" },
          { name: "official", src: "https://monopowan.studio.site/" },
          { name: "soundcloud", src: "https://soundcloud.com/m_o_n_0" },
          {
            name: "spotify",
            src: "https://open.spotify.com/artist/05Huft2zD5JIGgpkcHreca",
          },
          { name: "twitter", src: "https://twitter.com/Monopowan" },
          { name: "youtube", src: "https://www.youtube.com/@Monopowan" },
        ]}
      />
    </P.Entry>
    <P.Entry
      id="M-20230608T120015"
      title="Ao no Hotaru Kotoba"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/2FZ001TJ5acjcL5xECrjpq",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=kJ6lOCHDOuA",
          },
        ]}
      />
      <P.Visual type="staticMV" base={0.4} unique={0.3} />
      <P.Music base={0.55} />
      <P.MusicConsumedProgress length="5:23" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-108196" title="diamond / garnet">
      <P.Contains id="M-VGMDB-AL-108196-1" />
      <P.Contains id="M-VGMDB-AL-108196-2" />
      <P.Contains id="M-VGMDB-AL-108196-3" />
      <P.Contains id="M-VGMDB-AL-108196-4" />
      <P.Contains id="M-VGMDB-AL-108196-5" />
      <P.Contains id="M-VGMDB-AL-108196-6" />
      <P.Contains id="M-VGMDB-AL-108196-7" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/z7rFT0MT" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/5uHHeBVm9fXrM4xEMhZNHq",
          },
          { name: "vgmdb", src: "https://vgmdb.net/album/108196" },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_lXxvibpOson_eD9c7d-3iwQM9pOonnY00",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.3} unique={0.2} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-108196-1" title="neptunite">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/6OdUYuh2uYG11pfpbZ11ll",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=ge71cZxvERs",
          },
        ]}
      />
      <P.Music base={0.5} />
      <P.MusicConsumedProgress length="4:11" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-108196-2" title="phosphophyllite">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/340MbXTQ7S3EKB5UQuvRXq",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=qWfNHtPwWjU",
          },
        ]}
      />
      <P.Music base={0.4} />
      <P.MusicConsumedProgress length="4:23" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-108196-3" title="morganite">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/5mE5zCb0lQZCS7xctvnvqk",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=fyHRioC5AI8",
          },
        ]}
      />
      <P.Music base={0.15} />
      <P.MusicConsumedProgress length="4:05" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-108196-4" title="cinnabar">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/56wTHiGaj1VcxdZhsDiS7U",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=mNjcqmZezeU",
          },
        ]}
      />
      <P.Music base={0.35} />
      <P.MusicConsumedProgress length="3:52" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-108196-5" title="alexandrite">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/0JMs67jhdTrSFOvdCLj1NK",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=gXJMSwhNyWQ",
          },
        ]}
      />
      <P.Music base={0.15} />
      <P.MusicConsumedProgress length="3:29" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-108196-6" title="benitoite">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/0HkEsN1lNuPmXgkd4J8aJS",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=tal0F8HNiPY",
          },
        ]}
      />
      <P.Music base={0.2} />
      <P.MusicConsumedProgress length="3:42" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-108196-7" title="diamond">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/4TKe4wFyT8wryXJBtTtNrh",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=cqKjZQ7qExM",
          },
        ]}
      />
      <P.Music base={0.75} />
      <P.MusicConsumedProgress length="5:17" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-129048" title="It's a Message for you">
      <P.Contains id="M-VGMDB-AL-129048-1" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/9GzuRaxd" },
          { name: "official", src: "https://nanahira.jp/IMU/" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/5zuLTeySyvd9jrtprpCGRL",
          },
          { name: "vgmdb", src: "https://vgmdb.net/album/129048" },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_nbMNJP_W-lLiE5CGYktJyUoFeAndSpOfg",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.4} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-129048-1" title="I’m a Messenger for U">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/6gYDzCvU4FARCO5FlYruKU",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=Q1W6yIgHLb4",
          },
        ]}
      />
      <P.Music base={0.6} />
      <P.MusicConsumedProgress length="2:18" />
      <P.Visual type="semiAnimatedMV" base={0.5} unique={0.5} />
      <P.Role id="M-VGMDB-AR-8196" roles="vocal+image" />
      <P.Role id="M-VGMDB-AR-40119" roles="prod" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-117388" title="Harukanaru Kimi e">
      <P.Contains id="M-VGMDB-AL-117388-1" />
      <P.Contains id="M-VGMDB-AL-117388-3" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/QDT3aRDx" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/53CQsMa77FFBvENDoPQ5WX",
          },
          { name: "vgmdb", src: "https://vgmdb.net/album/117388" },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_mqm3G2YQE-0lXlYeB3NKAh23M2-Nip3Uc",
          },
        ]}
      />
      {/* wtf is this nozsist crap */}
      <P.Visual type="albumArt" base={0.5} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-117388-1" title="星の声を聴かせて">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/4DIMnO51ATblB7jFQZLLGe",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=WB1vP5u7fFQ",
          },
        ]}
      />
      <P.Music base={0.65} />
      <P.MusicConsumedProgress length="5:29" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-117388-3" title="遥かなる君へ">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/1P2t545JzbjFryx9chCLq1",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=rDCLKxcU_Qo",
          },
        ]}
      />
      <P.Music base={0.5} />
      <P.MusicConsumedProgress length="5:09" />
    </P.Entry>
    <P.Entry id="M-20230608T103716" title="KIMINOUTA" entrytype="MusicAlbum">
      <P.Contains id="M-20230608T103716-1" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/fGRcEssZ" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/7mxmox5Ld7qILjzoRrsNOS",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_ki3QPez5dPtLMdeXLWP5z_6XMfthHsxRo",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.3} unique={0.2} />
    </P.Entry>
    <P.Entry id="M-20230608T103716-1" title="KIMINOUTA">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/3Jhw98XjK1qVAowtIJJqqu",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=1D0-MsPBf04",
          },
        ]}
      />
      <P.Music base={0.4} />
      <P.MusicConsumedProgress length="5:20" />
    </P.Entry>
    <P.Entry id="M-20230608T104218" title="Bouquet" entrytype="MusicAlbum">
      <P.Contains id="M-20230608T104218-1" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Visual type="staticMV" base={0.3} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-20230608T104218-1" title="Bouquet">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=jNrAzWzdmYo",
          },
        ]}
      />
      <P.Music base={0.3} />
      <P.MusicConsumedProgress length="4:24" />
      <P.Visual type="semiAnimatedMV" base={0.25} unique={0.4} />
    </P.Entry>
    {/* todo: rank these individuals */}
    <P.Entry id="M-VGMDB-AR-16653" title="Risa Yuzuki" />
    <P.Entry id="M-VGMDB-AR-48767" title="EmoCosine" />
    <P.Entry id="M-VGMDB-AL-128840" title="Find My Future">
      <P.Visual type="albumArt" base={0.3} unique={0.75} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-40119" title="Akki" />
    {/* lmfao kano 2023 is truly a 2018 artist */}
    {/* like what the actual fuck */}
    {/* (yes i already was aware of this shit from the duopoly era */}
    {/* and i was surprised af back then, but they were not ranked kekw) */}
    <P.Entry
      id="M-20230608T114243"
      title="Night of Bloom"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          { name: "fanlink", src: "https://fanlink.to/hFEx" },
          {
            name: "spotify",
            src: "https://open.spotify.com/track/1Yd6bAMZlxmo0TGKHChg35",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=FwWUqQz6Llk",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=f5rs2YrThao",
          },
        ]}
      />
      <P.Visual type="semiAnimatedMV" base={0.4} unique={0.6} />
      <P.Music base={0.35} />
      <P.MusicConsumedProgress length="4:46" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="M-20230608T132043" title="Hullhakobune" entrytype="MusicAlbum">
      <P.Contains id="M-20230608T132043-1" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/album/5t8PCYQlATC6JCpppMhaKZ",
          },
          { name: "tunecore", src: "https://linkco.re/6HPq8P17" },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_mADfvbkDNY1dl9h_INoSfSRAiewGgfMRA",
          },
        ]}
      />
    </P.Entry>
    <P.Entry
      id="M-20230608T132043-1"
      title="Hullhakobune"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/4IhTcB4rWCDPaH34yRnefD",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=7-AU3SU161s",
          },
        ]}
      />
      <P.Music base={0.4} />
      <P.MusicConsumedProgress length="4:03" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+lyrics+image" />
    </P.Entry>
    <P.Entry id="M-20230608T133105" title="CodeQ" entrytype="MusicAlbum">
      <P.Contains id="M-20230608T133105-6" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/album/32uGUC9HVOdExskaOMvPYi",
          },
          { name: "tunecore", src: "https://linkco.re/Yf86y5R9" },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_ktTfRJohm-uvb1lpipqysTW-Ddl2wdzN0",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.3} unique={0.5} />
    </P.Entry>
    <P.Entry
      id="M-20230608T133105-6"
      title="AI to CodeQ no Hate"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/6TtFzvOAAJaD2DnABixduN",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=JSsJBn8m-Mg",
          },
        ]}
      />
      <P.Music base={0.5} />
      <P.MusicConsumedProgress length="6:16" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-123922"
      title="Rojiura no Shoujo to Igyou Atama no Juunintachi"
    >
      <P.Contains id="M-VGMDB-AL-123922-1" />
      <P.Contains id="M-VGMDB-AL-123922-2" />
      <P.Contains id="M-VGMDB-AL-123922-3" />
      <P.Contains id="M-VGMDB-AL-123922-4" />
      <P.Contains id="M-VGMDB-AL-123922-5" />
      <P.Contains id="M-VGMDB-AL-123922-6" />
      <P.Contains id="M-VGMDB-AL-123922-7" />
      <P.Source
        urls={[
          { name: "booth", src: "https://7uta-nayuta.booth.pm/items/4220926" },
          {
            name: "diverse-direct",
            src: "https://diverse.direct/7uta-com/7uta-0013/",
          },
          { name: "linkcore", src: "https://linkco.re/7RpRV9N8" },
          { name: "official", src: "https://7uta-0013.tumblr.com/" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/3VBzXnNpNEYrIPwrDkgL1A",
          },
          { name: "vgmdb", src: "https://vgmdb.net/album/123922" },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_lL6-kEy0jxry1E__QdsGuCQ4FsfiPXtJ8",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.4} unique={0.7} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-123922-1" title="ヒトとカタチは違えども">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/4f9q8tX7rC1hmXfZE1jjf3",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=bKLRgwMf-ic",
          },
        ]}
      />
      <P.Music base={0.15} />
      <P.MusicConsumedProgress length="2:22" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-123922-2" title="白日より淡く">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/3z5ugkRQYw5w9yzUQ5VcoT",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=B3DhWLW3wvc",
          },
        ]}
      />
      <P.Music base={0.2} />
      <P.MusicConsumedProgress length="4:32" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-123922-3" title="煤けた脳を疎うなら">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/2TgP3FCH8r18hD0i548DMC",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=4PXTARxUmoA",
          },
        ]}
      />
      <P.Music base={0.18} />
      <P.MusicConsumedProgress length="3:49" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-123922-4" title="裸をカミが盥いだら">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/7c9LvhmZoOuuZRSGxp1uUY",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=0YigKXk7YKI",
          },
        ]}
      />
      <P.Music base={0.22} />
      <P.MusicConsumedProgress length="3:48" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-123922-5" title="孤独の塊を鈞るより">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/7rYRW6vtOgbemhFoEKbEez",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=SDOHYLCwX74",
          },
        ]}
      />
      <P.Music base={0.19} />
      <P.MusicConsumedProgress length="4:04" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-123922-6" title="青天より遠く">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/4B2FUvJI9NGQ5dKcsaiTTO",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=B49iBCnRoec",
          },
        ]}
      />
      <P.Music base={0.25} />
      <P.MusicConsumedProgress length="3:59" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-123922-7" title="路地裏と空は繋がって">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/2U7NtJWqXjsbTvapD76szN",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=81QZzzA1U6E",
          },
        ]}
      />
      <P.Music base={0.12} />
      <P.MusicConsumedProgress length="2:45" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-20230608T135641"
      title="Happycore Meteorshower"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20230608T135641-10" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/yH6nbG0x" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/5NftjvROP5puXKcFszWvMQ",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_nYxCpZ_Pj5QQQisSg7wVHo-rqnWB0lHdA",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.6} unique={0.25} />
    </P.Entry>
    <P.Entry
      id="M-20230608T135641-10"
      title="Reach for the stars"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/5ZdT9uIcAWM08qTI4T1r51",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=CKKqvsjhSjQ",
          },
        ]}
      />
      <P.Music base={0.6} />
      <P.MusicConsumedProgress length="3:54" />
      <P.Role id="M-20230608T085650" roles="prod+image" />
    </P.Entry>
    <P.Entry
      id="M-20230608T135642"
      title="Hinichijou Sketchbook"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20230608T135642-1" />
      <P.Contains id="M-20230608T135642-7" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/ZzTs99bB" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/0znvBhuUpkjwrslpOJf0wh",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_lTF7finzTRzsFyD765G3BDgVPQZQG61a8",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.6} unique={0.25} />
    </P.Entry>
    <P.Entry
      id="M-20230608T135642-1"
      title="Hinichijou Sketchbook"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/4myIjKIOLJwATKc1WKP9Ty",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=kPjzksmbFBk",
          },
        ]}
      />
      <P.Music base={0.6} />
      <P.MusicConsumedProgress length="4:07" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-20230608T135642-7"
      title="<non>fiction"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/20c4vXKhk4USGthyzJc8Yt",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=X4_FrcaCs9w",
          },
        ]}
      />
      <P.Music base={0.4} />
      <P.MusicConsumedProgress length="4:12" />
      <P.Role id="M-20230608T085650" roles="prod+image" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140454"
      title="Sora no Aoyori Vocal Song Collection"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20230608T140454-1" />
      <P.Contains id="M-20230608T140454-2" />
      <P.Contains id="M-20230608T140454-3" />
      <P.Contains id="M-20230608T140454-4" />
      <P.Contains id="M-20230608T140454-5" />
      <P.Contains id="M-20230608T140454-6" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/NZfseVu7" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/508lTUwAIfVdGrEw4izL1T",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_ky26wX_j3A0enWKFkSwgBTpDPRi1JE0m4",
          },
        ]}
      />
      {/* pogpega ayumu reference */}
    </P.Entry>
    <P.Entry
      id="M-20230608T140454-1"
      title="Sora no Mukou"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/2hkMfl8JdruF4dU5aGh5x9",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=-xvYcCFs1Do",
          },
        ]}
      />
      <P.Music base={0.45} />
      <P.MusicConsumedProgress length="3:49" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140454-2"
      title="Hoshi furu Aoyori Bokutachi e Saku"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/6IXSquFCsL2qmWPVm2Y72K",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=g00sTwJ4pNE",
          },
        ]}
      />
      <P.Music base={0.25} />
      <P.MusicConsumedProgress length="4:45" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140454-3"
      title="Hoshi no Umi"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/6wZZkwGVwYUSOGnERZj9Z1",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=bbPv-zVZTnA",
          },
        ]}
      />
      <P.Music base={0.18} />
      <P.MusicConsumedProgress length="6:11" />
    </P.Entry>
    <P.Entry id="M-20230608T140454-4" title="Mou Ichido" entrytype="MusicTrack">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/7rtBS9H6fB3baOcpHbSW0n",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=goEnjbqxRYQ",
          },
        ]}
      />
      <P.Music base={0.2} />
      <P.MusicConsumedProgress length="5:04" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140454-5"
      title="Boku no Yume made"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/2rY9LPOlXwp1MxrlIwl2qY",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=-x1Awu_7NOk",
          },
        ]}
      />
      <P.Music base={0.25} />
      <P.MusicConsumedProgress length="4:28" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140454-6"
      title="Every Day, Every Night"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/3jw5oAe0z5Qx84G3UpeiyL",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=OmjW68h93YI",
          },
        ]}
      />
      <P.Music base={0.45} />
      <P.MusicConsumedProgress length="4:30" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-74436" title="Longing for... / Chata × nayuta">
      <P.Contains id="M-VGMDB-AL-74436-2" />
      <P.Source
        urls={[
          { name: "official", src: "https://7uta-c93.tumblr.com/" },
          { name: "vgmdb", src: "https://vgmdb.net/album/74436" },
        ]}
      />
      <P.Visual type="albumArt" base={0.4} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-74436-2" title="Snowmotion">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=qRr2U0RL4n4",
          },
        ]}
      />
      <P.Music base={0.5} />
      <P.MusicConsumedProgress length="3:57" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image/2" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-53149" title="Minato Suzuya">
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          {
            name: "tunecore",
            src: "https://www.tunecore.co.jp/artists?id=405679",
          },
          { name: "twitter", src: "https://twitter.com/7suzuyami7" },
          {
            name: "youtube",
            src: "https://www.youtube.com/channel/UCUo6gNzMjj8SE4L1mPt8IGA",
          },
        ]}
      />
    </P.Entry>
    <P.Entry id="M-20230608T140603" title="Veil Color" entrytype="MusicAlbum">
      <P.Contains id="M-20230608T140603-5" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/MyhaR4ut" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/2807hWuqUHBmxM67K5kA2x",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_l2U3xzMxsLOPZV8YUYn5MXc7O2G0TqGUs",
          },
        ]}
      />
      {/* the remaster ver sounds basically the same in order to be fair */}
      {/* and not giving kano 2023 two <music base="0.8" /> tracks */}
    </P.Entry>
    <P.Entry
      id="M-20230608T140603-5"
      title="Shirosumire no Yuki ga Furu Naka de"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/0ybnF3WcpwCMXcinpsC4XJ",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=6OGhjisi-Bg",
          },
        ]}
      />
      <P.Music base={0.8} />
      <P.MusicConsumedProgress length="4:28" />
      <P.Role id="M-VGMDB-AR-53149" roles="prod+image" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140604"
      title="Stardust Tears / Lovesick Link"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20230608T140604-1" />
      <P.Contains id="M-20230608T140604-2" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/0dXVtAaE" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/59OIt35GqJNjbgSwFID3Tw",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_kWiKIcifwE4JU2VPsoSDV33j5ax-NmPow",
          },
        ]}
      />
    </P.Entry>
    <P.Entry
      id="M-20230608T140604-1"
      title="Stardust Tears"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/5z3tCCRAF2l6jP4VpDUOPb",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=Eb1SygvAUCw",
          },
        ]}
      />
      <P.Music base={0.55} />
      <P.MusicConsumedProgress length="3:41" />
      <P.Role id="M-VGMDB-AR-53149" roles="prod+image" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140604-2"
      title="Lovesick Link"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/5B8pXtXDrz50RQ07vb9R0P",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=doTHUa_VBdM",
          },
        ]}
      />
      <P.Music base={0.4} />
      <P.MusicConsumedProgress length="3:46" />
      <P.Role id="M-VGMDB-AR-53149" roles="prod+image" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140605"
      title="White as Snow"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20230608T140605-1" />
      <P.Contains id="M-20230608T140605-2" />
      <P.Contains id="M-20230608T140605-4" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/zYEeGnBh" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/278GQdh9EVYP4pYCxq0g25",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_ns8GcYtsvqUYzrWkk3laJWB9UV_W3NLFI",
          },
        ]}
      />
      <P.Contains id="M-20230608T140603-5" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140605-1"
      title="Pastel Snow"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/5XXXZ4z3cRQZoCaueLzcCG",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=2mHXbNrff8A",
          },
        ]}
      />
      <P.Music base={0.5} />
      <P.MusicConsumedProgress length="4:09" />
      <P.Role id="M-VGMDB-AR-53149" roles="prod+image" />
    </P.Entry>
    <P.Entry id="M-20230608T140605-2" title="Whiteout" entrytype="MusicTrack">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/49uk662t9mD1NTqL012adV",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=EqZfyB7pQf8",
          },
        ]}
      />
      <P.Music base={0.65} />
      <P.MusicConsumedProgress length="4:13" />
      <P.Role id="M-VGMDB-AR-53149" roles="inst+image" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140605-4"
      title="Sangatsu no yakusoku"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/4WCUlJydROFACxLgXZxqUo",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=4JvZ55qT6ps",
          },
        ]}
      />
      <P.Music base={0.35} />
      <P.MusicConsumedProgress length="4:36" />
      <P.Role id="M-VGMDB-AR-53149" roles="prod+image" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140606"
      title="Air of Celeste"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20230608T140606-1" />
      <P.Contains id="M-20230608T140606-2" />
      <P.Contains id="M-20230608T140606-3" />
      <P.Contains id="M-20230608T140606-4" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/yMHP600R" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/2hyuvcoKYGZRBqCsVBAVgK",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_mm6brOVThuCc1cgvjheRsOkCDECyamRO4",
          },
        ]}
      />
    </P.Entry>
    <P.Entry
      id="M-20230608T140606-1"
      title="To the stars connected in July"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/4IjVx3ik4YbczFoJS2qdY9",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=4BhXUSKERjY",
          },
        ]}
      />
      <P.Music base={0.65} />
      <P.MusicConsumedProgress length="4:10" />
      <P.Role id="M-VGMDB-AR-53149" roles="prod+image" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140606-2"
      title="Kimi ga kureta senritsu"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/5dZfUl34FbJopxZPghj2cR",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=ahPrBGqv6F8",
          },
        ]}
      />
      <P.Music base={0.7} />
      <P.MusicConsumedProgress length="4:40" />
      <P.Role id="M-VGMDB-AR-53149" roles="inst+image" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140606-3"
      title="To us like the horizon"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/6QFNp7AdirOwAcb3J51CBy",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=JWX2eik5gRM",
          },
        ]}
      />
      <P.Music base={0.35} />
      <P.MusicConsumedProgress length="4:50" />
      <P.Role id="M-VGMDB-AR-53149" roles="inst+image" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140606-4"
      title="Sky color memory"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/5MFu5mYkLtBOWnvdbWeCj2",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=y0xRQoQuShA",
          },
        ]}
      />
      <P.Music base={0.55} />
      <P.MusicConsumedProgress length="4:26" />
      <P.Role id="M-VGMDB-AR-53149" roles="inst+image" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140607"
      title="Astro Memorize"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20230608T140607-1" />
      <P.Contains id="M-20230608T140607-2" />
      <P.Contains id="M-20230608T140607-3" />
      <P.Contains id="M-20230608T140607-4" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/RuU5rSB5" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/3okiVo8MmwzErpextaP4Ie",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_loCzfxSAYUN4ZasqTbSF4q3EYU3xoHpDo",
          },
        ]}
      />
    </P.Entry>
    <P.Entry
      id="M-20230608T140607-1"
      title="Asterism wo sagashite"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/2PzuvQahf9DSW57Kl7pEFi",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=R7qtUOwYPuA",
          },
        ]}
      />
      <P.Music base={0.45} />
      <P.MusicConsumedProgress length="4:29" />
      <P.Role id="M-VGMDB-AR-53149" roles="prod+image" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140607-2"
      title="Ramune no koini"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/5RbEGk2qdY886wlThqwsXY",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=X0Hy9HzFdnk",
          },
        ]}
      />
      <P.Music base={0.4} />
      <P.MusicConsumedProgress length="3:56" />
      <P.Role id="M-VGMDB-AR-53149" roles="prod+image" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140607-3"
      title="planetarium graphics"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/3GxAu0jJTrDIj3IkUpojXs",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=kahsc7ZZ4M4",
          },
        ]}
      />
      <P.Music base={0.55} />
      <P.MusicConsumedProgress length="4:31" />
      <P.Role id="M-VGMDB-AR-53149" roles="inst+image" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140607-4"
      title="sayuruboshi"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/364jcrrEfcrIrkXsG042I9",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=h7LIRGDIWk8",
          },
        ]}
      />
      <P.Music base={0.6} />
      <P.MusicConsumedProgress length="5:08" />
      <P.Role id="M-VGMDB-AR-53149" roles="prod+image" />
    </P.Entry>
    <P.Entry id="M-20230608T140608" title="Cry RefRain" entrytype="MusicAlbum">
      <P.Contains id="M-20230608T140608-1" />
      <P.Contains id="M-20230608T140608-2" />
      <P.Contains id="M-20230608T140608-3" />
      <P.Contains id="M-20230608T140608-4" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/t4b63zrX" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/4sXJRT0gcrlKZIYRUTaeAs",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_lchMGDlxCwi_YR6GmJZTu9XONaQse0uHk",
          },
        ]}
      />
    </P.Entry>
    <P.Entry
      id="M-20230608T140608-1"
      title="Sansou no iro"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/5F3eyvMldVuW4ok2jNBNtw",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=9cbngETCCB8",
          },
        ]}
      />
      <P.Music base={0.6} />
      <P.MusicConsumedProgress length="3:06" />
      <P.Role id="M-VGMDB-AR-53149" roles="prod+image" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140608-2"
      title="Amaoto wo kikasete"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/2bhHQSXaKDSV4t2ANnAFoc",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=jowzhcqWCjU",
          },
        ]}
      />
      <P.Music base={0.5} />
      <P.MusicConsumedProgress length="5:39" />
      <P.Role id="M-VGMDB-AR-53149" roles="inst+image" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140608-3"
      title="Yasashii Petrichor"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/62QrYaG3o3EDdRO1vou8xx",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=luvcp0W2wbI",
          },
        ]}
      />
      <P.Music base={0.4} />
      <P.MusicConsumedProgress length="3:54" />
      <P.Role id="M-VGMDB-AR-53149" roles="prod+image" />
    </P.Entry>
    <P.Entry
      id="M-20230608T140608-4"
      title="Rainy dot Rainy"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/3O9eBZIEE2Lh8eAS8eeXgP",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=30E_lMgbTME",
          },
        ]}
      />
      <P.Music base={0.65} />
      <P.MusicConsumedProgress length="4:21" />
      <P.Role id="M-VGMDB-AR-53149" roles="inst+image" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-20240314T081159"
      title="Junsetsu Envelope"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20240314T081159-1" />
      <P.Contains id="M-20240314T081159-2" />
      <P.Contains id="M-20240314T081159-3" />
      <P.Contains id="M-20240314T081159-4" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/q4EHa859" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/4T9NEmSgVyd4jsOb3CXZHo",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_kmMMMyntnfyhhCaCYx6G-MqCVURj7SmLQ",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.4} unique={0.1} />
    </P.Entry>
    <P.Entry id="M-20240314T081159-1" title="Shirayuki no Negaigoto">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/26Unvk3f0SvU6wrxyC1Vwy",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=O_Cr8PL5t8g",
          },
        ]}
      />
      <P.Music base={0.6} />
      <P.Role id="M-VGMDB-AR-53149" roles="inst+image+lyrics" />
      <P.MusicConsumedProgress length="3:42" />
    </P.Entry>
    <P.Entry id="M-20240314T081159-2" title="Melty StarMelty Star">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/2agIfObZ3dcPVAmvghq4fp",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=I9V8N5-FesE",
          },
        ]}
      />
      <P.Music base={0.4} />
      <P.Role id="M-VGMDB-AR-53149" roles="inst+image" />
      <P.MusicConsumedProgress length="4:42" />
    </P.Entry>
    <P.Entry id="M-20240314T081159-3" title="Seisouken">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/0Pc3s7jkuSdUYI2Nka5nMb",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=Wi2vaE04AqA",
          },
        ]}
      />
      <P.Music base={0.45} />
      <P.Role id="M-VGMDB-AR-53149" roles="inst+image" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
      <P.MusicConsumedProgress length="4:28" />
    </P.Entry>
    <P.Entry id="M-20240314T081159-4" title="12gatsuno epilogue">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/2KiuseenbF7vRLcZLcIra6",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=kNGDdmaf4qg",
          },
        ]}
      />
      <P.Music base={0.6} />
      <P.Role id="M-VGMDB-AR-53149" roles="inst+image+lyrics" />
      <P.Role id="M-VGMDB-AR-6799" roles="vocal+image_feat" />
      <P.MusicConsumedProgress length="4:09" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-29310" title="My Dearest / supercell">
      <P.Contains id="M-VGMDB-AL-29310-1" />
      <P.Source
        urls={[
          {
            name: "cdjapan",
            src: "https://www.cdjapan.co.jp/detailview.html?KEY=SRCL-7795",
          },
          {
            name: "play-asia",
            src: "https://www.play-asia.com/My_Dearest/paOS-13-71-9y-70-4emx.html",
          },
          { name: "vgmdb", src: "https://vgmdb.net/album/29310" },
          {
            name: "yesasia",
            src: "https://www.yesasia.com/us/my-dearest-normal-edition-japan-version/1025035830-0-0-0-en/info.html",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.2} unique={0.3} />
      {/* a song from the Post-Arc-3 of Neo-Ayumu-era */}
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-29310-1" title="My Dearest">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=nIrYjzHAEp0",
          },
        ]}
      />
      <P.Music base={0.6} />
      <P.MusicConsumedProgress length="5:38" />
      <P.Remix id="M-20240314T124353" />
      <P.Remix id="M-20240314T124354" />
      <P.Remix id="M-20240314T124355" />
      {/* noblism */}
      <P.NEI base={0.5} emotions="CU" />
    </P.Entry>
    {/* kanade ver: https://www.youtube.com/watch?v=oxZeLM9rx7s */}
    <P.Entry id="M-20240314T124353" title="My Dearest" entrytype="MusicTrack">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=oxZeLM9rx7s",
          },
        ]}
      />
      <P.Visual type="semiAnimatedMV" base={0.5} unique={0.2} />
      <P.Music base={0.55} />
      {/* Length source: https://www.youtube.com/watch?v=oxZeLM9rx7s */}
      <P.MusicConsumedProgress length="5:42" />
    </P.Entry>
    {/* azki ver: https://www.youtube.com/watch?v=lxJ7SXMEPto */}
    <P.Entry id="M-20240314T124354" title="My Dearest" entrytype="MusicTrack">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=lxJ7SXMEPto",
          },
        ]}
      />
      <P.Visual type="animatedMV" base={0.1} unique={0.3} />
      <P.Music base={0.5} />
      {/* Length source: https://www.youtube.com/watch?v=lxJ7SXMEPto */}
      <P.MusicConsumedProgress length="5:49" />
      <P.Role id="M-VGMDB-AR-35619" roles="vocal+image" />
    </P.Entry>
    {/* mumei ver: https://www.youtube.com/watch?v=NGDPr505aBQ */}
    <P.Entry id="M-20240314T124355" title="My Dearest" entrytype="MusicTrack">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=NGDPr505aBQ",
          },
        ]}
      />
      <P.Music base={0.55} />
      {/* Length source: https://www.youtube.com/watch?v=NGDPr505aBQ */}
      <P.MusicConsumedProgress length="3:46" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-133731" title="Rhythm Game Addiction!">
      <P.Contains id="M-VGMDB-AL-133731-1" />
      <P.Contains id="M-VGMDB-AL-133731-7" />
      <P.Source
        urls={[
          { name: "bandcamp", src: "https://ha1uday0.bandcamp.com/album/-" },
          { name: "booth", src: "https://booth.pm/ja/items/5199093" },
          { name: "linkcore", src: "https://linkco.re/VFCa685X" },
          {
            name: "official",
            src: "https://rhythm-game-addiction.netlify.app/",
          },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/65rwJEC23HoZ5YdYy4O45J",
          },
          { name: "vgmdb", src: "https://vgmdb.net/album/133731" },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_mX9Ww7zCM_uamTk83KCjB6a3h-bO0REGw",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.3} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-133731-1" title="オトビカリ">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/7j29X9XZ8ns44XbbHIjWfD",
          },
        ]}
      />
      <P.MusicConsumedProgress length="2:22" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-133731-7" title="Thank you for Playing">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/1GVofSSGRp37KStqMjDRHW",
          },
        ]}
      />
      <P.MusicConsumedProgress length="3:04" />
      <P.Remix id="M-20240314T141249" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-131251"
      title="Mashiroiro Symphony SANA EDITION Maxi Single"
    >
      <P.Contains id="M-VGMDB-AL-131251-1" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/Dnmy11Ev" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/1Q1Ojiyps9rlN6H4nNVftB",
          },
          { name: "vgmdb", src: "https://vgmdb.net/album/131251" },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_n-sqS7dtDdpON4LnFsGFL1IVR-KHCe1_M",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.4} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-131251-1" title="Yuki wa Naniiro">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/6vyyEuiepVMmHKc2nWhYUh",
          },
        ]}
      />
      <P.Music base={0.6} />
      <P.Role id="M-VGMDB-AR-26614" roles="prod" />
      <P.MusicConsumedProgress length="3:25" />
      <P.Remix id="M-20240314T141249" />
    </P.Entry>
    <P.Entry
      id="M-20240314T141249"
      title='Thank you for Playing "Kotoha - Yuki wa Naniiro"'
      entrytype="MusicTrack"
    >
      {/* dogshit mashup lmfao */}
      <P.Music base={0.15} />
      {/* but funny af */}
      <P.NEI base={0.5} emotions="AP" />
      {/* (wdym i literally made this kek) */}
      <P.MusicConsumedProgress length="00:00:50" />
    </P.Entry>
  </P.Document>
);
