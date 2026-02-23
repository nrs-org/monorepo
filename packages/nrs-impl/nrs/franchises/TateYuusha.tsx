/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-7166" title="Tate no Yuusha no Nariagari">
      <P.Contains id="A-MAL-35790" />
      <P.Contains id="A-MAL-40356" />
    </P.Entry>
    <P.Entry id="A-MAL-35790" title="Tate no Yuusha no Nariagari">
      <P.Source adb={35790} ks={13593} al={99263} mal={35790} />
      {/* This became popular thanks to Reddit. */}
      {/* And yes, it's watched in the Reddit-era */}
      <P.BestGirl name="Raphtalia" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={25} />
      {/* Anger when MC is treated unfairly (like Oregairu's 8man) */}
      <P.NEI base={0.5} emotions="AU" />
      <P.Meme strength={0.5} length={6} />
      <P.Visual type="animated" base={0.5} unique={0.2} />
      <P.Writing character={0.3} story={0.4} pacing={0.8} originality={0.6} />
    </P.Entry>
    <P.Entry id="A-MAL-40356" title="Tate no Yuusha no Nariagari Season 2">
      <P.Source adb={40356} ks={42530} al={111321} mal={40356} />
      <P.BestGirl name="Raphtalia" />
      <P.AnimeConsumedProgress status="Abandoned" boredom={0.7} episodes={3} />
      <P.Dropped />
      <P.KilledBy id="F-VGMDB-7059" potential={0.2} effect={0.75} />
      <P.Visual type="animated" base={0.4} unique={0.2} />
      <P.Writing character={0.3} story={0.4} pacing={0.6} originality={0.5} />
    </P.Entry>
  </P.Document>
);
