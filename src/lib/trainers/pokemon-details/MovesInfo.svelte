<script lang="ts">
	import { Loader } from "$lib/ui/elements"
	import { moves } from "$lib/moves/store"
	import { createEventDispatcher } from "svelte"
	import type { LearnedMove, TrainerPokemon } from "../types"
	import type { UpdatePpDetail } from "./MoveDetails.svelte"
	import MoveDetails from "./MoveDetails.svelte"

	const dispatch = createEventDispatcher()

	export let pokemon: TrainerPokemon
	export let editable: boolean = false

	const onUpdate = (move: LearnedMove) => (e: CustomEvent<UpdatePpDetail>) => {
		dispatch("update", {
			...move,
			pp: {
				current: e.detail.value,
				max: move.pp.max,
			},
		} as LearnedMove)
	}
</script>

{#if pokemon.moves.length > 0}
	{#if $moves}
		<h2>Moves</h2>
		<ul style:list-style="none" style:padding="0">
			{#each pokemon.moves as move}
				{@const moveData = $moves.find((it) => it.id === move.moveId)}
				<li>
					<MoveDetails {move} {moveData} {editable} level={pokemon.level} attributes={pokemon.attributes} pokemonType={pokemon.type} on:update={onUpdate(move)} />
				</li>
			{/each}
		</ul>
	{:else}
		<Loader />
	{/if}
{/if}
