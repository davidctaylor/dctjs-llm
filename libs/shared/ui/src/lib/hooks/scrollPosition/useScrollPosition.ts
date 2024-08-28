import { RefObject, useEffect, useState } from 'react';

export interface ScrollPosition {
  x: number;
  y: number;
}

export const useScrollPosition = (
  trackPosition = true,
  ref?: RefObject<HTMLElement | null>
) => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const updatePosition = () => {
      if (trackPosition) {
        setScrollPosition({
          x: ref?.current?.scrollLeft || window.scrollX,
          y: ref?.current?.scrollTop || window.scrollY,
        });
      }
    };
    const saveRef: HTMLElement | undefined | null = ref?.current;
    saveRef
      ? saveRef.addEventListener('scroll', updatePosition)
      : window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () =>
      saveRef
        ? saveRef.removeEventListener('scroll', updatePosition)
        : window.removeEventListener('scroll', updatePosition);
  }, [trackPosition, ref]);

  return scrollPosition;
};
