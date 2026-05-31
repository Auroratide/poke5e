<script lang="ts">
	import { Fieldset, CheckboxFields } from "$lib/ui/forms"
	import { m } from "$lib/site/i18n"
	import type { BiomeId } from "./Biome"
	import { BiomesStore } from "./store"
	import { LoaderInline } from "$lib/ui/elements"

	let {
		value = $bindable(),
		disabled = false,
	}: {
		value: BiomeId[],
		disabled?: boolean,
	}= $props()

	let options = $derived($BiomesStore?.map((it) => ({
		value: it.id,
		name: it.name,
	})))
</script>

{#if options}
	<Fieldset title={m.biomes()} columns={3}>
		<CheckboxFields label={m.biomes()} bind:checked={value} values={options} {disabled} />
	</Fieldset>
{:else}
	<LoaderInline />
{/if}
