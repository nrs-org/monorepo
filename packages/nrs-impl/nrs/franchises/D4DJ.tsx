/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-8339" title="D4DJ">
      <P.Contains id="A-MAL-39681" />
      <P.Contains id="M-20220823T115611" />
      <P.Contains id="M-VGMDB-AL-107257" />
      <P.Contains id="M-VGMDB-AL-108580" />
      {/* wtf */}
    </P.Entry>
    <P.Entry id="A-MAL-39681" title="D4DJ: First Mix">
      <P.Source adb={39681} ks={43557} al={115069} mal={39681} />
      <P.BestGirl name="Rinku Aimoto" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.Visual type="animated" base={0.4} unique={0.75} />
      <P.FeatureMusic id="M-VGMDB-AL-107257" />
      <P.FeatureMusic id="M-VGMDB-AL-108580-2" />
      <P.KilledBy id="F-VGMDB-2588" potential={0.5} effect={0.2} />
      <P.Writing character={0.3} story={0.4} pacing={0.5} originality={0.3} />
    </P.Entry>
    <P.Entry
      id="M-20220823T115611"
      title="Happy Around!"
      entrytype="MusicArtist"
    />
    <P.Entry id="M-VGMDB-AL-107257" title="Guruguru DJ TURN!! / Happy Around!">
      <P.Contains id="M-VGMDB-AL-107257-3" />
      <P.Visual type="albumArt" base={0.4} unique={0.75} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-107257-3" title="Guruguru DJ TURN!!">
      <P.MusicConsumedProgress length="3:43" />
      <P.Music base={0.31} />
      <P.Role id="M-20220823T115611" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-108580"
      title="D4DJ Special Disc Photon Maiden Ver."
    >
      <P.Contains id="M-VGMDB-AL-108580-2" />
      <P.ValidatorSuppress rules="dah-visualless-entry" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-108580-2" title="Brand New World">
      {/* Length source: https://d4dj.fandom.com/wiki/Brand_New_World */}
      <P.MusicConsumedProgress length="4:06" generatedBy="user" />
      <P.Music base={0.44} />
      <P.Role id="M-20220823T115611" roles="vocal+image" />
    </P.Entry>
  </P.Document>
);
