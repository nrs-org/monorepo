/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* not precisely just music artists, but i still use the `M` prefix */}
    <P.Entry
      id="M-20230524T223250"
      title="Hanayori Girls' Dormitory"
      entrytype="MusicArtist"
    >
      {/* 15 extra days for hanayori ig */}
      <P.Meme from="2020-11-01" to="2021-02-15" strength={0.85} />
      {/* the circle thing */}
      <P.Meme from="2023-05-15" to="today" strength={0.3} />
      {/* hanayori girls dorm */}
      <P.RegularImpact>
        <P.Score>
          <P.Component value={0.5} factor="Art.Language" />
        </P.Score>
      </P.RegularImpact>
      {/* idk but i had watched (more like listened lmfao) 10hr of this thing */}
      <P.Consumed boredom={0.9} length="10:00:00" />
    </P.Entry>
    <P.Entry
      id="M-20230524T223735"
      title="Koko kara, koko kara (Hanayori Girls' Dormitory cover)"
      entrytype="MusicTrack"
    >
      {/* Length source: https://www.youtube.com/watch?v=bYkZvLvsNlg */}
      <P.MusicConsumedProgress length="4:35" />
      <P.Music base={0.54} />
      {/* english socialism */}
      <P.NEI base={0.5} emotions="CU-0.75:CP-0.25" />
      {/* this was the first song i mapped on osugame btw */}
      {/* pretty iconic if you ask me */}
      <P.OsuSong personal={0.8} />
      {/* pretty cool MV too */}
      <P.Visual type="animatedMV" base={0.4} unique={0.75} />
      <P.Role id="M-20230524T223250" roles="vocal+image" />
    </P.Entry>
    {/* "hololiveshit" - L bozo rst fanboy */}
    <P.Entry id="F-20230618T115627" title="hololive">
      <P.Contains id="M-VGMDB-AR-35619" />
      <P.Contains id="M-20230618T131917" />
      <P.Contains id="M-20230618T132937" />
      <P.Contains id="M-VGMDB-AR-45538" />
      <P.Contains id="M-VGMDB-AR-35747" />
      <P.Contains id="M-VGMDB-AR-44889" />
      <P.Contains id="M-VGMDB-AR-68363" />
      <P.Contains id="M-20251125T015400" />
      <P.Contains id="M-20230730T110147" />
      <P.Contains id="M-20230730T110201" />
      <P.Contains id="M-20230804T134551" />
      <P.Contains id="M-20230804T134624" />
      <P.Contains id="M-VGMDB-AR-47736" />
      <P.Contains id="M-20240314T092654" />
      <P.Contains id="M-VGMDB-AR-46040" />
      <P.Contains id="M-20251125T020600" />
      <P.Contains id="M-20251125T021144" />
      {/* one of the Neo Ayumuian Legends */}
      {/* the inspiration in the midst of arc 3 despair */}
      {/* https://www.youtube.com/watch?v=lD8oL4CRu64 */}
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-35619" title="AZKi">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/artist/0HX3yJ7THlqC9drRqhOkgo",
          },
          { name: "twitter", src: "https://twitter.com/AZKi_VDiVA" },
          {
            name: "youtube",
            src: "https://www.youtube.com/channel/UC0TXe_LYZ4scaW2XMyi5_kw",
          },
        ]}
      />
    </P.Entry>
    <P.Entry
      id="M-20230618T131917"
      title="Fake.Fake.Fake"
      entrytype="MusicTrack"
    >
      <P.Contains id="M-20230618T131917-1" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/album/23zoXeOWwXDtosm0phAHJ5",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_nV5zleNnugLZZK59VS5Z5E4eKBEJ092ao",
          },
        ]}
      />
      <P.Visual type="animatedMV" base={0.4} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-20230618T131917-1" title="Fake.Fake.Fake">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/4Epr9cTESFAYvhv3FbwGvl",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=lGXgYHlR8ww",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=pfW3PytNhlo",
          },
        ]}
      />
      <P.Music base={0.65} />
      <P.MusicConsumedProgress length="3:50" />
      <P.Role id="M-VGMDB-AR-35619" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-20230618T132937"
      title="Asuiro ClearSky (AZKi ver.)"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=qyIequG7B_A",
          },
        ]}
      />
      <P.Music base={0.7} />
      <P.MusicConsumedProgress length="4:37" />
      <P.Role id="M-VGMDB-AR-35619" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-45538" title="Tokino Sora" />
    <P.Entry id="M-VGMDB-AR-35747" title="Sakura Miko" />
    <P.Entry id="M-VGMDB-AR-44889" title="Minato Aqua" />
    <P.Entry id="M-VGMDB-AR-68363" title="Nakiri Ayame" />
    <P.Entry
      id="M-20251125T015400"
      title="Tsunomaki Watame"
      entrytype="MusicArtist"
    />
    <P.Entry
      id="M-20230730T110147"
      title="Koseki Bijou"
      entrytype="MusicArtist"
    >
      <P.Source
        urls={[
          { name: "twitter", src: "https://twitter.com/kosekibijou" },
          { name: "youtube", src: "https://www.youtube.com/@KosekiBijou" },
        ]}
      />
      {/* Length source: */}
      {/* https://www.youtube.com/watch?v=rpAQib0T5v0: 45:26 */}
      {/* https://www.youtube.com/watch?v=T5qX3LMGFFA: 3:06:58 */}
      {/* https://www.youtube.com/watch?v=LglIMGCMrjs: 4:03:15 */}
      <P.ConsumedProgress status="Consuming" boredom={1} duration="7:55:39" />
      {/* my oshi frfr */}
      {/* see https://www.facebook.com/photo/?fbid=6378175832271871 */}
      {/* blame AOTP (basically neo-NAP) */}
      {/* oshi is classified as waifu in NRS */}
      <P.Waifu waifu="Koseki Bijou" from="2023-07-26" />
      {/* lmfao higher visual than himeno sena (not really) */}
      {/* this is for the model btw */}
      <P.Visual type="animatedGachaCardArt" base={1} unique={0.5} />
      {/* Neo-Ayumu-era Arc 3 */}
      <P.Meme from="2023-07-26" to="2023-11-27" strength={0.9}>
        <P.Contributor id="M-20230730T110147" factor={0.6} />
        <P.Contributor id="M-VGMDB-AR-6799" factor={0.3} />
        <P.Contributor id="M-VGMDB-AR-35619" factor={0.1} />
      </P.Meme>
      {/* her streams are funny af */}
      <P.NEI base={0.8} emotions="AP" />
      {/* pogpega the 3679054593th himeno sena 2023 */}
      {/* lmfao they turned the restaurant thingy into a political icon */}
      {/* lmfao she can do art and tech-savvy af truly a goat */}
      {/* rip she is now a progressive icon */}
      <P.AEI base={0.5} emotions="CP" />
      {/* the final exams PADS curse xddddddd */}
      {/* interrupted by an actual depression wtf */}
      {/* bay hoc bong roi xdddddddd */}
      {/* (let's go we are free from that univeristy shenanigans we can now */}
      {/* do colorist stuff (totally not coping)) */}
      <P.MaxAEIPADS emotions="MP" from="2023-08-02" to="2023-08-04">
        <P.Contributor id="M-20230730T110147" factor={0.9} />
        <P.Contributor id="M-20230804T134551" factor={0.05} />
        <P.Contributor id="M-20230804T134624" factor={0.05} />
      </P.MaxAEIPADS>
    </P.Entry>
    <P.Entry
      id="M-20230730T110201"
      title="Kyoumen no Nami (Koseki Bijou ver.)"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=Akn_Gdi05Ys",
          },
        ]}
      />
      <P.Visual type="animatedMV" base={0.5} unique={0.6} />
      <P.Music base={0.15} />
      <P.MusicConsumedProgress length="4:28" />
      <P.Role id="M-20230730T110147" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-20230804T134551"
      title="#あくあ色ぱれっと"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/1xFQ5lKWILBjqnyX4RgI8d",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=6bnaBnd4kyU",
          },
        ]}
      />
      <P.Music base={0.6} />
      <P.Visual type="semiAnimatedMV" base={0.5} unique={0.3} />
      <P.MusicConsumedProgress length="4:32" />
    </P.Entry>
    <P.Entry
      id="M-20230804T134624"
      title="aqua iro palette"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/0a33Bgu9o1KVq1BXiWpXKq",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=70YNtIPqCHg",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=HJ0Nhf9wiy8",
          },
        ]}
      />
      <P.Music base={0.6} />
      <P.MusicConsumedProgress length="4:30" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-47736" title="Hoshimachi Suisei" />
    <P.Entry
      id="M-20240314T092654"
      title="Still Still Stellar"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20240314T092654-1" />
      <P.Source
        urls={[
          { name: "linkfire", src: "https://cover.lnk.to/stillstillstellar" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/2HmlBFz06FldsdzwY1FHg4",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_mh_5nUKRnrxLoj2Y7wx2jGaCKZz0t2DU0",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.5} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-20240314T092654-1" title="Stellar Stellar">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/6OC9BOO9qGXQARZGWb8rqy",
          },
        ]}
      />
      <P.Music base={0.5} />
      <P.Role id="M-VGMDB-AR-47736" roles="vocal+image" />
      <P.MusicConsumedProgress length="5:01" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-46040" title="Shirakami Fubuki">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/artist/2GR0oaCTOgws9PfuheMw0k",
          },
          { name: "twitter", src: "https://x.com/shirakamifubuki" },
          { name: "youtube", src: "https://www.youtube.com/@ShirakamiFubuki" },
        ]}
      />
    </P.Entry>
    <P.Entry
      id="M-20251125T020600"
      title='FBKINGDOM "Blessing"'
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20251125T020600-14" />
      <P.Visual type="albumArt" base={0.25} unique={0.4} />
      {/* suicidio numero */}
    </P.Entry>
    <P.Entry id="M-20251125T020600-14" title="Glow Embrace">
      <P.Music base={0.8} />
      <P.Role id="M-VGMDB-AR-46040" roles="image+vocal" />
      <P.MusicConsumedProgress length="3:44" />
      <P.Remix id="M-20251125T020944-3" />
      <P.NEI base={0.3} emotions="CP" />
      <P.Visual type="animatedMV" base={0.5} unique={0.3} />
    </P.Entry>
    <P.Entry
      id="M-20251125T021144"
      title="Hop Step Sheep"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20251125T021144-1" />
      <P.Contains id="M-20251125T021144-2" />
      <P.Contains id="M-20251125T021144-3" />
      <P.Contains id="M-20251125T021144-6" />
    </P.Entry>
    <P.Entry id="M-20251125T021144-1" title="Beautiful Circle">
      <P.Music base={0.75} />
      <P.MusicConsumedProgress length="3:49" />
      <P.Role id="M-VGMDB-AR-46040" roles="image+vocal" />
      <P.NEI base={0.2} emotions="CP" />
    </P.Entry>
    <P.Entry id="M-20251125T021144-2" title="Kitto">
      <P.Music base={0.7} />
      <P.MusicConsumedProgress length="3:37" />
      <P.Role id="M-20251125T015400" roles="image+vocal" />
      <P.Remix id="M-20251125T020944-1" />
      {/* watch the live version guys */}
      <P.NEI base={0.4} emotions="CP" />
    </P.Entry>
    <P.Entry id="M-20251125T021144-3" title="Fins">
      <P.Music base={0.8} />
      <P.MusicConsumedProgress length="4:37" />
      <P.Role id="M-20251125T015400" roles="image+vocal" />
    </P.Entry>
    <P.Entry id="M-20251125T021144-6" title="What an amazing swing">
      <P.Music base={0.65} />
      <P.MusicConsumedProgress length="3:04" />
      <P.Role id="M-20251125T015400" roles="image+vocal" />
    </P.Entry>
    {/* groundbreaking hanayori incidents */}
    <P.AEI base={0.8} emotions="AP">
      <P.Contributor id="M-VGMDB-AR-11666" factor={0.5} />
      <P.Contributor id="M-20230524T223250" factor={0.5} />
    </P.AEI>
    {/* i legit cried on that night when i discovered this fact */}
    {/* like it's been half a day and i still can't believe my eyes */}
    <P.EPI base={1}>
      <P.Contributor id="M-VGMDB-AR-6799" factor={0.5} />
      <P.Contributor id="M-VGMDB-AR-35619" factor={0.5} />
    </P.EPI>
    <P.Entry
      id="M-20240314T132852"
      title="Diamond City Lights"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/cu7tUpMV" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/4Rjbw90eUNMY6abIeDa5tK",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=MWKw-heslkQ",
          },
        ]}
      />
      <P.Visual type="semiAnimatedMV" base={0.6} unique={0.3} />
      <P.Music base={0.45} />
      {/* nijisanji pomu bullshit */}
      <P.NEI base={0.3} emotions="CP" />
      <P.MusicConsumedProgress length="4:04" />
    </P.Entry>
    <P.Entry
      id="M-20240314T134125"
      title="HIMEHINA Sings -02-"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20240314T134125-9" />
      <P.Contains id="M-20240314T134125-10" />
      <P.Source
        urls={[
          { name: "linkfire", src: "https://lnk.to/himehinautamita2" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/1MUzB6DgT9hnIXWlYIj1wM?go=1",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_kE2mKz3raJjMSBsegGK4tTVLm_5paN2xs&src=Linkfire&lId=797b996f-a197-45c8-a4a0-af1d0afc37b1&cId=d3d58fd7-4c47-11e6-9fd0-066c3e7a8751",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.5} unique={0.2} />
    </P.Entry>
    <P.Entry id="M-20240314T134125-9" title="Tengaku">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/6OiqA0YsolfI2efHkkMWNh",
          },
        ]}
      />
      <P.Music base={0.6} />
      <P.MusicConsumedProgress length="4:32" />
    </P.Entry>
    <P.Entry
      id="M-20240314T134125-10"
      title="Non-breath oblige - HIMEHINA ver."
    >
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/170vm3fa7lznwYQsKEGvIU",
          },
        ]}
      />
      <P.Music base={0.55} />
      <P.MusicConsumedProgress length="3:30" />
    </P.Entry>
  </P.Document>
);
