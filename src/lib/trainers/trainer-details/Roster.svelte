<script lang="ts">
	import { SearchField } from "$lib/ui/forms"
	import { filterValue } from "../store"
	import type { TrainerStore } from "../trainers"
	import type { PokemonId, TrainerPokemon } from "../types"
	import { Button } from "$lib/ui/elements"
	import PokemonSummary from "./PokemonSummary.svelte"
	import { ListHeading } from "$lib/ui/page"
	import { Url } from "$lib/site/url"
	import { m } from "$lib/site/i18n";

	export let trainer: TrainerStore
	export let currentPokemon: PokemonId | undefined

	$: editable = $trainer.update != null

	const byStringField = (field: (m: TrainerPokemon) => string) =>
		(l: TrainerPokemon, r: TrainerPokemon) => field(l).localeCompare(field(r))

	const byNicknameOrSpecies = (filterValue: string) => (it: TrainerPokemon) =>
		it.nickname.toLocaleLowerCase().includes(filterValue) || it.pokemonId.data.replace("-", " ").includes(filterValue)

	$: filtered = $trainer.pokemon
		.filter(byNicknameOrSpecies($filterValue.toLocaleLowerCase()))
		.sort(byStringField((it) => it.nickname))
	$: baseTrainerUrl = Url.trainers($trainer.info.readKey)
</script>

<ListHeading title="{$trainer.info.name}'s Pokemon" target="/trainers">
	<span slot="link">
		{#if currentPokemon}
			<a href="{baseTrainerUrl}" class="dark-font">{m["universal.viewTrainerProfile"]()} &gt;</a>
		{:else}
			<a href="{Url.trainers()}" class="dark-font">{m["universal.seeTrainerList"]()} &gt;</a>
		{/if}
	</span>
	<span slot="action" style:visibility={editable ? "visible" : "hidden"} style:display="flex">
		<Button href="{baseTrainerUrl}&action=add-pokemon">+ {m["universal.addPokemon"]()}</Button>
	</span>
</ListHeading>
<div class="space-bottom">
	<SearchField id="filter-pokemon" label="Search" bind:value={$filterValue} matched={filtered.length} max={$trainer.pokemon.length} />
</div>
<div class="relative"><!-- Needed for the > indicators to appear outside the scroll box -->
	<div class="scrollable">
		<ul class="nolist no-space partial-width">
			{#each filtered as p (p.id)}
					<li class="space-after">
						<PokemonSummary trainer={$trainer.info.readKey} pokemon={p} />
					</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.space-bottom {
		margin-bottom: 0.5em;
	}

	.dark-font {
		color: var(--skin-content-text);
	}

	.no-space {
		margin: 0;
	}

	.scrollable {
		height: 100%;
		overflow: auto;
	}

	.space-after {
		margin-bottom: 0.5em;
	}

	.partial-width {
		width: 75%;
	}

	.relative {
		position: relative;
		height: 0;
		flex: 1;
	}
</style>