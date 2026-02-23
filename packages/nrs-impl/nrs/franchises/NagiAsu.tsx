/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-2662" title="Nagi no Asu kara">
      <P.Contains id="M-VGMDB-AL-45187" />
      <P.Contains id="A-MAL-16067" />
      <P.Contains id="M-VGMDB-AL-41278-1" />
      <P.Contains id="M-VGMDB-AL-41280-1" />
      <P.Contains id="M-VGMDB-AL-42900-1" />
      <P.Contains id="M-VGMDB-AL-42900-3" />
      <P.Contains id="M-VGMDB-AL-43164-1" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-45187" title="Nagi no Asukara Character Song CD3">
      <P.Contains id="M-VGMDB-AL-45187-1" />
      <P.Visual type="albumArt" base={0.4} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-45187-1" title="ripple ~my first love~">
      <P.MusicConsumedProgress length="4:22" />
      <P.Music base={0.53} />
      <P.Role id="M-VGMDB-AR-12665" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="A-MAL-16067" title="Nagi no Asu kara">
      <P.Source adb={16067} ks={7370} al={16067} mal={16067} />
      <P.BestGirl name="Miuna Shiodome" />
      {/* poor best girl */}
      <P.MaxAEIPADS length={2} emotions="CU" />
      {/* there are other relationships other than the */}
      {/* love triangle of best girl and they did make */}
      {/* an impact */}
      <P.NEI base={0.75} emotions="CU" />
      <P.Waifu waifu="Shiodome Miuna" length={90} />
      <P.Visual type="animated" base={0.6} unique={0.6} />
      <P.Meme strength={0.7} length={25} />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={26} />
      <P.FeatureMusic id="M-VGMDB-AL-41278-1" />
      <P.FeatureMusic id="M-VGMDB-AL-41280-1" />
      <P.FeatureMusic id="M-VGMDB-AL-42900-1" />
      <P.FeatureMusic id="M-VGMDB-AL-42900-3" />
      <P.FeatureMusic id="M-VGMDB-AL-43164-1" />
      <P.FeatureMusic id="M-VGMDB-AL-45187" />
      <P.Writing character={0.6} story={0.8} pacing={0.7} originality={0.9} />
    </P.Entry>
  </P.Document>
);
