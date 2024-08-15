'use client';

import { useRef, useState } from 'react';
import { InstructorClient } from '@instructor-ai/instructor';

import {
  DctButton,
  DctCard,
  DctCardContent,
  DctCardTitle,
  DctCarousel,
} from '@dctjs/react';
import { FixedHeader, Sidebar } from '@/shared-ui';

import { PageBuilderForm } from './components/page-builder-form/page-builder-form';

export interface MainProps {}

export const Main = (props: MainProps) => {
  const [sidbarState, setSideBarState] = useState<{
    left: boolean;
    right: boolean;
  }>({ left: false, right: false });
  return (
    <div className="flex flex-col flex-1 main-container">
      <FixedHeader
        title="Page builder"
        sideBarEvent={(e) => {
          setSideBarState((s) => {
            const state = { ...s };
            e === 'edit'
              ? (state.right = !state.right)
              : (state.left = !state.left);
            return state;
          });
        }}
      ></FixedHeader>
      <main className="flex flex-1 overflow-hidden">
        <Sidebar
          title="Create Page"
          isOpen={sidbarState.left}
          position='left'
          openEvent={() => {
            setSideBarState((s) => ({ ...s, left: !s.left }));
          }}
        >
          <PageBuilderForm></PageBuilderForm>
        </Sidebar>
        <div className="flex flex-1 ">Center</div>
        <Sidebar
          title="Edit Page"
          isOpen={sidbarState.right}
          position='right'
          openEvent={() => {
            setSideBarState((s) => ({ ...s, right: !s.right }));
          }}
        >
          <div>Home of editor</div>
        </Sidebar>
      </main>
    </div>
  );
};
