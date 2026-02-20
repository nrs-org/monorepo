import {
  type Context,
  type Data,
  type Entry,
  type Id,
  type Impact,
  type Matrix,
  type Relation,
  type EntryMeta,
  type ImpactMeta,
  type RelationMeta,
  ScalarMatrix,
  DiagonalMatrix,
  identityMatrix,
  assert,
} from "@nrs-org/core";

import type { Factor } from "@nrs-org/ext-dah-factors";
import { AL, AM, AV, factorScores } from "@nrs-org/ext-dah-factors";
import DAH_entry_contains from "@nrs-org/ext-dah-entry-contains";

// Type definitions
export type AtomicRoleType =
  | "total"
  | "compose"
  | "arrange"
  | "image"
  | "image_feat"
  | "vocal"
  | "lyrics"
  | "inst_perform"
  | "mv"
  | "albumart";

export type CompositeRoleType =
  | "music_total"
  | "image_total"
  | "prod"
  | "perform"
  | "vocal_lyrics"
  | "inst"
  | "inst_total"
  | "inst_writing";

export type RoleType = AtomicRoleType | CompositeRoleType;

export interface ExtConfig_DAH_entry_roles {
  defaultMusicVars?: MusicVars;
}

export interface EntryRoles<T = RoleType> {
  roles: Record<Id, EntryRole<T>[]>;
  musicVars?: MusicVars;
}

export interface EntryRole<T = RoleType> {
  roleType: T;
  factor?: Matrix;
  multiplyFactor: number;
  expressionString: string;
}

export interface MusicVars {
  vocallyrics?: number;
  lyricsmusic?: number;
  emolyrics?: number;
  arrange?: number;
  instperform?: number;
  feat?: boolean;
}

// Helper function to add to map
function mapAddAssign(map: Map<Id, Matrix>, key: Id, value: Matrix): void {
  const existing = map.get(key);
  if (existing === undefined) {
    map.set(key, value);
  } else {
    map.set(key, existing.add(value));
  }
}

// Helper function to create diagonal matrix from factors
function createDiagonalMatrixFromFactors(
  factorPairs: [Factor, number][],
): DiagonalMatrix {
  const data = new Array<number>(factorScores.length).fill(0);
  for (const [factor, value] of factorPairs) {
    data[factor.factorIndex] = value;
  }
  return new DiagonalMatrix(data);
}

function ALMatrix(factor: number): DiagonalMatrix {
  return createDiagonalMatrixFromFactors([[AL, factor]]);
}

function AMMatrix(factor: number): DiagonalMatrix {
  return createDiagonalMatrixFromFactors([[AM, factor]]);
}

// Helper to check if role is atomic
function isAtomicRoleType(role: RoleType): role is AtomicRoleType {
  return AtomicRoleTypes[role as AtomicRoleType] !== undefined;
}

// Helper to get composing atomic roles
function getComposingAtomicRoleTypes(role: RoleType): AtomicRoleType[] {
  return isAtomicRoleType(role) ? [role] : CompositeRoleTypes[role].children;
}

// Default music variables
function defaultMusicVars(
  roles: Set<AtomicRoleType>,
  entry?: Entry,
): Required<MusicVars> {
  let titleHasFeat = false;
  if (entry) {
    const title = (entry.DAH_meta as EntryMeta & { DAH_entry_title?: string })
      .DAH_entry_title;
    if (title) {
      titleHasFeat = title.includes("feat.") || title.includes("ft.");
    }
  }
  return {
    vocallyrics: 0.5,
    lyricsmusic: 0.1,
    emolyrics: 0.2,
    arrange: 0.5,
    instperform: 1 / 3,
    feat: roles.has("image_feat") || titleHasFeat,
  };
}

// Type definitions for role calculation
type CalcFactorHelperFn = (role: RoleType) => Matrix;
type CalcFactorFn = (
  factor: CalcFactorHelperFn,
  vars: Required<MusicVars>,
) => Matrix;

interface CompositeRoleTypeObject {
  children: AtomicRoleType[];
  calcFactor: CalcFactorFn;
}

interface CompositeRoleTypeObjectInit {
  children: RoleType[];
  calcFactor?: CalcFactorFn;
}

type AtomicRoleTypeObject = CalcFactorFn;

function composite(
  children: RoleType[],
  calcFactor?: CalcFactorFn,
): CompositeRoleTypeObjectInit {
  return {
    children,
    calcFactor,
  };
}

function initComposite(
  obj: Record<CompositeRoleType, CompositeRoleTypeObjectInit>,
): Record<CompositeRoleType, CompositeRoleTypeObject> {
  const partial = {} as Partial<
    Record<CompositeRoleType, CompositeRoleTypeObject>
  >;

  const recursive = (type: CompositeRoleType): AtomicRoleType[] => {
    const cachedResult = partial[type];
    if (cachedResult !== undefined) {
      return cachedResult.children;
    }

    const typeObj = obj[type];

    const expandedChildren = typeObj.children.flatMap((role) => {
      if (isAtomicRoleType(role)) {
        return [role];
      }

      const obj2 = partial[role];
      if (obj2 !== undefined) {
        return obj2.children;
      }

      return recursive(role);
    });

    const calcFactor =
      typeObj.calcFactor ??
      ((factor) =>
        expandedChildren
          .map(factor)
          .reduce((a, b) => a.add(b), new ScalarMatrix(0.0)));

    partial[type] = {
      calcFactor,
      children: expandedChildren,
    };
    return expandedChildren;
  };

  for (const key in obj) {
    recursive(key as CompositeRoleType);
  }

  return partial as Required<typeof partial>;
}

// Atomic role types definition
const AtomicRoleTypes: Record<AtomicRoleType, AtomicRoleTypeObject> = {
  total: () => identityMatrix,
  inst_perform: (factor, vars) => factor("inst_total").scale(vars.instperform),
  arrange: (factor, vars) => factor("inst_writing").scale(vars.arrange),
  compose: (factor) => factor("inst_writing").add(factor("arrange").scale(-1)),
  image: (factor, vars) => factor("image_total").scale(vars.feat ? 0.7 : 1.0),
  image_feat: (factor) => factor("image_total").add(factor("image").scale(-1)),
  vocal: (factor) => factor("vocal_lyrics").add(factor("lyrics").scale(-1)),
  lyrics: (factor, vars) =>
    factor("vocal_lyrics").mul(
      identityMatrix
        .scale(vars.emolyrics)
        .add(ALMatrix(1.0 - vars.emolyrics))
        .add(AMMatrix(vars.lyricsmusic - vars.emolyrics)),
    ),
  mv: () => createDiagonalMatrixFromFactors([[AV, 1.0]]),
  albumart: () => createDiagonalMatrixFromFactors([[AV, 1.0]]),
};

// Composite role types definition
const CompositeRoleTypes = initComposite({
  music_total: composite(["prod", "perform", "image_total"], (factor) =>
    factor("total"),
  ),
  image_total: composite(["image", "image_feat"], (factor) =>
    factor("music_total").scale(0.2),
  ),
  vocal_lyrics: composite(["vocal", "lyrics"], (factor, vars) =>
    factor("music_total")
      .add(factor("image_total").scale(-1))
      .mul(
        new ScalarMatrix(vars.vocallyrics).add(
          ALMatrix(1.0 - vars.vocallyrics),
        ),
      ),
  ),
  inst_total: composite(["inst_writing", "inst_perform"], (factor) =>
    factor("music_total")
      .add(factor("image_total").scale(-1))
      .add(factor("vocal_lyrics").scale(-1)),
  ),
  inst_writing: composite(["compose", "arrange"], (factor) =>
    factor("inst_total").add(factor("inst_perform").scale(-1)),
  ),
  inst: composite(["compose", "arrange"]),
  perform: composite(["inst_perform", "vocal"]),
  prod: composite(["inst", "lyrics"]),
});

const RoleTypes = {
  ...AtomicRoleTypes,
  ...CompositeRoleTypes,
} as const;

// Helper to find index of operation character
function indexOfOpChar(str: string, pos = 0): number | undefined {
  for (let i = pos; i < str.length; ++i) {
    if (str[i] === "*" || str[i] === "/") {
      return i;
    }
  }
  return undefined;
}

// Main extension export
export default function DAH_entry_roles(
  config: ExtConfig_DAH_entry_roles = {},
) {
  // Get DAH_entry_contains helper
  function getDAH_entry_contains(context: Context) {
    return context.extensions["DAH_entry_contains"] as ReturnType<
      typeof DAH_entry_contains
    >;
  }

  // Parse role component from string
  function parseRoleComponent(str: string): EntryRole {
    const roleTypeLength = indexOfOpChar(str) ?? str.length;
    const roleType = str.substring(0, roleTypeLength) as RoleType;
    assert(RoleTypes[roleType] !== undefined, `invalid role type: ${roleType}`);

    let multiplyFactor = 1.0;
    let i = roleTypeLength;
    while (i < str.length) {
      const opChar = str[i];
      assert(
        opChar === "*" || opChar === "/",
        `Invalid operator in role expression: ${opChar}`,
      );

      const end = indexOfOpChar(str, i + 1) ?? str.length;
      let factor = parseFloat(str.substring(i + 1, end));
      if (opChar === "/") {
        factor = 1.0 / factor;
      }

      multiplyFactor *= factor;
      i = end;
    }

    return {
      roleType,
      multiplyFactor,
      expressionString: str,
    };
  }

  // Expand role to atomic roles
  function expandToAtomicRoles(role: EntryRole): EntryRole<AtomicRoleType>[] {
    return getComposingAtomicRoleTypes(role.roleType).map((roleType) => {
      return {
        ...role,
        roleType,
      };
    });
  }

  // Calculate factors for entry/impact/relation
  function calculateFactors(
    entry: Entry | Impact | Relation,
    roles: EntryRoles<AtomicRoleType>,
  ): Map<Id, Matrix> {
    const atomicRoles = new Set<AtomicRoleType>(
      Object.values(roles.roles)
        .flat()
        .map((role) => role.roleType),
    );

    const musicVars = {
      ...defaultMusicVars(atomicRoles, "id" in entry ? entry : undefined),
      ...config.defaultMusicVars,
      ...roles.musicVars,
    };

    const cache = new Map<RoleType, Matrix>();
    const result = new Map<Id, Matrix>();

    const calcRoleFactor = (roleType: RoleType): Matrix => {
      const cached = cache.get(roleType);
      if (cached !== undefined) {
        return cached;
      }

      const roleCalcFn = isAtomicRoleType(roleType)
        ? AtomicRoleTypes[roleType]
        : CompositeRoleTypes[roleType]?.calcFactor;

      assert(!!roleCalcFn, `Unknown role type: ${roleType}`);

      const result = roleCalcFn(calcRoleFactor, musicVars);
      cache.set(roleType, result);
      return result;
    };

    for (const [id, entryRoles] of Object.entries(roles.roles)) {
      let total: Matrix = new ScalarMatrix(0.0);

      for (const role of entryRoles) {
        role.factor = calcRoleFactor(role.roleType).scale(role.multiplyFactor);
        total = total.add(role.factor);
      }

      result.set(id, total);
    }

    return result;
  }

  // Preprocess entries
  function preprocessEntries(
    context: Context,
    entries: Map<Id, Entry>,
  ): Relation[] {
    const relations: Relation[] = [];
    for (const [id, entry] of entries.entries()) {
      const rolesData = (
        entry.DAH_meta as EntryMeta & {
          DAH_entry_roles?: EntryRoles<AtomicRoleType>;
        }
      ).DAH_entry_roles;
      if (rolesData === undefined) {
        continue;
      }

      const factors = calculateFactors(entry, rolesData);
      const containsExt = getDAH_entry_contains(context);
      relations.push(containsExt.entryContains(context, factors, id));
    }
    return relations;
  }

  // Preprocess impacts and relations
  function preprocessIRs(irs: Iterable<Impact | Relation>) {
    for (const ir of irs) {
      const rolesData = (
        ir.DAH_meta as (ImpactMeta | RelationMeta) & {
          DAH_entry_roles?: EntryRoles<AtomicRoleType>;
        }
      ).DAH_entry_roles;
      if (rolesData === undefined) {
        continue;
      }

      const factors = calculateFactors(ir, rolesData);
      for (const [id, weight] of factors.entries()) {
        mapAddAssign(ir.contributors, id, weight);
      }
    }
  }

  return {
    name: "DAH_entry_roles",

    dependencies(): string[] {
      return ["DAH_factors", "DAH_entry_contains"];
    },

    addRole(
      object: Entry | Impact | Relation,
      entryId: Id,
      roles: Iterable<EntryRole>,
    ) {
      let entryRoles = (
        object.DAH_meta as EntryMeta & {
          DAH_entry_roles?: EntryRoles<AtomicRoleType>;
        }
      ).DAH_entry_roles;
      if (entryRoles === undefined) {
        entryRoles = {
          roles: {},
        };
        (
          object.DAH_meta as EntryMeta & {
            DAH_entry_roles?: EntryRoles<AtomicRoleType>;
          }
        ).DAH_entry_roles = entryRoles;
      }

      const thisEntryRoles = (entryRoles.roles[entryId] ??= []);

      for (const role of roles) {
        const atomicRoles = expandToAtomicRoles(role);

        const existingRolesMap = new Map<
          AtomicRoleType,
          EntryRole<AtomicRoleType>
        >();
        for (const role of thisEntryRoles) {
          existingRolesMap.set(role.roleType, role);
        }

        for (const role of atomicRoles) {
          const type = role.roleType;
          const existingRole = existingRolesMap.get(type);
          if (existingRole === undefined) {
            thisEntryRoles.push(role);
          } else {
            existingRole.multiplyFactor += role.multiplyFactor;
            existingRole.expressionString += "+" + role.expressionString;
          }
        }
      }
    },

    preprocessData(context: Context, data: Data) {
      const relations = preprocessEntries(context, data.entries);
      preprocessIRs(data.impacts);
      preprocessIRs(data.relations);
      data.relations.push(...relations);
      return undefined;
    },

    parseRoleExpressionString(str: string): EntryRole[] {
      return str.split("+").map(parseRoleComponent);
    },

    getComposingAtomicRoleTypes(role: RoleType): AtomicRoleType[] {
      return getComposingAtomicRoleTypes(role);
    },

    isAtomicRoleType(role: RoleType): role is AtomicRoleType {
      return isAtomicRoleType(role);
    },
  };
}

export type ExtDAH_entry_roles = ReturnType<typeof DAH_entry_roles>;
