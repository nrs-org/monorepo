/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-3939" title="Gochuumon wa Usagi Desu ka?">
      <P.Contains id="M-VGMDB-AL-44890" />
      <P.Contains id="M-20220116T062502" />
      <P.Contains id="M-VGMDB-AL-55364" />
      <P.Contains id="M-VGMDB-AL-54418" />
      <P.Contains id="A-MAL-21273" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-44890" title="Daydream café / Petit Rabbit's">
      <P.Contains id="M-VGMDB-AL-44890-1" />
      <P.Visual type="albumArt" base={0.4} unique={0.15} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-44890-1" title="Daydream café">
      <P.MusicConsumedProgress length="3:48" />
      {/* fuwa fuwa */}
      {/* dong do la max do */}
      {/* duy bua ham l */}
      {/* duy bua ngao l */}
      <P.Music base={0.24} />
      <P.Role id="M-20220116T062502" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-20220116T062502"
      title="Petit Rabbit's"
      entrytype="MusicArtist"
    />
    <P.Entry
      id="M-VGMDB-AL-55364"
      title="Gochuumon wa Usagi Desu ka?? Chino Character Song Album: cup of chino"
    >
      <P.Contains id="M-VGMDB-AL-55364-3" />
      <P.Visual type="albumArt" base={0.5} unique={0.2} />
      {/* this also includes mahou shoujo chino */}
      <P.Contains id="M-VGMDB-AL-54418-1" />
      <P.Writing character={0.3} story={0.3} pacing={0.6} originality={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-55364-3" title="Shinsaku no Shiawase wa Kochira!">
      <P.MusicConsumedProgress length="4:25" />
      {/* dan dan kikoeru */}
      {/* lets go i fced the son's insane diff with dt */}
      {/* fuck sekai's insane tho */}
      <P.Music base={0.38} />
      <P.Role id="M-VGMDB-AR-15361" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-54418"
      title="Gochuumon wa Mahou Shoujo desu ka? Image Song: Mahou Shoujo Chino"
    >
      <P.Contains id="M-VGMDB-AL-54418-1" />
      <P.Visual type="albumArt" base={0.4} unique={0.15} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-54418-1" title="Mahou Shoujo Chino">
      <P.MusicConsumedProgress length="3:52" />
      <P.Music base={0.31} />
      <P.Role id="M-VGMDB-AR-15361" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="A-MAL-21273" title="Gochuumon wa Usagi Desu ka?">
      <P.Source adb={21273} ks={8095} al={20517} mal={21273} />
      <P.BestGirl name="Chino Kafuu" />
      {/* humor not that good tho */}
      <P.NEI base={0.3} emotions="AP" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.6} episodes={12} />
      <P.Visual type="animated" base={0.4} unique={0.15} />
      <P.Writing character={0.3} story={0.3} pacing={0.6} originality={0.3} />
    </P.Entry>
  </P.Document>
);
