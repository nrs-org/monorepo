/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-9850" title="Tantei wa Mou, Shindeiru.">
      <P.Contains id="A-MAL-46471" />
      <P.Contains id="M-VGMDB-AL-113531" />
      <P.Contains id="M-VGMDB-AL-113660" />
      {/* Kano's friend's album lol */}
    </P.Entry>
    <P.Entry id="A-MAL-46471" title="Tantei wa Mou, Shindeiru.">
      <P.Source adb={46471} ks={44022} al={128712} mal={46471} />
      <P.BestGirl name="Nagisa Natsunagi" />
      {/* siesta arc is shit */}
      {/* cope */}
      <P.Visual type="animated" base={0.5} unique={0.3} />
      <P.AnimeConsumedProgress status="Completed" boredom={0.6} episodes={12} />
      <P.FeatureMusic id="M-VGMDB-AL-113531" />
      <P.FeatureMusic id="M-VGMDB-AL-113660" />
      <P.KilledBy id="A-MAL-41530" potential={0.2} effect={0.5} />
      <P.Writing character={0.5} story={0.5} pacing={0.8} originality={0.7} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-113531" title="Kodou / Nanakagura">
      <P.Contains id="M-VGMDB-AL-113531-1" />
      <P.Visual type="albumArt" base={0.5} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-113531-1" title="Kodou">
      <P.MusicConsumedProgress length="4:31" />
      <P.Music base={0.51} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-113660"
      title="Koko de Ikiteru / mary & jon-YAKITORY"
    >
      <P.Contains id="M-VGMDB-AL-113660-1" />
      <P.Visual type="albumArt" base={0.5} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-113660-1" title="Koko de Ikiteru">
      <P.MusicConsumedProgress length="3:22" />
      <P.Music base={0.44} />
    </P.Entry>
  </P.Document>
);
