/** @jsxImportSource @nrs-org/nrsx */

/**
 * Base anime document for `DAH_anime_normalize`.
 *
 * A direct translation of `DAH_anime_normalize.xml` into nrsx. Each of the
 * ten MAL-level keyframe entries (A-MAL-1 through A-MAL-10) plus their
 * supporting music entries are declared here. This document is rendered by
 * `buildBaseAnimeData()` to produce the `Data` object used during extension
 * initialisation — no pre-generated JSON file is needed.
 */

import { Document, Entry } from "@nrs-org/nrsx/elements";
import {
  Additional,
  AEI,
  Cry,
  CryPADS,
  EHI,
  EPI,
  FeatureMusic,
  Music,
  PADS,
  Visual,
  Writing,
} from "@nrs-org/ext-dah-standards/nrsx";
import { AnimeConsumedProgress } from "@nrs-org/ext-dah-entry-progress/nrsx";
import { ValidatorSuppress } from "@nrs-org/ext-dah-validator-suppress/nrsx";
import { type NrsxNode } from "@nrs-org/nrsx";

/**
 * Returns the base anime `DocumentNode` for the normalize keyframe dataset.
 *
 * Pass the result directly to `buildData` as the render function return value:
 * ```ts
 * const data = buildData(ctx, baseAnimeDocument);
 * ```
 */
export function baseAnimeDocument(): NrsxNode {
  // JSX expressions widen to NrsxNode; cast back to DocumentNode since we
  // know the root element is always <Document>.

  return (
    <Document>
      {/* MAL-1: Appalling */}
      <Entry id="A-MAL-1" title="MAL-1 base anime (Appalling)">
        <AnimeConsumedProgress status="Abandoned" boredom={0.2} episodes={12} />
        <Additional value={-2} note="this shit sucks" />
        <Visual type="animated" base={0.1} unique={0.2} />
        <Writing character={0.1} story={0.1} pacing={0.3} originality={0.1} />
      </Entry>

      {/* MAL-2: Horrible */}
      <Entry id="A-MAL-2" title="MAL-2 base anime (Horrible)">
        <AnimeConsumedProgress status="Abandoned" boredom={0.4} episodes={12} />
        <Additional value={-1} note="this shit sucks" />
        <Visual type="animated" base={0.2} unique={0.2} />
        <Writing character={0.2} story={0.2} pacing={0.5} originality={0.2} />
      </Entry>

      {/* MAL-3: Very Bad */}
      <Entry id="A-MAL-3" title="MAL-3 base anime (Very Bad)">
        <AnimeConsumedProgress status="Abandoned" boredom={0.5} episodes={12} />
        <Visual type="animated" base={0.3} unique={0.2} />
        <Writing character={0.2} story={0.2} pacing={0.5} originality={0.2} />
      </Entry>

      {/* MAL-4: Bad */}
      <Entry id="A-MAL-4" title="MAL-4 base anime (Bad)">
        <AnimeConsumedProgress status="Paused" boredom={0.6} episodes={12} />
        <Visual type="animated" base={0.3} unique={0.3} />
        <Writing character={0.2} story={0.2} pacing={0.5} originality={0.2} />
      </Entry>

      {/* MAL-5: Average */}
      <Entry id="A-MAL-5" title="MAL-5 base anime (Average)">
        <AnimeConsumedProgress status="Completed" boredom={0.8} episodes={12} />
        <Visual type="animated" base={0.4} unique={0.3} />
        <Writing character={0.4} story={0.4} pacing={0.5} originality={0.4} />
      </Entry>

      {/* MAL-6: Fine */}
      <Entry id="A-MAL-6" title="MAL-6 base anime (Fine)">
        <AnimeConsumedProgress status="Completed" boredom={0.9} episodes={12} />
        <AEI base={0.1} emotions="AP" />
        <Visual type="animated" base={0.5} unique={0.5} />
        <Writing character={0.5} story={0.5} pacing={0.5} originality={0.4} />
      </Entry>

      {/* MAL-7: Good */}
      <Entry id="A-MAL-7" title="MAL-7 base anime (Good)">
        <AnimeConsumedProgress status="Completed" boredom={1.0} episodes={12} />
        <EHI />
        <Visual type="animated" base={0.5} unique={0.5} />
        <Writing character={0.6} story={0.6} pacing={0.8} originality={0.6} />
      </Entry>

      {/* MAL-8: Very Good */}
      <Entry id="A-MAL-8" title="MAL-8 base anime (Very Good)">
        <AnimeConsumedProgress status="Completed" boredom={1.0} episodes={12} />
        <Cry emotions="CU" />
        <PADS emotions="CU" length={1} />
        <EPI base={0.5} />
        <Visual type="animated" base={0.6} unique={0.5} />
        <Writing character={0.75} story={0.75} pacing={0.8} originality={0.7} />
      </Entry>

      {/* MAL-9: Great */}
      <Entry id="A-MAL-9" title="MAL-9 base anime (Great)">
        <AnimeConsumedProgress status="Completed" boredom={1.0} episodes={12} />
        <Cry emotions="CU" />
        <PADS length={7} emotions="CU" />
        <EHI />
        <EPI base={1.0} />
        <Visual type="animated" base={0.7} unique={0.5} />
        <Writing character={0.8} story={0.8} pacing={0.9} originality={0.8} />
      </Entry>

      {/* MAL-10: Masterpiece */}
      <Entry id="A-MAL-10" title="MAL-10 base anime (Masterpiece)">
        <AnimeConsumedProgress status="Completed" boredom={1.0} episodes={12} />
        <CryPADS emotions="CU" length={10} />
        <PADS emotions="CP" length={1} />
        <ValidatorSuppress rules="DAH_lone_pads" />
        <AEI base={0.75} emotions="MP" />
        <EHI />
        <EPI base={1.0} />
        <FeatureMusic id="M-VGMDB-1" />
        <FeatureMusic id="M-VGMDB-2" />
        <FeatureMusic id="M-VGMDB-3" />
        <FeatureMusic id="M-VGMDB-4" />
        <Visual type="animated" base={0.8} unique={0.5} />
        <Writing character={1.0} story={1.0} pacing={1.0} originality={1.0} />
      </Entry>

      {/* Supporting music entries for MAL-10 */}
      <Entry id="M-VGMDB-1" title="MAL-10 base anime sample music">
        <Music base={0.5} />
      </Entry>
      <Entry id="M-VGMDB-2" title="MAL-10 base anime sample music">
        <Music base={0.6} />
      </Entry>
      <Entry id="M-VGMDB-3" title="MAL-10 base anime sample music">
        <Music base={0.7} />
      </Entry>
      <Entry id="M-VGMDB-4" title="MAL-10 base anime sample music">
        <Music base={0.8} />
      </Entry>
    </Document>
  );
}
