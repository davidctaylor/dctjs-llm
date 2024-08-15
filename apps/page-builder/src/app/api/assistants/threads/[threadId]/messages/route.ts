import { NextRequest, NextResponse } from 'next/server'

import { aiClient, aiAssistantId } from 'apps/page-builder/src/app/open-ai-client';

export const runtime = 'nodejs';

// Send a new message to a thread
export async function POST(request: NextRequest, { params } : {params: { threadId: string } }) {
  const { content } = await request.json();

  await aiClient.beta.threads.messages.create(params.threadId, {
    role: 'user',
    content: content,
  });

  const stream = aiClient.beta.threads.runs.stream(params.threadId, {
    assistant_id: aiAssistantId,
  });

  return new Response(stream.toReadableStream());
}
