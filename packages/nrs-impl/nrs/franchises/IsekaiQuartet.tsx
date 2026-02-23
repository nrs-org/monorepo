/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-20220823T083245" title="Isekai Quartet">
      <P.Contains id="A-MAL-38472" />
      <P.Contains id="A-MAL-39988" />
    </P.Entry>
    <P.Entry id="A-MAL-38472" title="Isekai Quartet">
      <P.Source adb={38472} ks={42032} al={104454} mal={38472} />
      {/* selecting bestGirl of this anime be like */}
      {/* template: https://imgflip.com/memetemplate/294461925/Two-Guys-Fighting-then-One-Guy-Kills-Them */}
      {/* caption: */}
      {/* "darkness (ai kayano cricri girl va)" */}
      {/* "chris + eris (suwa ayaka rst girl va)" */}
      {/* "ram (fuck re:zero tho) (murakawa rie akm girl va) */}
      <P.BestGirl name="Ram" />
      <P.Visual type="animated" base={0.3} unique={0.5} />
      <P.AnimeConsumedProgress status="Completed" boredom={0.5} episodes={12} />
      <P.Writing character={0.2} story={0.3} pacing={0.5} originality={0.8} />
    </P.Entry>
    <P.Entry id="A-MAL-39988" title="Isekai Quartet 2">
      <P.Source adb={39988} ks={42410} al={110178} mal={39988} />
      {/* if there is someone that murakawa rie loses to, */}
      {/* then it must be 𝐓𝐇𝐄 𝐆𝐈𝐆𝐀𝐂𝐇𝐀𝐃 𝐒𝐄𝐈𝐘𝐔𝐔, */}
      {/* or the other akm girl, i'll let rina hidaka have this just */}
      {/* to make the thing balanced */}
      <P.BestGirl name="Filo" />
      <P.Visual type="animated" base={0.3} unique={0.5} />
      <P.AnimeConsumedProgress status="Abandoned" boredom={0.5} episodes={12} />
      <P.Dropped />
      <P.Writing character={0.2} story={0.3} pacing={0.5} originality={0.7} />
    </P.Entry>
  </P.Document>
);
