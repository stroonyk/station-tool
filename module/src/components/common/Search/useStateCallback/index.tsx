import { useCallback, useEffect, useRef, useState } from 'react';

function useStateCallback<T>(
  initialState?: T,
): [T | undefined, (state: T, cb?: (state: T | undefined) => void) => void] {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<((state: T | undefined) => void) | undefined>(undefined); // init mutable ref container for callbacks

  const setStateCallback = useCallback((callbackState: T, cb?: (state: T | undefined) => void) => {
    cbRef.current = cb; // store current, passed callback in ref
    setState(callbackState);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `undefined` on initial render,
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = undefined; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}

export default useStateCallback;
