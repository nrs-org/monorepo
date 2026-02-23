/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-4043" title="Ao no Kanata no Four Rhythm">
      <P.Contains id="V-VNDB-12849" />
      <P.Contains id="M-VGMDB-AL-52834" />
      <P.Contains id="M-VGMDB-AL-55828" />
    </P.Entry>
    <P.Entry id="V-VNDB-12849" title="Ao no Kanata no Four Rhythm">
      {/* i still use her skin in osugame lmfao */}
      {/* (because all of the best girls post-aokana */}
      {/* lives in unpopular franchises like rst and sb69) */}
      <P.BestGirl name="Asuka Kurashina" />
      {/* <bestGirl name="Satouin Reiko" /> // the sango/rosia of aokana */}
      {/* the asuka route is completed */}
      <P.ConsumedProgress
        status="Completed"
        boredom={0.9}
        duration="10:00:00"
      />
      {/* Aokana made me love Asuka for like 2 weeks */}
      {/* which is good */}
      {/* also there was a PADS */}
      <P.PADS length={1} emotions="MP">
        <P.ValidatorSuppress rules="dah-lone-pads" />
      </P.PADS>
      <P.Waifu waifu="Kurashina Asuka" from="2021-06-02" to="2021-06-16" />
      <P.FeatureMusic id="M-VGMDB-AL-52834" />
      <P.Visual type="visualNovel" base={0.8} unique={0.1} />
      {/* idk what is this ngl */}
      <P.Meme strength={0.8} length={25} />
      <P.KilledBy id="V-VNDB-27448" potential={0.1} effect={0.1} />
      <P.Writing character={0.3} story={0.4} pacing={0.5} originality={0.5} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-52834"
      title="Ao no Kanata no Four Rhythm Vocal & Sound Collection"
    >
      {/* too lazy to rate every single track */}
      <P.Music base={0.8} />
      <P.Visual type="albumArt" base={0.2} unique={0.15} />
      <P.Remix id="M-20221202T205008" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-55828" title="Contrail ~Kiseki~ / Mami Kawada">
      <P.Contains id="M-VGMDB-AL-55828-1" />
      <P.Visual type="albumArt" base={0.2} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-55828-1" title="Contrail ~Kiseki~">
      <P.MusicConsumedProgress length="4:39" />
      <P.Music base={0.45} />
      <P.OsuSong personal={0.75} community={0.3} />
      <P.Remix id="M-20221202T210558" />
    </P.Entry>
    <P.Entry
      id="M-20221202T205008"
      title="Wings of Courage -Sora o Koete- (Epsilon Remix)"
      entrytype="MusicTrack"
    >
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Music base={0.56} />
      <P.OsuSong personal={0.3} community={0} />
      {/* Length source: https://osu.ppy.sh/beatmapsets/1358513 */}
      <P.MusicConsumedProgress length="4:58" />
    </P.Entry>
    <P.Entry
      id="M-20221202T210558"
      title="Contrail ~Kiseki~ (Epsilon Remix)"
      entrytype="MusicTrack"
    >
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Music base={0.56} />
      {/* Length source: https://osu.ppy.sh/beatmapsets/461966 */}
      <P.MusicConsumedProgress length="5:50" />
    </P.Entry>
  </P.Document>
);
