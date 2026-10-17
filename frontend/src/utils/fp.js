// ─────────────────────────────────────────────────────────────
// Functional helpers (Higher-Order Functions).
// ─────────────────────────────────────────────────────────────

export const identity = (x) => x;

export const noop = () => {};

/** Right-to-left function composition. */
export const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);

/** Left-to-right function composition. */
export const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

/** Returns a function that falls back to a default when given null/undefined. */
export const withDefault = (fallback) => (value) => value ?? fallback;

export default { identity, noop, compose, pipe, withDefault };
