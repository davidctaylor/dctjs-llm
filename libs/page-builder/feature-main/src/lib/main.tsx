'use client';

import { useRef } from 'react';

import { Sidebar } from '@/shared-ui';
import { Header } from './components/header/header';
import { PromptForm } from './components/prompt-form/prompt-form';

import {
  MainActions,
  MainProvider,
  InitializeMainContext,
} from './main.provider';
import { PromptEditor } from './components/prompt-editor/prompt-editor';
import { PageHelp } from './components/page-help/page-help';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MainProps {}

export const Main = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mainContext = InitializeMainContext();

  let editMode = false;

  return (
    <MainProvider
      ctx={mainContext}
      iframeRef={iframeRef}
      overlayRef={overlayRef}
    >
      <div className="flex flex-col flex-1 main-container overflow-scroll">
        <Header
          sideBarEvent={(e) => {
            let isOpen = mainContext.state.sidebarState.right.open;

            mainContext.dispatch({
              type:
                e === 'edit' || e === 'help'
                  ? MainActions.SIDEBAR_RIGHT
                  : MainActions.SIDEBAR_LEFT,
              payload:
                e === 'update' ? 'create' : e === 'help' ? 'help' : 'edit',
            });

            if (isOpen && e !== mainContext.state.sidebarState.right.mode) {
              setTimeout(() => {
                mainContext.dispatch({
                  type:
                    e === 'edit' || e === 'help'
                      ? MainActions.SIDEBAR_RIGHT
                      : MainActions.SIDEBAR_LEFT,
                  payload:
                    e === 'update' ? 'create' : e === 'help' ? 'help' : 'edit',
                });
              }, 175);
            }
          }}
        ></Header>
        <main className="flex flex-1 overflow-hidden">
          <Sidebar
            title="Create Page"
            isOpen={mainContext.state?.sidebarState.left.open}
            position="left"
            openEvent={() =>
              mainContext.dispatch({
                type: MainActions.SIDEBAR_LEFT,
                payload: null,
              })
            }
          >
            <PromptForm></PromptForm>
          </Sidebar>
          <div className="flex flex-1 relative h-auto">
            {editMode && (
              <div className="w-full h-full overflow-scroll">
                <div
                  className="w-full h-full pointer-events-auto"
                  ref={overlayRef}
                ></div>
              </div>
            )}
            <iframe
              title="Page builder active page view "
              src="page-viewer"
              className={`flex-1 h-full w-full absolute top-0 left-0 ${
                editMode ? 'pointer-events-none ' : ''
              }`}
              ref={iframeRef}
            ></iframe>
          </div>
          <Sidebar
            title={
              mainContext.state?.sidebarState.right.mode === 'help'
                ? 'Help'
                : 'Edit Page'
            }
            isOpen={mainContext.state?.sidebarState.right.open}
            position="right"
            openEvent={() =>
              mainContext.dispatch({
                type: MainActions.SIDEBAR_RIGHT,
                payload: null,
              })
            }
          >
            {mainContext.state?.sidebarState.right.mode === 'edit' ? (
              <PromptEditor />
            ) : (
              <PageHelp />
            )}
          </Sidebar>
        </main>
      </div>
    </MainProvider>
  );
};
