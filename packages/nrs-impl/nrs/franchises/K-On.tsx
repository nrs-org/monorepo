/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-504" title="K-On!">
      <P.Contains id="M-VGMDB-AL-20118" />
      <P.Contains id="M-VGMDB-AL-21146" />
      <P.Contains id="M-VGMDB-AL-22848" />
      <P.Contains id="M-VGMDB-AR-8870" />
      <P.Contains id="A-MAL-5680" />
      <P.Contains id="A-MAL-7791" />
      <P.Contains id="A-MAL-9617" />
      {/* Kinda comfy. But not that much. */}
      <P.NEI base={0.5} emotions="MP">
        <P.Contributor id="A-MAL-5680" factor={0.4} />
        <P.Contributor id="A-MAL-7791" factor={0.4} />
        <P.Contributor id="A-MAL-9617" factor={0.2} />
      </P.NEI>
      {/* humor */}
      <P.NEI base={0.25} emotions="AP">
        <P.Contributor id="A-MAL-5680" factor={0.4} />
        <P.Contributor id="A-MAL-7791" factor={0.4} />
        <P.Contributor id="A-MAL-9617" factor={0.2} />
      </P.NEI>
      <P.Meme strength={0.5} length={120}>
        <P.Contributor id="A-MAL-5680" factor={0.35} />
        <P.Contributor id="A-MAL-7791" factor={0.35} />
        <P.Contributor id="A-MAL-9617" factor={0.15} />
        <P.Contributor id="A-MAL-32281" factor={0.15} />
      </P.Meme>
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-20118" title="Utauyo!!MIRACLE / HO-KAGO TEA TIME">
      <P.Contains id="M-VGMDB-AL-20118-2" />
      <P.Visual type="albumArt" base={0.65} unique={0.2} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-20118-2" title="Kirakira Days">
      <P.MusicConsumedProgress length="3:40" />
      {/* binfy's favorite osu! beatmap + sotarks made a map for him XDDDDD */}
      <P.Meme strength={0.1} length={6} />
      <P.Music base={0.36} />
      <P.Role id="M-VGMDB-AR-8870" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-21146"
      title="HO-KAGO TEA TIME Second / HO-KAGO TEA TIME"
    >
      <P.Contains id="M-VGMDB-AL-21146-9" />
      <P.Visual type="albumArt" base={0.65} unique={0.2} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-21146-9" title="Tenshi ni Fureta yo!">
      <P.MusicConsumedProgress length="4:42" />
      <P.Music base={0.13} />
      <P.Role id="M-VGMDB-AR-8870" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-22848"
      title="Gohan wa Okazu/U&I / HO-KAGO TEA TIME"
    >
      <P.Contains id="M-VGMDB-AL-22848-2" />
      <P.Visual type="albumArt" base={0.65} unique={0.2} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-22848-2" title="U&I">
      <P.MusicConsumedProgress length="4:36" />
      <P.Music base={0.18} />
      <P.Role id="M-VGMDB-AR-8870" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-8870" title="HO-KAGO TEA TIME" />
    <P.Entry id="A-MAL-5680" title="K-On!">
      <P.Source adb={5680} ks={4240} al={5680} mal={5680} />
      <P.BestGirl name="Azusa Nakano" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.6} episodes={12} />
      <P.Visual type="animated" base={0.65} unique={0.2} />
      <P.Writing character={0.4} story={0.5} pacing={0.8} originality={0.8} />
    </P.Entry>
    <P.Entry id="A-MAL-7791" title="K-On!!">
      <P.Source adb={7791} ks={5124} al={7791} mal={7791} />
      <P.BestGirl name="Azusa Nakano" />
      <P.AnimeConsumedProgress status="Completed" boredom={0.6} episodes={26} />
      <P.FeatureMusic id="M-VGMDB-AL-21146-9" />
      <P.FeatureMusic id="M-VGMDB-AL-22848-2" />
      <P.Visual type="animated" base={0.65} unique={0.2} />
      <P.Writing character={0.4} story={0.5} pacing={0.8} originality={0.7} />
    </P.Entry>
    <P.Entry id="A-MAL-9617" title="K-On! Movie">
      <P.Source adb={9617} ks={5810} al={9617} mal={9617} />
      <P.BestGirl name="Azusa Nakano" />
      <P.AnimeConsumedProgress
        status="Completed"
        boredom={0.85}
        episodes={1}
        episodeDuration="1:50:00"
      />
      <P.FeatureMusic id="M-VGMDB-AL-21146-9" />
      <P.Visual type="animated" base={0.65} unique={0.2} />
      <P.Writing character={0.4} story={0.5} pacing={0.8} originality={0.7} />
    </P.Entry>
  </P.Document>
);
