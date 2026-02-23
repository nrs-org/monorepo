/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-4168" title="NEW GAME!">
      <P.Contains id="A-MAL-31953" />
      <P.Contains id="A-MAL-34914" />
      <P.Contains id="M-20220317T064137-2" />
      <P.Contains id="M-VGMDB-AL-58627" />
      <P.Contains id="M-VGMDB-AL-68225" />
      {/* humor */}
      <P.AEI base={0.25} emotions="AP">
        <P.Contributor id="A-MAL-31953" factor={0.5} />
        <P.Contributor id="A-MAL-34914" factor={0.5} />
      </P.AEI>
      <P.Meme strength={0.2} length={2}>
        <P.Contributor id="A-MAL-31953" factor={0.5} />
        <P.Contributor id="A-MAL-34914" factor={0.5} />
      </P.Meme>
      <P.InterestField new={true}>
        <P.Contributor id="A-MAL-31953" factor={0.25} />
        <P.Contributor id="A-MAL-34914" factor={0.25} />
        <P.Contributor id="A-MAL-13759" factor={0.5} />
      </P.InterestField>
    </P.Entry>
    <P.Entry id="A-MAL-31953" title="New Game!">
      <P.Source adb={31953} ks={11467} al={21455} mal={31953} />
      {/* idk who is better, aoba or yun, so one girl each season */}
      <P.BestGirl name="Iijima Yun" generatedBy="user" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.8} episodes={12} />
      <P.Visual type="animated" base={0.7} unique={0.3} />
      <P.FeatureMusic id="M-VGMDB-AL-58627-1" />
      <P.Writing character={0.4} story={0.4} pacing={0.7} originality={0.75} />
    </P.Entry>
    <P.Entry id="A-MAL-34914" title="New Game!!">
      <P.Source adb={34914} ks={13236} al={98292} mal={34914} />
      {/* idk who is better, aoba or yun, so one girl each season */}
      <P.BestGirl name="Aoba Suzukaze" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.8} episodes={12} />
      <P.Visual type="animated" base={0.7} unique={0.3} />
      <P.FeatureMusic id="M-VGMDB-AL-68225-1" />
      <P.Writing character={0.4} story={0.4} pacing={0.7} originality={0.65} />
    </P.Entry>
    <P.Entry
      id="M-20220317T064137-2"
      title="fourfolium"
      entrytype="MusicArtist"
    />
    <P.Entry id="M-VGMDB-AL-58627" title="Now Loading!!!! / fourfolium">
      <P.Contains id="M-VGMDB-AL-58627-1" />
      <P.Visual type="albumArt" base={0.7} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-58627-1" title="Now Loading!!!!">
      <P.MusicConsumedProgress length="4:13" />
      <P.Music base={0.44} />
      <P.OsuSong personal={0.4} community={0} />
      <P.Role id="M-20220317T064137-2" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-68225" title="STEP by STEP UP↑↑↑↑ / fourfolium">
      <P.Contains id="M-VGMDB-AL-68225-1" />
      <P.Visual type="albumArt" base={0.7} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-68225-1" title="STEP by STEP UP↑↑↑↑">
      <P.MusicConsumedProgress length="4:12" />
      {/* mankai step by step */}
      {/* this song is legendary af */}
      <P.Music base={0.43} />
      <P.OsuSong personal={0.8} community={0} />
      <P.Role id="M-20220317T064137-2" roles="vocal+image" />
    </P.Entry>
  </P.Document>
);
