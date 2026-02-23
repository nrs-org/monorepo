/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-4000" title="Gakkougurashi!">
      <P.Contains id="M-VGMDB-AL-52993" />
      <P.Contains id="M-20220211T055120" />
      <P.Contains id="M-VGMDB-AL-53719" />
      <P.Contains id="A-MAL-24765" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-52993" title="Friend Shitai / Gakuen Seikatsubu">
      <P.Contains id="M-VGMDB-AL-52993-1" />
      <P.Visual type="albumArt" base={0.65} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-52993-1" title="Friend Shitai">
      <P.MusicConsumedProgress length="3:38" />
      <P.Music base={0.34} />
      <P.OsuSong personal={0.5} community={0} />
      <P.Role id="M-20220211T055120" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-20220211T055120"
      title="Gakuen Seikatsubu"
      entrytype="MusicArtist"
    />
    <P.Entry
      id="M-VGMDB-AL-53719"
      title='TV Anime "Gakkou Gurashi!" Character Song 4 / Miki Naoki (CV. Rie Takahashi) & Kurumi Ebisuzawa (CV. Ari Ozawa)'
    >
      <P.Contains id="M-VGMDB-AL-53719-1" />
      <P.Visual type="albumArt" base={0.6} unique={0.25} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-53719-1" title="アンハッピーエンドワールド">
      <P.MusicConsumedProgress length="4:26" />
      <P.Music base={0.54} />
      <P.Role id="M-VGMDB-AR-16380" roles="vocal/2+image/2" />
      <P.Role id="M-VGMDB-AR-15998" roles="vocal/2+image/2" />
    </P.Entry>
    <P.Entry id="A-MAL-24765" title="Gakkougurashi!">
      <P.Source adb={24765} ks={8644} al={20754} mal={24765} />
      <P.BestGirl name="Megumi Sakura" />
      {/* rip Megu-nee */}
      <P.Cry emotions="CU" />
      <P.Meme strength={0.2} length={6} />
      <P.FeatureMusic id="M-VGMDB-AL-52993-1" />
      <P.Visual type="animated" base={0.6} unique={0.25} />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.Writing character={0.6} story={0.8} pacing={0.3} originality={0.8} />
    </P.Entry>
  </P.Document>
);
