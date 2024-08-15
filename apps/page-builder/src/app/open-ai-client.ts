import OpenAI from 'openai';

export const aiAssistantId: string = process.env.OPENAI_ASSISTANT_ID || '';

export const oaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? undefined,
  organization: process.env.OPENAI_ORG_ID ?? undefined,
});
