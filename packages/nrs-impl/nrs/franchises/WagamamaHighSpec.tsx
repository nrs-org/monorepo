/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-20221122T215201" title="Wagamama High Spec">
      <P.Contains id="V-VNDB-17823" />
      <P.Contains id="M-VGMDB-AL-67632" />
    </P.Entry>
    <P.Entry id="V-VNDB-17823" title="Wagamama High Spec">
      {/* save this for OC */}
      {/* <bestGirl name="Watanuki Karen" /> */}
      <P.BestGirl name="Rokuonji Kaoruko" />
      <P.ConsumedProgress status="Consuming" boredom={0.9} duration="3:00:00" />
      <P.Visual type="visualNovel" base={0.7} unique={0.3} />
      <P.NEI base={0.3} emotions="MP" />
      <P.NEI base={0.4} emotions="AP" />
      <P.KilledBy id="F-20221128T123502" potential={0.25} effect={1} />
      <P.Writing character={0.3} story={0.3} pacing={0.8} originality={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-67632" title="WAGAMAMA HIGHSPEC OC VOCAL ALBUM">
      <P.Contains id="M-VGMDB-AL-67632-1" />
      <P.Visual type="albumArt" base={0.6} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-67632-1" title="Hey Darling!">
      <P.MusicConsumedProgress length="3:35" />
      <P.Music base={0.61} />
    </P.Entry>
  </P.Document>
);
