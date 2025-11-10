import { useEffect, RefObject } from "react";

export function useClickAway<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onClickAway: () => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent | TouchEvent) {
      const node = ref.current;
      if (!node) return;

      if (!node.contains(event.target as Node)) {
        onClickAway();
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref, onClickAway]);
}
