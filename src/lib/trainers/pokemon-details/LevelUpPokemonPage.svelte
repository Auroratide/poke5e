<script lang="ts">
	import { WithSpecies } from "$lib/poke5e/species"
	import type { TrainerStore } from "../trainers"
	import type { PokemonId } from "../types"
	import LevelUpPokemonForm from "./LevelUpPokemonForm.svelte"
	import RequirePokemon from "./RequirePokemon.svelte"

	let {
		trainer,
		id,
	}: {
		trainer: TrainerStore
		id: PokemonId
	} = $props()

	let pokemon = $trainer.pokemon.find((it) => it.id === id)
</script>

{#if pokemon}
	<RequirePokemon trainer={$trainer} {id}>
		<WithSpecies let:species ids={[pokemon?.pokemonId]}>
			<LevelUpPokemonForm {pokemon} {species} {trainer} />
		</WithSpecies>
	</RequirePokemon>
{/if}
