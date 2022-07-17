import { useCallback, useRef } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

type AnyFunction = (...args: any[]) => any;

export function useEvent<T extends AnyFunction>(callback?: T) {
  const ref = useRef<AnyFunction | undefined>(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useIsomorphicLayoutEffect(() => {
    ref.current = callback;
  });

  return useCallback<AnyFunction>(
    (...args) => ref.current?.apply(null, args),
    []
  ) as T;
}
