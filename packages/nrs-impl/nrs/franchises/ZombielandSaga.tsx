/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-9825" title="ZOMBIE LAND SAGA">
      <P.Contains id="A-MAL-37976" />
      <P.Contains id="A-MAL-40174" />
      <P.Contains id="M-VGMDB-AL-109367" />
    </P.Entry>
    <P.Entry id="A-MAL-37976" title="Zombieland Saga">
      <P.Source adb={37976} ks={41459} al={103871} mal={37976} />
      <P.BestGirl name="Sakura Minamoto" />
      {/* kinda funny */}
      <P.AEI base={0.5} emotions="AP" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.Visual type="animated" base={0.4} unique={0.5} />
      <P.Writing character={0.5} story={0.5} pacing={0.8} originality={0.6} />
    </P.Entry>
    <P.Entry id="A-MAL-40174" title="Zombieland Saga: Revenge">
      <P.Source adb={40174} ks={42467} al={110733} mal={40174} />
      <P.BestGirl name="Sakura Minamoto" />
      {/* the zombieland saga incident */}
      <P.AnimeConsumedProgress status="Abandoned" boredom={0.9} episodes={7} />
      <P.Dropped />
      <P.Visual type="animated" base={0.4} unique={0.5} />
      <P.KilledBy id="V-VNDB-12849" potential={0.3} effect={0.2} />
      <P.FeatureMusic id="M-VGMDB-AL-109367" />
      <P.Writing character={0.5} story={0.5} pacing={0.8} originality={0.5} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-109367"
      title="Taiga yo Tomo ni Naite Kure/Nope!!!!!"
    >
      <P.Contains id="M-VGMDB-AL-109367-1" />
      <P.Visual type="albumArt" base={0.4} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-109367-1" title="Taiga yo Tomo ni Naite Kure">
      <P.MusicConsumedProgress length="3:29" />
      <P.Music base={0.59} />
    </P.Entry>
  </P.Document>
);
