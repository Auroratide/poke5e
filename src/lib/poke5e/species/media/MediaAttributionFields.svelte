<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { RadioFields, TextField } from "$lib/ui/forms"
	import { capitalize } from "$lib/utils/string"
	import { SpeciesMedia, type SpeciesMediaTypeAttribution } from "./SpeciesMedia"

	export let id: string
	export let value: SpeciesMediaTypeAttribution

	$: nameLabel = value.type === "ai" ? m["universal.aiName"]() : m["universal.artistName"]()
	$: namePlaceholder = value.type === "ai" ? m["universal.eG"]()+" Gemini" : m["universal.eG"]()+" @handle"
	$: linkLabel = value.type === "ai" ? m["universal.aiLink"]() : m["universal.artistLink"]()
</script>

<p><strong>{m["universal.sourceOf"]({name: capitalize(id)})}</strong></p>
<div class="three-columns">
	<RadioFields name="{id}-type" label="Type" bind:checked={value.type} values={SpeciesMedia.attributionTypes} />
</div>
<TextField name="{id}-name" label="{nameLabel}" bind:value={value.name} placeholder="{namePlaceholder}" />
<TextField name="{id}-href" label="{linkLabel}" bind:value={value.href} placeholder="{m["universal.eG"]()} https://example.com" />

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
