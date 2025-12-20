<script lang="ts">
	import { RadioFields, TextField } from "$lib/ui/forms"
	import { capitalize } from "$lib/utils/string"
	import { SpeciesMedia, type SpeciesMediaTypeAttribution } from "./SpeciesMedia"

	export let id: string
	export let value: SpeciesMediaTypeAttribution

	$: nameLabel = value.type === "ai" ? "AI Name" : "Artist Name"
	$: namePlaceholder = value.type === "ai" ? "e.g. Gemini" : "e.g. @handle"
	$: linkLabel = value.type === "ai" ? "AI Link" : "Artist Link"
</script>

<p><strong>{capitalize(id)} Source</strong></p>
<div class="three-columns">
	<RadioFields name="{id}-type" label="Type" bind:checked={value.type} values={SpeciesMedia.attributionTypes} />
</div>
<TextField name="{id}-name" label="{nameLabel}" bind:value={value.name} placeholder="{namePlaceholder}" />
<TextField name="{id}-href" label="{linkLabel}" bind:value={value.href} placeholder="e.g. https://example.com" />

<style>
	p { margin: 0; }

	.three-columns {
		grid-column: span 2;
		display: flex;
		gap: 0.5em;
		justify-content: space-between;
	} .three-columns > :global(*) {
		flex: 1;
	}
</style>
