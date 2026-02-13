import type { Data, Id, Result as ResultType } from "./data";
import { Vector, DiagonalMatrix, RegularMatrix, ScalarMatrix } from "./math";
import { ifDefined, assert } from "./utils";
import { Graph, alg } from "graphlib";
import { identity, lusolve, matrix as mathjsMatrix } from "mathjs";

export interface ContextAPI {
  newVector(data: number[]): Vector;
  newScalarMatrix(data: number): ScalarMatrix;
  newDiagonalMatrix(data: number[]): DiagonalMatrix;
  newRegularMatrix(data: number[]): RegularMatrix;
}

export interface Context {
  extensions: Record<string, unknown>;
  factorScoreCombineWeight: Vector;
  api: ContextAPI;
}

export interface ContextConfig {
  extensions: Record<string, unknown>;
  factorScoreCombineWeight?: Vector;
}

function checkExtensionDependencies(extensions: Record<string, unknown>) {
  for (const [name, ext] of Object.entries(extensions)) {
    if (ext === undefined) continue;
    const extension = ext as { dependencies?: () => string[] };
    if (typeof extension.dependencies === "function") {
      const missing = extension
        .dependencies()
        .filter(
          (n) => (extensions as Record<string, unknown>)[n] === undefined,
        );
      if (missing.length > 0) {
        throw new Error(
          `Extension ${name} has missing dependencies: ${missing.join(", ")}`,
        );
      }
    }
  }
}

export function newContext(config: ContextConfig): Context {
  const factorScoreCombineWeight = config.factorScoreCombineWeight;
  if (!factorScoreCombineWeight)
    throw new Error("factor score combine weight not specified");
  checkExtensionDependencies(config.extensions || {});
  return {
    extensions: config.extensions || {},
    factorScoreCombineWeight,
    api: {
      newVector: (d: number[]) => new Vector(d),
      newScalarMatrix: (n: number) => new ScalarMatrix(n),
      newDiagonalMatrix: (d: number[]) => new DiagonalMatrix(d),
      newRegularMatrix: (d: number[]) => new RegularMatrix(d),
    },
  };
}

export function newZeroVector(context: Context): Vector {
  return context.factorScoreCombineWeight.mul(0.0);
}

export interface Result extends ResultType {}

function embed(context: Context, vector: Vector): Vector {
  const v = new Vector(
    vector.data.map((v, i) =>
      Math.pow(v, 1 / context.factorScoreCombineWeight.data[i]),
    ),
  );
  assert(
    v.data.filter((n) => n !== n).length === 0,
    "Embedded vector contains NaN values",
  );
  return v;
}

function unembed(context: Context, vector: Vector): Vector {
  return new Vector(
    vector.data.map((v, i) =>
      Math.pow(v, context.factorScoreCombineWeight.data[i]),
    ),
  );
}

function constScoreCalc(
  context: Context,
  data: Data,
  sign: number,
): Map<Id, Vector> {
  const signedRelu = (vector: Vector) =>
    new Vector(vector.data.map((v) => Math.max(0, sign * v)));
  const impactEmbeddedScores: Vector[] = [];
  for (let i = 0; i < data.impacts.length; i++) {
    impactEmbeddedScores[i] = embed(context, signedRelu(data.impacts[i].score));
  }

  const impactScores = new Map<Id, Vector>();
  for (const id of data.entries.keys())
    impactScores.set(id, newZeroVector(context));

  for (let i = 0; i < data.impacts.length; i++) {
    const impact = data.impacts[i];
    for (const [entry, weight] of impact.contributors) {
      impactScores.get(entry)?.add(weight.mul(impactEmbeddedScores[i]));
    }
  }

  return impactScores;
}

function topoSortEntries(_context: Context, data: Data): Id[][] {
  const entryGraph = new Graph({ directed: true });
  for (const id of data.entries.keys()) entryGraph.setNode(id);
  for (const relation of data.relations) {
    for (const contrib of relation.contributors.keys()) {
      if (!data.entries.has(contrib)) continue;
      for (const ref of relation.references.keys()) {
        if (!data.entries.has(ref)) continue;
        entryGraph.setEdge(ref, contrib);
      }
    }
  }

  const sccs = alg.tarjan(entryGraph);
  const idToScc = new Map<Id, number>();
  for (let i = 0; i < sccs.length; i++)
    for (const id of sccs[i]) idToScc.set(id, i);

  const sccGraph = new Graph({ directed: true });
  for (let i = 0; i < sccs.length; i++) sccGraph.setNode(i.toString());

  for (const entry of data.entries.keys()) {
    const sccId = idToScc.get(entry);
    if (sccId === undefined) continue;
    const succs = entryGraph.successors(entry);
    if (!succs) continue;
    for (const succ of succs) {
      const succSccId = idToScc.get(succ);
      if (succSccId === undefined || succSccId === sccId) continue;
      sccGraph.setEdge(sccId.toString(), succSccId.toString());
    }
  }

  const order = alg.topsort(sccGraph);
  return order.map((id) => sccs[parseInt(id)]);
}

function createRelationMaps(
  relations:
    | (ResultType & {
        contributors?: Map<Id, Matrix>;
        references?: Map<Id, Matrix>;
      })[]
    | any[],
): Map<Id, Map<Id, Matrix>> {
  const relationMaps = new Map<Id, Map<Id, Matrix>>();
  const addRelation = (contrib: Id, ref: Id, matrix: Matrix) => {
    if (!relationMaps.has(contrib))
      relationMaps.set(contrib, new Map<Id, Matrix>());
    const existingMatrix = relationMaps.get(contrib)!.get(ref);
    if (existingMatrix === undefined)
      relationMaps.get(contrib)!.set(ref, matrix);
    else
      relationMaps.get(contrib)!.set(ref, existingMatrix.add(matrix) as Matrix);
  };

  for (const relation of relations) {
    for (const [contrib, contribWeight] of relation.contributors) {
      for (const [ref, refWeight] of relation.references) {
        const matrix = contribWeight.mul(refWeight) as Matrix;
        addRelation(contrib, ref, matrix);
      }
    }
  }

  return relationMaps;
}

export function processContext(
  context: Context,
  data: Data,
): Map<Id, ResultType> {
  ifDefined((context.extensions || {}).DAH_entry_roles, (e: any) =>
    e.preprocessData?.(context, data),
  );

  const positiveConstScores = constScoreCalc(context, data, 1.0);
  const negativeConstScores = constScoreCalc(context, data, -1.0);
  const entrySccs = topoSortEntries(context, data);

  const embeddedTotalScores = new Map<Id, [Vector, Vector]>();
  const results = new Map<Id, ResultType>();

  const relations = createRelationMaps(data.relations);

  for (const entryScc of entrySccs) {
    const idToIndexMap = new Map<Id, number>();
    for (let i = 0; i < entryScc.length; i++) idToIndexMap.set(entryScc[i], i);

    const N = context.factorScoreCombineWeight.data.length;
    const size = N * entryScc.length;
    const equationMatrix: any = identity(size);
    const subAssign = (i: number, j: number, amt: number) => {
      equationMatrix.set([i, j], equationMatrix.get([i, j]) - amt);
    };

    for (let i = 0; i < entryScc.length; i++) {
      const entryId = entryScc[i];
      const refs = relations.get(entryId);
      if (refs === undefined) continue;

      for (const [ref, refWeight] of refs) {
        const embeddedRefScore = embeddedTotalScores.get(ref);
        if (embeddedRefScore !== undefined) {
          const [posRef, negRef] = embeddedRefScore;
          positiveConstScores
            .get(entryId)!
            .add(refWeight.mul(posRef) as Vector);
          negativeConstScores
            .get(entryId)!
            .add(refWeight.mul(negRef) as Vector);
        } else {
          const j = entryScc.indexOf(ref);
          assert(j >= 0);
          for (let ip = 0; ip < N; ++ip)
            for (let jp = 0; jp < N; ++jp) {
              const w = refWeight.get(ip, jp);
              subAssign(i * N + ip, j * N + jp, w);
            }
        }
      }
    }

    const equationRhs: number[][] = [
      new Array<number>(size).fill(0),
      new Array<number>(size).fill(0),
    ];
    for (let i = 0; i < entryScc.length; ++i) {
      const entryId = entryScc[i];
      const positiveConst = positiveConstScores.get(entryId)!;
      const negativeConst = negativeConstScores.get(entryId)!;
      for (let j = 0; j < N; ++j) {
        equationRhs[0][i * N + j] = positiveConst.data[j];
        equationRhs[1][i * N + j] = negativeConst.data[j];
      }
    }

    const positiveScores = lusolve(
      equationMatrix,
      mathjsMatrix(equationRhs[0]),
    );
    const negativeScores = lusolve(
      equationMatrix,
      mathjsMatrix(equationRhs[1]),
    );

    for (let i = 0; i < entryScc.length; ++i) {
      const result: any = {
        positiveScore: newZeroVector(context),
        negativeScore: newZeroVector(context),
        overallVector: newZeroVector(context),
        DAH_meta: {},
      };
      for (let j = 0; j < N; ++j) {
        result.positiveScore.data[j] = positiveScores.get([i * N + j, 0]);
        result.negativeScore.data[j] = negativeScores.get([i * N + j, 0]);
      }

      embeddedTotalScores.set(entryScc[i], [
        result.positiveScore,
        result.negativeScore,
      ]);
      result.positiveScore = unembed(context, result.positiveScore);
      result.negativeScore = unembed(context, result.negativeScore);
      result.overallVector.add(result.positiveScore);
      result.overallVector.add(result.negativeScore.mul(-1));

      results.set(entryScc[i], result);
    }
  }

  ifDefined((context.extensions || {}).DAH_overall_score, (ext: any) =>
    ext.postProcess?.(context, results),
  );
  ifDefined((context.extensions || {}).DAH_anime_normalize, (ext: any) =>
    ext.postProcess?.(context, results),
  );
  ifDefined((context.extensions || {}).DAH_serialize_json, (ext: any) =>
    ext.serialize?.(data, results),
  );

  return results;
}
