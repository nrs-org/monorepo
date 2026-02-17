# ext-dah-entry-roles

This extension implements the DAH_entry_roles extension for the NRS specification.

## Overview

DAH_entry_roles allows defining contributor roles for entries, impacts, and relations
with fine-grained control over how different types of contributions (composition,
arrangement, vocals, lyrics, visuals, etc.) are weighted in the scoring system.

## Features

- Parse role expression strings like `"compose*2+arrange/3"`
- Support for both atomic roles (total, image, vocal, etc.) and composite roles (music_total, inst, etc.)
- Automatic expansion of composite roles to their atomic components
- Configurable music variables (vocallyrics, lyricsmusic, emolyrics, arrange, feat)
- Integration with DAH_factors and DAH_entry_contains extensions

## Role Types

### Atomic Role Types

- `total`: Identity contribution
- `compose`, `arrange`: Composition and arrangement work
- `image`, `image_feat`: Visual contributions
- `vocal`, `lyrics`: Vocal and lyrical contributions
- `inst_perform`: Instrumental performance
- `mv`, `albumart`: Music video and album art

### Composite Role Types

- `music_total`: Overall music contribution
- `image_total`: Overall visual contribution
- `prod`, `perform`: Production and performance
- `vocal_lyrics`, `inst`, `inst_total`: Combined vocal/lyrical and instrumental contributions

## Usage

```typescript
import DAH_entry_roles from "@nrs-org/ext-dah-entry-roles";
import { makeEntryMeta } from "@nrs-org/core";

const ext = DAH_entry_roles();
const entry = { id: "song1", DAH_meta: makeEntryMeta() };

// Parse and add roles
const roles = ext.parseRoleExpressionString("compose*0.5+arrange*0.3");
ext.addRole(entry, "composer_id", roles);

// Check if a role is atomic
ext.isAtomicRoleType("total"); // true
ext.isAtomicRoleType("music_total"); // false

// Get composing atomic roles
ext.getComposingAtomicRoleTypes("inst"); // ["compose", "arrange"]
```

## Installation

```bash
bun install
```

## Testing

```bash
bun test
```

This extension was created as part of the NRS monorepo using the specification from
https://github.com/nrs-org/nrs and the reference implementation from
https://github.com/nrs-org/nrs-lib-ts.
