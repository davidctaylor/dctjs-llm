import { RefObject, useEffect, useMemo, useRef, useState } from 'react';

import { useDebounce, useScrollPosition } from '@/shared-ui';

const mouseOverRect = (e: { x: number; y: number }, rect: DOMRect): boolean => {
  return (
    e.x >= rect.left &&
    e.x <= rect.right &&
    e.y >= rect.top &&
    e.y <= rect.bottom
  );
};

const activeElement = (
  activeNodeRef: React.MutableRefObject<HTMLElement | undefined>,
  elem: HTMLElement
) => {
  if (
    activeNodeRef.current &&
    activeNodeRef.current.getAttribute('data-component-id') ===
      elem.getAttribute('data-component-id')
  ) {
    return;
  }

  if (activeNodeRef.current) {
    activeNodeRef.current.classList.remove('border-4');
    activeNodeRef.current.classList.remove('border-red-900');
  }

  elem.classList.add('border-4');
  elem.classList.add('border-red-900');

  activeNodeRef.current = elem;
};

export const usePageHighlight = (
  highlightActive: boolean,
  iframeRef?: RefObject<HTMLIFrameElement | null>,
  overlayRef?: RefObject<HTMLDivElement | null>
) => {
  const [refresh, setRefresh] = useState<number | undefined>();
  const activeNodeRef = useRef<HTMLElement | undefined>();
  const activeNodesRef = useRef<Element[]>([]);

  const updatePosition = useMemo(
    () => (e: MouseEvent) => {
      if (!overlayRef?.current) {
        return;
      }

      if (highlightActive) {
        const coords = {
          x: e.clientX - overlayRef?.current?.getBoundingClientRect().left,
          y: e.clientY - overlayRef?.current?.getBoundingClientRect().top,
        };

        

        activeNodesRef.current.some((node) => {
          if (mouseOverRect(coords, node.getBoundingClientRect())) {
            activeElement(activeNodeRef, node as HTMLElement);
            return true;
          }

          return false;
        });
      }
    },
    [overlayRef?.current]
  );

  const debouncedRequest = useDebounce((e: MouseEvent) => {
    updatePosition(e);
  }, 15);

  useEffect(() => {
    if (!iframeRef?.current || !overlayRef?.current || !refresh) {
      return;
    }

    const abortCtrl = new AbortController();

    const nodes: NodeListOf<Element> | undefined =
      iframeRef?.current?.contentWindow?.document.querySelectorAll(
        '[data-component-id]'
      );
    nodes && (activeNodesRef.current = Array.from(nodes).reverse());

    const h: number | undefined = iframeRef?.current?.contentWindow?.document.querySelector('body')?.getBoundingClientRect().height;
    h && (overlayRef.current.style.height = `${h + 100}px`);

    overlayRef?.current?.addEventListener(
      'click',
      () => {
        console.log('XXX click', activeNodeRef.current);
      },
      { signal: abortCtrl.signal }
    );

    overlayRef?.current?.parentElement?.addEventListener(
      'scroll',
      () => {
        if (iframeRef.current && overlayRef.current?.parentElement) {
          iframeRef.current.style.top = `${overlayRef.current.parentElement.scrollTop * -1}px`;
        }
      },
      { signal: abortCtrl.signal }
    );

    overlayRef?.current?.addEventListener(
      'mousemove',
      debouncedRequest, // (e) => updatePosition(e)
      { signal: abortCtrl.signal }
    );

    return () => {
      abortCtrl.abort();
      activeNodeRef.current = undefined;
    };
  }, [overlayRef?.current, refresh]);

  return { setRefresh };
};
