import { NextRequest, NextResponse } from 'next/server';
import { zodFunction } from 'openai/helpers/zod';

import {
  IntentClassificationSchema,
  PageBuilderRequestSchema,
  PageBuilderSectionsRequestSchema,
  PageBuilderRequestTypeEnum,
} from '@/shared-data';
import {
  instructorClient,
  INSTRUCTOR_MODEL,
} from 'apps/page-builder/src/app/instructor-client';
import { INTENT_SYSTEM_CONTENT } from './intent-classification-prompts';
import { PAGE_SYSTEM_CONTENT } from './page-main-prompts';
import {
  SECTION_ASSISTANT_CONTENT,
  SECTION_SYSTEM_CONTENT,
} from './page-section-prompts';
import z from 'zod';
import {
  ChatCompletionMessageParam,
  ChatCompletionRole,
} from 'openai/resources/chat/completions';

export const runtime = 'nodejs';

const systemContent = (requestType: PageBuilderRequestTypeEnum) => {
  switch (requestType) {
    case PageBuilderRequestTypeEnum.INTENT:
      return INTENT_SYSTEM_CONTENT;
    case PageBuilderRequestTypeEnum.PAGE:
      return PAGE_SYSTEM_CONTENT;
    case PageBuilderRequestTypeEnum.SECTION:
      return SECTION_SYSTEM_CONTENT;
  }
};

const assistantContent = (
  requestType: PageBuilderRequestTypeEnum,
  payload: any
) => {
  switch (requestType) {
    case PageBuilderRequestTypeEnum.INTENT:
      return '';
    case PageBuilderRequestTypeEnum.PAGE:
      return '';
    case PageBuilderRequestTypeEnum.SECTION:
      return `${SECTION_ASSISTANT_CONTENT}${JSON.stringify(payload)}`;
  }
};

const responseModel = (requestType: PageBuilderRequestTypeEnum) => {

  switch (requestType) {
    case PageBuilderRequestTypeEnum.INTENT:
      return {
        schema: IntentClassificationSchema,
        name: 'IntentClassification',
      };
    case PageBuilderRequestTypeEnum.PAGE:
      return { schema: PageBuilderRequestSchema, name: 'PageBuilder' };
    case PageBuilderRequestTypeEnum.SECTION:
      // return { schema: PageBuilderPromptSchema, name: 'PageBuilder' };
      return { schema: PageBuilderSectionsRequestSchema, name: 'PageSectionsBuilder' };
  }
};

export async function POST(request: NextRequest) {
  const { userContent, requestType, payload } = await request.json();

  const reqType = PageBuilderRequestTypeEnum[requestType as PageBuilderRequestTypeEnum];
  if (!reqType) {
    return { message: `Invalid or missing request type ${requestType}` };
  }
  console.log('XXX userContent', userContent);
  console.log('XXX system', systemContent(reqType));

  const messages: any[] = [
    { role: 'system', content: systemContent(reqType) },
    ...(payload
      ? [
          {
            role: 'assistant' as ChatCompletionRole,
            content: assistantContent(reqType, payload),
          },
        ]
      : []),
    { role: 'user', content: userContent },
  ];

  // const s = async () => {
  //   const response = await instructorClient.chat.completions.create({
  //     messages,
  //     model: INSTRUCTOR_MODEL,
  //     response_model: { schema: SearchSchema, name: 'Multi Search' }, // responseModel(requestType),
  //   });
  //   return response;
  // };

  const response = await instructorClient.chat.completions.create({
    messages,
    model: INSTRUCTOR_MODEL,
    response_model: responseModel(reqType),
  });

  // console.log('XXX resp.', response);

  return NextResponse.json(response);
}


  // const SearchTypeSchema = z
  //   .enum(['VIDEO', 'EMAIL'])
  //   .describe(
  //     'Enumeration representing the types of searchs that can be performed'
  //   );

  // const SearchSchema = z
  //   .object({
  //     title: z.string().describe('Title of the request'),
  //     query: z.string().describe('Query to search fro relevant content'),
  //     type: SearchTypeSchema.describe('Type of search'),
  //   })
  //   .describe(
  //     'Object representing a single search query which contains title, query, and the search type'
  //   );

  // type Search = z.infer<typeof SearchSchema>;

  // async function executeSearch(search: any) {
  //   return Promise.resolve([
  //     {
  //       url: 'ing1',
  //       altText: 'Some alt',
  //     },
  //   ]);
  // }
