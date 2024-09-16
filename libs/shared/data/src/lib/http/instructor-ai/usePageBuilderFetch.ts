'use client';

import { useEffect, useState } from 'react';

import { FetchState, FetchResponse } from '../interfaces';
import {
  PageBuilderComponentEnum,
  PageBuilderRequestType,
  PageBuilderSectionRequestType,
  PageBuilderSectionsType,
} from './page-builder-schema';
import {
  IntentClassificationEnum,
  IntentClassificationType,
} from './intent-classification-schema';

// const section: PageBuilderSectionsType = {
//   componentType: PageBuilderComponentEnum.PAGE_SECTION,
//   components: [
//     {
//       componentType: 'CAROUSEL',
//       id: 'section-1-carousel-1',
//       cards: [
//         {
//           componentType: 'CARD',
//           id: 'section-1-carousel-1-card-1',
//           imageRef: 'images/default-image.png',
//         },
//         {
//           componentType: 'CARD',
//           id: 'section-1-carousel-1-card-2',
//           title: 'card-2',
//         },
//       ],
//       // title: 'Poster images of Colorado State Parks',
//     },
//   ],
//   id: 'section-1',
// };

const resp_sestion = {
  errors: ['MyBad'],
  prompts: [
    'missing-attributes:section-1-carousel-1-card-1',
    'missing-attributes:section-1-carousel-1-card-2',
    'missing-attributes:section-2-card-1',
  ],
  sectionsContent: {
    componentType: 'PAGE_SECTION',
    components: [
      {
        id: 'section-1-carousel-1',
        componentType: 'CAROUSEL',
        cards: [
          {
            id: 'section-1-carousel-1-card-1',
            componentType: 'CARD',
            imageRef: '/images/default-image.png',
          },
          {
            id: 'section-1-carousel-1-card-2',
            componentType: 'CARD',
            imageRef: '/images/garden.jpg',
          },
        ],
        title: 'Image gallery of Colorado State Parks',
      },
    ],
    id: 'section-1',
  },
  _meta: {
    usage: {
      prompt_tokens: 1041,
      completion_tokens: 293,
      total_tokens: 1334,
    },
  },
};

export enum PageBuilderRequestTypeEnum {
  INTENT = 'INTENT',
  PAGE = 'PAGE',
  SECTION = 'SECTION',
}

export const usePageBuilderFetch = () => {
  const [apiState, setApiState] = useState<FetchResponse>({
    state: FetchState.IDLE,
  });
  const [pageData, setPageData] = useState<PageBuilderRequestType>({
    page: {
      componentType: PageBuilderComponentEnum.PAGE_CONTAINER,
      id: 'default',
      sections: [],
    },
    prompts: [],
    title: undefined,
  });
  const [userPrompt, setUserPrompt] = useState<string | undefined>(undefined);

  const fetchIntent = async (): Promise<any> => {
    const response = await fetch(`/api/page-builder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userContent:
          'Create a section with a Carousel, the title of the Carousel is "Poster images of Colorado State Parks". Add a Card with the image url "http://my/image". Add an Card with the title "card-2". Create a segment with the title "section-2" add a card with the title "secto 2 card"',
        requestType: PageBuilderRequestTypeEnum.INTENT,
      }),
    });

    const intent: IntentClassificationType = await response.json();
    console.log('XXX GOT INTENT', intent);
    return intent;
  };

  useEffect(() => {
    (async () => {
      if (!userPrompt) {
        return;
      }

      const x = false;
      if (x) {
        console.log('XXX no send...');
        setPageData({
          ...pageData,
          errors: resp_sestion.errors,
          prompts: resp_sestion.prompts,
          ...(pageData.page && {
            page: {
              ...pageData.page,
              title: {
                componentType: PageBuilderComponentEnum.PAGE_TITLE,
                title: 'Colorado State Parks',
                subTitle:
                  'Exploring the Beauty of Mesa Verde and Great Sand Dunes',
                id: 'title-1',
              },
              pageContent: {
                componentType: PageBuilderComponentEnum.CONTENT,
                content:
                  '### Mesa Verde National Park\n\nMesa Verde National Park, located in southwestern Colorado, is a UNESCO World Heritage site famous for its well-preserved Ancestral Puebloan cliff dwellings, notably the Cliff Palace. Visitors can explore a range of impressive archaeological sites that give a glimpse into the lives of the Ancestral Puebloans who lived there from approximately A.D. 600 to 1300. The park offers guided tours, hiking trails, and educational exhibits at the visitor center, making it a fantastic destination for history buffs and outdoor enthusiasts alike.\n\n### Great Sand Dunes National Park and Preserve\n\nGreat Sand Dunes National Park and Preserve, located in southern Colorado, is home to the tallest sand dunes in North America, rising up to 750 feet. This unique landscape provides a stunning contrast with the surrounding mountains and grasslands. The park offers a wide range of activities including sandboarding, hiking, and stargazing. Visitors can also explore Medano Creek, which flows at the base of the dunes seasonally, creating a beach-like environment perfect for family fun. With its striking natural beauty and diverse recreational opportunities, Great Sand Dunes is a must-visit Colorado destination.\n\n',

                id: 'content-1',
              },
              sections: [
                // ...(pageData.page.sections ? pageData.page.sections : []),
                ...(resp_sestion.sectionsContent
                  ? [resp_sestion.sectionsContent as PageBuilderSectionsType]
                  : []),
              ],
              url: 'colorado-state-parks',
            },
          }),
        });

        setApiState({ state: FetchState.IDLE });
        return;
      }

      // const intent: IntentClassificationEnum = await fetchIntent();
      // if (intent === IntentClassificationEnum.INVALID) {
      //   // setPageData({prompts: {questions: ['Unable to process request. Please try "create page" or "add section" to continue']}});
      //   console.log('XXX set inv...');
      //   // setApiState({ state: FetchState.IDLE });
      //   return;
      // }

      const userIntent: IntentClassificationEnum =
        IntentClassificationEnum.SECTION;

      try {
        const response = await fetch(`/api/page-builder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            //content: 'create a web page with the title "Colorado State Parks" and the sub title "Exploring the Beauty of Mesa Verde and Great Sand Dunes"',
            //content: 'Update the page adding the page content "hello world"',
            userContent:
              'Create a section with a Carousel, the title of the Carousel is "Image gallery of Colorado State Parks"\n. Add a Card with the image url "/images/default-image.png". Add an Card with the title "card-2". Add a MyCompt with the title "hello". Create a section with the title "section-2" add a card with the title "section 2 card"',
            // "page": {
            //     "componentType": "PAGE_CONTAINER",
            //     "title": {
            //         "componentType": "PAGE_TITLE",
            //         "title": "Colorado State Parks",
            //         "subTitle": "Exploring the Beauty of Mesa Verde and Great Sand Dunes",
            //         "id": "title-1"
            //     },
            //     "pageContent": {
            //         "content": "From assistant",
            //         "componentType": "CONTENT",
            //         "id": "page-content-1"
            //     }
            requestType: PageBuilderRequestTypeEnum.INTENT,
          }),
        });
        console.log('XXX GOT1', response);
        if (response.status !== 200) {
          setApiState({
            state: FetchState.ERROR,
            errorStatusCode: response.status,
            errorStatusText: response.statusText,
          });
          return;
        }

        const jsonData = await response.json();
        console.log('XXX GOT', jsonData);

        if (jsonData && userIntent === IntentClassificationEnum.SECTION) {
          const sectionData = jsonData as PageBuilderSectionRequestType; // PageBuilderSectionsType
          sectionData.sectionsContent;
          setPageData({
            ...pageData,
            errors: sectionData.errors,
            prompts: sectionData.errors,
            ...(pageData.page && {
              page: {
                ...pageData.page,
                sections: [
                  ...(pageData.page.sections ? pageData.page.sections : []),
                  ...(sectionData.sectionsContent
                    ? [sectionData.sectionsContent]
                    : []),
                ],
              },
            }),
          });
        } else {
          setPageData(jsonData);
        }

        // setPageData(await response.json());

        setApiState({ state: FetchState.IDLE });
      } catch (error) {
        console.log(error);

        setApiState({
          state: FetchState.ERROR,
          errorStatusCode: 500,
          errorStatusText: error instanceof Error ? error.message : '',
        });
      }
    })();
  }, [userPrompt]);

  return [pageData, apiState, setUserPrompt] as const;
};
