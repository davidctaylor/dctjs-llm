import { aiClient } from 'apps/page-builder/src/app/open-ai-client';

export const runtime = 'nodejs';

// Create a new thread
export async function POST() {
  const thread = await aiClient.beta.threads.create();
  return Response.json({ threadId: thread.id });
}
