<script lang="ts">
	import { Button } from "$lib/ui/elements"
	import { ActionArea } from "$lib/ui/forms"
	import { type PokemonSpecies } from "$lib/poke5e/species"
	import {
		Fieldset,
		Form,
		RadioFields,
	} from "$lib/ui/forms"
	import { ResolveAsyncText } from "$lib/ui/rendering"
	import type { TrainerPokemon } from "$lib/trainers/types"
	import type { Readable } from "svelte/store"
	import { EvolutionEffect } from "./EvolutionEffect"
	import type { EvolutionForest } from "./EvolutionForest"
	import type { Evolution } from "./Evolution"
	import { m } from "$lib/site/i18n"
	import { AbilityScoreImprovement, AsiField, Attributes } from "$lib/dnd/attributes"
	import { AsiBenefit } from "./EvolutionBenefit"

	export let pokemon: TrainerPokemon
	export let species: PokemonSpecies
	export let allSpecies: Readable<PokemonSpecies[]>
	export let evolutions: Readable<EvolutionForest | undefined>
	export let saving: boolean = false
	/** Restricts which evolutions can be chosen; defaults to every evolution of the species. Used for when leveling up and only some conditions are met. */
	export let options: Evolution[] | undefined = undefined
	export let submitLabel: string = m.evolve()
	export let cancelLabel: string = m.cancel()
	/** True when evolving during a level up */
	export let atNextLevel: boolean = false
	export let onsubmit: (evolved: TrainerPokemon) => void
	export let oncancel: () => void
	$: disabled = saving

	let chosenEvolutionId: string | undefined = undefined
	$: evolveToOptions = options ?? $evolutions?.evolvesTo(species.id) ?? []
	$: evolveToOptionIds = evolveToOptions?.map((it) => it.to.data)
	$: chosenEvolutionId = evolveToOptionIds?.length === 1 ? evolveToOptionIds[0] : chosenEvolutionId
	$: chosenEvolution = evolveToOptions?.find((it) => it.to.data === chosenEvolutionId)
	$: chosenSpecies = $allSpecies?.find((it) => it.id.data === chosenEvolution?.to.data)

	const MAX_ASI_PER_SCORE = 4

	$: asiToSpend = chosenEvolution?.benefits.find((it) => it instanceof AsiBenefit)?.amount
	let asiSpent = AbilityScoreImprovement.zero()

	// different evolutions can grant different amounts, so start over when switching
	let lastChosenEvolutionId = chosenEvolutionId
	$: if (chosenEvolutionId !== lastChosenEvolutionId) {
		lastChosenEvolutionId = chosenEvolutionId
		asiSpent = AbilityScoreImprovement.zero()
	}

	// scores near the maximum may make it impossible to spend every point
	$: maxSpendableAsi = Math.min(asiToSpend ?? 0, Attributes.list.reduce((sum, { abbr }) =>
		sum + Math.max(0, Math.min(MAX_ASI_PER_SCORE, Attributes.MAX_ABSOLUTE_VALUE - pokemon.attributes[abbr].score)), 0))
	$: asiError = chosenEvolution != null && AbilityScoreImprovement.totalPoints(asiSpent) < maxSpendableAsi
		? m.mustAllocateEvolutionAsi()
		: undefined

	$: pokemonWithAdvancedLevel = { ...pokemon, level: pokemon.level.next() }

	$: effects = chosenSpecies != null ? EvolutionEffect.compute(atNextLevel ? pokemonWithAdvancedLevel : pokemon, species, chosenSpecies, asiSpent) : []

	const endEdit = () => {
		if (asiError != null) return

		const afterEvolution = effects.reduce((after, effect) => effect.apply(after), atNextLevel ? pokemonWithAdvancedLevel : pokemon)

		// slightly annoying, but we have to undo the level so that the
		// level up tool increases it from what it was
		if (atNextLevel) {
			afterEvolution.level = pokemon.level
		}

		onsubmit(afterEvolution)
	}

	const getName = (id: string) => $allSpecies?.find((it) => it.id.data === id)?.data.name ?? ""
</script>

<Form onsubmit={endEdit} {saving}>
	{#if evolveToOptions?.length > 0}
		<Fieldset title={m.chooseOne()} columns={2}>
			<RadioFields label="Evolution Choices" bind:checked={chosenEvolutionId} values={evolveToOptionIds?.map((id) => ({ name: getName(id), value: id })) ?? []} required />
		</Fieldset>
		<section style:min-height="12em">
			{#if chosenEvolution}
				<p><ResolveAsyncText value={chosenEvolution.toString()} /></p>
				<p>Evolving this pokemon will have these effects:</p>
				<ul>
					{#each effects as effect}
						{@const description = effect.toString()}
						{#if description?.length > 0}
							<li><ResolveAsyncText value={description} /></li>
						{/if}
					{/each}
				</ul>
			{/if}
		</section>
		<section style:min-height="12em">
			{#if chosenEvolution && asiToSpend != null}
				<p>Each ability score can be increased by at most {MAX_ASI_PER_SCORE}.</p>
				<AsiField attributes={pokemon.attributes} pointsToSpend={asiToSpend} bind:pointsSpent={asiSpent} maxPerScore={MAX_ASI_PER_SCORE} />
			{/if}
		</section>
		<ActionArea error={asiError}>
			<Button on:click={oncancel} variant="subtle" {disabled}>{cancelLabel}</Button>
			<Button type="submit" disabled={disabled || asiError != null}>{submitLabel}</Button>
		</ActionArea>
	{/if}
</Form>

<style>
	section {
		font-size: var(--font-sz-venus);
		margin-block-end: 1em;
	}
</style>
