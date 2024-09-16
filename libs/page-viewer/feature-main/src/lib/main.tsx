'use client';

import { useEffect, useState } from 'react';

import { usePostMessage } from '@/shared-ui';
import { loadComponent, loadComponents } from './utils/load-components/load-components';
import { PageBuilderType } from '@/shared-data';
import { PageContainer } from './components/page-container/page-container';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MainProps {}

export const Main: React.FC<MainProps> = () => {

  const [pageObject, setPageObject] = useState<PageBuilderType>();

  usePostMessage('*', {mesgType: 'page-builder', cb: (mesg: unknown) => {
    const x = mesg as PageBuilderType;
    setPageObject(x);
    console.log('XXX GOT VIEW2', x);
    console.log('XXX GOT VIEW2', pageObject);
  }});


  return (
    <div className="flex flex-col flex-1 w-full">
      <header className="p-6 bg-violet-900 text-white text-center w-full">
        <p>ACME Dynamic Page Co.</p>
      </header>
      <main className="container mx-auto">
        {pageObject && loadComponent(pageObject.componentType, pageObject)}
        {/* {pageState && loadComponents(pageState)} */}
      </main>
      
      <div className="min-h-[1000px]"></div>
      <div >PAGE EMD</div>
    </div>
  );
};
