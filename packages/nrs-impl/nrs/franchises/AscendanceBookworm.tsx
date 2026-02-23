/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry
      id="F-VGMDB-7638"
      title="Honzuki no Gekokujou: Shisho ni Naru Tame ni wa Shudan wo Erande Iraremasen"
    >
      <P.Contains id="A-MAL-39468" />
      <P.Contains id="A-MAL-40815" />
      <P.Contains id="A-MAL-42429" />
      {/* world-building ig */}
      <P.AEI base={0.3} emotions="AP">
        <P.Contributor id="A-MAL-39468" factor={0.3} />
        <P.Contributor id="A-MAL-40815" factor={0.3} />
        <P.Contributor id="A-MAL-42429" factor={0.4} />
      </P.AEI>
    </P.Entry>
    <P.Entry
      id="A-MAL-39468"
      title="Honzuki no Gekokujou: Shisho ni Naru Tame ni wa Shudan wo Erandeiraremasen"
    >
      <P.Source adb={39468} ks={42241} al={108268} mal={39468} />
      <P.BestGirl name="Myne" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.9} episodes={14} />
      <P.Visual type="animated" base={0.4} unique={0.5} />
      <P.Writing character={0.5} story={0.5} pacing={0.8} originality={0.6} />
    </P.Entry>
    <P.Entry
      id="A-MAL-40815"
      title="Honzuki no Gekokujou: Shisho ni Naru Tame ni wa Shudan wo Erandeiraremasen 2nd Season"
    >
      <P.Source adb={40815} ks={42838} al={113693} mal={40815} />
      <P.BestGirl name="Myne" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.9} episodes={12} />
      <P.Visual type="animated" base={0.4} unique={0.5} />
      <P.Writing character={0.6} story={0.6} pacing={0.8} originality={0.5} />
    </P.Entry>
    <P.Entry
      id="A-MAL-42429"
      title="Honzuki no Gekokujou: Shisho ni Naru Tame ni wa Shudan wo Erandeiraremasen 3rd Season"
    >
      <P.Source adb={42429} ks={43607} al={121176} mal={42429} />
      <P.BestGirl name="Myne" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.9} episodes={10} />
      <P.Visual type="animated" base={0.4} unique={0.5} />
      <P.Writing character={0.7} story={0.7} pacing={0.8} originality={0.5} />
    </P.Entry>
  </P.Document>
);
