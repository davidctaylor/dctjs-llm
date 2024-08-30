'use client';

import { useRef } from 'react';

import { Sidebar } from '@/shared-ui';
import { Header } from './components/header/header';
import { PageBuilderForm } from './components/page-builder-form/page-builder-form';

import { MainActions, MainProvider, InitializeMainContext } from './main.provider';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MainProps {}

export const Main = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const mainContext = InitializeMainContext();

  return (
    <MainProvider ctx={mainContext} iframeRef={iframeRef}>
      <div className="flex flex-col flex-1 main-container overflow-scroll">
        <Header
          sideBarEvent={(e) => {
            mainContext.dispatch({ type: e === 'edit' ? MainActions.SIDEBAR_RIGHT : MainActions.SIDEBAR_LEFT, payload: null })
          }}
        ></Header>
        <main className="flex flex-1 overflow-hidden">
          <Sidebar
            title="Create Page"
            isOpen={mainContext.state?.sidebarState.left}
            position="left"
            openEvent={() => mainContext.dispatch({ type: MainActions.SIDEBAR_LEFT, payload: null })}
          >
            <PageBuilderForm></PageBuilderForm>
          </Sidebar>
          <div className="flex flex-col flex-1">
            <iframe
              title="Page builder active page viewe"
              src="page-viewer"
              className="flex-1 overflow-hidden"
              ref={iframeRef}
            ></iframe>
          </div>
          <Sidebar
            title="Edit Page"
            isOpen={mainContext.state?.sidebarState.right}
            position="right"
            openEvent={() => mainContext.dispatch({ type: MainActions.SIDEBAR_RIGHT, payload: null })}
          >
            <div>Home of editor</div>
          </Sidebar>
        </main>
      </div>
    </MainProvider>
  );
};
