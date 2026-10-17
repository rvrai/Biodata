import { useState, useCallback, useRef, useEffect } from 'react';
import { AsyncStatus } from '../utils/result';

/**
 * Generic async ViewModel hook (MVVM): owns the request lifecycle and exposes
 * a unified { status, data, error, isLoading, isSuccess, isError, run } shape,
 * replacing the duplicated idle/loading/success/error boilerplate in every
 * data-fetching component.
 *
 * @param {Function} asyncFn - async task (resolves to data, throws on error)
 * @param {{ immediate?: boolean }} opts
 */
export default function useAsync(asyncFn, { immediate = true } = {}) {
  const fnRef = useRef(asyncFn);
  fnRef.current = asyncFn;

  const [state, setState] = useState({ status: AsyncStatus.IDLE, data: null, error: null });

  const run = useCallback(async (...args) => {
    setState({ status: AsyncStatus.LOADING, data: null, error: null });
    try {
      const data = await fnRef.current(...args);
      setState({ status: AsyncStatus.SUCCESS, data, error: null });
      return data;
    } catch (err) {
      const message = err?.message || 'Something went wrong.';
      setState({ status: AsyncStatus.ERROR, data: null, error: message });
      return null;
    }
  }, []);

  useEffect(() => {
    if (immediate) run();
  }, [immediate, run]);

  return {
    ...state,
    isLoading: state.status === AsyncStatus.LOADING,
    isSuccess: state.status === AsyncStatus.SUCCESS,
    isError: state.status === AsyncStatus.ERROR,
    run,
  };
}
