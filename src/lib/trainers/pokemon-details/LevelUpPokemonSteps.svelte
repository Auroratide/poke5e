<script lang="ts">
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { EvolutionStore, EvolveForm } from "$lib/pokemon/evolution"
	import { m } from "$lib/site/i18n"
	import { Url } from "$lib/site/url"
	import { Button, Loader } from "$lib/ui/elements"
	import { ActionArea } from "$lib/ui/forms"
	import { Title } from "$lib/ui/layout"
	import { Card } from "$lib/ui/page"
	import type { Readable } from "svelte/store"
	import type { TrainerStore } from "../trainers"
	import type { TrainerPokemon } from "../types"
	import EvolvePokemonPrompt from "./EvolvePokemonPrompt.svelte"
	import LevelUpPokemonForm from "./LevelUpPokemonForm.svelte"

	let {
		pokemon,
		species,
		trainer,
		allSpecies,
	}: {
		pokemon: TrainerPokemon,
		species: PokemonSpecies,
		trainer: TrainerStore,
		allSpecies: Readable<PokemonSpecies[]>,
	} = $props()

	/**
	 * Level up has three steps:
	 * 1. prompt: ask if the trainer wants to evolve their pokemon
	 * 2. evolve: if yes, show the evolve form
	 * 3. level-up: show the level up form
	 * 
	 * Nothing is saved until the entire flow is complete.
	 */
	type Step = "prompt" | "evolve" | "level-up"

	let canEdit = $derived($trainer.update != null)
	let evolutions = $derived(EvolutionStore.get(species.id))
	let nextLevel = $derived(pokemon.level.next())
	let eligibleEvolutions = $derived($evolutions?.evolvesAtLevel(species.id, { level: nextLevel, gender: pokemon.gender }) ?? [])
	let canEvolve = $derived(eligibleEvolutions.length > 0)

	let chosenStep = $state<Step | undefined>(undefined)
	let step = $derived<Step>(chosenStep ?? (canEvolve ? "prompt" : "level-up"))

	// raw, since the pokemon holds class instances that should not be proxied
	let evolved = $state.raw<{ pokemon: TrainerPokemon, species: PokemonSpecies } | undefined>(undefined)

	const backHref = $derived(Url.trainers($trainer.info.readKey, pokemon.id))

	const goToPrompt = () => {
		evolved = undefined
		chosenStep = "prompt"
	}

	const goToEvolve = () => {
		chosenStep = "evolve"
	}

	const skipEvolution = () => {
		evolved = undefined
		chosenStep = "level-up"
	}

	const evolve = (evolvedPokemon: TrainerPokemon) => {
		const evolvedSpecies = $allSpecies?.find((it) => it.id.data === evolvedPokemon.pokemonId.data)
		if (evolvedSpecies == null) return

		evolved = {
			pokemon: evolvedPokemon,
			species: evolvedSpecies,
		}
		chosenStep = "level-up"
	}
</script>

<Title value={m.levelUp()} />
<Card title={m.levelUpName({ name: pokemon.nickname ?? species.name })}>
	{#if !canEdit}
		<section>
			<p>{m.noLevelUpPermission()}</p>
		</section>
		<ActionArea>
			<Button href={Url.trainers($trainer.info.readKey)} variant="subtle">{m.back()}</Button>
		</ActionArea>
	{:else if $evolutions == null}
		<Loader />
	{:else if step === "prompt"}
		<EvolvePokemonPrompt
			{pokemon}
			{species}
			{nextLevel}
			{eligibleEvolutions}
			{backHref}
			{skipEvolution}
			{goToEvolve}
		/>
	{:else if step === "evolve"}
		<EvolveForm
			{pokemon}
			{species}
			{allSpecies}
			{evolutions}
			options={eligibleEvolutions}
			submitLabel={m.next()}
			cancelLabel={m.back()}
			oncancel={goToPrompt}
			onsubmit={evolve}
			atNextLevel
		/>
	{:else}
		<LevelUpPokemonForm
			pokemon={evolved?.pokemon ?? pokemon}
			species={evolved?.species ?? species}
			{trainer}
			onback={canEvolve ? goToPrompt : undefined}
		/>
	{/if}
</Card>
