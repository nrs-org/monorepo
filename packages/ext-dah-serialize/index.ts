/**
 * `DAH_serialize` extension.
 *
 * Marker extension that satisfies the `DAH_serialize` dependency required by
 * `DAH_serialize_json`. It declares that entry IDs are already strings
 * (the identity conversion), so no additional logic is needed here.
 *
 * See spec: nrs/exts/DAH_serialize.md
 */

export default function DAH_serialize() {
  return {
    name: "DAH_serialize",

    dependencies(): string[] {
      return ["DAH_entry_id"];
    },
  };
}

export type ExtDAH_serialize = ReturnType<typeof DAH_serialize>;
