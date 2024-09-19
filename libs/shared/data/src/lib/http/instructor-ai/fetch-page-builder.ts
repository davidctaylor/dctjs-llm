import {
  PageBuilderComponentEnum,
  PageBuilderRequestType,
  PageBuilderSectionRequestType,
  PageBuilderSectionsType,
} from './page-builder-schema';
import {
  IntentClassificationEnum,
  PageBuilderIntentClassificationType,
} from './intent-classification-schema';

const resp_sestion = {
  prompts: [
    `intent-classification:my-bad`,
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

const testRespose = (pageData: PageBuilderRequestType | undefined) => {
  console.log('XXX no send...');
  return Promise.resolve({
    ...pageData,
    prompts: resp_sestion.prompts,
    ...(pageData?.page && {
      page: {
        ...pageData.page,
        title: {
          componentType: PageBuilderComponentEnum.PAGE_TITLE,
          title: 'Colorado State Parks',
          subTitle: 'Exploring the Beauty of Mesa Verde and Great Sand Dunes',
          id: 'title-1',
        },
        pageContent: {
          componentType: PageBuilderComponentEnum.CONTENT,
          content:
            '### Mesa Verde National Park\n\nMesa Verde National Park, located in southwestern Colorado, is a UNESCO World Heritage site famous for its well-preserved Ancestral Puebloan cliff dwellings, notably the Cliff Palace. Visitors can explore a range of impressive archaeological sites that give a glimpse into the lives of the Ancestral Puebloans who lived there from approximately A.D. 600 to 1300. The park offers guided tours, hiking trails, and educational exhibits at the visitor center, making it a fantastic destination for history buffs and outdoor enthusiasts alike.\n\n### Great Sand Dunes National Park and Preserve\n\nGreat Sand Dunes National Park and Preserve, located in southern Colorado, is home to the tallest sand dunes in North America, rising up to 750 feet. This unique landscape provides a stunning contrast with the surrounding mountains and grasslands. The park offers a wide range of activities including sandboarding, hiking, and stargazing. Visitors can also explore Medano Creek, which flows at the base of the dunes seasonally, creating a beach-like environment perfect for family fun. With its striking natural beauty and diverse recreational opportunities, Great Sand Dunes is a must-visit Colorado destination.\n\n',

          id: 'content-1',
        },
        sections: [
          ...(resp_sestion.sectionsContent
            ? [resp_sestion.sectionsContent as PageBuilderSectionsType]
            : []),
        ],
        url: 'colorado-state-parks',
      },
    }),
  });
};

const fetchIntentClassifications = async (
  userContent: string
): Promise<PageBuilderIntentClassificationType> => {
  const response = await fetch(`/api/page-builder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userContent,
      requestType: PageBuilderRequestTypeEnum.INTENT,
    }),
  });

  if (response.status !== 200) {
    throw { message: response.statusText, status: response.status };
  }

  const responseJson: PageBuilderIntentClassificationType =
    await response.json();
  console.log('XXX GOT INTENT', response.status, responseJson);

  return responseJson;
};

export const fetchPageBuilder = async (
  userContent: string,
  pageData: PageBuilderRequestType
): Promise<PageBuilderRequestType> => {
  const x = true;
  if (x) {
    return testRespose(pageData);
  }

  const userIntent: IntentClassificationEnum = IntentClassificationEnum.SECTION;

  pageData.prompts = [];

  try {
    const intentClassifications: PageBuilderIntentClassificationType =
      await fetchIntentClassifications(userContent);
    console.log('XXX intentClassifications', intentClassifications);
    let invalid = false;
    intentClassifications.intents.forEach((entry) => {
      console.log('XXX itent', entry);
      if (entry.intent === IntentClassificationEnum.INVALID) {
        pageData.prompts.push(`intent-classification:${entry.text}`);
        invalid = true;
      }
    });

    if (invalid) {
      return pageData;
    }

    const response = await fetch(`/api/page-builder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userContent,
        pageData,
        requestType: PageBuilderRequestTypeEnum.INTENT,
      }),
    });
    console.log('XXX GOT1', response);

    if (response.status !== 200) {
      throw { message: response.statusText, status: response.status };
    }

    const responseJson = await response.json();
    console.log('XXX GOT', responseJson);

    if (responseJson && userIntent === IntentClassificationEnum.SECTION) {
      const sectionData = responseJson as PageBuilderSectionRequestType;
      return {
        ...pageData,
        prompts: sectionData.prompts,
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
      };
    }

    return pageData;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
