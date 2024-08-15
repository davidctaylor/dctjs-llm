
export type PageBuilderMessageType = 'user' | 'assistant';
export interface PageBuilderMessage {
  role: PageBuilderMessageType;
  text: string;
};