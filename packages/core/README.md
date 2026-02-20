# @nrs-org/core

The core implementation of NRS.

## Signed Power Scoring System

The core package uses a signed-power-based scoring approach for handling both positive and negative scores in a unified manner. This approach:

- **Simplifies the calculation**: Scores are computed in a single unified system using signed power functions, eliminating the need for separate positive and negative score calculations.
- **Handles negative values directly**: The `signedPow(x, p)` function preserves the sign while applying the power to the absolute value: `sign(x) * |x|^p`.
- **Unified result structure**: The `Result` interface provides only the `overallVector` field, which directly contains the final score vector with both positive and negative values.

### Signed Power Function

The signed power function is defined as:

```typescript
signedPow(x, p) = x >= 0 ? x ^ p : -(-x ^ p);
```

This function is used in both embedding and unembedding operations to handle mixed-sign scores naturally without requiring separate positive/negative processing paths.

### Result Structure

Results contain a single `overallVector` field that represents the final score. This vector can contain both positive and negative values, directly reflecting the combined impact of all contributions.

## Implicitly Enabled Extensions

- `DAH_meta` for extension generic storage.
- `DAH_entry_id` since all ID are strings.
