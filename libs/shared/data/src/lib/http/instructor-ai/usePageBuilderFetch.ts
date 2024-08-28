'use client';

import { useEffect, useState } from 'react';

import { ApiState } from '../interfaces';
import {
  PageBuilderComponentType,
  PageBuilderPromptType,
} from './page-builder-schema';

export const usePageBuilderFetch = () => {
  const [apiState, setApiState] = useState<ApiState>(ApiState.IDLE);
  const [pageData, setPageData] = useState<PageBuilderPromptType>();
  const [userPrompt, setUserPrompt] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (!userPrompt) {
        return;
      }

      setPageData({
        prompts: {
          questions: [
            'Do you want to add a subTitle to the page?',
            'Would you like to include sections or components such as a carousel or button?',
          ],
        },
        pageContent: {
          page: {
            componentType: 'page_container' as PageBuilderComponentType,
            id: 'page-1',
            title: {
              title: 'Hello World',
              subTitle: '',
              id: 'title-1',
            },
            url: 'hello-world',
            // pageSections: [
            //   {
            //     componentType: 'page_sections' as PageBuilderComponentType,
            //     id: 'page-sections',
            sections: [
              {
                id: 'section-1',
                heading: 'Section Heading',
                componentType: 'page_section' as PageBuilderComponentType,
                components: [
                  {
                    componentType: PageBuilderComponentType.CAROUSEL,
                    id: 'carousel-1',
                    cards: [
                      {
                        componentType: PageBuilderComponentType.CARD,

                        id: 'card-1',
                        // content: '<div>hello world</div>',
                        // subTitle: 'Card title',
                        // title: 'Card title',
                        // content: '<img src="/images/great-sand-dunes.jpg">',
                        imageRef: '/images/great-sand-dunes.jpg',
                      },
                      {
                        componentType: PageBuilderComponentType.CARD,

                        id: 'card-2',
                        // content: '<div>hello world</div>',
                        // subTitle: 'Card title2',
                        // title: 'Card title2',
                        // content: '<img src="/images/garden.jpg">',
                        imageRef: '/images/garden.jpg',
                      },
                      {
                        componentType: PageBuilderComponentType.CARD,

                        id: 'card-3',
                        // content: '<div>hello world</div>',
                        // subTitle: 'Card title2',
                        // title: 'Card title2',
                        // content: '<img src="/images/rockies.jpg">',
                        imageRef: '/images/rockies.jpg',
                      },
                      {
                        componentType: PageBuilderComponentType.CARD,

                        id: 'card-4',
                        // content: '<div>hello world</div>',
                        // subTitle: 'Card title2',
                        // title: 'Card title2',
                        // content: '<img src="/images/mesa-verde.jpg">',
                        imageRef: '/images/mesa-verde.jpg',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      });

      // setApiState(ApiState.ACTIVE);
      //   try {
      //     const response = await fetch(`/api/page-builder`, {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({
      //         content: userPrompt,
      //       }),
      //     });
      //     console.log('XXX GOT1', response);
      //     setPageData(await response.json());

      //     const x = await response.json();

      //     console.log('XXX GOT', x);

      //     setApiState(ApiState.IDLE);
      //   } catch (error) {
      //     setApiState(ApiState.ERROR);
      //   }
    })();
  }, [userPrompt]);

  return [pageData, apiState, setUserPrompt] as const;
};
