/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry
      id="F-VGMDB-3274"
      title="Yahari Ore no Seishun Love Comedy wa Machigatteiru."
    >
      <P.Contains id="M-VGMDB-AL-37999" />
      <P.Contains id="M-VGMDB-AL-51394" />
      <P.Contains id="M-VGMDB-AL-96290" />
      <P.Contains id="A-MAL-14813" />
      <P.Contains id="A-MAL-23847" />
      <P.Contains id="A-MAL-39547" />
      <P.Contains id="M-VGMDB-AL-37932-1" />
      <P.Contains id="M-VGMDB-AL-51516-1" />
      <P.Contains id="M-VGMDB-AL-96288-1" />
      {/* The Yui Depression, when I realize that the VSCC */}
      {/* (Volunteer Service Club Compoly) is not as good as */}
      {/* I thought to be. */}
      {/* Read here for more details: */}
      {/* http://yaharianalysis.x10host.com/ */}
      {/* (esp. http://yaharianalysis.x10host.com/parts/Yui/index.php) */}
      <P.MaxAEIPADS length={5} emotions="CU">
        <P.Contributor id="M-VGMDB-AL-51394-3" factor={0.05} />
        <P.Contributor id="M-VGMDB-AL-37999-2" factor={0.05} />
        <P.Contributor id="A-MAL-14813" factor={0.1} />
        <P.Contributor id="A-MAL-23847" factor={0.8} />
      </P.MaxAEIPADS>
      {/* Hikism-Yukism */}
      <P.Politics>
        <P.Contributor id="A-MAL-14813" factor={0.6} />
        <P.Contributor id="A-MAL-23847" factor={0.4} />
      </P.Politics>
      {/* 2019-07-14 is the July 14th incident */}
      <P.Meme strength={0.7} from="2019-07-14" to="2020-01-01">
        <P.Contributor id="A-MAL-14813" factor={0.4} />
        <P.Contributor id="A-MAL-23847" factor={0.6} />
      </P.Meme>
      {/* VSCC is pretty comfy (before Yui Depression) */}
      <P.NEI base={0.6} emotions="MP">
        <P.Contributor id="A-MAL-14813" factor={0.3} />
        <P.Contributor id="A-MAL-23847" factor={0.7} />
      </P.NEI>
      {/* https://github.com/ngoduyanh/nrs-impl-kt/issues/285 */}
      {/* tldr */}
      {/* yui was gonna be waifu but yui depression etc etc */}
      <P.Waifu waifu="Yui Yuigahama" length={30}>
        <P.Contributor id="A-MAL-14813" factor={0.1} />
        <P.Contributor id="A-MAL-23847" factor={0.9} />
      </P.Waifu>
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-37999"
      title="Hello Alone / Yukino Yukinoshita (CV.Saori Hayami) & Yui Yuigahama (CV.Nao Toyama)"
    >
      <P.Contains id="M-VGMDB-AL-37999-1" />
      <P.Contains id="M-VGMDB-AL-37999-2" />
      <P.Visual type="albumArt" base={0.3} unique={0.5} />
      <P.Music base={0.3}>
        <P.Contributor id="M-VGMDB-AL-37999-1" factor={0.5} />
        <P.Contributor id="M-VGMDB-AL-37999-2" factor={0.5} />
      </P.Music>
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-37999-1" title="Hello Alone">
      <P.MusicConsumedProgress length="4:39" />
      <P.Role id="M-VGMDB-AR-6876" roles="vocal/2+image_feat/2" />
      <P.Role id="M-VGMDB-AR-11436" roles="vocal/2+image_feat/2" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-37999-2" title="Hello Alone -Yui Ballade-">
      <P.MusicConsumedProgress length="4:53" />
      <P.Role id="M-VGMDB-AR-11436" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-51394"
      title="Everyday World / Yukino Yukinoshita (CV.Saori Hayami) & Yui Yuigahama (CV.Nao Toyama)"
    >
      <P.Contains id="M-VGMDB-AL-51394-1" />
      <P.Contains id="M-VGMDB-AL-51394-3" />
      <P.Visual type="albumArt" base={0.4} unique={0.25} />
      <P.Music base={0.35}>
        <P.Contributor id="M-VGMDB-AL-51394-1" factor={0.5} />
        <P.Contributor id="M-VGMDB-AL-51394-3" factor={0.5} />
      </P.Music>
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-51394-1" title="エブリデイワールド">
      <P.MusicConsumedProgress length="4:22" />
      <P.Role id="M-VGMDB-AR-6876" roles="vocal/2+image_feat/2" />
      <P.Role id="M-VGMDB-AR-11436" roles="vocal/2+image_feat/2" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-51394-3"
      title=" Everyday World -Ballade Arrange- Yui Solo Ver."
    >
      <P.MusicConsumedProgress length="5:29" />
      <P.Role id="M-VGMDB-AR-11436" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-96290"
      title="Diamond no Jundo / Yukino Yukinoshita (CV: Saori Hayami) & Yui Yuigahama (CV: Nao Toyama)"
    >
      <P.Contains id="M-VGMDB-AL-96290-1" />
      <P.Visual type="albumArt" base={0.4} unique={0.25} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-96290-1" title="Diamond no Jundo">
      <P.MusicConsumedProgress length="3:27" />
      <P.Music base={0.26} />
      <P.Role id="M-VGMDB-AR-6876" roles="vocal/2+image_feat/2" />
      <P.Role id="M-VGMDB-AR-11436" roles="vocal/2+image_feat/2" />
    </P.Entry>
    <P.Entry
      id="A-MAL-14813"
      title="Yahari Ore no Seishun Love Comedy wa Machigatteiru."
    >
      <P.Source adb={14813} ks={7169} al={14813} mal={14813} />
      {/* Brain's Base drew Yukino better than Yui */}
      <P.BestGirl name="Yukino Yukinoshita" />
      <P.Visual type="animated" base={0.25} unique={0.4} />
      <P.NEI base={0.75} emotions="AP" />
      <P.FeatureMusic id="M-VGMDB-AL-37932-1" />
      <P.FeatureMusic id="M-VGMDB-AL-37999" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.Writing character={0.8} story={0.5} pacing={0.8} originality={0.8} />
    </P.Entry>
    <P.Entry
      id="A-MAL-23847"
      title="Yahari Ore no Seishun Love Comedy wa Machigatteiru. Zoku"
    >
      <P.Source adb={23847} ks={8478} al={20698} mal={23847} />
      {/* feel. drew Yui better */}
      <P.BestGirl name="Yui Yuigahama" />
      <P.Visual type="animated" base={0.4} unique={0.25} />
      <P.NEI base={0.25} emotions="AP" />
      {/* Oregairu S2 has a lot of drama that I don't even */}
      {/* understand. But it's pretty good ngl. */}
      {/* (basically atmospheric-CU farm) */}
      <P.AEI base={0.9} emotions="CU" />
      <P.FeatureMusic id="M-VGMDB-AL-51516-1" />
      <P.FeatureMusic id="M-VGMDB-AL-51394-1" />
      <P.FeatureMusic id="M-VGMDB-AL-51394-3" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.Writing character={0.8} story={0.5} pacing={0.7} originality={0.7} />
    </P.Entry>
    <P.Entry
      id="A-MAL-39547"
      title="Yahari Ore no Seishun Love Comedy wa Machigatteiru. Kan"
    >
      <P.Source adb={39547} ks={42194} al={108489} mal={39547} />
      <P.BestGirl name="Yui Yuigahama" />
      {/* seasonal = true */}
      <P.Visual type="animated" base={0.4} unique={0.25} />
      <P.Meme strength={0.2} length={2} />
      {/* Yui dead people arc was kinda good */}
      {/* but Oregairu is just dead */}
      {/* you can't do much about it */}
      <P.AEI base={0.4} emotions="CU" />
      <P.NEI base={0.1} emotions="AP" />
      {/* killed by lapis re lights lmao xd */}
      <P.KilledBy id="A-MAL-37587" potential={0.75} effect={0.5} />
      <P.FeatureMusic id="M-VGMDB-AL-96288-1" />
      <P.FeatureMusic id="M-VGMDB-AL-96290-1" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={12} />
      <P.Writing character={0.8} story={0.5} pacing={0.7} originality={0.8} />
    </P.Entry>
  </P.Document>
);
