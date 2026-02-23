/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-9540" title="CUE!">
      <P.Contains id="A-MAL-43735" />
      <P.Contains id="M-VGMDB-AR-33857" />
      <P.Contains id="M-VGMDB-AL-115724" />
      {/* this franchise was first discovered while i'm listening to */}
      {/* rst songs on spotify (like onsen), therefore it's known as */}
      {/* the futuRe: of gen2 */}
    </P.Entry>
    <P.Entry id="A-MAL-43735" title="Cue!">
      <P.Source adb={43735} ks={44979} al={125682} mal={43735} />
      {/* rst has re:lighted the stage */}
      {/* and now, its juniors will take the stage to the next level */}
      {/* introducing, sb69 stars and cue! */}
      {/* lmao main girl */}
      {/* tbh there are some other girls who are decent contestants */}
      {/* for best girl, like airi, yuzuha, etc. idk */}
      {/* there is also a girl named kano lmao */}
      <P.BestGirl name="Haruna Mutsuishi" />
      {/* the character interaction was lacking in ep1 and ep2 */}
      {/* in ep3 iirc there is some */}
      {/* and based ep4 is nothing but character interactions */}
      {/* we do a little MP farming */}
      {/* ok airi and yuzuha is wholesome af */}
      {/* ep 11 almost made me cry */}
      {/* and i was somewhat moved by ep 10 */}
      <P.AEI base={0.2} emotions="MP-0.9:CP-0.1" />
      {/* comedy was weak ngl */}
      <P.NEI base={0.5} emotions="AP" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={24} />
      <P.Visual type="animated" base={0.5} unique={0.2} />
      <P.FeatureMusic id="M-VGMDB-AL-115724" />
      {/* duopoly shithole moment */}
      <P.KilledBy id="F-VGMDB-4499" potential={0.25} effect={0.25} />
      <P.KilledBy id="F-VGMDB-7059" potential={0.25} effect={0.75} />
      <P.Writing character={0.6} story={0.6} pacing={0.5} originality={0.7} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-33857" title="AiRBLUE" />
    <P.Entry
      id="M-VGMDB-AL-115724"
      title="Start Line/Hajimari no Kanenone ga Narihibiku Sora / AiRBLUE"
    >
      <P.Contains id="M-VGMDB-AL-115724-1" />
      <P.Contains id="M-VGMDB-AL-115724-2" />
      <P.Visual type="albumArt" base={0.5} unique={0.2} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-115724-1" title="スタートライン">
      <P.MusicConsumedProgress length="5:42" />
      <P.Music base={0.7} />
      <P.Role id="M-VGMDB-AR-33857" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-115724-2" title="はじまりの鐘の音が鳴り響く空">
      <P.MusicConsumedProgress length="4:12" />
      <P.Music base={0.59} />
      <P.Role id="M-VGMDB-AR-33857" roles="vocal+image" />
    </P.Entry>
  </P.Document>
);
