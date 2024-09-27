import { useMemo, useRef } from 'react';

export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number
) => {
  const callbackRef = useRef(callback);
  let timer: number;

  callbackRef.current = callback;

  const debounce = (
    cb: (...args: any[]) => void,
    tmDelay: number,
    ...args: any[]
  ) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => cb(...args), tmDelay);
  };

  return useMemo(
    () =>
      (...args: any) =>
        debounce(callbackRef.current, delay, ...args),
    [delay]
  );
};
