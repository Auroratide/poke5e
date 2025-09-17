<script lang="ts">
	import { onDestroy } from "svelte"
	import type { SpeciesIdentifier } from "./SpeciesIdentifier"
	import { SpeciesStore } from "./SpeciesStore"
	import type { PokemonSpecies } from "./PokemonSpecies"
	import Loader from "$lib/design/Loader.svelte"
	import type { Data } from "$lib/DataClass"
	import * as list from "$lib/list"

	export let ids: SpeciesIdentifier[]
	let previousIds: SpeciesIdentifier[] = []

	let species: Record<Data<SpeciesIdentifier>, PokemonSpecies> = {}
	let unsubscribe: (() => void)[] = []
	let promise: Promise<void[]> = new Promise(() => {})

	function recalculate(ids: SpeciesIdentifier[]) {
		if (list.equalUnordered(ids)(previousIds)) return

		previousIds = ids
		species = {}
		unsubscribe.forEach((it) => it())
		unsubscribe = []

		promise = Promise.all(ids.map((id) => SpeciesStore.get(id).then((it) => {
			unsubscribe.push(it.subscribe((val) => {
				if (val != undefined) {
					species = {
						...species,
						[id.data]: val.value,
					}
				}
			}))
		})))
	}

	$: recalculate(ids)

	onDestroy(() => {
		unsubscribe.forEach((it) => it())
	})
</script>

{#await promise}
	<slot name="loader"><Loader /></slot>
{:then}
	{#each Object.values(species) as single}
		<slot species={single}></slot>
	{/each}
{/await}
