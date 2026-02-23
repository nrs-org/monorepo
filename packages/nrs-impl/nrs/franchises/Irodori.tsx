/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* original of irodori covers */}
    <P.Entry id="M-VGMDB-AR-9553" title="cosMo@bousouP">
      <P.Contains id="M-20250221T165439" />
      <P.Contains id="M-VGMDB-AL-91187-35" />
    </P.Entry>
    <P.Entry
      id="M-20250221T165439"
      title="θθ Shinitagari ni Tsukeru Kusuri θθ"
      entrytype="MusicTrack"
    >
      <P.Visual type="semiAnimatedMV" base={0.5} unique={0.5} />
      <P.Remix id="M-20250221T163932-5" />
      <P.MusicConsumedProgress length="4:19" />
      <P.Music base={0.65} />
      <P.Role id="M-VGMDB-AR-9553" roles="total" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-91187" title="CHUNITHM ALL JUSTICE COLLECTION ep.I">
      <P.Contains id="M-VGMDB-AL-91187-35" />
      <P.Visual type="albumArt" base={0.05} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-91187-35" title="エンドマークに希望と涙を添えて">
      <P.MusicConsumedProgress length="2:51" />
      <P.Music base={0.35} />
      <P.Remix id="M-VGMDB-AL-93299-2" />
    </P.Entry>
    <P.Entry id="F-VGMDB-10978" title="Irodorimidori">
      <P.Contains id="A-MAL-50267" />
      <P.Contains id="M-VGMDB-AL-93299" />
      <P.Contains id="M-20220130T165739-2" />
      <P.Contains id="M-20220130T165739-1" />
    </P.Entry>
    <P.Entry id="A-MAL-50267" title="Irodorimidori">
      <P.Source adb={50267} ks={45577} al={140950} mal={50267} />
      <P.BestGirl name="Nagi Kobotoke" />
      <P.AnimeConsumedProgress
        status="Completed"
        boredom={0.9}
        episodes={8}
        episodeDuration="3:00"
      />
      <P.Visual type="animatedShort" base={0.4} unique={0.2} />
      <P.Writing character={0.2} story={0.2} pacing={0.5} originality={0.2} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-93299"
      title="GO!GO! Chunithm♥Endmark / IRODORIMIDORI"
    >
      <P.Contains id="M-VGMDB-AL-93299-2" />
      <P.Visual type="albumArt" base={0.5} unique={0.35} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-93299-2"
      title="エンドマークに希望と涙を添えて ～イロドリミドリアレンジ～"
    >
      {/* Length source: https://www.youtube.com/watch?v=wR-u0IRw5wc */}
      <P.MusicConsumedProgress length="4:35" generatedBy="user" />
      <P.Music base={0.4} />
    </P.Entry>
    <P.Entry id="M-20220130T165739-2" title="Maware! GO! GO! CHUNITHM">
      <P.Contains id="M-20220130T165739-3" />
      <P.Contains id="M-20220130T165739-4" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Visual type="albumArt" base={0.35} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-20220130T165739-3" title="Bokura no Freedom DiVE↓">
      <P.Visual type="albumArt" base={0.4} unique={0.45} />
      {/* Length source: https://osu.ppy.sh/beatmapsets/1667264 */}
      <P.Music base={0.34} />
      <P.MusicConsumedProgress length="5:16" generatedBy="user" />
      <P.Role id="M-20220130T165739-1" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-20220130T165739-4" title="Zero kara hajimeru Brain Power">
      {/* Length source: https://www.youtube.com/watch?v=iRNH_wF7nrc */}
      <P.Music base={0.25} />
      <P.MusicConsumedProgress length="5:15" generatedBy="user" />
      <P.Role id="M-20220130T165739-1" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-20220130T165739-1"
      title="Irodorimidori"
      entrytype="MusicArtist"
    />
  </P.Document>
);
