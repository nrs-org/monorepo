/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-9703" title="SELECTION PROJECT">
      <P.Contains id="A-MAL-44275" />
      <P.Contains id="M-20220319T061727" />
      <P.Contains id="M-VGMDB-AL-114102" />
      <P.Contains id="M-VGMDB-AL-115010" />
    </P.Entry>
    <P.Entry id="A-MAL-44275" title="Selection Project">
      <P.Source adb={44275} ks={44211} al={126790} mal={44275} />
      <P.BestGirl name="Uta Koizumi" />
      <P.Cry emotions="CU" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.Visual type="animated" base={0.5} unique={0.3} />
      <P.KilledBy id="F-VGMDB-7059" potential={0.25} effect={0.5} />
      <P.KilledBy id="F-VGMDB-3245" potential={0.25} effect={0.8} />
      <P.Writing character={0.5} story={0.4} pacing={0.8} originality={0.4} />
    </P.Entry>
    <P.Entry id="M-20220319T061727" title="9-tie" entrytype="MusicArtist" />
    <P.Entry
      id="M-VGMDB-AL-114102"
      title="SELECTION PROJECT Main Theme Song CD"
    >
      <P.Contains id="M-VGMDB-AL-114102-1" />
      <P.Visual type="albumArt" base={0.5} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-114102-1" title="Glorious Days">
      <P.MusicConsumedProgress length="3:54" />
      <P.Music base={0.35} />
      <P.Role id="M-20220319T061727" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-115010"
      title="SELECTION PROJECT CHARACTER SONG CD 03"
    >
      <P.Contains id="M-VGMDB-AL-115010-1" />
      <P.Visual type="albumArt" base={0.3} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-115010-1" title="ENDROLL">
      <P.MusicConsumedProgress length="3:53" generatedBy="user" />
      <P.Music base={0.47} />
      <P.Role id="M-VGMDB-AR-29487" roles="compose/2" />
    </P.Entry>
  </P.Document>
);
