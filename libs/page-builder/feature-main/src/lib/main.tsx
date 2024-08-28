'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { InstructorClient } from '@instructor-ai/instructor';

import {
  DctButton,
  DctCard,
  DctCardContent,
  DctCardTitle,
  DctCarousel,
} from '@dctjs/react';
import { FixedHeader, Sidebar, usePostMessage } from '@/shared-ui';

import { PageBuilderForm } from './components/page-builder-form/page-builder-form';
import { PageBuilderComponentType, PageBuilderType } from '@/shared-data';

import { MainActions, MainProvider, initializeMainContext } from './main.provider';

export interface MainProps {}

export const Main = (props: MainProps) => {

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const mainContext = initializeMainContext();

  return (
    <MainProvider ctx={mainContext} iframeRef={iframeRef}>
      <div className="flex flex-col flex-1 main-container">
        <FixedHeader
          title="Page builder"
          sideBarEvent={(e) => {
            mainContext.dispatch({ type: e === 'edit' ? MainActions.SIDEBAR_RIGHT : MainActions.SIDEBAR_LEFT, payload: null })
          }}
        ></FixedHeader>
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
              src="page-viewer"
              className="flex-1"
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
