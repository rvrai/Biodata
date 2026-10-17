// ─────────────────────────────────────────────────────────────
// Calculation / formatting helpers ("extension functions" in JS).
// ─────────────────────────────────────────────────────────────

/** Group an array into an object keyed by `keyFn(item)`. */
export const groupBy = (items, keyFn) =>
  (items || []).reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {});

/** Sort a copy of an array by `keyFn(item)` ascending (or descending). */
export const sortBy = (items, keyFn, dir = 'asc') =>
  [...(items || [])].sort((a, b) => {
    const av = keyFn(a);
    const bv = keyFn(b);
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return dir === 'desc' ? -cmp : cmp;
  });

/** Extract the leading integer from a display value like "5+" or "1M+". */
export const parseNumeric = (value) => parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0;

/** Build a mailto: URL. */
export const buildMailto = ({ to, subject = '', body = '' }) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

/** De-duplicate an array of primitives. */
export const unique = (items) => [...new Set(items || [])];

export default { groupBy, sortBy, parseNumeric, buildMailto, unique };
