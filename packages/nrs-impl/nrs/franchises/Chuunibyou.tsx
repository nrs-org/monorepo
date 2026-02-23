/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="M-VGMDB-AR-12516" title="ZAQ">
      <P.Contains id="M-VGMDB-AL-42762" />
    </P.Entry>
    <P.Entry id="F-VGMDB-2330" title="Chuunibyou demo Koi ga Shitai!">
      <P.Contains id="M-VGMDB-AL-42762" />
      <P.Contains id="A-MAL-14741" />
      <P.Contains id="A-MAL-18671" />
      <P.Contains id="A-MAL-35608" />
      {/* this made me laugh my ass off */}
      <P.AEI base={0.75} emotions="AP">
        <P.Contributor id="A-MAL-14741" factor={0.75} />
        <P.Contributor id="A-MAL-18671" factor={0.25} />
        {/* s2 has less comedy than s1 */}
        {/* because le funny dead ppl pink-haired girl */}
      </P.AEI>
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-42762" title="VOICE / ZAQ">
      <P.Contains id="M-VGMDB-AL-42762-1" />
      <P.Visual type="albumArt" base={0.6} unique={0.2} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-42762-1" title="VOICE">
      <P.MusicConsumedProgress length="4:18" />
      <P.Music base={0.24} />
      <P.OsuSong personal={0.2} community={0} />
    </P.Entry>
    <P.Entry id="A-MAL-14741" title="Chuunibyou demo Koi ga Shitai!">
      <P.Source adb={14741} ks={7160} al={14741} mal={14741} />
      <P.Visual type="animated" base={0.6} unique={0.2} />
      <P.BestGirl name="Shinka Nibutani" />
      {/* idk why */}
      {/* this is taken from NRS1 */}
      <P.Meme strength={0.15} length={2} />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.Writing character={0.6} story={0.4} pacing={0.6} originality={0.75} />
    </P.Entry>
    <P.Entry id="A-MAL-18671" title="Chuunibyou demo Koi ga Shitai! Ren">
      <P.Source adb={18671} ks={7705} al={18671} mal={18671} />
      <P.BestGirl name="Shinka Nibutani" />
      {/* Shichimiya dead people almost made me cry */}
      {/* YouTube link: https://www.youtube.com/watch?v=vFjJ6skYoxI */}
      <P.AEI base={1} emotions="CU" />
      {/* Shichimiya memes */}
      <P.Meme strength={0.4} length={10} />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.Visual type="animated" base={0.6} unique={0.2} />
      <P.FeatureMusic id="M-VGMDB-AL-42762-1" />
      <P.Writing character={0.6} story={0.4} pacing={0.6} originality={0.65} />
    </P.Entry>
    <P.Entry
      id="A-MAL-35608"
      title="Chuunibyou demo Koi ga Shitai! Movie: Take On Me"
    >
      <P.Source adb={35608} ks={13524} al={98762} mal={35608} />
      <P.BestGirl name="Shinka Nibutani" />
      <P.AnimeConsumedProgress
        status="Completed"
        boredom={0.9}
        episodes={1}
        episodeDuration="1:33:00"
      />
      {/* movie is funny, but less content than s1 and s2 */}
      {/* separate from s1/2 because it was watched later */}
      <P.NEI base={0.75} emotions="AP" />
      <P.Visual type="animated" base={0.6} unique={0.2} />
      <P.Writing character={0.5} story={0.3} pacing={0.6} originality={0.65} />
    </P.Entry>
  </P.Document>
);
