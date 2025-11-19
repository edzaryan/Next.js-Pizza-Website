import { useEffect } from "react";

export function useDebounce(
  callback: () => void | Promise<void>,
  delay: number,
  deps: any[]
) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
}