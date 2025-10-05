<script lang="ts">
	import Card from "$lib/design/Card.svelte"
	import Button from "$lib/design/Button.svelte"
	import type { TrainerStore } from "./trainers"
	import { matchNameOrType2 } from "$lib/creatures/filter"
	import { goto } from "$app/navigation"
	import { base } from "$app/paths"
	import Title from "$lib/design/Title.svelte"
	import { TextField } from "$lib/design/forms"
	import { PokemonSpecies } from "$lib/creatures/species"
	import { SearchFakemonById, type SearchFakemonByIdDetail } from "$lib/fakemon/search"
	import type { Fakemon } from "$lib/fakemon"
	import type { Readable } from "svelte/store"
	import { Url } from "$lib/url"

	export let trainer: TrainerStore
	export let allSpecies: Readable<PokemonSpecies[]>
	$: canAdd = $trainer.update != null
	$: readKey = $trainer.info.readKey

	let species = ""
	$: filteredPokemon = species.length > 0
		? $allSpecies?.filter(matchNameOrType2(species)) ?? []
		: [] // if we haven't typed anything, don't show the ENTIRE list
	
	let saving = false
	const onSelect = (p: PokemonSpecies) => () => {
		saving = true
		$trainer.update?.addToTeam(p).then(({ id }) => {
			goto(`${base}/trainers?id=${readKey}&pokemon=${id}`)
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
			<div class="font-lg spaced-lg">
				<TextField label="Species" bind:value={species} disabled={saving} />
			</div>
			{#if filteredPokemon.length === 0 && species.length > 0}
				<p class="muted center min-height">No matched pokemon</p>
			{:else}
				<ul class="no-list columnated min-height">
					{#each filteredPokemon as p}
						<li class="spaced-sm">
							<Button align="left" width="full" on:click={onSelect(p)} disabled={saving}>{p.data.name}</Button>
						</li>
					{/each}
				</ul>
			{/if}
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
	.no-list {
		list-style: none;
		padding: 0;
	}

	.columnated {
		column-count: 2;
	}

	.spaced-lg {
		margin-bottom: 1em;
	}

	.spaced-sm {
		margin-bottom: 0.25em;
	}

	.font-lg {
		font-size: var(--font-sz-neptune);
	}

	.muted {
		opacity: 0.75;
	}

	.center {
		text-align: center;
	}

	.min-height {
		min-block-size: 5em;
	}
</style>