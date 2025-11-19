import { useState, useCallback } from "react";

/**
 * Custom React hook for managing a Set<T> with helper methods.
 */
export function useSet<T>(initialValues?: Iterable<T>) {
  const [set, setSet] = useState<Set<T>>(new Set(initialValues));

  const add = useCallback((value: T) => {
    setSet(prev => new Set(prev).add(value));
  }, []);

  const remove = useCallback((value: T) => {
    setSet(prev => {
      const next = new Set(prev);
      next.delete(value);
      return next;
    });
  }, []);

  const toggle = useCallback((value: T) => {
    setSet(prev => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  }, []);

  const reset = useCallback((values?: Iterable<T>) => {
    setSet(new Set(values));
  }, []);

  return [set, { add, remove, toggle, reset }] as const;
}
