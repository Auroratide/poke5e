<script lang="ts">
	import { Button } from "$lib/ui/elements"
	import { ActionArea } from "$lib/ui/forms"
	import { createEventDispatcher } from "svelte"
	import { type PokemonSpecies } from "$lib/creatures/species"
	import {
		Fieldset,
		Form,
		RadioFields,
	} from "$lib/ui/forms"
	import { ResolveAsyncText } from "$lib/rendering"
	import type { TrainerPokemon } from "$lib/trainers/types"
	import type { Readable } from "svelte/store"
	import { EvolutionEffect } from "./EvolutionEffect"
	import type { EvolutionForest } from "./EvolutionForest"

	const dispatch = createEventDispatcher()

	export let pokemon: TrainerPokemon
	export let species: PokemonSpecies
	export let allSpecies: Readable<PokemonSpecies[]>
	export let evolutions: Readable<EvolutionForest>
	export let saving: boolean = false
	$: disabled = saving

	let chosenEvolutionId: string | undefined = undefined
	$: evolveToOptions = $evolutions?.evolvesTo(species.id)
	$: evolveToOptionIds = evolveToOptions?.map((it) => it.to.data)
	$: chosenEvolutionId = evolveToOptionIds?.length === 1 ? evolveToOptionIds[0] : chosenEvolutionId
	$: chosenEvolution = evolveToOptions?.find((it) => it.to.data === chosenEvolutionId)
	$: chosenSpecies = $allSpecies?.find((it) => it.id.data === chosenEvolution?.to.data)
	$: effects = chosenSpecies != null ? EvolutionEffect.compute(pokemon, species, chosenSpecies) : []

	const cancel = () => {
		dispatch("cancel")
	}
	const endEdit = () => {
		const afterEvolution = effects.reduce((after, effect) => effect.apply(after), pokemon)

		dispatch("submit", afterEvolution)
	}

	const getName = (id: string) => $allSpecies?.find((it) => it.id.data === id)?.data.name ?? ""
</script>

<Form onsubmit={endEdit} {saving}>
	{#if evolveToOptions?.length > 0}
		<Fieldset title="Choose one" columns={2}>
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
		<ActionArea>
			<Button on:click={cancel} variant="ghost" {disabled}>Cancel</Button>
			<Button type="submit" {disabled}>Evolve!</Button>
		</ActionArea>
	{/if}
</Form>

<style>
	section {
		font-size: var(--font-sz-venus);
	}
</style>
