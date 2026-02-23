/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* limit tanuki LMFAOOOOOOOO */}
    <P.Entry id="O-20230203T141812" title="The Bird">
      <P.BestGirl name="Procellariiformes" />
      <P.Meme strength={0.3} from="2023-01-01" to="2023-04-01" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-101608"
      title="Bokura dake no Shudaika / Centimillimental"
    >
      <P.Contains id="M-VGMDB-AL-101608-1" />
      <P.Visual type="albumArt" base={0.1} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-101608-1" title=" 僕らだけの主題歌">
      <P.MusicConsumedProgress length="5:21" />
      <P.Music base={0.44} />
    </P.Entry>
    {/* le bird meme */}
    {/* new bird lore just dropped */}
    {/* banger plot twist character development */}
    {/* BOWIR VIF NGWOIF LAF CON CHIM */}
    {/* LAF LOAIF CHIM MOMX NHAATS NHAAN GIAN */}
    {/* DUF BAOX TOOS DDAU THWONG NGWOIF VAANX TIN */}
    {/* THEES GIOIWS MAI SAU TOAR SANGS LUNG LINH */}
    <P.Meme strength={0.4} from="2023-04-13" to="2023-05-11">
      <P.Contributor id="V-VNDB-17516" factor={0.6} />
      <P.Contributor id="M-VGMDB-AL-101608-1" factor={0.1} />
      <P.Contributor id="O-20230203T141812" factor={0.3} />
    </P.Meme>
  </P.Document>
);
