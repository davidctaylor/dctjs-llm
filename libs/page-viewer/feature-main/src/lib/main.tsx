'use client';

import { useState } from 'react';

import { usePostMessage } from '@/shared-ui';
import { loadComponents } from './utils/load-components/load-components';
import { PageBuilderType } from '@/shared-data';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MainProps {}

export const Main: React.FC<MainProps> = () => {

  const [pageState, setPageState] = useState<PageBuilderType>();

  usePostMessage('*', {mesgType: 'page-builder', cb: (mesg: unknown) => {
    setPageState(mesg as PageBuilderType);
  }});

  return (
    <div className="flex flex-col flex-1 w-full">
      <header className="p-6 bg-indigo-50 text-center w-full">
        <p>ACME Dynamic Page Co.</p>
      </header>
      <main className="container mx-auto">
        {pageState && loadComponents(pageState)}
      </main>
      
      <div className="bg-green-50 min-h-[1000px]"></div>
      <div >PAGE EMD</div>
    </div>
  );
};
