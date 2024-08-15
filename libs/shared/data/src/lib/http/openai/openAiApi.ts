import { AssistantStream } from 'openai/lib/AssistantStream';
import { AssistantStreamEvent } from 'openai/resources/beta/assistants';

export const postMessage = async (threadId: string, mesg: string) => {
  const response = await fetch(`/api/assistants/threads/${threadId}/messages`, {
    method: 'POST',
    body: JSON.stringify({
      content: mesg,
    }),
  });

  if (response.body) {
    return AssistantStream.fromReadableStream(response.body);
  }
  throw new Error('Invalid response');
};

export const postActionResult = async (
  threadId: string,
  runId: string,
  toolCallOutputs: unknown,
) => {

    console.log('XXX post...');
  const response = await fetch(`/api/assistants/threads/${threadId}/actions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      runId: runId,
      toolCallOutputs: toolCallOutputs,
    }),
  });

  if (response.body) {
    return AssistantStream.fromReadableStream(response.body);
  }
  throw new Error('Invalid response');
};
