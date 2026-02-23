/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-7175" title="Midara na Ao-chan wa Benkyou ga Dekinai">
      <P.Contains id="A-MAL-38778" />
      <P.Contains id="M-VGMDB-AL-85759" />
    </P.Entry>
    <P.Entry id="A-MAL-38778" title="Midara na Ao-chan wa Benkyou ga Dekinai">
      <P.Source adb={38778} ks={42024} al={105989} mal={38778} />
      <P.BestGirl name="Ao Horie" />
      <P.AnimeConsumedProgress status="Abandoned" boredom={0.7} episodes={3} />
      <P.Dropped />
      <P.Visual type="animatedShort" base={0.6} unique={0.4} />
      <P.FeatureMusic id="M-VGMDB-AL-85759-1" />
      <P.Writing character={0.2} story={0.2} pacing={0.5} originality={0.8} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-85759" title="WONDERFUL WONDER / EDOGA-SULLIVAN">
      <P.Contains id="M-VGMDB-AL-85759-1" />
      <P.Visual type="albumArt" base={0.6} unique={0.4} />
      {/* simple heart dt */}
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-85759-1" title="WONDERFUL WONDER">
      <P.MusicConsumedProgress length="3:03" />
      <P.Music base={0.23} />
      <P.OsuSong personal={0.4} community={0.2} />
    </P.Entry>
  </P.Document>
);
