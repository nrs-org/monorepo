/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* (1) - - - - - - - (2) */}
    {/* (1)        (1)       (1) */}
    {/* \        |        / */}
    {/* \       |       / */}
    {/* \      |      / */}
    {/* (2)   (2)   (2) */}
    <P.Entry id="F-VGMDB-6434" title="OneRoom">
      <P.Contains id="M-VGMDB-AL-63666" />
      <P.Contains id="A-MAL-34392" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-63666"
      title="harumachi clover / Yui Hanasaka (CV: M·A·O)"
    >
      <P.Contains id="M-VGMDB-AL-63666-1" />
      <P.Visual type="albumArt" base={0.5} unique={0.25} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-63666-1" title="Harumachi Clover">
      <P.MusicConsumedProgress length="4:06" />
      {/* ME NO MAE NO TOBIRA O AKETARA HARU KAZE */}
      {/* TORI TACHI MO KIGI DE MACHIAWASE */}
      {/* KIMI E MUKAU SHINGOU AOZORA IRO */}
      {/* KAKE DAZEBA II */}
      {/* USOTSUKI KAKURITSU RON TOKA */}
      {/* ICHI PURASU ICHI GA MUGEN TOKA */}
      {/* OSHIETE KURETA KIMI TO SAGASHI NI YUKOU */}
      {/* H A R U M A C H I   K U R O B A A A */}
      <P.Music base={0.46} />
      <P.OsuSong personal={0.6} community={0.8} />
      <P.Remix id="M-20220130T185336-2" />
      <P.Role id="M-VGMDB-AR-15350" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="A-MAL-34392" title="One Room">
      <P.Source adb={34392} ks={12758} al={97857} mal={34392} />
      <P.BestGirl name="Yui Hanasaka" />
      {/* seasonal = true */}
      <P.AnimeConsumedProgress
        status="Abandoned"
        boredom={0.8}
        episodes={4}
        episodeDuration="4:00"
      />
      <P.Dropped />
      <P.Visual type="animated" base={0.5} unique={0.25} />
      <P.FeatureMusic id="M-VGMDB-AL-63666-1" />
      <P.Writing character={0.1} story={0.1} pacing={0.8} originality={0.8} />
    </P.Entry>
    <P.Entry
      id="M-20220130T185336-2"
      title="Harumachi Clover (Swing Arrangement) [Dictate Edit]"
    >
      {/* Length source: https://www.youtube.com/watch?v=2OfJYisHbkI */}
      <P.Music base={0.38} />
      <P.MusicConsumedProgress length="0:36" generatedBy="user" />
      <P.OsuSong personal={0.6} community={0.8} />
      <P.Role id="M-20220130T185336-1" roles="vocal" />
    </P.Entry>
  </P.Document>
);
