import { marked } from "marked"
import DomPurify from "dompurify"

export type MarkdownString = string

export function renderMarkdown(md: MarkdownString): string {
	return DomPurify.sanitize(marked.parse(md, { async: false }))
}
