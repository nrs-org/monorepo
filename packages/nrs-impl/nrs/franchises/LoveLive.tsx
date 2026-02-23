/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="F-VGMDB-2588" title="Love Live!">
      <P.Contains id="M-VGMDB-AL-34051" />
      <P.Contains id="M-VGMDB-AL-36547" />
      <P.Contains id="M-VGMDB-AL-75504" />
      <P.Contains id="M-VGMDB-AL-93532" />
      <P.Contains id="M-VGMDB-AR-13719" />
      <P.Contains id="M-VGMDB-AL-58147" />
      <P.Contains id="M-VGMDB-AL-58750" />
      <P.Contains id="M-VGMDB-AL-70622" />
      <P.Contains id="M-VGMDB-AL-71404" />
      <P.Contains id="M-VGMDB-AL-78378" />
      <P.Contains id="M-VGMDB-AL-87199" />
      <P.Contains id="M-VGMDB-AL-71405" />
      <P.Contains id="M-VGMDB-AR-17153" />
      <P.Contains id="M-VGMDB-AL-97692" />
      <P.Contains id="M-VGMDB-AL-102276" />
      <P.Contains id="M-VGMDB-AL-102277" />
      <P.Contains id="M-VGMDB-AR-29922" />
      <P.Contains id="M-VGMDB-AL-80802" />
      <P.Contains id="M-VGMDB-AL-87198" />
      <P.Contains id="M-VGMDB-AL-99272" />
      <P.Contains id="M-VGMDB-AL-112929" />
      <P.Contains id="M-VGMDB-AL-102279" />
      <P.Contains id="M-VGMDB-AL-104783" />
      <P.Contains id="M-VGMDB-AR-37385" />
      <P.Contains id="A-MAL-15051" />
      <P.Contains id="A-MAL-19111" />
      <P.Contains id="A-MAL-24997" />
      <P.Contains id="A-MAL-32526" />
      <P.Contains id="A-MAL-34973" />
      <P.Contains id="A-MAL-37027" />
      <P.Contains id="A-MAL-40879" />
      <P.Contains id="A-MAL-41169" />
      <P.Contains id="A-MAL-48916" />
      <P.Contains id="A-MAL-50203" />
      {/* shared memes between SIP (school idol project) and Sunshine */}
      <P.Meme strength={0.6} length={18}>
        <P.Contributor id="A-MAL-15051" factor={0.2} />
        <P.Contributor id="A-MAL-19111" factor={0.2} />
        <P.Contributor id="A-MAL-24997" factor={0.1} />
        <P.Contributor id="A-MAL-32526" factor={0.2} />
        <P.Contributor id="A-MAL-34973" factor={0.2} />
        <P.Contributor id="A-MAL-37027" factor={0.1} />
      </P.Meme>
      {/* le "song da" analogy */}
      <P.Meme strength={0.05} from="2022-06-03" to="2022-07-17" />
      {/* SIP humor */}
      <P.AEI base={0.8} emotions="AP">
        <P.Contributor id="A-MAL-15051" factor={0.4} />
        <P.Contributor id="A-MAL-19111" factor={0.4} />
        <P.Contributor id="A-MAL-24997" factor={0.2} />
      </P.AEI>
      <P.AEI base={0.25} emotions="AP">
        <P.Contributor id="A-MAL-32526" factor={0.4} />
        <P.Contributor id="A-MAL-34973" factor={0.4} />
        <P.Contributor id="A-MAL-37027" factor={0.2} />
      </P.AEI>
      {/* Anime */}
      {/* niji arcs */}
      {/* arc 1 - the girl who changed the world */}
      <P.Waifu waifu="Uehara Ayumu" from="2020-11-02" to="2021-02-15">
        <P.Contributor id="A-MAL-40879" factor={0.9} />
        <P.Contributor id="M-VGMDB-AL-102279-1" factor={0.1} />
      </P.Waifu>
      {/* arc 2 - the girl without screentime */}
      <P.NEI base={0.8} emotions="AU-0.5:CU-0.4:AP-0.1">
        <P.Contributor id="A-MAL-40879" factor={0.8} />
        <P.Contributor id="M-VGMDB-AL-43320-8" factor={0.1} />
        <P.Contributor id="M-VGMDB-AL-34269-7" factor={0.1} />
      </P.NEI>
      {/* arc 3 - the ayumu dead people arc */}
      {/* niji got carried hard by kano in this arc */}
      <P.MaxAEIPADS length={7} emotions="CU">
        <P.Contributor id="A-MAL-40879" factor={0.6} />
        <P.Contributor id="M-VGMDB-AL-37130-3" factor={0.4} />
      </P.MaxAEIPADS>
      {/* arc 4 - and then, the world has ended */}
      {/* "Soshite kimi ga shirazu ni" */}
      {/* When Ayumu-era ends, I felt depressed */}
      <P.MaxAEIPADS length={5} emotions="CU">
        <P.Contributor id="A-MAL-40879" factor={0.7} />
        <P.Contributor id="M-MAL-36631-6" factor={0.15} />
        <P.Contributor id="M-20220205T023322-1" factor={0.075} />
        <P.Contributor id="M-20220205T023322-3" factor={0.05} />
        <P.Contributor id="M-VGMDB-AL-89290-6" factor={0.025} />
      </P.MaxAEIPADS>
      {/* ingsoc and colorism */}
      <P.Politics>
        <P.Contributor id="A-MAL-40879" factor={0.7} />
        <P.Contributor id="other stuff [null entry]" factor={0.3} />
        {/* literally the inspiration for colorism's name */}
      </P.Politics>
      <P.NEI base={0.75} emotions="AP">
        <P.Contributor id="A-MAL-48916" factor={0.5} />
        <P.Contributor id="A-MAL-38009" factor={0.4} />
        <P.Contributor id="GF-VGMDB-7059" factor={0.1} />
        {/* guys did you see that, it's her, my favorite school idol of all time, */}
        {/* tsukisaka sayu! wdym by kanata konoe, who tf is that? i only know sayu! */}
        {/* sayu is my love, she saved me from my one-year-old depression and showed */}
        {/* me how beautiful this world is. and her unit, kirare, is such a beautiful */}
        {/* unit with perfect chemistry. imagine watching love live and getting fucked */}
        {/* in the ass by lantis cocksuckers xdddddddddddddddd */}
        {/* all niji funny shits come from konoe kanata references */}
      </P.NEI>
      {/* it has to happen */}
      {/* sorry love live fans, rst got them */}
      {/* i tried to watch niji in peace, but i failed */}
      {/* the leftover hate from s1 and the heisenberg bs from s2 is just too much */}
      {/* update: the azuna episode kinda did its thing */}
      <P.NEI base={-0.5} emotions="MU-0.5:AU-0.5">
        <P.Contributor id="A-MAL-40879" factor={0.3} />
        <P.Contributor id="A-MAL-48916" factor={0.6} />
        <P.Contributor id="A-MAL-15051" factor="0.1/6" />
        <P.Contributor id="A-MAL-19111" factor="0.1/6" />
        <P.Contributor id="A-MAL-24997" factor="0.1/6" />
        <P.Contributor id="A-MAL-32526" factor="0.1/6" />
        <P.Contributor id="A-MAL-34973" factor="0.1/6" />
        <P.Contributor id="A-MAL-37027" factor="0.1/6" />
      </P.NEI>
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-34051" title="Snow halation / μ's">
      <P.Contains id="M-VGMDB-AL-34051-1" />
      <P.Visual type="albumArt" base={0.1} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-34051-1" title="Snow halation">
      <P.MusicConsumedProgress length="4:17" />
      <P.Music base={0.32} />
      <P.Meme strength={0.1} length={6} />
      {/* osu! | Will Stetson - Snow Halation (feat. BeasttrollMC) */}
      {/* [Reform's Expert] +HDDT FC 417pp */}
      <P.Remix id="M-20220317T064137-1" />
      <P.Remix id="M-20230627T210215" />
      <P.Role id="M-VGMDB-AR-13719" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-36547" title="Bokura wa Ima no Naka de / μ's">
      <P.Contains id="M-VGMDB-AL-36547-1" />
      <P.Visual type="albumArt" base={0.25} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-36547-1" title="Bokura wa Ima no Naka de">
      <P.MusicConsumedProgress length="4:36" />
      <P.Music base={0.34} />
      <P.Role id="M-VGMDB-AR-13719" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-75504" title="Music S.T.A.R.T!! / μ's">
      <P.Contains id="M-VGMDB-AL-75504-2" />
      <P.Visual type="albumArt" base={0.2} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-75504-2" title="LOVELESS WORLD">
      <P.MusicConsumedProgress length="5:18" />
      <P.Music base={0.51} />
      <P.Role id="M-VGMDB-AR-13719" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-93532" title="A song for You! You? You!! / μ's">
      <P.Contains id="M-VGMDB-AL-93532-1" />
      <P.Visual type="albumArt" base={0.25} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-93532-1" title="A song for You! You? You!!">
      <P.MusicConsumedProgress length="5:53" />
      <P.Music base={0.54} />
      <P.Role id="M-VGMDB-AR-13719" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-13719" title="μ's" />
    <P.Entry id="M-VGMDB-AL-58147" title="Aozora Jumping Heart / Aqours">
      <P.Contains id="M-VGMDB-AL-58147-1" />
      <P.Visual type="albumArt" base={0.25} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-58147-1" title="Aozora Jumping Heart">
      <P.MusicConsumedProgress length="4:44" />
      <P.Music base={0.36} />
      <P.Role id="M-VGMDB-AR-17153" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-58750"
      title="Kimeta yo Hand in Hand/Daisuki Dattara Daijoubu! / Aqours"
    >
      <P.Contains id="M-VGMDB-AL-58750-1" />
      <P.Visual type="albumArt" base={0.25} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-58750-1" title="Kimeta yo Hand in Hand">
      <P.MusicConsumedProgress length="4:26" />
      <P.Music base={0.42} />
      <P.Role id="M-VGMDB-AR-17153" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-70622"
      title="Yuuki wa Doko ni? Kimi no Mune ni! / Aqours"
    >
      <P.Contains id="M-VGMDB-AL-70622-1" />
      <P.Visual type="albumArt" base={0.25} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-70622-1" title="Yuuki wa Doko ni? Kimi no Mune ni!">
      <P.MusicConsumedProgress length="4:44" />
      <P.Music base={0.6} />
      {/* welcome to ingsoc, big brother is watching you */}
      <P.AEI base={1} emotions="CU-0.75:CP-0.25" />
      <P.Role id="M-VGMDB-AR-17153" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-71404" title="MY MAI☆TONIGHT/MIRACLE WAVE / Aqours">
      <P.Contains id="M-VGMDB-AL-71404-2" />
      <P.Visual type="albumArt" base={0.25} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-71404-2" title="MIRACLE WAVE">
      <P.MusicConsumedProgress length="4:08" />
      <P.Music base={0.41} />
      <P.Role id="M-VGMDB-AR-17153" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-78378" title="Thank you, FRIENDS!! / Aqours">
      <P.Contains id="M-VGMDB-AL-78378-1" />
      <P.Visual type="albumArt" base={0.25} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-78378-1" title="Thank you, FRIENDS!!">
      <P.MusicConsumedProgress length="6:23" />
      <P.Music base={0.39} />
      <P.Role id="M-VGMDB-AR-17153" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-87199" title="Mitaiken HORIZON / Aqours">
      <P.Contains id="M-VGMDB-AL-87199-1" />
      <P.Visual type="albumArt" base={0.25} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-87199-1" title="Mitaiken HORIZON">
      <P.MusicConsumedProgress length="5:19" />
      <P.Music base={0.49} />
      <P.Role id="M-VGMDB-AR-17153" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-71405" title="Awaken the power / Saint Aqours Snow">
      <P.Contains id="M-VGMDB-AL-71405-3" />
      <P.Visual type="albumArt" base={0.25} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-71405-3" title="DROPOUT!?">
      <P.MusicConsumedProgress length="3:56" />
      <P.Music base={0.4} />
      <P.OsuSong personal={0.4} community={0} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-17153" title="Aqours" />
    <P.Entry
      id="M-VGMDB-AL-97692"
      title="LoveLive! Sunshine!! Watanabe You First Solo Concert ALBUM ~Beginner's Sailing~"
    >
      <P.Contains id="M-VGMDB-AL-97692-1" />
      <P.Visual type="albumArt" base={0.2} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-97692-1" title="Beginner's Sailing">
      <P.MusicConsumedProgress length="4:47" />
      <P.Music base={0.4} />
      <P.Role id="M-VGMDB-AR-17551" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-102276"
      title="Nijiiro Passions! / Nijigasaki High School Idol Club"
    >
      <P.Contains id="M-VGMDB-AL-102276-1" />
      <P.Visual type="albumArt" base={0.6} unique={0.25} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-102276-1" title="Nijiiro Passions!">
      <P.MusicConsumedProgress length="4:15" />
      <P.Music base={0.26} />
      <P.Role id="M-VGMDB-AR-29922" roles="vocal+image" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-102277"
      title="NEO SKY, NEO MAP! / Nijigasaki High School Idol Club"
    >
      <P.Contains id="M-VGMDB-AL-102277-1" />
      <P.Visual type="albumArt" base={0.6} unique={0.25} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-102277-1" title="NEO SKY, NEO MAP!">
      <P.MusicConsumedProgress length="4:38" />
      <P.Music base={0.65} />
      {/* Kyou no aoi sora wa kinou to chigau */}
      {/* Ashita no aoi sora~ kyou to chigau */}
      {/* Kimi no me ni wa */}
      {/* Boku no me ni wa */}
      {/* Aa kotoba ni naranai */}
      {/* Konna toki ni mo kimi ga ireba */}
      {/* Hotto suru */}
      {/* Dakara dakara ashita mo */}
      {/* Miageyou */}
      {/* Koko de kimi to... */}
      {/* fuck this crappy post-modern hell fuck the ssr and the bird issue */}
      {/* why can't this world be fun */}
      {/* why the fuck do we have to participate in a shithole */}
      {/* full of elitism while knowing fewer programming languages */}
      {/* than a 17-yo neet while forcing each other to study */}
      {/* pointless knowledge (what does "mômen quán tính" has to */}
      {/* do with programming :skull:) while the government */}
      {/* with their heisenberg bullshit basically destroy the */}
      {/* growth of old culture just because of some numbers being */}
      {/* a little bit too high */}
      {/* just fucking recreate the one-party state system from */}
      {/* the Autism Republic goddamnit i'm tired of this craphole */}
      {/* what the fuck do you mean by "sometimes in life you gotta */}
      {/* sacrifice and bla bla stfu */}
      {/* I HATE ARTIFICIAL INTELLIGENCE AND THEIR OVERRATED CLASSES */}
      {/* muh muh AI i have money please kill yourselves */}
      {/* i miss making the alternative osu replay renderer */}
      {/* i miss reimplementing the twitch chat to make a dumb */}
      {/* shitpost video */}
      {/* i miss making long osugame shitposts that got around 1-2k */}
      {/* upvotes on reddit (and calling idoly pride the pp anime) */}
      {/* i miss singing dream with you and fantasizing about the */}
      {/* Chuyen Thai Binh Girls' Dormitory */}
      <P.AEI base={0.6} emotions="CU-0.75:CP-0.25" />
      <P.Role id="M-VGMDB-AR-29922" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-29922" title="Nijigasaki High School Idol Club" />
    <P.Entry
      id="M-VGMDB-AL-80802"
      title="TOKIMEKI Runners / Nijigasaki High School Idol Club"
    >
      <P.Contains id="M-VGMDB-AL-80802-1" />
      <P.Contains id="M-VGMDB-AL-80802-2" />
      <P.Contains id="M-VGMDB-AL-80802-8" />
      <P.Contains id="M-VGMDB-AL-80802-10" />
      <P.Visual type="albumArt" base={0.3} unique={0.6} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-80802-1" title="TOKIMEKI Runners">
      <P.MusicConsumedProgress length="4:36" />
      <P.Music base={0.38} />
      <P.Role id="M-VGMDB-AR-29922" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-80802-2" title="Yume e no Ippo">
      <P.MusicConsumedProgress length="4:47" />
      <P.Music base={0.16} />
      <P.Role id="M-VGMDB-AR-29640" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-80802-8" title="CHASE!">
      <P.MusicConsumedProgress length="4:18" />
      <P.Music base={0.23} />
      <P.Role id="M-VGMDB-AR-27779" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-80802-10" title="Dokipipo☆Emotion">
      <P.MusicConsumedProgress length="4:30" />
      <P.Music base={0.3} />
      <P.Role id="M-VGMDB-AR-26954" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-87198"
      title="Love U my friends / Nijigasaki High School Idol Club"
    >
      <P.Contains id="M-VGMDB-AL-87198-10" />
      <P.Contains id="M-VGMDB-AL-87198-1" />
      <P.Contains id="M-VGMDB-AL-87198-7" />
      <P.Visual type="albumArt" base={0.3} unique={0.6} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-87198-10" title="Love U my friends">
      <P.MusicConsumedProgress length="4:00" />
      <P.Music base={0.41} />
      <P.Role id="M-VGMDB-AR-29922" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-87198-1" title="Kaika Sengen">
      <P.MusicConsumedProgress length="4:19" />
      <P.Music base={0.24} />
      <P.Role id="M-VGMDB-AR-29640" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-87198-7" title="MELODY">
      <P.MusicConsumedProgress length="4:29" />
      <P.Music base={0.53} />
      <P.Role id="M-VGMDB-AR-27779" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-99272"
      title="Just Believe!!! / Nijigasaki High School Idol Club"
    >
      <P.Contains id="M-VGMDB-AL-99272-12" />
      <P.Contains id="M-VGMDB-AL-99272-1" />
      <P.Contains id="M-VGMDB-AL-99272-3" />
      <P.Contains id="M-VGMDB-AL-99272-7" />
      <P.Visual type="albumArt" base={0.3} unique={0.6} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-99272-12" title="Just Believe!!!">
      <P.MusicConsumedProgress length="4:05" />
      <P.Music base={0.44} />
      <P.Role id="M-VGMDB-AR-29922" roles="vocal+image" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-99272-1" title="Say Good-Bye Namida">
      <P.MusicConsumedProgress length="4:01" />
      <P.Music base={0.32} />
      <P.Role id="M-VGMDB-AR-29640" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-99272-3" title="Yagate Hitotsu no Monogatari">
      <P.MusicConsumedProgress length="4:20" />
      <P.Music base={0.29} />
      <P.Role id="M-VGMDB-AR-29323" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-99272-7" title="LIKE IT! LOVE IT!">
      <P.MusicConsumedProgress length="4:21" />
      <P.Music base={0.48} />
      <P.OsuSong personal={0.3} community={0} />
      <P.Role id="M-VGMDB-AR-27779" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-112929"
      title="L!L!L! (Love the Life We Live) / Nijigasaki High School Idol Club"
    >
      <P.Contains id="M-VGMDB-AL-112929-2" />
      <P.Visual type="albumArt" base={0.3} unique={0.6} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-112929-2" title="Break The System">
      <P.MusicConsumedProgress length="3:44" />
      <P.Music base={0.4} />
      <P.Role id="M-VGMDB-AR-29640" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-102279"
      title="Dream with You/Poppin' Up!/DIVE! / Ayumu Uehara (CV. Aguri Onishi), Kasumi Nakasu (CV. Mayu Sagara), Setsuna Yuki (CV. Tomori Kusunoki) from Nijigasaki High School Idol Club [Ayumu Uehara Edition]"
    >
      <P.Contains id="M-VGMDB-AL-102279-1" />
      <P.Visual type="albumArt" base={0.65} unique={0.25} />
      {/* the first ayumu-era theme song */}
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-102279-1" title="Dream with You">
      <P.MusicConsumedProgress length="4:18" />
      <P.Music base={0.1} />
      {/* the song is shit */}
      {/* but it started the most colorful era in autism history */}
      {/* the ayumu era */}
      <P.NEI base={0.5} emotions="AP" />
      <P.Role id="M-VGMDB-AR-29640" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-104783"
      title="Awakening Promise/Yume ga Koko kara Hajimaru yo / Nijigasaki High School Idol Club"
    >
      <P.Contains id="M-VGMDB-AL-104783-1" />
      <P.Visual type="albumArt" base={0.65} unique={0.25} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-104783-1" title="Awakening Promise">
      <P.MusicConsumedProgress length="4:13" />
      <P.Music base={0.11} />
      <P.Role id="M-VGMDB-AR-29640" roles="vocal+image_feat" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AR-37385" title="Liella!">
      {/* Liella hasn't got any notable songs */}
      {/* also they got fucked in the rst-sb69 duopoly era because */}
      {/* rst is a fucking nazi */}
    </P.Entry>
    <P.Entry id="A-MAL-15051" title="Love Live! School Idol Project">
      <P.Source adb={15051} ks={7203} al={15051} mal={15051} />
      <P.BestGirl name="Maki Nishikino" />
      <P.FeatureMusic id="M-VGMDB-AL-36547-1" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.KilledBy id="F-VGMDB-7059" potential={0.1} effect={1} />
      <P.Visual type="animated" base={0.25} unique={0.4} />
      <P.Writing character={0.5} story={0.4} pacing={0.7} originality={0.8} />
    </P.Entry>
    <P.Entry id="A-MAL-19111" title="Love Live! School Idol Project 2nd Season">
      <P.Source adb={19111} ks={7871} al={19111} mal={19111} />
      <P.BestGirl name="Maki Nishikino" />
      <P.FeatureMusic id="M-VGMDB-AL-34051-1" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.KilledBy id="F-VGMDB-7059" potential={0.1} effect={1} />
      <P.Visual type="animated" base={0.25} unique={0.4} />
      <P.Writing character={0.5} story={0.4} pacing={0.7} originality={0.6} />
    </P.Entry>
    <P.Entry id="A-MAL-24997" title="Love Live! The School Idol Movie">
      <P.Source adb={24997} ks={8531} al={20766} mal={24997} />
      <P.BestGirl name="Maki Nishikino" />
      <P.AnimeConsumedProgress
        status="Completed"
        boredom={1}
        episodes={1}
        episodeDuration="1:54:00"
      />
      <P.KilledBy id="F-VGMDB-7059" potential={0.1} effect={1} />
      <P.Visual type="animated" base={0.25} unique={0.4} />
      <P.Writing character={0.5} story={0.4} pacing={0.7} originality={0.5} />
    </P.Entry>
    <P.Entry id="A-MAL-32526" title="Love Live! Sunshine!!">
      <P.Source adb={11878} al={21584} ks={11745} mal={32526} />
      <P.BestGirl name="Riko Sakurauchi" />
      <P.FeatureMusic id="M-VGMDB-AL-58147-1" />
      <P.FeatureMusic id="M-VGMDB-AL-58750-1" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.KilledBy id="F-VGMDB-7059" potential={0.15} effect={1} />
      <P.Visual type="animated" base={0.25} unique={0.4} />
      <P.Writing character={0.8} story={0.6} pacing={0.7} originality={0.4} />
    </P.Entry>
    <P.Entry id="A-MAL-34973" title="Love Live! Sunshine!! 2nd Season">
      <P.Source adb={34973} ks={13299} al={98349} mal={34973} />
      <P.BestGirl name="Riko Sakurauchi" />
      {/* aozora was featured in ep13 */}
      <P.FeatureMusic id="M-VGMDB-AL-58147-1" />
      <P.FeatureMusic id="M-VGMDB-AL-70622-1" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.KilledBy id="F-VGMDB-7059" potential={0.15} effect={1} />
      <P.Visual type="animated" base={0.25} unique={0.4} />
      <P.Writing character={0.8} story={0.6} pacing={0.7} originality={0.4} />
    </P.Entry>
    <P.Entry
      id="A-MAL-37027"
      title="Love Live! Sunshine!! The School Idol Movie: Over the Rainbow"
    >
      <P.Source adb={37027} ks={14188} al={100965} mal={37027} />
      <P.BestGirl name="Riko Sakurauchi" />
      <P.AnimeConsumedProgress
        status="Completed"
        boredom={1}
        episodes={1}
        episodeDuration="1:40:00"
      />
      <P.KilledBy id="F-VGMDB-7059" potential={0.15} effect={1} />
      <P.Visual type="animated" base={0.25} unique={0.4} />
      <P.Writing character={0.8} story={0.6} pacing={0.7} originality={0.4} />
    </P.Entry>
    <P.Entry
      id="A-MAL-40879"
      title="Love Live! Nijigasaki Gakuen School Idol Doukoukai"
    >
      <P.Source adb={40879} al={113970} mal={40879} ks={42872} />
      <P.BestGirl name="Ayumu Uehara" />
      {/* seasonal = true */}
      {/* pretty funny ngl, but overshadowed by the ayumu shit */}
      <P.AEI base={0.4} emotions="AP" />
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={13} />
      <P.Visual type="animated" base={0.6} unique={0.25} />
      {/* 2020-10-17: airtime of episode 3 */}
      <P.Meme strength={1} from="2020-10-17" to="2021-02-01" />
      {/* the dead people thing surprised me so bad */}
      {/* it's kind of like the hanayori incident 2023 */}
      <P.EPI base={0.5} />
      <P.KilledBy id="M-VGMDB-AR-11666" potential={0.3} effect={0.5} />
      <P.KilledBy id="F-VGMDB-7059" potential={0.15} effect={1} />
      <P.FeatureMusic id="M-VGMDB-AL-102276-1" />
      <P.FeatureMusic id="M-VGMDB-AL-102277-1" />
      <P.FeatureMusic id="M-VGMDB-AL-102279-1" />
      <P.FeatureMusic id="M-VGMDB-AL-104783-1" />
      {/* NO FUCKING WAY */}
      {/* ANOTHER CONSEQUENCE OF THE ORTENSIA INCIDENT */}
      {/* https://twitter.com/tomori_kusunoki/status/1587370653367250944 */}
      {/* https://twitter.com/tomori_kusunoki/status/1587370653367250944 */}
      {/* https://twitter.com/tomori_kusunoki/status/1587370653367250944 */}
      {/* https://twitter.com/tomori_kusunoki/status/1587370653367250944 */}
      {/* https://twitter.com/tomori_kusunoki/status/1587370653367250944 */}
      {/* https://twitter.com/tomori_kusunoki/status/1587370653367250944 */}
      {/* LITERALLY EXACTLY 3 YEARS AFTER THE THING */}
      {/* YOU CAN'T FUCKING MAKE THIS UP */}
      {/* KJHJFDIUFHSIUFHSIOFJDSKFDSKJFSKJFJDSFSKJF */}
      <P.Writing character={0.3} story={0.3} pacing={0.7} originality={0.4} />
    </P.Entry>
    <P.Entry id="A-MAL-41169" title="Love Live! Superstar!!">
      <P.Source adb={41169} ks={44124} al={114979} mal={41169} />
      {/* insert wakeshima kanon is shibuya kanon joke here */}
      <P.BestGirl name="Chisato Arashi" />
      {/* seasonal = true */}
      <P.AnimeConsumedProgress status="Abandoned" boredom={0.9} episodes={7} />
      <P.Dropped />
      <P.Meme strength={0.3} length={6} />
      <P.KilledBy id="A-MAL-41530" potential={0.6} effect={0.25} />
      <P.KilledBy id="F-VGMDB-7059" potential={0.6} effect={1} />
      <P.Visual type="animated" base={0.6} unique={0.25} />
      <P.Writing character={0.5} story={0.4} pacing={0.7} originality={0.4} />
    </P.Entry>
    <P.Entry
      id="A-MAL-48916"
      title="Love Live! Nijigasaki Gakuen School Idol Doukoukai 2nd Season"
    >
      <P.Source adb={48916} ks={44537} al={133891} mal={48916} />
      <P.BestGirl name="Kanata Konoe" />
      {/* jk */}
      <P.BestGirl name="Ayumu Uehara" />
      <P.Visual type="animated" base={0.6} unique={0.25} />
      {/* lol after all this time xddddddddddd */}
      <P.AnimeConsumedProgress status="Abandoned" boredom={0.7} episodes={3} />
      <P.Dropped />
      <P.KilledBy id="F-VGMDB-7059" potential={0.8} effect={1} />
      <P.Writing character={0.5} story={0.4} pacing={0.7} originality={0.4} />
    </P.Entry>
    <P.Entry id="A-MAL-50203" title="Love Live! Superstar!! 2nd Season">
      <P.Source adb={50203} ks={45360} al={140642} mal={50203} />
      <P.BestGirl name="Chisato Arashi" />
      <P.KilledBy id="A-MAL-41530" potential={0.6} effect={0.25} />
      <P.KilledBy id="F-VGMDB-7059" potential={0.6} effect={1} />
      <P.Visual type="animated" base={0.6} unique={0.25} />
      <P.AnimeConsumedProgress status="Planned" boredom={0} episodes={0} />
      <P.Writing character={0.5} story={0.4} pacing={0.7} originality={0.4} />
    </P.Entry>
    <P.Entry
      id="M-20220317T064137-1"
      title="Snow Halation (feat. BeasttrollMC)"
    >
      <P.Meme strength={0.03} length={6} />
      {/* osu! | Will Stetson - Snow Halation (feat. BeasttrollMC) */}
      {/* [Reform's Expert] +HDDT FC 417pp */}
      {/* hmm should i pick the dt length or the normal length :tf: */}
      {/* Length source: https://www.youtube.com/watch?v=m6bYJ17psmg */}
      <P.MusicConsumedProgress length="1:56" generatedBy="user" />
      <P.Role id="M-20220130T185336-1" roles="vocal" />
    </P.Entry>
    {/* here's a documentation made by ayumu people */}
    {/* https://docs.google.com/document/d/1pDCLShSkYOqkXOVkz5Lby0b7xWIQaIxAxKgV42CXvqE/edit?usp=sharing */}
    {/* a lot of forgotten lore here ngl */}
    {/* colorist creative works */}
    <P.Entry
      id="M-20230626T223154"
      title="nijigaku mashup v4.wav"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "google-drive",
            src: "https://drive.google.com/file/d/1ZPSXEJaWnkH42VV1kurrIjF79GZ80Sso/view",
          },
          {
            name: "youtube",
            src: "https://www.youtube.com/watch?v=VOvFcwcw0NI",
          },
        ]}
      />
      <P.MusicConsumedProgress length="1:36" />
      {/* pretty low quality tbh */}
      <P.Music base={0.2} />
      <P.Remix id="M-VGMDB-AL-102276-1" />
      <P.Remix id="M-VGMDB-AL-87198-10" />
      <P.Remix id="M-VGMDB-AL-99272-1" />
      <P.Remix id="M-VGMDB-AL-99272-12" />
    </P.Entry>
    <P.Entry
      id="M-20230626T223005"
      title="kano and ayumu collab LETS GOOOOOOOO hq ver.wav"
      entrytype="MusicTrack"
    >
      <P.Source
        urls={[
          {
            name: "google-drive",
            src: "https://drive.google.com/file/d/1IIMYaDdj9KHTFznPXHO5OWUvlxnf2FrG/view",
          },
        ]}
      />
      <P.MusicConsumedProgress length="4:29" />
      <P.Remix id="M-20230626T223045" />
      <P.Music base={0.6} />
    </P.Entry>
    {/* ayumuism */}
    <P.Politics>
      <P.Contributor id="A-MAL-40879" factor={0.3} />
      <P.Contributor id="M-VGMDB-AR-11666" factor={0.2} />
      {/* remaining belongs to so many things lol */}
      {/* TODO: add ayumu peak shit */}
      <P.ValidatorSuppress rules="dah-sum-contain-weight" />
    </P.Politics>
  </P.Document>
);
