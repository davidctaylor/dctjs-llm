import { marked } from 'marked';
import { mangle } from 'marked-mangle';

marked.use(mangle());

export const convertMarkdown = (content: string) => {
  return marked.parse(content);
}
