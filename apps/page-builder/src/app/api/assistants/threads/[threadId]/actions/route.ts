import { aiClient, aiAssistantId } from 'apps/page-builder/src/app/open-ai-client';

// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  const { toolCallOutputs, runId } = await request.json();


  console.log('XXX send');

  const stream = aiClient.beta.threads.runs.submitToolOutputsStream(
    threadId,
    runId,
    // { tool_outputs: [{ output: result, tool_call_id: toolCallId }] },
    { tool_outputs: toolCallOutputs }
  );

  return new Response(stream.toReadableStream());
}
