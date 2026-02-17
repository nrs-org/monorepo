import { describe, it, expect } from "bun:test";
import { makeEntryMeta, makeImpactMeta, makeRelationMeta, ScalarMatrix } from "@nrs-org/core";
import type { Entry, Impact, Relation } from "@nrs-org/core";
import DAH_entry_roles from "../index";
import type { EntryRole } from "../index";

describe("ext-dah-entry-roles", () => {
  it("constructs and has correct dependencies", () => {
    const ext = DAH_entry_roles();
    expect(ext.dependencies?.() ?? []).toEqual([
      "DAH_factors",
      "DAH_entry_contains",
    ]);
  });

  it("parses simple role expression", () => {
    const ext = DAH_entry_roles();
    const roles = ext.parseRoleExpressionString("total");
    expect(roles).toHaveLength(1);
    expect(roles[0]?.roleType).toBe("total");
    expect(roles[0]?.multiplyFactor).toBe(1.0);
    expect(roles[0]?.expressionString).toBe("total");
  });

  it("parses role expression with multiplication", () => {
    const ext = DAH_entry_roles();
    const roles = ext.parseRoleExpressionString("image*2");
    expect(roles).toHaveLength(1);
    expect(roles[0]?.roleType).toBe("image");
    expect(roles[0]?.multiplyFactor).toBe(2.0);
    expect(roles[0]?.expressionString).toBe("image*2");
  });

  it("parses role expression with division", () => {
    const ext = DAH_entry_roles();
    const roles = ext.parseRoleExpressionString("image/3");
    expect(roles).toHaveLength(1);
    expect(roles[0]?.roleType).toBe("image");
    expect(roles[0]?.multiplyFactor).toBeCloseTo(1.0 / 3.0);
  });

  it("parses role expression with multiple operations", () => {
    const ext = DAH_entry_roles();
    const roles = ext.parseRoleExpressionString("image*2*2/3.0");
    expect(roles).toHaveLength(1);
    expect(roles[0]?.roleType).toBe("image");
    expect(roles[0]?.multiplyFactor).toBeCloseTo((2 * 2) / 3.0);
  });

  it("parses role expression with multiple roles", () => {
    const ext = DAH_entry_roles();
    const roles = ext.parseRoleExpressionString("image*2+vocal");
    expect(roles).toHaveLength(2);
    expect(roles[0]?.roleType).toBe("image");
    expect(roles[0]?.multiplyFactor).toBe(2.0);
    expect(roles[1]?.roleType).toBe("vocal");
    expect(roles[1]?.multiplyFactor).toBe(1.0);
  });

  it("throws error for invalid role type", () => {
    const ext = DAH_entry_roles();
    expect(() => ext.parseRoleExpressionString("invalid_role")).toThrow(
      "invalid role type",
    );
  });

  it("identifies atomic role types correctly", () => {
    const ext = DAH_entry_roles();
    expect(ext.isAtomicRoleType("total")).toBe(true);
    expect(ext.isAtomicRoleType("image")).toBe(true);
    expect(ext.isAtomicRoleType("vocal")).toBe(true);
    expect(ext.isAtomicRoleType("music_total")).toBe(false);
    expect(ext.isAtomicRoleType("inst")).toBe(false);
  });

  it("gets composing atomic role types for atomic roles", () => {
    const ext = DAH_entry_roles();
    const atomics = ext.getComposingAtomicRoleTypes("total");
    expect(atomics).toEqual(["total"]);
  });

  it("gets composing atomic role types for composite roles", () => {
    const ext = DAH_entry_roles();
    const atomics = ext.getComposingAtomicRoleTypes("inst");
    expect(atomics).toContain("compose");
    expect(atomics).toContain("arrange");
  });

  it("gets composing atomic role types for deeply nested composite roles", () => {
    const ext = DAH_entry_roles();
    const atomics = ext.getComposingAtomicRoleTypes("music_total");
    // music_total should expand to all its component atomic roles
    expect(atomics.length).toBeGreaterThan(0);
    // All results should be atomic
    atomics.forEach((role) => {
      expect(ext.isAtomicRoleType(role)).toBe(true);
    });
  });

  it("adds role to entry DAH_meta", () => {
    const ext = DAH_entry_roles();
    const e: Entry = { id: "e1", DAH_meta: makeEntryMeta() };
    const roles: EntryRole[] = [
      {
        roleType: "total",
        factor: new ScalarMatrix(NaN),
        multiplyFactor: 1.0,
        expressionString: "total",
      },
    ];
    ext.addRole(e, "contributor1", roles);
    expect(e.DAH_meta.DAH_entry_roles).toBeDefined();
    expect(e.DAH_meta.DAH_entry_roles?.roles["contributor1"]).toBeDefined();
    expect(e.DAH_meta.DAH_entry_roles?.roles["contributor1"]?.length).toBeGreaterThan(0);
  });

  it("adds multiple roles to the same entry and contributor", () => {
    const ext = DAH_entry_roles();
    const e: Entry = { id: "e1", DAH_meta: makeEntryMeta() };
    const roles1: EntryRole[] = [
      {
        roleType: "image",
        factor: new ScalarMatrix(NaN),
        multiplyFactor: 1.0,
        expressionString: "image",
      },
    ];
    const roles2: EntryRole[] = [
      {
        roleType: "vocal",
        factor: new ScalarMatrix(NaN),
        multiplyFactor: 0.5,
        expressionString: "vocal*0.5",
      },
    ];
    ext.addRole(e, "contributor1", roles1);
    ext.addRole(e, "contributor1", roles2);
    const contributorRoles = e.DAH_meta.DAH_entry_roles?.roles["contributor1"];
    expect(contributorRoles).toBeDefined();
    // Should have roles for both image and vocal after expansion to atomic types
    if (contributorRoles) {
      expect(contributorRoles.length).toBeGreaterThan(0);
    }
  });

  it("merges duplicate atomic roles when adding", () => {
    const ext = DAH_entry_roles();
    const e: Entry = { id: "e1", DAH_meta: makeEntryMeta() };
    const roles1: EntryRole[] = [
      {
        roleType: "total",
        factor: new ScalarMatrix(NaN),
        multiplyFactor: 1.0,
        expressionString: "total",
      },
    ];
    const roles2: EntryRole[] = [
      {
        roleType: "total",
        factor: new ScalarMatrix(NaN),
        multiplyFactor: 0.5,
        expressionString: "total*0.5",
      },
    ];
    ext.addRole(e, "contributor1", roles1);
    ext.addRole(e, "contributor1", roles2);
    const contributorRoles = e.DAH_meta.DAH_entry_roles?.roles["contributor1"];
    expect(contributorRoles).toBeDefined();
    if (contributorRoles) {
      expect(contributorRoles.length).toBe(1);
      expect(contributorRoles[0]?.roleType).toBe("total");
      expect(contributorRoles[0]?.multiplyFactor).toBe(1.5);
    }
  });

  it("adds roles to impact DAH_meta", () => {
    const ext = DAH_entry_roles();
    const impact: Impact = {
      contributors: new Map(),
      score: { data: [] },
      DAH_meta: makeImpactMeta(),
    };
    const roles: EntryRole[] = [
      {
        roleType: "total",
        factor: new ScalarMatrix(NaN),
        multiplyFactor: 1.0,
        expressionString: "total",
      },
    ];
    ext.addRole(impact, "contributor1", roles);
    expect(impact.DAH_meta.DAH_entry_roles).toBeDefined();
  });

  it("adds roles to relation DAH_meta", () => {
    const ext = DAH_entry_roles();
    const relation: Relation = {
      contributors: new Map(),
      references: new Map(),
      DAH_meta: makeRelationMeta(),
    };
    const roles: EntryRole[] = [
      {
        roleType: "total",
        factor: new ScalarMatrix(NaN),
        multiplyFactor: 1.0,
        expressionString: "total",
      },
    ];
    ext.addRole(relation, "contributor1", roles);
    expect(relation.DAH_meta.DAH_entry_roles).toBeDefined();
  });

  it("expands composite roles to atomic roles when adding", () => {
    const ext = DAH_entry_roles();
    const e: Entry = { id: "e1", DAH_meta: makeEntryMeta() };
    const roles: EntryRole[] = [
      {
        roleType: "inst",
        factor: new ScalarMatrix(NaN),
        multiplyFactor: 1.0,
        expressionString: "inst",
      },
    ];
    ext.addRole(e, "contributor1", roles);
    const contributorRoles = e.DAH_meta.DAH_entry_roles?.roles["contributor1"];
    expect(contributorRoles).toBeDefined();
    // inst expands to compose and arrange
    if (contributorRoles) {
      const roleTypes = contributorRoles.map((r) => r.roleType);
      expect(roleTypes).toContain("compose");
      expect(roleTypes).toContain("arrange");
    }
  });
});
