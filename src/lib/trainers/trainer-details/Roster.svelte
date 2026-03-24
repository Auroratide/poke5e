<script lang="ts">
	import { Saveable, SearchField } from "$lib/ui/forms"
	import { filterValue } from "../store"
	import type { TrainerStore } from "../trainers"
	import type { PokemonId, TrainerPokemon } from "../types"
	import { Button } from "$lib/ui/elements"
	import PokemonSummary from "./PokemonSummary.svelte"
	import { ListHeading } from "$lib/ui/page"
	import { Url } from "$lib/site/url"
	import { m } from "$lib/site/i18n"
	import type { ReorderListChangeEventDetail } from "@auroratide/reorder-list/lib/events"
	import * as list from "$lib/utils/list"

	export let trainer: TrainerStore
	export let currentPokemon: PokemonId | undefined
	export let isFullList: boolean = false

	$: editable = $trainer.update != null

	const byNicknameOrSpecies = (filterValue: string) => (it: TrainerPokemon) =>
		it.nickname.toLocaleLowerCase().includes(filterValue) || it.pokemonId.data.replace("-", " ").includes(filterValue)

	$: filtered = $trainer.pokemon
		.filter(byNicknameOrSpecies($filterValue.toLocaleLowerCase()))
	$: baseTrainerUrl = Url.trainers($trainer.info.readKey)

	let reordering = false
	const onReorder = (e: CustomEvent<ReorderListChangeEventDetail>) => {
		if (e.detail.oldIndex === e.detail.newIndex) return

		reordering = true
		const newList = list.reorderOne($trainer.pokemon, e.detail.oldIndex, e.detail.newIndex)
		$trainer.update.reorderTeam(newList).finally(() => {
			reordering = false
		})
	}
</script>

<ListHeading title="{$trainer.info.name}'s Pokemon" target="/trainers">
	<span slot="link">
		{#if currentPokemon || isFullList}
			<a href="{baseTrainerUrl}" class="dark-font">{m.viewTrainerProfile()} &gt;</a>
		{:else}
			<a href="{Url.trainers()}" class="dark-font">{m.seeTrainerList()} &gt;</a>
		{/if}
	</span>
	<span slot="action" style:visibility={editable ? "visible" : "hidden"} style:display="flex">
		<Button href="{baseTrainerUrl}&action=add-pokemon">+ {m.addPokemon()}</Button>
	</span>
</ListHeading>
<div class="space-bottom">
	<SearchField id="filter-pokemon" label="Search" bind:value={$filterValue} matched={filtered.length} max={$trainer.pokemon.length} />
</div>
<div class="relative"><!-- Needed for the > indicators to appear outside the scroll box -->
	<div class="scrollable">
		<Saveable saving={reordering}>
			<reorder-list class="nolist no-space full-width" on:commit={onReorder}>
				{#each filtered as p (p.id)}
					<reorder-item class="space-after">
						<PokemonSummary trainer={$trainer.info.readKey} pokemon={p} />
					</reorder-item>
				{/each}
			</reorder-list>
		</Saveable>
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

	.full-width {
		width: 100%;
	}

	.relative {
		position: relative;
		height: 0;
		flex: 1;
	}
</style>