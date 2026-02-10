import { unified } from 'unified';
import markdown from 'remark-parse';
import html from 'remark-html';

export default async function markdownToHtml(markdownContent: string) {
  const result = await unified()
    .use(markdown)
    .use(html)
    .process(markdownContent);
    
  return result.toString();
}