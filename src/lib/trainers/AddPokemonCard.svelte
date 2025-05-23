<script lang="ts">
	import Card from "$lib/design/Card.svelte"
	import { pokemon } from "$lib/creatures/store"
	import Button from "$lib/design/Button.svelte"
	import type { TrainerStore } from "./trainers"
	import { matchNameOrType } from "$lib/creatures/filter"
	import type { Pokemon } from "$lib/creatures/types"
	import { goto } from "$app/navigation"
	import { base } from "$app/paths"
	import Title from "$lib/design/Title.svelte"
	import { TextField } from "$lib/design/forms"

	export let trainer: TrainerStore
	$: canAdd = $trainer.update != null
	$: readKey = $trainer.info.readKey

	let species = ""
	$: filteredPokemon = species.length > 0
		? $pokemon?.filter(matchNameOrType(species)) ?? []
		: [] // if we haven't typed anything, don't show the ENTIRE list
	
	let saving = false
	const onSelect = (p: Pokemon) => () => {
		saving = true
		$trainer.update?.addToTeam(p).then(({ id }) => {
			goto(`${base}/trainers?id=${readKey}&pokemon=${id}`)
		}).catch(() => {
			saving = false
		})
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
				<p class="muted center">No matched pokemon</p>
			{:else}
				<ul class="no-list columnated">
					{#each filteredPokemon as p}
						<li class="spaced-sm">
							<Button align="left" width="full" on:click={onSelect(p)} disabled={saving}>{p.name}</Button>
						</li>
					{/each}
				</ul>
			{/if}
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
</style>