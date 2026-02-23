/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    {/* the first CP farmer in NRS */}
    {/* but they got dropped sadge */}
    <P.Entry id="F-VGMDB-7040" title="Sora yori mo Tooi Basho">
      <P.Contains id="A-MAL-35839" />
      <P.Contains id="M-VGMDB-AL-73544" />
    </P.Entry>
    <P.Entry id="A-MAL-35839" title="Sora yori mo Tooi Basho">
      <P.Source adb={35839} ks={13615} al={99426} mal={35839} />
      <P.BestGirl name="Yuzuki Shiraishi" />
      {/* the beginning was good, since they're making progress */}
      {/* but the last episodes (like from ep 6,7 onwards) suck */}
      {/* since they're just formulaic-episodic drama */}
      {/* (btw i haven't watch the last 3 episodes yet, so idk what */}
      {/* happened there) */}
      <P.AnimeConsumedProgress status="Abandoned" boredom={0.9} episodes={9} />
      <P.Dropped />
      {/* first anime to do cp-farming */}
      <P.AEI base={0.8} emotions="CP" />
      {/* the girls are comfy too */}
      <P.NEI base={0.75} emotions="MP" />
      <P.Visual type="animated" base={0.3} unique={0.5} />
      <P.FeatureMusic id="M-VGMDB-AL-73544-1" />
      <P.FeatureMusic id="M-VGMDB-AL-73544-2" />
      <P.Writing character={0.8} story={0.8} pacing={0.6} originality={0.8} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-73544"
      title="Koko kara, Koko kara / Mari Tamaki (CV: Inori Minase), Shirase Kobuchizawa (CV: Kana Hanazawa), Hinata Miyake (CV: Yuka Iguchi), Yuzuki Shiraishi (CV: Saori Hayami)"
    >
      <P.Contains id="M-VGMDB-AL-73544-1" />
      <P.Contains id="M-VGMDB-AL-73544-2" />
      <P.Visual type="albumArt" base={0.3} unique={0.5} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-73544-1" title="Koko kara, Koko kara">
      <P.MusicConsumedProgress length="4:36" />
      <P.Music base={0.46} />
      <P.Remix id="M-20230524T223735" />
      <P.Role id="M-VGMDB-AR-15361" roles="vocal/4+image_feat/4" />
      {/* make v-tuber a thing (hanayori dorm bs) */}
      {/* and when hanayori bs dead, vtuber dead lmfao */}
      {/* and then hololive becomes le boat xd */}
      {/* t. clueless cultural capitalist not :aware: of big brother :skull: */}
      {/* t. clueless nayuta fanboy not REDACTEDREDACTEDREDACTEDREDACTED */}
      <P.Role id="M-VGMDB-AR-6783" roles="vocal/45+image_feat/4" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-73544-2" title="One Step">
      <P.MusicConsumedProgress length="4:02" />
      <P.Music base={0.38} />
      <P.OsuSong personal={0.4} community={0} />
    </P.Entry>
  </P.Document>
);
