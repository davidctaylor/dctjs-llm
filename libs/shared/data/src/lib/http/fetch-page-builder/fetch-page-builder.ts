import {
  PageBuilderRequestType,
  PageBuilderSectionRequestType,
} from './page-builder-schema';
import {
  IntentClassificationEnum,
  PageBuilderIntentClassificationType,
} from './intent-classification-schema';

import { TEST_RESPONSE } from './test-data';

export enum PageBuilderRequestTypeEnum {
  INTENT = 'INTENT',
  PAGE = 'PAGE',
  SECTION = 'SECTION',
}

const fetchIntentClassifications = async (
  pageData: PageBuilderRequestType,
  userContent: string
): Promise<PageBuilderIntentClassificationType | null> => {
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

  const intentClassifications: PageBuilderIntentClassificationType =
    await response.json();

  console.log('XXX intentClassifications', intentClassifications);
  let invalid = false;
  intentClassifications.intents.forEach((entry) => {
    if (entry.intent === IntentClassificationEnum.INVALID) {
      pageData.prompts.push(`intent-classification:${entry.text}`);
      invalid = true;
    }
  });

  return invalid ? null : intentClassifications;
};

const fetchPageData = async (
  pageData: PageBuilderRequestType,
  intent: { intent: IntentClassificationEnum; text?: string | undefined }
): Promise<PageBuilderRequestType> => {
  const response = await fetch(`/api/page-builder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userContent: intent.text,
      requestType: intent.intent,
      payload: JSON.stringify({
        prompts: [],
        ...(intent.intent === IntentClassificationEnum.SECTION && {components: pageData.page?.sections,})
      }),
    }),
  });

  if (response.status !== 200) {
    throw { message: response.statusText, status: response.status };
  }

  const responseJson = await response.json();
  console.log('XXX fetchPageData', intent.intent, responseJson);

  if (responseJson && intent.intent === IntentClassificationEnum.PAGE) {
    const data = responseJson as PageBuilderRequestType;

    return {
      ...pageData,
      prompts: [...pageData.prompts, ...data.prompts],
      ...(pageData.page && {
        page: {
          ...pageData.page,
          ...data.page,
          sections: [
            ...(pageData.page.sections ? pageData.page.sections : []),
          ],
        },
      }),
    };
  }

  if (responseJson && intent.intent === IntentClassificationEnum.SECTION) {
    const data = responseJson as PageBuilderSectionRequestType;

    return {
      ...pageData,
      prompts: [...pageData.prompts, ...data.prompts],
      ...(pageData.page && {
        page: {
          ...pageData.page,
          sections: [
            // ...(pageData.page.sections ? pageData.page.sections : []),
            ...(data.components
              ? [...data.components]
              : pageData.page.sections ? pageData.page.sections : []),
          ],
        },
      }),
    };
  }

  return pageData;
};

export const fetchPageBuilder = async (
  userContent: string,
  pageData: PageBuilderRequestType
): Promise<PageBuilderRequestType> => {
  const x = false;
  if (x) {
    return {
      ...pageData,
      prompts: [],
      page: TEST_RESPONSE,
    };
  }

  pageData.prompts = [];

  try {
    const intentClassifications: PageBuilderIntentClassificationType | null =
      await fetchIntentClassifications(pageData, userContent);

    if (!intentClassifications) {
      return pageData;
    }

    pageData.prompts = [];

    for await (const intent of intentClassifications.intents) {
      pageData = await fetchPageData(pageData, intent);
    }

    console.log('XXX final page:', pageData)

    return pageData;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
