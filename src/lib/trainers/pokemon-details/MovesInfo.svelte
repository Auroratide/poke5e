<script lang="ts">
	import { LearnedMovesListInfo } from "$lib/moves/learned"
	import { MovesStore } from "$lib/moves/store"
	import { Loader } from "$lib/ui/elements"
	import { createEventDispatcher } from "svelte"
	import type { LearnedMove, TrainerPokemon } from "../types"

	const dispatch = createEventDispatcher()

	export let pokemon: TrainerPokemon
	export let editable: boolean = false

	const onUpdate = (move: LearnedMove) => {
		dispatch("update", { ...move } as LearnedMove)
	}
</script>

{#if pokemon.moves.length > 0}
	{#if $MovesStore}
		<h2>Moves</h2>
		<LearnedMovesListInfo {pokemon} {editable} onupdate={onUpdate} />
	{:else}
		<Loader />
	{/if}
{/if}
