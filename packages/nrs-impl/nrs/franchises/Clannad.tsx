/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* yep, anime is dying */}
    {/* (blud does NOT know about ave mujipeak) */}
    <P.Entry id="F-VGMDB-1018" title="CLANNAD">
      <P.Contains id="A-MAL-2167" />
      <P.Contains id="A-MAL-4181" />
      <P.Source vgmdb={{ product: 1018 }} />
      {/* we have humor ig */}
      <P.NEI base={0.6} emotions="AP">
        <P.Contributor id="A-MAL-2167" factor={0.7} />
        <P.Contributor id="A-MAL-4181" factor={0.3} />
      </P.NEI>
    </P.Entry>
    <P.Entry id="A-MAL-2167" title="Clannad">
      <P.Source adb={5101} al={2167} ks={1962} mal={2167} />
      <P.BestGirl name="Nagisa Furukawa" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.8} episodes={23} />
      <P.Visual type="animated" base={0.35} unique={0.75} />
      {/* i mean, there are some things here */}
      {/* it's not as good as ~~last episode~~, i mean after story */}
      {/* but yeah this is still somewhat emotional */}
      <P.NEI base={0.3} emotions="CU-0.5:CP-0.5" />
      {/* omegasad */}
      {/* <killedBy id="A-MAL-4181" potential="0.3" effect="1.0" /> */}
      <P.Writing character={0.5} story={0.5} pacing={0.8} originality={0.8} />
    </P.Entry>
    <P.Entry id="A-MAL-4181" title="Clannad: After Story">
      <P.Source adb={5841} al={4181} ks={3505} mal={4181} />
      {/* i cried at least twice because of the comparison with my pathetic life */}
      <P.Cry emotions="MU">
        <P.Contributor id="A-MAL-4181" factor={0.7} />
        <P.Contributor id="Progressive Crisis [null entry]" factor={0.3} />
      </P.Cry>
      <P.Cry emotions="MU">
        <P.Contributor id="A-MAL-4181" factor={0.7} />
        <P.Contributor id="Progressive Crisis [null entry]" factor={0.3} />
      </P.Cry>
      {/* cute daughter widepeepohappy */}
      <P.Cry emotions="MP-0.25:CP-0.75" />
      {/* his daughter... omegasad */}
      <P.Cry emotions="CU" />
      {/* nagisus-related stuff */}
      <P.Cry emotions="CU" />
      <P.BestGirl name="Nagisa Furukawa" />
      <P.AnimeConsumedProgress
        status="Completed"
        boredom={0.95}
        episodes={24}
      />
      <P.Visual type="animated" base={0.5} unique={0.75} />
      <P.Writing character={0.7} story={0.5} pacing={0.8} originality={0.8} />
    </P.Entry>
  </P.Document>
);
