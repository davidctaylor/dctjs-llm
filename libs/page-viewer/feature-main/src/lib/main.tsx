'use client';

import { useEffect, useRef, useState } from 'react';

import { usePostMessage } from '@/shared-ui';
import { loadComponent } from './utils/load-components/load-components';
import { PageBuilderType } from '@/shared-data';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MainProps {}

export const Main: React.FC<MainProps> = () => {
  const [pageObject, setPageObject] = useState<PageBuilderType>();

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { sendMessage, sendParent } = usePostMessage('*', {
    mesgType: 'page-load',
    cb: (mesg: unknown) => {
      setPageObject(mesg as PageBuilderType);
    },
  });

  useEffect(() => {
    if (!pageObject) {
      return;
    }
    setTimeout(() => sendParent('page-rendered', { timestamp: Date.now() }), 50);
  }, [pageObject]);

  return (
    <div className="flex flex-col flex-1 w-full h-full" ref={iframeRef}>
      <header className="p-6 bg-violet-900 text-white text-center w-full">
        <p>ACME Dynamic Page Co.</p>
      </header>
      <main className="container mx-auto">
        {pageObject && loadComponent(pageObject.componentType, pageObject)}
      </main>
    </div>
  );
};
