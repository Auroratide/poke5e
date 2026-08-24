<script lang="ts">
	import { SrdDocumentation } from "$lib/srd/SrdDocumentation"
	import { CodeBlock } from "$lib/ui/elements"
	import type { OpenAPIV3_1 } from "openapi-types"

	let {
		value,
	}: {
		value: OpenAPIV3_1.SchemaObject
	} = $props()

	const tokens = $derived(SrdDocumentation.humanReadableSchema(value))
</script>

<CodeBlock title="Schema">
	{#each tokens as token}
		{#if token.kind === "line"}
			<br /><span class="indent">{"\t".repeat(token.indent)}</span>
		{:else if token.kind === "reference"}
			<span class="{token.kind}"><a href="#{token.linkTo}">{token.text}</a></span>
		{:else}
			<span class="{token.kind}">{token.text}</span>
		{/if}
	{/each}
</CodeBlock>