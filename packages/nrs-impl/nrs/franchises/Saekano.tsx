/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-3305" title="Saenai Heroine no Sodatekata">
      <P.Contains id="M-VGMDB-AL-48199" />
      <P.Contains id="A-MAL-23277" />
      <P.Contains id="A-MAL-30727" />
      <P.Contains id="A-MAL-36885" />
      <P.Contains id="M-VGMDB-AL-49446-1" />
      <P.Waifu waifu="Megumi Kato" length={90}>
        <P.Contributor id="A-MAL-23277" factor={0.5} />
        <P.Contributor id="A-MAL-30727" factor={0.5} />
      </P.Waifu>
      <P.Meme strength={0.5} length={45}>
        <P.Contributor id="A-MAL-23277" factor={0.5} />
        <P.Contributor id="A-MAL-30727" factor={0.5} />
      </P.Meme>
      {/* domestic kanojo war arc */}
      <P.Meme strength={0.75} length={90}>
        <P.Contributor id="A-MAL-23277" factor={0.5} />
        <P.Contributor id="A-MAL-30727" factor={0.5} />
      </P.Meme>
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-48199"
      title="Saenai heroine no sodate-kata Character Image Song M♭ / Megumi Kato"
    >
      <P.Contains id="M-VGMDB-AL-48199-1" />
      <P.Visual type="albumArt" base={0.6} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-48199-1" title="M♭">
      <P.MusicConsumedProgress length="3:42" />
      <P.Music base={0.2} />
      <P.OsuSong personal={0.1} community={0} />
    </P.Entry>
    <P.Entry id="A-MAL-23277" title="Saenai Heroine no Sodatekata">
      <P.Source adb={23277} ks={8406} al={20657} mal={23277} />
      <P.BestGirl name="Megumi Kato" generatedBy="user" />
      <P.FeatureMusic id="M-VGMDB-AL-48199-1" />
      <P.FeatureMusic id="M-VGMDB-AL-49446-1" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.EHI />
      <P.Visual type="animated" base={0.5} unique={0.3} />
      <P.Writing character={0.7} story={0.5} pacing={0.8} originality={0.7} />
    </P.Entry>
    <P.Entry id="A-MAL-30727" title="Saenai Heroine no Sodatekata ♭">
      <P.Source adb={30727} ks={10909} al={21180} mal={30727} />
      <P.BestGirl name="Megumi Kato" generatedBy="user" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={11} />
      <P.EHI />
      <P.Visual type="animated" base={0.5} unique={0.3} />
      <P.Writing character={0.7} story={0.5} pacing={0.8} originality={0.6} />
    </P.Entry>
    <P.Entry id="A-MAL-36885" title="Saenai Heroine no Sodatekata Fine">
      <P.Source adb={36885} ks={14050} al={100675} mal={36885} />
      <P.BestGirl name="Megumi Kato" generatedBy="user" />
      {/* humor */}
      <P.NEI base={0.25} emotions="AP" />
      <P.AnimeConsumedProgress
        status="Completed"
        boredom={0.95}
        episodes={1}
        episodeDuration="1:54:00"
      />
      <P.Visual type="animated" base={0.55} unique={0.3} />
      <P.Writing character={0.7} story={0.5} pacing={0.8} originality={0.6} />
    </P.Entry>
    <P.Entry id="M-20220117T170733-1" title="Colorful. (Asterisk DnB Remix)">
      {/* Length source: https://osu.ppy.sh/beatmapsets/299454 */}
      <P.Music base={0.29} />
      <P.MusicConsumedProgress length="5:12" generatedBy="user" />
      <P.Role id="M-20220113T154228" roles="arrange+image/2" />
      <P.Role id="M-VGMDB-AR-11958" roles="vocal+image/2" />
    </P.Entry>
    <P.Entry id="M-20220117T170733-2" title="Colorful. (kamaboko remix)">
      {/* Length source: https://www.youtube.com/watch?v=FkUIAeBcVUw */}
      <P.Music base={0.38} />
      <P.MusicConsumedProgress length="5:04" generatedBy="user" />
      <P.Role id="M-20220117T170733-3" roles="arrange+image/2" />
      <P.Role id="M-VGMDB-AR-11958" roles="vocal+image/2" />
    </P.Entry>
  </P.Document>
);
