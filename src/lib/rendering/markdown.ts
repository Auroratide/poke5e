import { marked } from "marked"

export type MarkdownString = string

export function renderMarkdown(md: MarkdownString): string {
	return marked.parse(md, { async: false })
}
