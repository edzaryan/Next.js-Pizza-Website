import { useState, useEffect, RefObject } from "react";

interface IntersectionOptions extends IntersectionObserverInit {}

export function useIntersection<T extends Element>(
  elementRef: RefObject<T | null>,
  options?: IntersectionOptions
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, options);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, options?.root, options?.rootMargin, options?.threshold]);

  return entry;
}
