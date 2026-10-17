// ─────────────────────────────────────────────────────────────
// Result / Status model — a single source of truth for
// success / error / failure outcomes shown to the user.
// ─────────────────────────────────────────────────────────────

export const AsyncStatus = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
});

/** Success value. */
export const ok = (data) => ({ ok: true, status: AsyncStatus.SUCCESS, data, error: null });

/** Failure value. */
export const fail = (error) => ({ ok: false, status: AsyncStatus.ERROR, data: null, error });

/**
 * Adapter: maps a Supabase-style `{ data, error }` response into a unified Result.
 * (Single Responsibility: the only place that knows Supabase's response shape.)
 */
export const fromSupabase = ({ data, error }) =>
  error ? fail(error?.message || 'Request failed.') : ok(data);

/**
 * Higher-Order Function: wraps any async function so it always returns a Result,
 * removing repetitive try/catch boilerplate across the codebase.
 */
export const safe = (fn) => async (...args) => {
  try {
    return ok(await fn(...args));
  } catch (error) {
    return fail(error?.message || 'Something went wrong.');
  }
};

export default { AsyncStatus, ok, fail, fromSupabase, safe };
