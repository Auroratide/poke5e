<script lang="ts">
	import type { OpenApiSpecification } from "$lib/srd/openapi"
	import { SrdDocumentation } from "$lib/srd/SrdDocumentation"
	import { Card } from "$lib/ui/page"
	import Schema from "./Schema.svelte"

	let {
		specification,
	}: {
		specification: OpenApiSpecification
	} = $props()

	const schemas = $derived(Object.entries(SrdDocumentation.commonSchemas(specification)))
</script>

<Card title="Common Schemas" level={2} inline>
	{#each schemas as [name, schema]}
		<section>
			<h3 id="{name}"><a href="#{name}">{name}</a></h3>
			<Schema value={schema} />
		</section>
	{/each}
</Card>
