/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* le meme artist (kano) has a very distinctive voice, */}
    {/* making her literally the best singer in j-pop */}
    {/* her voice are soft and loli-like, but it can also */}
    {/* convey a lot of emotions */}
    {/* which is what a "kano impact" is */}
    {/* (it was represented as an NEI/AEI) */}
    {/* (but "kano impact" is not unique for kano, like */}
    {/* other vocalists like... idk maybe only nayuta? */}
    {/* can do the same shit without being given EIs) */}
    <P.Entry id="M-VGMDB-AR-11666" title="Kano">
      {/* the collapse of isoc sadge */}
      <P.Meme strength={0.75} from="2021-02-16" to="2021-04-01" />
      {/* there should be a tiny 0.1 factor for the sns manager and stuff idk */}
      <P.Contains id="M-20230524T223250" factor={1 / 4} />
    </P.Entry>
    <P.Entry
      id="M-20221202T204728"
      title="Sukisuki Zecchoushou"
      entrytype="MusicTrack"
    >
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Music base={0.4} />
      <P.OsuSong personal={0.6} community={0.4} />
      {/* Length source: https://osu.ppy.sh/beatmapsets/484532 */}
      <P.MusicConsumedProgress length="3:33" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-20221202T203758"
      title="Sayonara, Adam to Eve"
      entrytype="MusicTrack"
    >
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Music base={0.51} />
      <P.OsuSong personal={0.7} community={0} />
      {/* Length source: https://osu.ppy.sh/beatmapsets/981282 */}
      <P.MusicConsumedProgress length="4:17" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-20221202T202421"
      title="Natsu no Owari, Koi no Hajimari (Kano)"
      entrytype="MusicTrack"
    >
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Music base={0.58} />
      <P.OsuSong personal={0} community={0} />
      {/* Length source: https://www.youtube.com/watch?v=j4LoBrhN5rM */}
      <P.MusicConsumedProgress length="4:08" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    {/* after this (sukinano), almost all of kano's songs suck */}
    {/* (if kano sees this pls keep going on the */}
    {/* path you've chosen, don't mind me) */}
    {/* btw kano 2023 exists so she has even more reasons to */}
    {/* ditch neo-pop xddddddddd */}
    {/* oh except for this, i forgor */}
    <P.Entry
      id="M-20220317T064137-5"
      title="Sore wa Kitto Natsudatta"
      entrytype="MusicTrack"
    >
      <P.Visual type="animatedMV" base={0.35} unique={0.7} />
      {/* 210 bpm spaced bursts */}
      <P.OsuSong personal={0.5} community={0} />
      {/* Length source: https://www.youtube.com/watch?v=ZkDEkUf6jlg */}
      <P.Music base={0.46} />
      <P.MusicConsumedProgress length="3:29" generatedBy="user" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-20230626T223045"
      title="Ai Kotoba III (Kano ver.)"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=ui_D-twaXlc",
          },
        ]}
      />
      <P.MusicConsumedProgress length="4:26" />
      <P.Music base={0.4} />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    {/* colorful wonder note is an irojiro album */}
    {/* so basically kano has zero image (like kano 2023 in vivid lila albums) */}
    <P.Entry
      id="M-20220130T032649"
      title="Kimiiro Hanabi -album version-"
      entrytype="MusicTrack"
    >
      {/* from the album "Colorful Wonder Note", track number 8 */}
      {/* and yes this is from osugame too */}
      {/* Length source: https://osu.ppy.sh/beatmapsets/514772#osu/1093352 */}
      <P.Music base={0.6} />
      <P.MusicConsumedProgress length="4:19" generatedBy="user" />
      <P.NEI base={0.5} emotions="CP" />
      {/* I HATE HIMENO SENA */}
      {/* I HATE HIMENO SENA */}
      {/* I HATE HIMENO SENA */}
      {/* I HATE HIMENO SENA */}
      {/* I HATE HIMENO SENA */}
      {/* https://github.com/ngoduyanh/nrs-impl-kt/discussions/298#discussioncomment-4410011 */}
      {/* TODO: manual port — ref "KoikakeCry" uses <script>:
<ref name="KoikakeCry" a_contribution="0.7" a_emotions="CU" />
*/}
      <P.Role id="M-VGMDB-AR-11666" roles="vocal" />
    </P.Entry>
    {/* 15 extra days for hanayori ig */}
    <P.Meme strength={0.85} from="2020-11-01" to="2021-02-15">
      <P.Contributor id="M-VGMDB-AR-11666" factor={0.8} />
      <P.Contributor id="M-20230524T223250" factor={0.2} />
    </P.Meme>
    <P.Entry id="M-VGMDB-AL-95369" title="Bambino / Kano">
      <P.Contains id="M-VGMDB-AL-95369-1" />
      <P.Visual type="albumArt" base={0.2} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-95369-1" title="ハロ/ハワユ">
      <P.MusicConsumedProgress length="4:48" />
      <P.Music base={0.24} />
      <P.Remix id="M-VGMDB-AL-37130-1" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-34411" title="Aimai Bambina / Kano">
      <P.Contains id="M-VGMDB-AL-34411-6" />
      <P.Contains id="M-VGMDB-AL-34411-11" />
      <P.Visual type="albumArt" base={0.35} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-34411-6" title="インタビュア">
      <P.MusicConsumedProgress length="4:27" />
      <P.Music base={0.44} />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-34411-11" title="アイロニ">
      <P.MusicConsumedProgress length="4:10" />
      <P.Music base={0.19} />
      <P.Role id="M-VGMDB-AR-15119" roles="inst+lyrics" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-42961" title="Aru Machi no Hakuchuumu / Kano">
      <P.Contains id="M-VGMDB-AL-42961-6" />
      <P.Contains id="M-VGMDB-AL-42961-9" />
      <P.Visual type="albumArt" base={0.25} unique={0.5} />
      {/* description = "Romantic name" (romance as in RFP, not chu chu <3) */}
      {/* kano 2023 have a gazillion albums with romantic af names */}
      {/* like "Your voice in the sky", "A song that spells out memories for you." */}
      {/* Azure Reunion lyrics, etc. etc. ("sến mẹ sến con") */}
      {/* <regularImpact>
            <score>
                <component value="0.1" factor="Art.Language" />
            </score>
        </regularImpact> */}
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-42961-6" title="メリーメリー álbum ver.">
      <P.MusicConsumedProgress length="4:35" />
      <P.Music base={0.44} />
      {/* song with solid emotional impacts are buffed */}
      {/* so it's fair as fuck please stfu */}
      <P.NEI base={0.8} emotions="MP-0.7:CP-0.3" />
      {/* sanada sb69 song momento */}
      <P.AEI base={0.2} emotions="CU" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-42961-9" title="World on Color">
      <P.MusicConsumedProgress length="4:39" />
      <P.Music base={0.53} />
      {/* ADA bullshitery idk */}
      <P.NEI base={0.5} emotions="MP" />
      <P.OsuSong personal={0.1} community={0} />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-49423" title="Good Hello / Kano">
      <P.Contains id="M-VGMDB-AL-49423-1" />
      <P.Contains id="M-VGMDB-AL-49423-8" />
      <P.Visual type="albumArt" base={0.55} unique={0.45} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-49423-1" title="グッドナイトエヴリワン">
      <P.MusicConsumedProgress length="5:49" />
      <P.Music base={0.47} />
      {/* ADA */}
      <P.AEI base={0.5} emotions="MU-0.2:CU-0.8" />
      <P.Role id="M-VGMDB-AR-25289" roles="inst+lyrics" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-49423-8" title="decide">
      <P.MusicConsumedProgress length="5:54" />
      <P.Music base={0.24} />
      <P.Role id="M-VGMDB-AR-15120" roles="inst+lyrics" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-51254" title="Stella-rium / Kano">
      <P.Contains id="M-VGMDB-AL-51254-1" />
      <P.Visual type="albumArt" base={0.5} unique={0.4} />
      <P.Visual type="semiAnimatedMV" base={0.5} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-51254-1" title="Stella-rium">
      <P.MusicConsumedProgress length="4:08" />
      <P.Music base={0.46} />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-54307" title="Dear Brave / Kano">
      <P.Contains id="M-VGMDB-AL-54307-1" />
      <P.Visual type="albumArt" base={0.2} unique={0.6} />
      <P.Visual type="animatedMV" base={0.6} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-54307-1" title="ディアブレイブ">
      <P.MusicConsumedProgress length="4:19" />
      <P.Music base={0.46} />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-57564" title="nowhere / Kano">
      <P.Contains id="M-VGMDB-AL-57564-1" />
      <P.Contains id="M-VGMDB-AL-57564-7" />
      <P.Visual type="albumArt" base={0.4} unique={0.5} />
      <P.Contains id="M-VGMDB-AL-51254-1" />
      <P.Contains id="M-VGMDB-AL-54307-1" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-57564-1" title="Prima Stella">
      <P.MusicConsumedProgress length="4:26" />
      <P.Visual type="semiAnimatedMV" base={0.5} unique={0.3} />
      <P.Music base={0.46} />
      {/* stfu */}
      <P.NEI base={0.3} emotions="CU" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-57564-7" title="Walk This Way!">
      <P.MusicConsumedProgress length="4:08" />
      <P.Music base={0.36} />
      <P.OsuSong personal={0.6} community={0.3} />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-73516" title="one / Kano">
      <P.Visual type="albumArt" base={0.4} unique={0.5} />
      <P.Contains id="M-VGMDB-AL-34411-11" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-89290" title="three / Kano">
      <P.Contains id="M-VGMDB-AL-89290-6" />
      <P.Visual type="albumArt" base={0.4} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-89290-6" title="地球最後の告白を">
      {/* https://www.youtube.com/watch?v=paVYNlZ5Xuk */}
      <P.MusicConsumedProgress length="4:33" generatedBy="user" />
      <P.Music base={0.34} />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-37130" title="Suki na no. / Kano">
      <P.Contains id="M-VGMDB-AL-37130-1" />
      <P.Contains id="M-VGMDB-AL-37130-2" />
      <P.Contains id="M-VGMDB-AL-37130-3" />
      <P.Contains id="M-VGMDB-AL-37130-4" />
      <P.Contains id="M-VGMDB-AL-37130-5" />
      <P.Contains id="M-VGMDB-AL-37130-6" />
      {/* the best album of all time */}
      {/* (after that pesky thoughtcrime unfunny sanada masterpiece) */}
      {/* literally the perfect combination of vocal and instrumental */}
      {/* the album art is kano sitting with some animals */}
      {/* which is MP-based, and it's a pretty good contrast to */}
      {/* some songs from the album (like it's not world's end */}
      {/* or sakura no zenya), which are CU-based. */}
      <P.Visual type="albumArt" base={0.4} unique={0.7} />
      <P.NEI base={0.2} emotions="MP-0.6:CU-0.4" />
      {/* crossfade thing: https://www.nicovideo.jp/watch/sm19702966 */}
      <P.Visual type="animatedMV" base={0.3} unique={0.65} />
      {/* the best kano song ever. period. */}
      {/* also the fourth ayumu-era theme song */}
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-37130-1" title="ハロ/ハワユ">
      <P.MusicConsumedProgress length="4:50" />
      {/* the original MV is for the mix version */}
      {/* https://www.nicovideo.jp/watch/sm19687208 */}
      <P.Visual type="semiAnimatedMV" base={0.35} unique={0.6} />
      <P.Music base={0.29} />
      <P.Role id="M-VGMDB-AR-25289" roles="compose+lyrics" />
      <P.Role id="M-VGMDB-AR-15119" roles="arrange" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-37130-2" title="うたうたいのうた">
      <P.MusicConsumedProgress length="4:39" />
      <P.Music base={0.69} />
      <P.NEI base={0.6} emotions="MP" />
      <P.Role id="M-VGMDB-AR-25289" roles="compose+lyrics" />
      <P.Role id="M-VGMDB-AR-15119" roles="arrange" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-37130-3" title="[It's not] World's end">
      <P.MusicConsumedProgress length="5:36" />
      <P.Music base={0.43} />
      <P.AEI base={0.2} emotions="CU" />
      {/* TODO: manual port — ref "KoikakeNEI" uses <script>:
<ref name="KoikakeNEI" a_base="0.4" a_contribution="0.7" a_emotions="CU-0.8:MP-0.2" />
*/}
      <P.Role id="M-VGMDB-AR-25289" roles="compose+lyrics" />
      <P.Role id="M-VGMDB-AR-15119" roles="arrange" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-37130-4" title="「ねぇ。」">
      <P.MusicConsumedProgress length="6:23" />
      <P.Music base={0.24} />
      <P.Role id="M-VGMDB-AR-25289" roles="compose+lyrics" />
      <P.Role id="M-VGMDB-AR-15120" roles="arrange" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-37130-5" title="朝焼け、君の唄。">
      <P.MusicConsumedProgress length="5:08" />
      <P.Music base={0.24} />
      <P.Role id="M-VGMDB-AR-25289" roles="compose+lyrics" />
      <P.Role id="M-VGMDB-AR-15120" roles="arrange" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-37130-6" title="サクラノ前夜">
      <P.MusicConsumedProgress length="6:00" />
      <P.Visual type="animatedMV" base={0.35} unique={0.6} />
      <P.Music base={0.63} />
      <P.NEI base={0.25} emotions="CU" />
      {/* TODO: manual port — ref "KoikakeNEI" uses <script>:
<ref name="KoikakeNEI" a_base="0.5" a_contribution="0.8" a_emotions="CU-0.5:MP-0.4:CP-0.1" />
*/}
      <P.Role id="M-VGMDB-AR-25289" roles="compose+lyrics" />
      <P.Role id="M-VGMDB-AR-15120" roles="arrange" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-20240314T135200"
      title="Seija No Koushin Special Edition"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20240314T135200-3" />
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_npib7bchhSDl8JVzAJxGMwuoAEg__nYx0",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.2} unique={0.2} />
      {/* the good old days... */}
    </P.Entry>
    <P.Entry id="M-20240314T135200-3" title="Sakura no Zenya">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=umovR0PKhSA",
          },
        ]}
      />
      <P.Music base={0.65} />
      <P.MusicConsumedProgress length="6:04" />
    </P.Entry>
    {/* too real */}
    <P.Entry id="M-20240730T201735" title="Fansa" entrytype="MusicTrack">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=GZVAnPZ2znE",
          },
        ]}
      />
      {/* idk if the cg stuff is included but whatever */}
      <P.Visual type="rpg3dGame" base={0.4} unique={0.2} />
      <P.Music base={0.6} />
      <P.MusicConsumedProgress length="4:05" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-56257" title="Merry / Kano">
      <P.Contains id="M-VGMDB-AL-56257-1" />
      <P.Source
        urls={[{ name: "vgmdb", src: "https://vgmdb.net/album/56257" }]}
      />
      <P.Visual type="albumArt" base={0.6} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-56257-1" title="Platonic Love">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=cBxrkElBhBs",
          },
        ]}
      />
      <P.MusicConsumedProgress length="3:37" />
      <P.Music base={0.7} />
      <P.Remix id="M-20240821T213821-2" />
      <P.Role id="M-VGMDB-AR-11666" roles="vocal" />
    </P.Entry>
  </P.Document>
);
