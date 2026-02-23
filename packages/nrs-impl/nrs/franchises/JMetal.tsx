/** @jsxImportSource @nrs-org/nrsx */

import * as P from "../prelude";

export default (
  <P.Document>
    <P.Entry id="M-VGMDB-AR-8482" title="Foreground Eclipse">
      <P.Contains id="M-VGMDB-AL-97601" />
      <P.Contains id="M-VGMDB-AL-43320" />
      {/* this and HAG - Shoujotachi no Owaranai Yoru (lit. Everlasting Night of Teenage Girls) */}
      {/* somewhat reflect an image of "happy nights" in Ayumu-era */}
      <P.RegularImpact>
        {/* description = "Ayumu-era Romance Image" */}
        <P.Contributor id="M-VGMDB-AL-43320" factor={0.4} />
        <P.Contributor id="M-20220818T163913-2" factor={0.6} />
        <P.Score>
          <P.Component value={0.1} factor="Art.Language" />
          <P.Component value={0.1} factor="Emotion.CP" />
        </P.Score>
      </P.RegularImpact>
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-97601" title="Truths, Ironies, The Secret Lyrics">
      <P.Contains id="M-VGMDB-AL-97601-1" />
      <P.Visual type="albumArt" base={0.15} unique={0.3} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-97601-1" title="Truths, Ironies, The Secret Lyrics">
      <P.MusicConsumedProgress length="3:37" />
      <P.Music base={0.41} />
      <P.RegularImpact>
        <P.Score>
          {/* this song is a cover of the famous is she owen u.n
                        i was strongly impressed when i listened to the covers by
                        cool&create silverforest s-sync arts and sound holic
                        but its hard to rearrange cuz its melody's so complex
                        one more day before you go one more night everybody dance it away
                        swinging arms jumping bodies dont stop even if night's out
                        (stream part)
                        i wrote this song in a hurry
                        i know this lyric is funny
                        i wish at least one of you like this song thats all */}
          <P.Component value={0.2} factor="Art.Language" />
          <P.Component value={0.1} factor="Emotion.AP" />
        </P.Score>
      </P.RegularImpact>
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-43320"
      title="Stories That Last Through The Sleepless Nights"
    >
      <P.Contains id="M-VGMDB-AL-43320-4" />
      <P.Contains id="M-VGMDB-AL-43320-7" />
      <P.Contains id="M-VGMDB-AL-43320-8" />
      <P.Contains id="M-VGMDB-AL-97601-1" />
      <P.Visual type="albumArt" base={0.25} unique={0.4} />
      {/* the second ayumu-era theme song */}
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-43320-4"
      title="Wandering, Never Wondering (There Exists A Shade)"
    >
      <P.MusicConsumedProgress length="4:33" />
      <P.Music base={0.29} />
    </P.Entry>
    <P.Entry
      id="M-VGMDB-AL-43320-7"
      title="From Under Cover (Caught Up In A Love Song)"
    >
      <P.MusicConsumedProgress length="3:27" />
      <P.Music base={0.44} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-43320-8" title="Storytellers">
      <P.MusicConsumedProgress length="3:57" />
      <P.Music base={0.5} />
      {/* TODO: manual port — ref "KoikakeNEI" uses <script>:
<ref name="KoikakeNEI" a_base="0.8" a_contribution="0.75" a_emotions="AU-0.5:MP-0.5" />
*/}
    </P.Entry>
    <P.Entry
      id="M-20221224T220452"
      title="Release Hallucination"
      entrytype="MusicArtist"
    >
      <P.Contains id="M-VGMDB-AL-80229" />
      <P.Contains id="M-20221224T220636" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-80229" title="Chronostasis">
      <P.Contains id="M-VGMDB-AL-80229-1" />
      <P.Visual type="albumArt" base={0.2} unique={0.4} />
    </P.Entry>
    <P.Entry id="M-VGMDB-AL-80229-1" title="Chronostasis">
      {/* Length source: https://open.spotify.com/album/4i78h7toisyjWPGXwXmWr9 */}
      <P.MusicConsumedProgress length="6:22" generatedBy="user" />
      <P.Music base={0.47} />
      <P.OsuSong personal={0} community={0.3} />
    </P.Entry>
    <P.Entry
      id="M-20221224T220636"
      title="Imperfection of Imaginary Number"
      entrytype="MusicAlbum"
    >
      <P.Contains id="M-20221224T220636-3" />
      <P.ValidatorSuppress rules="dah-entry-no-consumed;dah-no-progress" />
    </P.Entry>
    <P.Entry id="M-20221224T220636-3" title="I.F.">
      {/* Length source: https://open.spotify.com/album/71Im3HkxyIk8OypYiE9aBR */}
      <P.MusicConsumedProgress length="6:58" />
      <P.Music base={0.5} />
      <P.OsuSong personal={0.1} community={0.4} />
    </P.Entry>
  </P.Document>
);
