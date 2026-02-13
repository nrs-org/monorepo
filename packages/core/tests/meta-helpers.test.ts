import {
  makeEntryMeta,
  makeImpactMeta,
  makeRelationMeta,
  makeResultMeta,
} from "../src/meta-helpers";

test("meta helpers add correct owner tags", () => {
  const e = makeEntryMeta({ a: 1 });
  expect(e.DAH_meta_owner).toBe("entry");
  expect(e.a).toBe(1);

  const i = makeImpactMeta({ b: 2 });
  expect(i.DAH_meta_owner).toBe("impact");
  expect(i.b).toBe(2);

  const r = makeRelationMeta({ c: 3 });
  expect(r.DAH_meta_owner).toBe("relation");
  expect(r.c).toBe(3);

  const s = makeResultMeta({ d: 4 });
  expect(s.DAH_meta_owner).toBe("result");
  expect(s.d).toBe(4);
});
