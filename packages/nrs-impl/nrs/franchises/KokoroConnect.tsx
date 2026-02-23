/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-3483" title="Kokoro Connect">
      <P.Contains id="M-VGMDB-AL-35431" />
      <P.Contains id="A-MAL-11887" />
      <P.Contains id="A-MAL-16001" />
      {/* drama */}
      <P.AEI base={0.9} emotions="CU">
        <P.Contributor id="A-MAL-11887" factor={0.5} />
        <P.Contributor id="A-MAL-16001" factor={0.5} />
      </P.AEI>
      {/* comfy compoly */}
      <P.NEI base={0.1} emotions="MP">
        <P.Contributor id="A-MAL-11887" factor={0.75} />
        <P.Contributor id="A-MAL-16001" factor={0.25} />
      </P.NEI>
      {/* plot */}
      <P.AEI base={0.5} emotions="AP">
        <P.Contributor id="A-MAL-11887" factor={0.6} />
        <P.Contributor id="A-MAL-16001" factor={0.4} />
      </P.AEI>
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-35431"
      title='Kokoro Connect Original Soundtrack 2 Hito Random & Kizu Random Opening Theme Song "Kimochi Signal" / Kizu Random Ending Theme Song "Cry out"'
    >
      <P.Contains id="M-VGMDB-AL-35431-1" />
      <P.Visual type="albumArt" base={0.4} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-35431-1" title="Kimochi Signal">
      <P.MusicConsumedProgress length="4:13" />
      <P.Music base={0.19} />
    </P.Entry>
    <P.Entry id="A-MAL-11887" title="Kokoro Connect">
      <P.Source adb={11887} ks={6626} al={11887} mal={11887} />
      <P.BestGirl name="Iori Nagase" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.Visual type="animated" base={0.4} unique={0.3} />
      <P.FeatureMusic id="M-VGMDB-AL-35431" />
      <P.Writing character={0.8} story={0.65} pacing={0.7} originality={0.8} />
    </P.Entry>
    <P.Entry id="A-MAL-16001" title="Kokoro Connect: Michi Random">
      <P.Source ks={7355} al={16001} mal={16001} />
      <P.ValidatorSuppress rules="dah-no-anime-altsrc" />
      <P.BestGirl name="Iori Nagase" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={4} />
      <P.Visual type="animated" base={0.4} unique={0.3} />
      <P.Writing character={0.8} story={0.65} pacing={0.7} originality={0.7} />
    </P.Entry>
  </P.Document>
);
