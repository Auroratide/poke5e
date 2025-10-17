import { browser } from "$app/environment"
import { marked } from "marked"
import DomPurify from "dompurify"

export type MarkdownString = string

export function renderMarkdown(md: MarkdownString): string {
	if (browser) {
		return DomPurify.sanitize(marked.parse(md, { async: false }))
	} else {
		return marked.parse(md, { async: false })
	}
}
