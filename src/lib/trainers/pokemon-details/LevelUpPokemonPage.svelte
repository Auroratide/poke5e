<script lang="ts">
	import type { Readable } from "svelte/store"
	import { WithSpecies, type PokemonSpecies } from "$lib/poke5e/species"
	import type { TrainerStore } from "../trainers"
	import type { PokemonId } from "../types"
	import LevelUpPokemonSteps from "./LevelUpPokemonSteps.svelte"
	import RequirePokemon from "./RequirePokemon.svelte"

	let {
		trainer,
		id,
		allSpecies,
	}: {
		trainer: TrainerStore
		id: PokemonId
		allSpecies: Readable<PokemonSpecies[]>
	} = $props()

	let pokemon = $trainer.pokemon.find((it) => it.id === id)
</script>

{#if pokemon}
	<RequirePokemon trainer={$trainer} {id}>
		<WithSpecies let:species ids={[pokemon?.pokemonId]}>
			<LevelUpPokemonSteps {pokemon} {species} {trainer} {allSpecies} />
		</WithSpecies>
	</RequirePokemon>
{/if}
