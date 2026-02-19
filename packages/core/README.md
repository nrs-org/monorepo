# @nrs-org/core

The core implementation of NRS.

## Signed Power Scoring System

The core package now uses a signed-power-based scoring approach instead of splitting positive and negative scores into separate calculations. This change:

- **Simplifies the calculation**: Instead of computing separate positive and negative score systems and combining them, scores are now computed in a single unified system using signed power functions.
- **Handles negative values directly**: The `signedPow(x, p)` function preserves the sign while applying the power to the absolute value: `sign(x) * |x|^p`.
- **Maintains backward compatibility**: The `Result` interface still provides `positiveScore` and `negativeScore` fields, which are derived from the `overallVector` for compatibility with existing code.

### Signed Power Function

The signed power function is defined as:

```typescript
signedPow(x, p) = x >= 0 ? x^p : -((-x)^p)
```

This function is used in both embedding and unembedding operations to handle mixed-sign scores naturally without requiring separate positive/negative processing paths.

## Implicitly Enabled Extensions

- `DAH_meta` for extension generic storage.
- `DAH_entry_id` since all ID are strings.
