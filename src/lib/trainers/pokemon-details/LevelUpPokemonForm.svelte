<script lang="ts">
	import { goto } from "$app/navigation"
	import { LevelUp, LevelUpForm } from "$lib/poke5e/level-up"
	import type { LevelUpEffect } from "$lib/poke5e/level-up/effects/LevelUpEffect.svelte"
	import { PokemonLevelTable } from "$lib/poke5e/level-up/PokemonLevelTable"
	import { PokemonSpecies } from "$lib/poke5e/species"
	import { EvolutionStore } from "$lib/pokemon/evolution"
	import { Url } from "$lib/site/url"
	import type { TrainerStore } from "../trainers"
	import type { TrainerPokemon } from "../types"

	let {
		pokemon,
		species,
		trainer,
		onback,
	}: {
		pokemon: TrainerPokemon,
		species: PokemonSpecies,
		trainer: TrainerStore,
		onback?: () => void,
	} = $props()

	let evolutions = $derived(EvolutionStore.get(species.id))

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const template = $derived(PokemonLevelTable.toLevel(pokemon.level.next())(pokemon, species, $evolutions) as LevelUpEffect<any, any, any>[])

	let saving = $state(false)
	const applyLevelUp = async () => {
		saving = true
		const updatedPokemon = LevelUp.apply(pokemon, template)
		await $trainer.update?.pokemon(updatedPokemon).then(() => {
			return $trainer.update?.pokemonFeats(updatedPokemon) ?? Promise.resolve()
		}).then(() => {
			goto(Url.trainers($trainer.info.readKey, pokemon.id))
		}).catch(() => {
			saving = false
		})
	}
</script>

<LevelUpForm {saving} backHref={Url.trainers($trainer.info.readKey, pokemon.id)} {onback} effects={template} onsubmit={applyLevelUp} />
