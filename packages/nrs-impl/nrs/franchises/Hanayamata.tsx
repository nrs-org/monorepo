/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* the good old days */}
    {/* everything was in order */}
    {/* no chaos, no unexpected meta, no neo-romance, */}
    {/* no himeno sena, no culture-loving culture */}
    <P.Entry id="F-VGMDB-2924" title="Hanayamata">
      <P.Contains id="A-MAL-21681" />
      <P.Contains id="M-VGMDB-AL-46235" />
    </P.Entry>
    <P.Entry id="A-MAL-21681" title="Hanayamata">
      <P.Source adb={21681} ks={8138} al={20575} mal={21681} />
      <P.BestGirl name="Naru Sekiya" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.Visual type="animated" base={0.4} unique={0.7} />
      {/* first ep aei */}
      <P.AEI base={0.2} emotions="MP-0.3:CP-0.7" />
      <P.FeatureMusic id="M-VGMDB-AL-46235-1" />
      <P.Writing character={0.3} story={0.3} pacing={0.6} originality={0.4} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-46235"
      title='Hana ha odore ya irohani ho / Team "Hanayamata"'
    >
      <P.Contains id="M-VGMDB-AL-46235-1" />
      <P.Visual type="albumArt" base={0.4} unique={0.7} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-46235-1" title="Hana wa Odore ya Irohaniho">
      <P.MusicConsumedProgress length="4:10" />
      <P.Music base={0.45} />
    </P.Entry>
  </P.Document>
);
