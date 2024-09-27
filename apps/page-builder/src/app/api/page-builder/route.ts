import { NextRequest, NextResponse } from 'next/server';

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

export const runtime = 'nodejs';

const systemContent = (requestType: PageBuilderRequestTypeEnum, payload: any) => {
  switch (requestType) {
    case PageBuilderRequestTypeEnum.INTENT:
      return INTENT_SYSTEM_CONTENT;
    case PageBuilderRequestTypeEnum.PAGE:
      return PAGE_SYSTEM_CONTENT;
    case PageBuilderRequestTypeEnum.SECTION:
      return `${SECTION_SYSTEM_CONTENT}\n####\n${payload}\n####\n`;
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
      return { schema: PageBuilderSectionsRequestSchema, name: 'PageSectionsBuilder' };
  }
};

export async function POST(request: NextRequest) {
  const { userContent, requestType, payload } = await request.json();

  const reqType = PageBuilderRequestTypeEnum[requestType as PageBuilderRequestTypeEnum];
  if (!reqType) {
    return { message: `Invalid or missing request type ${requestType}` };
  }
  console.log('XXX intent', requestType);
  console.log('XXX userContent', userContent);
  console.log('XXX payload', payload);
  
  const messages: any[] = [
    { role: 'system', content: systemContent(reqType, payload)},
    // ...(payload
    //   ? [
    //       {
    //         role: 'assistant' as ChatCompletionRole,
    //         content: assistantContent(reqType, payload),
    //       },
    //     ]
    //   : []),
    { role: 'user', content: userContent },
  ];

  const response = await instructorClient.chat.completions.create({
    messages,
    model: INSTRUCTOR_MODEL,
    response_model: responseModel(reqType),
  });

  // console.log('XXX resp.', response);

  return NextResponse.json(response);
}
