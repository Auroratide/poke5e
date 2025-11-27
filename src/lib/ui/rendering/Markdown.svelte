<script lang="ts">
	import { renderMarkdown, type MarkdownString } from "./markdown"

	export let value: MarkdownString
</script>

{@html renderMarkdown(value)}
