'use client';

import { useRef, useState } from 'react';
import Markdown from 'marked-react';

import { FixedHeader, Sidebar, usePostMessage } from '@/shared-ui';

import { loadComponents } from './utils/load-components/load-components';
import { PageBuilderComponentType, PageBuilderType } from '@/shared-data';

export interface MainProps {}

export const Main: React.FC<MainProps> = () => {

  const [pageState, setPageState] = useState<PageBuilderType>();

  usePostMessage('*', {mesgType: 'page-builder', cb: (mesg: unknown) => {
    setPageState(mesg as PageBuilderType);
  }});

  return (
    <div className="flex flex-col flex-1 mx-auto w-full">
      <header className="p-4 bg-indigo-50 text-center w-full">
        <p>ACME Dynamic Page Co.</p>
      </header>
      {pageState && loadComponents(pageState)}
    </div>
  );
};
