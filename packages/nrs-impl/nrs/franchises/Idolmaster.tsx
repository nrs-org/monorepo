/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-3559" title="THE IDOLM@STER">
      <P.Contains id="M-VGMDB-AR-32295" />
      <P.Contains id="M-VGMDB-AL-53945" />
      <P.Contains id="M-VGMDB-AL-64249" />
      <P.Contains id="M-VGMDB-AL-78253" />
      <P.Contains id="A-MAL-10278" />
      <P.Contains id="A-MAL-23587" />
      <P.Contains id="A-MAL-30344" />
      <P.Contains id="A-MAL-51536" />
      <P.NEI base={0.25} emotions="AP">
        <P.Contributor id="A-MAL-23587" factor={0.5} />
        <P.Contributor id="A-MAL-30344" factor={0.5} />
      </P.NEI>
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-32295" title="765 MILLION ALLSTARS" />
    <P.Entry
      id="M-VGMDB-AL-53945"
      title="THE IDOLM@STER LIVE THE@TER DREAMERS 01 Dreaming!"
    >
      <P.Contains id="M-VGMDB-AL-53945-1" />
      <P.Visual type="albumArt" base={0.5} unique={0.25} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-53945-1" title="Dreaming!">
      <P.MusicConsumedProgress length="4:38" />
      <P.Music base={0.39} />
      <P.OsuSong personal={0.8} community={0} />
      <P.Role id="M-VGMDB-AR-32295" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-64249"
      title="THE IDOLM@STER CINDERELLA MASTER EVERMORE"
    >
      <P.Contains id="M-VGMDB-AL-64249-1" />
      <P.Visual type="albumArt" base={0.3} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-64249-1" title="EVERMORE (M@STER VERSION)">
      <P.MusicConsumedProgress length="6:05" />
      <P.Music base={0.51} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-78253"
      title="THE IDOLM@STER MILLION THE@TER GENERATION 11 UNION!!"
    >
      <P.Contains id="M-VGMDB-AL-78253-1" />
      <P.Visual type="albumArt" base={0.4} unique={0.15} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-78253-1" title="UNION!!">
      <P.MusicConsumedProgress length="5:29" />
      <P.Music base={0.42} />
      <P.OsuSong personal={0.5} community={0.2} />
      <P.Role id="M-VGMDB-AR-32295" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="A-MAL-10278" title="The iDOLM@STER">
      <P.Source adb={10278} ks={6111} al={10278} mal={10278} />
      <P.BestGirl name="Iori Minase" />
      {/* ending pretty sadge */}
      <P.NEI base={0.6} emotions="CU" />
      {/* funny ig */}
      <P.NEI base={0.75} emotions="AP" />
      {/* idk why i gave this 6 in NRS1 but i'll nerf it to 0.3 ig. */}
      <P.Music base={0.08} />
      <P.AnimeConsumedProgress status="Completed" boredom={0.9} episodes={25} />
      <P.Visual type="animated" base={0.4} unique={0.3} />
      <P.Writing character={0.4} story={0.5} pacing={0.7} originality={0.8} />
    </P.Entry>
    <P.Entry id="A-MAL-23587" title="The iDOLM@STER Cinderella Girls">
      <P.Source adb={23587} ks={8777} al={20693} mal={23587} />
      <P.BestGirl name="Chieri Ogata" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.8} episodes={13} />
      <P.Visual type="animated" base={0.5} unique={0.2} />
      <P.Writing character={0.5} story={0.6} pacing={0.7} originality={0.7} />
    </P.Entry>
    <P.Entry
      id="A-MAL-30344"
      title="The iDOLM@STER Cinderella Girls 2nd Season"
    >
      <P.Source adb={30344} ks={10760} al={21094} mal={30344} />
      <P.BestGirl name="Chieri Ogata" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.8} episodes={12} />
      <P.Visual type="animated" base={0.5} unique={0.2} />
      <P.Writing character={0.5} story={0.6} pacing={0.7} originality={0.7} />
    </P.Entry>
    <P.Entry id="A-MAL-51536" title="The iDOLM@STER Cinderella Girls: U149">
      <P.Source adb={17301} al={146975} ks={46049} mal={51536} />
      <P.BestGirl name="Arisu Tachibana" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.Visual type="animated" base={0.6} unique={0.15} />
      {/* that subreddit */}
      <P.AEI base={0.2} emotions="AP" />
      <P.Writing character={0.5} story={0.6} pacing={0.7} originality={0.7} />
    </P.Entry>
  </P.Document>
);
