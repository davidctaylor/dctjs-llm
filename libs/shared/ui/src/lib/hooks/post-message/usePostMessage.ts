import { RefObject, useCallback, useEffect } from 'react';

export interface PostMessageEventType {
  mesgType: string;
  cb: (mesg: unknown) => void;
}

export const usePostMessage = (
  origin: string,
  eventHandler?: PostMessageEventType,
  ref?: RefObject<HTMLIFrameElement | null>
) => {
  const sendMessage = (mesgType: string, mesg: object) => {
    ref?.current?.contentWindow?.postMessage({ mesgType, mesg }, origin);

  };

  const sendParent = (mesgType: string, mesg: object, ref?: RefObject<HTMLIFrameElement | null>) => {
    if (ref?.current) {
      ref.current.contentWindow?.postMessage({ mesgType, mesg }, origin);
      return;
    }
    window.parent.postMessage({ mesgType, mesg }, origin)
  };

  const onMessageEvent = useCallback(
    ({ data }: MessageEvent) => {
      if (data.mesgType === eventHandler?.mesgType) {
        eventHandler?.cb(data.mesg);
      }
    },
    [eventHandler]
  );

  useEffect(() => {
    window.addEventListener('message', onMessageEvent);

    return () => window.removeEventListener('message', onMessageEvent);
  }, [origin, onMessageEvent]);

  return { sendMessage, sendParent };
};
