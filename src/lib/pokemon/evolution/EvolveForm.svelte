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
	import { AbilityScoreImprovement, AsiField } from "$lib/dnd/attributes"
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
	export let onsubmit: (evolved: TrainerPokemon) => void
	export let oncancel: () => void
	$: disabled = saving

	let chosenEvolutionId: string | undefined = undefined
	$: evolveToOptions = options ?? $evolutions?.evolvesTo(species.id) ?? []
	$: evolveToOptionIds = evolveToOptions?.map((it) => it.to.data)
	$: chosenEvolutionId = evolveToOptionIds?.length === 1 ? evolveToOptionIds[0] : chosenEvolutionId
	$: chosenEvolution = evolveToOptions?.find((it) => it.to.data === chosenEvolutionId)
	$: chosenSpecies = $allSpecies?.find((it) => it.id.data === chosenEvolution?.to.data)

	$: asiToSpend = chosenEvolution?.benefits.find((it) => it instanceof AsiBenefit)?.amount
	let asiSpent = AbilityScoreImprovement.zero()

	$: effects = chosenSpecies != null ? EvolutionEffect.compute(pokemon, species, chosenSpecies, asiSpent) : []

	const endEdit = () => {
		const afterEvolution = effects.reduce((after, effect) => effect.apply(after), pokemon)

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
				<p>Each ability score can be increased by at most 4.</p>
				<AsiField attributes={pokemon.attributes} pointsToSpend={asiToSpend} bind:pointsSpent={asiSpent} maxPerScore={4} />
			{/if}
		</section>
		<ActionArea>
			<Button on:click={oncancel} variant="subtle" {disabled}>{cancelLabel}</Button>
			<Button type="submit" {disabled}>{submitLabel}</Button>
		</ActionArea>
	{/if}
</Form>

<style>
	section {
		font-size: var(--font-sz-venus);
		margin-block-end: 1em;
	}
</style>
