import { NextRequest, NextResponse } from 'next/server';

import { PageBuilderPromptSchema } from '@/shared-data';
import {
  instructorClient,
  INSTRUCTOR_MODEL,
} from 'apps/page-builder/src/app/instructor-client';
import {
  ASSISTANT_CONTENT,
  SYSTEM_CONTENT,
} from './page-builder-prompts';

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

  return NextResponse.json(response);
}
