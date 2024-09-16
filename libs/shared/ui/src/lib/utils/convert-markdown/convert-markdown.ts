import { marked } from 'marked';
import { mangle } from 'marked-mangle';

marked.use(mangle(), { headerIds: false });

export const convertMarkdown = (content: string) => {
  return marked.parse(content);
};
