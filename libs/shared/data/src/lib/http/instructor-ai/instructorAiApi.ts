import { AssistantStream } from 'openai/lib/AssistantStream';
import { AssistantStreamEvent } from 'openai/resources/beta/assistants';

export const postPageBbuilder = async (mesg: string) => {
  const response = await fetch(`/api/page-builder`, {
    method: 'POST',
    body: JSON.stringify({
      content: mesg,
    }),
  });

  return await response.json();
  // if (response.body) {
  //   return AssistantStream.fromReadableStream(response.body);
  // }
  throw new Error('Invalid response');
};

