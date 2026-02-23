/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry
      id="F-VGMDB-10188"
      title="Project SEKAI COLORFUL STAGE! feat. Hatsune Miku"
    >
      <P.Contains id="G-VGMDB-10188" />
      <P.Contains id="M-VGMDB-AL-110345" />
      <P.Contains id="M-20241202T141801" />
    </P.Entry>
    <P.Entry
      id="G-VGMDB-10188"
      title="Project SEKAI COLORFUL STAGE! feat. Hatsune Miku"
    >
      {/* she literally has 'hina' in her name */}
      {/* the glazing is crazy with this one */}
      {/* the "come here mafuyu-chan" shit is wild xdd */}
      {/* yapper truly revolutionized the sadgirl economy */}
      <P.BestGirl name="Mafuyu Asahina" />
      <P.Meme from="2024-10-10" to="2025-01-01" strength={0.75} />
      <P.Visual type="gachaCardArt" base={0.5} unique={0.2} />
      <P.ConsumedProgress
        status="Consuming"
        boredom={0.9}
        duration="10:00:00"
      />
      <P.Writing character={0.7} story={0.6} pacing={0.5} originality={0.2} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-110345" title="needLe/Stella / Leo/need">
      <P.Contains id="M-VGMDB-AL-110345-2" />
      <P.Visual type="albumArt" base={0.5} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-110345-2" title="Stella">
      <P.Visual type="animatedMV" base={0.4} unique={0.6} />
      <P.MusicConsumedProgress length="5:25" />
      <P.Music base={0.7} />
      <P.Remix id="M-20241202T142410-1" />
    </P.Entry>
    <P.Entry id="M-20241202T141801" title="Teammate" entrytype="MusicTrack">
      <P.Visual type="animatedMV" base={0.5} unique={0.4} />
      <P.Role id="M-VGMDB-AR-14655" roles="prod+image_feat" />
      <P.MusicConsumedProgress length="4:26" />
      <P.Music base={0.65} />
      <P.Remix id="M-20241202T142410-2" />
    </P.Entry>
  </P.Document>
);
