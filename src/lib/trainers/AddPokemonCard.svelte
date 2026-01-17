<script lang="ts">
	import { Card } from "$lib/ui/page"
	import { Button } from "$lib/ui/elements"
	import type { TrainerStore } from "./trainers"
	import { goto } from "$app/navigation"
	import { Title } from "$lib/ui/layout"
	import { PokemonSpecies, SpeciesField } from "$lib/poke5e/species"
	import { SearchFakemonById, type SearchFakemonByIdDetail } from "$lib/fakemon/search"
	import type { Fakemon } from "$lib/fakemon"
	import type { Readable } from "svelte/store"
	import { Url } from "$lib/site/url"

	export let trainer: TrainerStore
	export let allSpecies: Readable<PokemonSpecies[]>
	$: canAdd = $trainer.update != null
	$: readKey = $trainer.info.readKey

	let saving = false
	const onSelect = (p: PokemonSpecies) => () => {
		saving = true
		$trainer.update?.addToTeam(p).then(({ id }) => {
			goto(Url.trainers(readKey, id))
		}).catch(() => {
			saving = false
		})
	}

	let fakemon: Fakemon
	const onFakemonSearch = (e: CustomEvent<SearchFakemonByIdDetail>) => {
		fakemon = e.detail.value
	}
</script>

<Title value="Add Pokemon" />
<Card title="Add to {$trainer.info.name}'s team">
	{#if canAdd}
		<section>
			<p>Start typing the pokemon's species, then select from the provided list.</p>
			<div class="font-lg">
				<SpeciesField label="Species" value="" name="species" allSpecies={$allSpecies} disabled={saving} on:change={(e) => onSelect(e.detail.species)()} explicitSubmit />
			</div>
		</section>
		<section>
			<p>Or you can add a <a href="{Url.fakemon()}">Fakémon</a> by its ID.</p>
			<SearchFakemonById on:found={onFakemonSearch} />
			<div class="min-height">
				{#if fakemon != null}
					<p class="font-lg">
						<Button on:click={onSelect(fakemon.species)}>{fakemon.species.data.name}</Button>
					</p>
				{/if}
			</div>
		</section>
	{:else}
		<section>
			<p>You do not have permission to add pokemon to this trainer.</p>
		</section>
	{/if}
</Card>

<style>
	.font-lg {
		font-size: var(--font-sz-neptune);
	}

	.min-height {
		min-block-size: 5em;
	}
</style>