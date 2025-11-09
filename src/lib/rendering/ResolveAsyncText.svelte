<!--
	Syntax:
	* {{TYPE:ID}} -> render the thing's name
	* {{TYPE::ID}} -> render the thing's as a link
-->
<script lang="ts">
	import { SpeciesStore } from "$lib/creatures/species"
	import LoaderInline from "$lib/design/LoaderInline.svelte"
	import { moves } from "$lib/moves/store"
	import { abilities } from "$lib/pokemon/store"
	import { Url } from "$lib/url"
	import { get } from "svelte/store"

	async function getSpecies() {
		return get(await SpeciesStore.completeList())
	}
	
	export let value: string
</script>

{#await getSpecies()}
	<LoaderInline />
{:then species}
	{@html value
		.replaceAll(/{{pokemon:(:?)(.*?)}}/g, (_, link, id) => link !== "" ? `<a href="${Url.pokemon(id)}">${species.find((it) => it.id.data === id)?.data.name}</a>` : species.find((it) => it.id.data === id)?.data.name)
		.replaceAll(/{{move:(:?)(.*?)}}/g, (_, link, id) => link !== "" ? `<a href="${Url.moves(id)}">${$moves.find((it) => it.id === id)?.name}</a>` : $moves.find((it) => it.id === id)?.name)
		.replaceAll(/{{ability:(:?)(.*?)}}/g, (_, link, id) => link !== "" ? `<a href="${Url.reference.abilities()}#${id}">${$abilities.find((it) => it.id === id)?.name}</a>` : $abilities.find((it) => it.id === id)?.name)
	}
{/await}
