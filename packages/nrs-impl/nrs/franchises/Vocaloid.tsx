/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry
      id="M-MAL-36631"
      title="Pandora Voxx Complete"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-MAL-36631-6" />
      {/* there is no vgmdb entry for this */}
      {/* but there is a mal one kek */}
      <P.Visual type="albumArt" base={0.1} unique={0.2} />
    </P.Entry>
    <P.Entry
      id="M-MAL-36631-6"
      title="Chikyuu Saigo no Kokuhaku wo"
      entrytype="MusicTrack"
    >
      <P.Visual type="animatedMV" base={0.5} unique={0.5} />
      {/* the legendary fifth ayumu-era theme song */}
      {/* for some reason, this almost made me cry */}
      {/* (somewhat unrelated to ayumu shit) */}
      <P.AEI base={0.5} emotions="CU" />
      {/* Length source: https://www.nicovideo.jp/watch/sm18198019 */}
      <P.Music base={0.425} />
      <P.MusicConsumedProgress length="4:32" generatedBy="user" />
      <P.Remix id="M-20220205T023322-1" />
      <P.Remix id="M-20220205T023322-3" />
      <P.Remix id="M-VGMDB-AL-89290-6" />
      <P.Role id="M-VGMDB-AR-26614" roles="inst+vocal+lyrics+image" />
    </P.Entry>
    <P.Entry
      id="M-20220205T023322-1"
      title="Chikyuu Saigo no Kokuhaku wo (yuikonnu)"
    >
      {/* yuiko version is probably the best, music-wise */}
      {/* Length source: https://www.nicovideo.jp/watch/sm20429546 */}
      <P.Music base={0.54} />
      <P.MusicConsumedProgress length="4:32" generatedBy="user" />
      <P.Role id="M-VGMDB-AR-26614" roles="inst+lyrics" />
      <P.Role id="M-VGMDB-AR-4276" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-20220205T023322-3"
      title="Chikyuu Saigo no Kokuhaku wo (HAG)"
    >
      {/* quite good, but they didn't keep the orig. inst. */}
      {/* Length source: https://open.spotify.com/album/57fYw02YKyHnr1rQ15Ynkx */}
      <P.Music base={0.46} />
      <P.MusicConsumedProgress length="4:23" generatedBy="user" />
      <P.Role id="M-VGMDB-AR-26614" roles="compose+lyrics" />
      <P.Role id="M-20220205T023322-2" roles="arrange+vocal+image" />
    </P.Entry>
    <P.Entry id="M-20221115T105859" title="AI" entrytype="MusicTrack">
      <P.Visual type="semiAnimatedMV" base={0.6} unique={0.5} />
      {/* Length source: https://osu.ppy.sh/beatmapsets/955580 */}
      <P.MusicConsumedProgress length="4:23" />
      <P.Music base={0.58} />
      <P.OsuSong personal={0.8} community={0} />
    </P.Entry>
    <P.Entry id="M-20221219T233957" title="Calc." entrytype="MusicTrack">
      <P.Visual type="staticMV" base={0.2} unique={0.4} />
      {/* Length source: https://www.nicovideo.jp/watch/sm12050471 */}
      <P.MusicConsumedProgress length="3:56" />
      <P.Music base={0.49} />
      {/* TODO: manual port — ref "KoikakeNEI" uses <script>:
<ref name="KoikakeNEI" a_base="0.3" a_contribution="0.7" a_emotions="CU" />
*/}
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-97732"
      title="HATSUNE MIKU PROJECT DIVA MEGA39'S 10TH ANNIVERSARY COLLECTION"
    >
      <P.Contains id="M-VGMDB-AL-97732-22" />
      <P.Contains id="M-VGMDB-AL-97732-90" />
      <P.Contains id="M-VGMDB-AL-97732-91" />
      <P.Contains id="M-VGMDB-AL-97732-95" />
      <P.Visual type="albumArt" base={0.3} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-97732-22" title="from Y to Y">
      <P.MusicConsumedProgress length="3:16" />
      {/* "the pads won't stop at the seventh day" */}
      {/* most happy himeno sena mf be like */}
      {/* :skull: */}
      {/* "sena"ka wo mukete kimi wa arukidashita */}
      {/* "sena"ka wo mukete boku wa arukidashita */}
      {/* wake up, it's your daily dose of "crying to */}
      {/* ayumu-era vocaloid songs while thinking about */}
      {/* main girl" */}
      <P.Music base={0.54} />
      {/* TODO: manual port — ref "KoikakeCry" uses <script>:
<ref name="KoikakeCry" a_contribution="0.6" a_emotions="CU" />
*/}
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-97732-90" title="Hand in Hand">
      <P.MusicConsumedProgress length="2:57" />
      <P.Music base={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-97732-91" title="ゴーストルール">
      <P.MusicConsumedProgress length="3:30" />
      <P.Music base={0.34} />
      <P.OsuSong personal={0.6} community={0.6} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-97732-95" title="ヒバナ">
      <P.MusicConsumedProgress length="3:27" />
      <P.Music base={0.36} />
      <P.OsuSong personal={0.5} community={0.5} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-31377"
      title="Hajimete no Koi ga Owaru Toki / supercell"
    >
      <P.Contains id="M-VGMDB-AL-31377-1" />
      <P.Visual type="albumArt" base={0.4} unique={0.6} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-31377-1" title="Hajimete no Koi ga Owaru Toki">
      <P.MusicConsumedProgress length="5:15" />
      <P.Music base={0.5} />
      {/* interesting bit of history: */}
      {/* i found out this song from nayuta's cover */}
      {/* at that time i was playing ayane's route in koikake */}
      {/* and like they do the segs and nakadashi */}
      {/* i realized that there was no nakadashi in sena's route */}
      {/* it looked like a bad end flag or some shit */}
      {/* "i love hentai" */}
      {/* remod blue archvie mfs be like: "omg this is so deep" */}
      {/* kano 2023 meta mfs be like: "lmfao bruh wtf ofc she has */}
      {/* to be one of the main contributors to the koikake bullshit" */}
      {/* anyways, this song is sad now for a different reason */}
      {/* (that is not segs fuck u) */}
      {/* TODO: manual port — ref "KoikakeNEI" uses <script>:
<ref name="KoikakeNEI" a_base="0.5" a_contribution="0.7" a_emotions="CU-0.8:MP-0.2" />
*/}
    </P.Entry>
    <P.Entry
      id="M-20221217T174507"
      title="Kutsumigaki to Maria"
      entrytype="MusicTrack"
    >
      {/* https://www.youtube.com/watch?v=H_rOo9HNF3w */}
      <P.Visual type="animatedMV" base={0.5} unique={0.6} />
      <P.Music base={0.45} />
      {/* a bit dull at times but... */}
      {/* TODO: manual port — ref "KoikakeCry" uses <script>:
<ref name="KoikakeCry" a_contribution="0.85" a_emotions="MP-0.5:CU-0.5" />
*/}
      {/* the part though wtf */}
      {/* did not expect to be that good ?????????? */}
      {/* "I had a very happy dream. */}
      {/* In my dream, I was taking a stroll with her, hand in hand. */}
      {/* When I looked to my side, her face was lit up with smiles. */}
      {/* Upon waking up, I ended up crying on my filthy bed. */}
      {/* It was a dream I shouldn’t have had, */}
      {/* for it’s something that can never come true again. */}
      {/* Aah, why, oh why did we ever meet?" */}
      {/* Length source: https://www.youtube.com/watch?v=H_rOo9HNF3w */}
      <P.MusicConsumedProgress length="4:53" />
      <P.Role id="M-VGMDB-AR-25289" roles="music_total" />
    </P.Entry>
    <P.Entry
      id="M-20221224T223044"
      title="Hitori no Kimi to Hitori no Boku ni"
      entrytype="MusicTrack"
    >
      {/* suzumu the goat */}
      {/* obligatory honokaCLAP and catJAM */}
      {/* https://github.com/ngoduyanh/gifs/blob/master/gif/honokaCLAP.gif */}
      {/* i miss ayumu-era */}
      {/* now love live is "bottom of society" (đáy xh) rip */}
      {/* the song still slaps tho */}
      {/* no ei in nee sadge */}
      <P.Visual type="semiAnimatedMV" base={0.6} unique={0.5} />
      <P.Music base={0.35} />
      {/* Length source: https://www.youtube.com/watch?v=EHxFEHPBDP8 */}
      <P.MusicConsumedProgress length="4:28" />
    </P.Entry>
    <P.Entry
      id="M-20230608T132554"
      title="Ano Natsu no Itsuka wa"
      entrytype="MusicTrack"
    >
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
      <P.Source
        urls={[
          {
            name: "fandom",
            src: "https://vocaloid.fandom.com/wiki/%E3%81%82%E3%81%AE%E5%A4%8F%E3%81%AE%E3%81%84%E3%81%A4%E3%81%8B%E3%81%AF_(Ano_Natsu_no_Itsuka_wa)",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=7yjzo8qnenk",
          },
        ]}
      />
      <P.Music base={0.5} />
    </P.Entry>
    <P.Entry id="M-20230626T230907" title="Ai Kotoba" entrytype="MusicTrack">
      <P.Source
        urls={[
          { name: "niconico", src: "https://www.nicovideo.jp/watch/sm7696158" },
          {
            name: "spotify",
            src: "https://open.spotify.com/track/7Dw7AW1UCOppByzD7BQa9O",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=I0eeS5wYGzI",
          },
        ]}
      />
      <P.Remix id="M-20230626T230908" />
      <P.Remix id="M-20230626T230909" />
      <P.Remix id="M-20230626T230910" />
      <P.Music base={0.25} />
      <P.MusicConsumedProgress length="4:24" />
    </P.Entry>
    <P.Entry id="M-20230626T230908" title="Ai Kotoba II" entrytype="MusicTrack">
      <P.Source
        urls={[
          {
            name: "niconico",
            src: "https://www.nicovideo.jp/watch/sm21986543",
          },
          {
            name: "spotify",
            src: "https://open.spotify.com/track/26MHhsR05uJhSzE5YFUbZZ",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=KgpROErtiBY",
          },
        ]}
      />
      <P.Remix id="M-20230626T230909" />
      <P.Remix id="M-20230626T230910" />
      <P.Remix id="M-20230626T231018" />
      <P.Music base={0.4} />
      <P.MusicConsumedProgress length="4:25" />
    </P.Entry>
    <P.Entry
      id="M-20230626T230909"
      title="Ai Kotoba III"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "niconico",
            src: "https://www.nicovideo.jp/watch/sm33965071",
          },
          {
            name: "spotify",
            src: "https://open.spotify.com/track/226YA8Mae7EhLltchBcFQg",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=WptXk39wiIQ",
          },
        ]}
      />
      <P.Remix id="M-20230626T230910" />
      <P.Remix id="M-20230626T223045" />
      <P.Remix id="M-20230626T231039" />
      <P.Music base={0.35} />
      <P.MusicConsumedProgress length="4:06" />
    </P.Entry>
    <P.Entry id="M-20230626T230910" title="Ai Kotoba IV" entrytype="MusicTrack">
      <P.Source
        urls={[
          {
            name: "niconico",
            src: "https://www.nicovideo.jp/watch/sm40510213",
          },
          {
            name: "spotify",
            src: "https://open.spotify.com/track/04eW89GKBppgRA3at0ycfd",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=aHNWL7MBXoc",
          },
        ]}
      />
      <P.Music base={0.4} />
      <P.MusicConsumedProgress length="3:38" />
    </P.Entry>
    <P.Entry id="M-20240314T131809" title="Kamippoi na" entrytype="MusicTrack">
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/6mBqqzfV" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/5MEXGTej0dxa5MbXZCJJyk",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=EHBFKhLUVig",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=52jGb13ZjBo",
          },
        ]}
      />
      <P.Visual type="semiAnimatedMV" base={0.4} unique={0.6} />
      <P.Music base={0.4} />
      <P.MusicConsumedProgress length="3:24" />
    </P.Entry>
    {/* enna godish */}
    <P.Entry id="M-20240314T132217" title="God-ish" entrytype="MusicTrack">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=Dg6dG3U6n-c",
          },
        ]}
      />
      <P.Visual type="semiAnimatedMV" base={0.45} unique={0.5} />
      <P.Music base={0.45} />
      <P.MusicConsumedProgress length="3:23" />
    </P.Entry>
    <P.Entry id="M-20240314T132218" title="God-ish" entrytype="MusicTrack">
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=hzvlZF3GZ3c",
          },
        ]}
      />
      <P.Visual type="semiAnimatedMV" base={0.45} unique={0.5} />
      <P.Music base={0.6} />
      <P.MusicConsumedProgress length="3:23" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-111946" title="LOVE">
      <P.Contains id="M-VGMDB-AL-111946-9" />
      <P.Source
        urls={[
          { name: "linkcore", src: "https://linkco.re/3rG5TRuR" },
          { name: "official", src: "https://pinocchiop.com/news/737" },
          {
            name: "spotify",
            src: "https://open.spotify.com/album/0KxJlPf1XUcJ2KMzjYQ1EE",
          },
          { name: "vgmdb", src: "https://vgmdb.net/album/111946" },
          {
            name: "youtube",
            src: "https://www.youtube.com/playlist?list=OLAK5uy_nHYMRi0hwLTKodVs1iyS_jOQo65Ro6jQc",
          },
        ]}
      />
      <P.Visual type="albumArt" base={0.2} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-111946-9" title="Non-breath oblige">
      <P.Source
        urls={[
          {
            name: "spotify",
            src: "https://open.spotify.com/track/0LsKplOVgboKBm5MpJsX0H",
          },
        ]}
      />
      <P.Music base={0.5} />
      <P.MusicConsumedProgress length="3:29" />
    </P.Entry>
    <P.Entry
      id="M-20240314T133734"
      title="Non-breath oblige"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=iNcIR-KxN_U",
          },
        ]}
      />
      <P.Visual type="semiAnimatedMV" base={0.1} unique={0.4} />
      <P.Music base={0.6} />
      <P.MusicConsumedProgress length="3:29" />
    </P.Entry>
    <P.Entry
      id="M-20240314T134125"
      title="ヒメヒナウタミタ弐"
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
    {/* ayumu-era masterpiece reincarnated as yapper brainrot you like to see it */}
    <P.Entry
      id="M-20241205T092438"
      title="Watashi no Miseinen Kansoku"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20241205T092438-1" />
      <P.Visual type="albumArt" base={0.2} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-20241205T092438-1" title="Watashi no R">
      <P.AEI base={0.8} emotions="CU" />
      <P.Music base={0.65} />
      <P.MusicConsumedProgress length="3:34" />
      <P.Remix id="M-20241202T142410-4" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-91654" title="Unhappy Refrain">
      <P.Contains id="M-VGMDB-AL-91654-2" />
      <P.Visual type="albumArt" base={0.4} unique={0.6} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-91654-2" title="Rolling Girl">
      <P.Music base={0.5} />
      <P.MusicConsumedProgress length="3:10" />
      <P.Remix id="M-20250221T163932-3" />
      <P.Visual type="animatedMV" base={0.4} unique={0.6} />
    </P.Entry>
    <P.Entry
      id="M-20250221T171218"
      title="Alice in Reitouko"
      entrytype="MusicTrack"
    >
      <P.Visual type="staticMV" base={0.3} unique={0.5} />
      <P.Music base={0.7} />
      <P.MusicConsumedProgress length="5:44" />
      <P.Remix id="M-20250221T171421" />
    </P.Entry>
    <P.Entry
      id="M-20250221T171421"
      title="Alice in Reitouko (shiho ver.)"
      entrytype="MusicTrack"
    >
      <P.Visual type="semiAnimatedMV" base={0.5} unique={0.3} />
      <P.Music base={0.75} />
      <P.MusicConsumedProgress length="5:28" />
    </P.Entry>
    <P.Remix id="M-20250221T163932-4">
      <P.Contributor id="M-20250221T171421" factor={0.7} />
      <P.Contributor id="M-20250221T171218" factor={0.15} />
      <P.Contributor id="V-VNDB-27448" factor={0.1} />
      <P.Contributor id="A-MAL-34240" factor={0.05} />
    </P.Remix>
    <P.Entry id="M-VGMDB-AL-33780" title="ODDS&ENDS">
      <P.Contains id="M-VGMDB-AL-33780-1" />
      <P.Visual type="albumArt" base={0.4} unique={0.6} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-33780-1" title="ODDS&ENDS">
      <P.Visual type="semiAnimatedMV" base={0.3} unique={0.8} />
      <P.Music base={0.65} />
      <P.MusicConsumedProgress length="5:00" />
      <P.Remix id="M-20241202T142410-5" />
    </P.Entry>
  </P.Document>
);
