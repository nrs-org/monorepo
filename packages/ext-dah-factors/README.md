# DAH_factors Extension

This package implements the DAH_factors extension for NRS, based on the reference implementation and adapted for use in the monorepo.

- **Factor scores** are grouped as Emotion, Art, Boredom, Additional.
- **Combine weights** and indices follow the reference.
- **Weights are tweakable** via configuration to DAH_factors constructor.

## Usage

```ts
import { DAH_factors, factorScores } from "ext-dah-factors";

const ext = new DAH_factors({
  factorWeights: { AU: 0.6, CP: 1.0 }, // override any as desired
  subscoreWeights: { Emotion: 0.8 },
});

ext.getFactorCombineWeightVector(); // returns weights vector for all factors
ext.getSubscoreWeights(); // returns weights for each subscore group
```

## Factor Groups & Weights (Reference)

| Factor     | Weight | Group      |
| ---------- | ------ | ---------- |
| AU         | 0.3    | Emotion    |
| AP         | 0.4    | Emotion    |
| MU         | 0.35   | Emotion    |
| MP         | 0.35   | Emotion    |
| CU         | 0.4    | Emotion    |
| CP         | 0.5    | Emotion    |
| AL         | 0.4    | Art        |
| AV         | 0.1    | Art        |
| AM         | 0.3    | Art        |
| Boredom    | 0.05   | Boredom    |
| Additional | 1.0    | Additional |

## Extension Methods

- `getFactorCombineWeightVector()` returns ordered vector of combine weights
- `getSubscoreWeights()` returns ordered vector of subscore group weights
- `dependencies()` returns required extension short names (currently empty)

## License

See LICENSE file in repository root.
