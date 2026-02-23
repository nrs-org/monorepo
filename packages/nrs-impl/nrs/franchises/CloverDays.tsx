/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-20221122T195753" title="Clover Day's">
      <P.Contains id="V-VNDB-13325" />
      <P.Contains id="M-VGMDB-AL-45544" />
    </P.Entry>
    <P.Entry id="V-VNDB-13325" title="Clover Day's">
      <P.BestGirl name="Rindou Tsubame" />
      {/* anri and [anzu] is cute too ig */}
      {/* hekiru ngl is also good */}
      {/* i think this is the best char design vn ever idk */}
      {/* so many routes to choose lol */}
      <P.ConsumedProgress status="Paused" boredom={1} duration="3:00:00" />
      <P.Visual type="visualNovel" base={0.6} unique={0.4} />
      <P.NEI base={0.5} emotions="MP" />
      <P.NEI base={0.25} emotions="AP" />
      <P.FeatureMusic id="M-VGMDB-AL-45544-40" />
      <P.KilledBy id="F-20221128T123502" potential={0.5} effect={1} />
      <P.Writing character={0.4} story={0.3} pacing={0.6} originality={0.7} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-45544" title="Clover Day's ORIGINAL SOUNDTRACKS">
      <P.Contains id="M-VGMDB-AL-45544-40" />
      <P.Visual type="albumArt" base={0.6} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-45544-40" title="Clover Day's full ver.">
      <P.MusicConsumedProgress length="4:32" />
      <P.Music base={0.5} />
      <P.OsuSong personal={0.8} community={0.2} />
    </P.Entry>
  </P.Document>
);
