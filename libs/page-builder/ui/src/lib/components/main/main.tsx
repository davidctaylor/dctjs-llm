'use client';

import {
  DctButton,
  DctCard,
  DctCardContent,
  DctCardTitle,
  DctCarousel,
} from '@dctjs/react';

import { LlmInput } from '../llm-input/llm-input';

// import { useArticleCollection } from '../../hooks';
// import { Article } from '@dctjs/apps/core/server';
import { useRef } from 'react';

export interface MainProps {}

export const Main = (props: MainProps) => {
  // const [articles] = useArticleCollection();
  // const carouselExpanded = useRef<boolean>(true);

  return (
    <div className="flex flex-col w-full">
      <LlmInput></LlmInput>
    </div>
  );
};
