/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-5607" title="Miagete Goran, Yozora no Hoshi wo">
      <P.Contains id="V-VNDB-16560" />
      <P.Contains id="M-VGMDB-AL-57788" />
      {/* average FFP miharu worshipper */}
      {/* average "Rafis | Ceui - Finest Sky [Albireo Princess] (Shizuku-) */}
      {/* +HD,DT (98.84) FC #1 | 987pp 67.99 cv. UR (His new top play)"" enjoyer */}
    </P.Entry>
    <P.Entry id="V-VNDB-16560" title="Miagete Goran, Yozora no Hoshi o">
      <P.BestGirl name="Saotome Miharu" />
      {/* legends said that ffp was born because of this woman */}
      {/* if so she's worst girl /s */}
      <P.Politics />
      {/* also the girls in this vn suck ngl */}
      {/* idk maybe the albireo princess girl is cute */}
      {/* but she had some caveats, i even picked hikari's */}
      {/* route first lol (i haven't finished any routes btw) */}
      <P.Visual type="visualNovel" base={0.6} unique={0.5} />
      <P.ConsumedProgress
        status="Abandoned"
        boredom={0.8}
        duration="15:00:00"
      />
      <P.Dropped />
      {/* obligatory eroge romcom humor */}
      <P.NEI base={0.8} emotions="AP" />
      <P.Writing character={0.3} story={0.4} pacing={0.7} originality={0.6} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-57788"
      title='Miagete Goran, Yozora no Hoshi wo FINE DAYS Mini Soundtrack CD "and Little Planets"'
    >
      <P.Contains id="M-VGMDB-AL-57788-1" />
      <P.Visual type="albumArt" base={0.2} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-57788-1" title="Finest Sky">
      <P.MusicConsumedProgress length="3:48" />
      <P.Music base={0.31} />
      {/* [albireo princess] */}
      {/* hddt */}
      {/* haha */}
      <P.OsuSong personal={0.5} community={0.1} />
    </P.Entry>
  </P.Document>
);
