/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* 2023 is the year of isekai */}
    <P.Entry id="F-VGMDB-9991" title="Kage no Jitsuryokusha ni Naritakute!">
      <P.Contains id="A-MAL-48316" />
      <P.Contains id="M-VGMDB-AL-122851" />
      <P.Contains id="A-MAL-54595" />
      {/* "dude mc is literally me..." */}
      {/* - every AAists (anti-appearancists) and EAAists (extreme AAists) in the NAP */}
      {/* ("... except for the fact that he is actually powerful, not like me xdddd") */}
      {/* washed anime */}
    </P.Entry>
    <P.Entry id="A-MAL-48316" title="Kage no Jitsuryokusha ni Naritakute!">
      <P.Source adb={48316} ks={44107} al={130298} mal={48316} />
      {/* meta witch 2023 */}
      <P.BestGirl name="Sherry Barnett" />
      {/* aka himeno sena 2023 */}
      {/* worse life than sena FeelsStrongMan */}
      {/* best girl discussion: https://github.com/ngoduyanh/nrs-impl-kt/discussions/380 */}
      {/* got fucked himeno sena: https://github.com/ngoduyanh/nrs-impl-kt/issues/260 */}
      {/* haha meta witch:
            https://github.com/btmxh/nrs-impl/discussions/539#discussioncomment-11842993 */}
      {/* dont let her looks fool you, she is not in anyway related to the idol franchise */}
      {/* love live (:skull:), she is not rina-chan boardo (you will pay for that */}
      {/* misunderstanding incident you prick) and yandere ayumu (haha love live fandom */}
      {/* funnyChamp) */}
      {/* also she brought the anime a relatively light one-day PADS kekw */}
      {/* but it kinda got out of hand :skull: */}
      <P.PADS length={5} emotions="CU-0.9:MP-0.1">
        <P.Contributor id="A-MAL-48316" factor={0.85} />
        <P.Contributor id="F-20221128T123502" factor={0.1} />
        <P.Contributor id="M-VGMDB-AL-76149-1" factor={0.05} />
        <P.ValidatorSuppress rules="dah-lone-pads" />
      </P.PADS>
      <P.AEI base={0.8} emotions="CU-0.9:MP-0.1">
        <P.Contributor id="A-MAL-48316" factor={0.9} />
        <P.Contributor id="F-20221128T123502" factor={0.1} />
      </P.AEI>
      {/* i'm sorry but
            https://github.com/ngoduyanh/nrs-impl-kt/issues/385#issuecomment-1455132759 */}
      {/* yapper neg diff */}
      <P.Waifu waifu="Sherry Barnett" from="2023-03-01" to="2023-03-12" />
      {/* I AM atomic */}
      {/* humor */}
      <P.EHI />
      {/* plot */}
      <P.NEI base={0.25} emotions="AP" />
      <P.Meme strength={0.8} from="2023-03-01" to="2023-03-12">
        <P.Contributor id="A-MAL-48316" factor={0.6} />
        <P.Contributor id="V-VNDB-17516" factor={0.4} />
      </P.Meme>
      <P.Meme strength={0.5} from="2023-01-01" to="2023-04-01" />
      <P.FeatureMusic id="M-VGMDB-AL-122851" />
      {/* the 7 shadow art is meh but that individual saved the anime */}
      <P.Visual type="animated" base={0.6} unique={0.4} />
      {/* binged ez clap */}
      <P.AnimeConsumedProgress status="Completed" boredom={1} episodes={20} />
      <P.Writing character={0.6} story={0.8} pacing={0.8} originality={0.7} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-122851" title="Darling in the Night / Shichikage">
      <P.Contains id="M-VGMDB-AL-122851-1" />
      {/* not anime girls :anger:, this needs correction */}
      <P.Visual type="albumArt" base={0.2} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-122851-1" title="Darling in the Night">
      <P.MusicConsumedProgress length="4:12" />
      {/* same composer as "WONDERFUL WORLD", "Watashi to Minna no Uta" */}
      {/* (luminous witches song W), new game's step by step up */}
      {/* :arrow_up: :arrow_up: :arrow_up: and especially :skull: */}
      {/* :warning: :rotating_light: :drumrolls: */}
      {/* nyumber */}
      {/* one */}
      {/* zettai */}
      {/* saikyou */}
      {/* (yes, that nozsist song) */}
      <P.Music base={0.46} />
    </P.Entry>
    <P.Entry
      id="A-MAL-54595"
      title="Kage no Jitsuryokusha ni Naritakute! 2nd Season"
    >
      <P.Source adb={17877} al={161964} ks={47099} mal={54595} />
      {/* idk maybe akm girl */}
      <P.BestGirl name="Claire Kagenou" />
      {/* humor */}
      <P.NEI base={0.9} emotions="AP" />
      <P.AnimeConsumedProgress status="Abandoned" boredom={0.9} episodes={6} />
      {/* ripbozo */}
      <P.Dropped />
      {/* no sherry kekwing */}
      <P.Visual type="animated" base={0.3} unique={0.4} />
      <P.Writing character={0.6} story={0.8} pacing={0.8} originality={0.6} />
    </P.Entry>
  </P.Document>
);
