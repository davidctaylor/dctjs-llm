export type PageBuilderMessageType = 'assistant' | 'error' | 'user' ;
export interface PageBuilderMessage {
  role: PageBuilderMessageType;
  text: string;
};