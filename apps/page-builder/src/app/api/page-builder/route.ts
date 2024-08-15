import { NextRequest, NextResponse } from 'next/server';

import { PageBuilderPromptSchema } from '@/shared-data';

import {
  instructorClient,
  INSTRUCTOR_MODEL,
} from 'apps/page-builder/src/app/instructor-client';
import {
  // PageBuilderPromptSchema,
  ASSISTANT_CONTENT,
  SYSTEM_CONTENT,
} from './page-builder-schema';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { content } = await request.json();

  const response = await instructorClient.chat.completions.create({
    messages: [
      { role: 'system', content: SYSTEM_CONTENT },
      {
        role: 'user',
        content: content,
      },
      { role: 'assistant', content: ASSISTANT_CONTENT },
    ],
    model: INSTRUCTOR_MODEL,
    response_model: {
      schema: PageBuilderPromptSchema,
      name: 'PageBuilder',
    },
  });

  console.log('XXX ins', response._meta, response.page, response.prompts);

  const x = JSON.stringify(response);
  console.log('XXX x', x);

  return NextResponse.json(response);
  // return new Response(x);
}
