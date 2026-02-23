/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-3345" title="Shigatsu wa Kimi no Uso">
      <P.Contains id="A-MAL-23273" />
      <P.Contains id="M-VGMDB-AL-49046" />
    </P.Entry>
    <P.Entry id="A-MAL-23273" title="Shigatsu wa Kimi no Uso">
      <P.Source adb={23273} ks={8403} al={20665} mal={23273} />
      <P.BestGirl name="Kaori Miyazono" />
      {/* YLIA is watched during the SLN days (Second-Love-Ngoc era), */}
      {/* this has lead to the connection between myself and the */}
      {/* characters. */}
      {/* This is why this anime is so sad that it achieve the maximum */}
      {/* score for an impact (weighted ofc) */}
      <P.CryPADS length={7} emotions="CU" />
      {/* The character development of Kousei Arima is connected to the */}
      {/* Personality Revolution (a result of SLN). This is why I also */}
      {/* feel hype when stuff happens. And I cried to that. */}
      {/* No PADS since it's overshadowed by the sad impact. */}
      <P.Cry emotions="CP" />
      {/* Also the anime itself without these historical events are still */}
      {/* very good. It's not just lucky */}
      {/* no memes because SLN era has no memes */}
      {/* it's just lIeN qUAn mOBiLe and dumb trendy shit */}
      <P.FeatureMusic id="M-VGMDB-AL-49046-1" />
      <P.FeatureMusic id="M-VGMDB-AL-49046-18" />
      <P.Visual type="animated" base={0.3} unique={0.5} />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={22} />
      <P.Writing character={0.6} story={0.6} pacing={0.8} originality={0.9} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-49046"
      title="Shigatsu wa Kimi no Uso ORIGINAL SONG & SOUNDTRACK"
    >
      <P.Contains id="M-VGMDB-AL-49046-1" />
      <P.Contains id="M-VGMDB-AL-49046-18" />
      <P.Visual type="albumArt" base={0.4} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-49046-1" title="Kimi wa Wasurerareru no">
      <P.MusicConsumedProgress length="1:34" />
      <P.Music base={0.38} />
      <P.AEI base={0.5} emotions="CU" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-49046-18"
      title="Yuujin A-kun wo Watashi no Bansousha ni Ninmeishimasu"
    >
      <P.MusicConsumedProgress length="2:26" />
      <P.Music base={0.38} />
      <P.AEI base={0.5} emotions="CU" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-9069" title="Masaru Yokoyama">
      <P.Contains id="M-VGMDB-AL-49046" />
    </P.Entry>
  </P.Document>
);
