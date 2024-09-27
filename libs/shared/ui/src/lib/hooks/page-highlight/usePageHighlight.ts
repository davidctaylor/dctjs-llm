import {
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useDebounce } from '../debounce/useDebounce';

const abc = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
  console.log('XXX abc', e);
  return false;
}

const activeElement = (activeNodeRef: React.MutableRefObject<HTMLElement | undefined>, elem: HTMLElement) => {
  if (
    activeNodeRef.current &&
    activeNodeRef.current.getAttribute('data-component-id') ===
      elem.getAttribute('data-component-id')
  ) {
    return;
  }
  
  if (activeNodeRef.current) {
    // activeNodeRef.current.removeEventListener('click', abc);
    activeNodeRef.current.classList.remove('border-4');
    activeNodeRef.current.classList.remove('border-red-900');
  }
  
  // elem.addEventListener('click', abc)
  elem.classList.add('border-4');
  elem.classList.add('border-red-900');
  
  activeNodeRef.current = elem;
};

export const usePageHighlight = (
  highlightActive: boolean,
  ref?: RefObject<HTMLIFrameElement | null>
) => {
  const [refresh, setRefresh] = useState<number | undefined>();
  const activeNodeRef = useRef<HTMLElement | undefined>(undefined);

  const updatePosition = useMemo(() => (e: MouseEvent) => {
      if (highlightActive) {
        if ((e.target as HTMLElement).getAttribute('data-component-id')) {
          console.log((e.target as Element).getAttribute('data-component-id'));
          activeElement(activeNodeRef, e.target as HTMLElement);
          return;
        }
        let node: Node | null = (e.target as HTMLElement).parentNode;
        let found = false;
        while (node && 'getAttribute' in node && !found) {
          if ((node as Element).getAttribute('data-component-id')) {
            activeElement(activeNodeRef, node as HTMLElement);
            found = true;
          }
          node = node.parentNode;
        }
      }
    }, []);

  const debouncedRequest = useDebounce((e: MouseEvent) => {
    updatePosition(e);
  }, 15);

  useEffect(() => {
    if (!ref?.current || !refresh) {
      return;
    }

    ref.current?.contentWindow?.document.addEventListener(
      'mousemove',
      debouncedRequest,
    );

    return () => {
      ref.current?.contentWindow?.document.removeEventListener(
        'mousemove',
        updatePosition
      );
      activeNodeRef.current = undefined;
    };
  }, [ref?.current, refresh]);

  return { setRefresh };
};
