<script lang="ts">
	import type { OpenApiSpecification } from "$lib/srd/openapi"
	import { SrdDocumentation } from "$lib/srd/SrdDocumentation"
	import { Tag } from "$lib/ui/elements"
	import { Card } from "$lib/ui/page"
	import { kebabToTitleText } from "$lib/utils/string"
	import Schema from "./Schema.svelte"

	let {
		tag,
		specification,
	}: {
		tag: string,
		specification: OpenApiSpecification
	} = $props()

	const sections = $derived(SrdDocumentation.endpointsByTag(specification, tag))
</script>

<Card title={kebabToTitleText(tag)} level={2} inline>
	{#each sections as s}
		<section>
			<h3 id="{s.specification.summary?.replaceAll(" ", "")}">{s.specification.summary}</h3>
			<p class="endpoint"><Tag><span class="method">{s.method}</span></Tag> <code>{s.path}</code></p>
			<p>{s.specification.description}</p>
			{#if s.returns != null}
				<Schema value={s.returns.schema} />
			{/if}
		</section>
	{/each}
</Card>

<style>
	.method { text-transform: uppercase; }

	.endpoint {
		display: flex;
		flex-direction: row;
		gap: 0.75em;
		align-items: center;
	}
</style>