'use client';

import { useRef } from 'react';

import { Sidebar, usePageHighlight, usePostMessage } from '@/shared-ui';
import { Header } from './components/header/header';
import { PromptForm } from './components/prompt-form/prompt-form';

import { MainActions, MainProvider, InitializeMainContext } from './main.provider';
import { PromptEditor } from './components/prompt-editor/prompt-editor';

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
            <PromptForm></PromptForm>
          </Sidebar>
          <div className="flex flex-col flex-1  relative">
            <iframe
              title="Page builder active page view"
              src="page-viewer"
              className="flex-1 overflow-hidden"
              ref={iframeRef}
            ></iframe>
            <div className="flex-1 overflow-hidden absolute top-0 left-0 pointer-events-none hover:pointer-events-auto bg-transparent  h-full w-full"
            tabIndex={0}
              onClick={(e) => {
                console.log('XXX overlay');
                e.stopPropagation();
                e.preventDefault();
              }}
            ></div>
          </div>
          <Sidebar
            title="Edit Page"
            isOpen={mainContext.state?.sidebarState.right}
            position="right"
            openEvent={() => mainContext.dispatch({ type: MainActions.SIDEBAR_RIGHT, payload: null })}
          >
            <PromptEditor></PromptEditor>
          </Sidebar>
        </main>
      </div>
    </MainProvider>
  );
};
