/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-9159" title="Dr. Stone">
      <P.Contains id="A-MAL-38691" />
      <P.Contains id="A-MAL-40852" />
      <P.Contains id="A-MAL-50612" />
      {/* bac si da */}
      <P.Contains id="M-VGMDB-AL-87927-1" />
    </P.Entry>
    <P.Entry id="A-MAL-38691" title="Dr. Stone">
      <P.Source adb={38691} ks={42080} al={105333} mal={38691} />
      <P.BestGirl name="Yuzuriha Ogawa" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={24} />
      <P.Visual type="animated" base={0.3} unique={0.75} />
      {/* "plot is good" */}
      <P.AEI base={0.25} emotions="AP" />
      <P.FeatureMusic id="M-VGMDB-AL-87927-1" />
      <P.Writing character={0.3} story={0.4} pacing={0.7} originality={0.8} />
    </P.Entry>
    <P.Entry id="A-MAL-40852" title="Dr. Stone: Stone Wars">
      <P.Source adb={40852} ks={42867} al={113936} mal={40852} />
      <P.BestGirl name="Yuzuriha Ogawa" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={11} />
      <P.Visual type="animated" base={0.3} unique={0.75} />
      <P.AEI base={0.1} emotions="AP" />
      <P.Writing character={0.3} story={0.4} pacing={0.7} originality={0.7} />
    </P.Entry>
    <P.Entry id="A-MAL-50612" title="Dr. Stone: Ryuusui">
      <P.Source adb={50612} ks={45615} al={142876} mal={50612} />
      <P.BestGirl name="Yuzuriha Ogawa" />
      <P.AnimeConsumedProgress
        status="Completed"
        boredom={1}
        episodes={1}
        episodeDuration="54:00"
      />
      <P.Visual type="animated" base={0.3} unique={0.75} />
      <P.NEI base={0.6} emotions="AP" />
      <P.Writing character={0.3} story={0.4} pacing={0.7} originality={0.7} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-87927"
      title="Good Morning World! / BURNOUT SYNDROMES"
    >
      <P.Contains id="M-VGMDB-AL-87927-1" />
      <P.Visual type="albumArt" base={0.15} unique={0.2} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-87927-1" title="Good Morning World!">
      <P.MusicConsumedProgress length="4:09" />
      <P.Music base={0.32} />
      <P.OsuSong personal={0.1} community={0} />
    </P.Entry>
  </P.Document>
);
