/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-6626" title="Iroduku Sekai no Ashita kara">
      <P.Contains id="A-MAL-37497" />
      <P.Contains id="M-VGMDB-AL-80341-1" />
    </P.Entry>
    <P.Entry id="A-MAL-37497" title="Irozuku Sekai no Ashita kara">
      <P.Source adb={37497} ks={41101} al={101316} mal={37497} />
      <P.BestGirl name="Hitomi Tsukishiro" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.7} episodes={13} />
      {/* ending was good */}
      <P.AEI base={0.25} emotions="CU-0.9:AP-0.1" />
      <P.Visual type="animated" base={0.6} unique={0.5} />
      <P.FeatureMusic id="M-VGMDB-AL-80341-1" />
      <P.Writing character={0.6} story={0.5} pacing={0.5} originality={0.8} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-80341" title="17-sai / Haruka to Miyuki">
      <P.Contains id="M-VGMDB-AL-80341-1" />
      <P.Visual type="albumArt" base={0.2} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-80341-1" title="17-sai">
      <P.MusicConsumedProgress length="4:33" />
      <P.Music base={0.39} />
    </P.Entry>
  </P.Document>
);
