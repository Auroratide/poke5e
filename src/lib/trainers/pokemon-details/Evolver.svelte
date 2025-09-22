<script lang="ts">
	import type { TrainerPokemon } from "../types"
	import { createEventDispatcher } from "svelte"
	import Button from "$lib/design/Button.svelte"
	import { ActionArea } from "$lib/design/forms"
	// import { pokemon as allPokemon } from "$lib/creatures/store"
	import { moves as allMoves } from "$lib/moves/store"
	import * as pokemonString from "$lib/pokemon/string"
	import * as creatureString from "$lib/creatures/string"
	import { base } from "$app/paths"
	import * as list from "$lib/list"
	import {
		Form,
		Fieldset,
		RadioFields,
	} from "$lib/design/forms"
	import { SpeciesIdentifier, type PokemonSpecies } from "$lib/creatures/species"
	import { abilities } from "$lib/pokemon/store"
	import type { Readable } from "svelte/store"

	const dispatch = createEventDispatcher()

	export let pokemon: TrainerPokemon
	export let species: PokemonSpecies
	export let allSpecies: Readable<PokemonSpecies[]>
	export let saving: boolean = false
	$: disabled = saving

	$: speciesAbilityList = species.abilities.toList()
	$: ability = speciesAbilityList.find((it) => it.id === pokemon.ability)
	$: abilityDetails = $abilities?.find((it) => it.id === ability?.id)
	$: currentAbilityIndex = speciesAbilityList.indexOf(ability)

	// if there is only one choice, default it to be selected
	let evolveToId = species.data.evolution?.to?.length === 1 ? species.data.evolution.to[0].id : undefined
	$: evolveToInfo = species.data.evolution?.to?.find((it) => it.id === evolveToId)
	$: evolveToPokemon = $allSpecies?.find((it) => it.id.data === evolveToId)

	$: typeWasCustomized = !pokemon.type.equivalent(species.type)
	$: newType = evolveToPokemon?.type
	$: typeWillChange = newType != null && !species.type.equivalent(newType)
	$: gainedHp = pokemon.level.data * 2
	$: gainedAc = Math.max(0, (evolveToPokemon?.data.ac ?? 0) - pokemon.ac)
	$: gainedProficiencies = list.difference(evolveToPokemon?.skills.toList() ?? [])(pokemon.proficiencies.toList())
	$: gainedSavingThrows = list.difference(evolveToPokemon?.data.saves ?? [])(pokemon.savingThrows)
	$: newAbility = evolveToPokemon?.abilities.toList()[Math.min(evolveToPokemon?.abilities.toList().length - 1, currentAbilityIndex)]
	$: newAbilityDetails = $abilities?.find((it) => it.id === newAbility?.id)

	const cancel = () => {
		dispatch("cancel")
	}
	const endEdit = () => {
		const afterEvolution: TrainerPokemon = {
			...pokemon,
			pokemonId: new SpeciesIdentifier(evolveToId),
			nickname: pokemon.nickname === species.data.name ? evolveToPokemon.data.name : pokemon.nickname,
			type: newType,
			hp: {
				current: pokemon.hp.max + gainedHp,
				max: pokemon.hp.max + gainedHp,
			},
			ac: pokemon.ac + gainedAc,
			proficiencies: pokemon.proficiencies.addProficiencies(gainedProficiencies),
			savingThrows: pokemon.savingThrows.concat(gainedSavingThrows),
			ability: newAbility?.id ?? pokemon.ability,
		}

		dispatch("submit", afterEvolution)
	}

	const getName = (id: string) => $allSpecies?.find((it) => it.id.data === id)?.data.name ?? ""
</script>

<Form onsubmit={endEdit} {saving}>
	{#if species.data.evolution?.to?.length > 0}
		<Fieldset title="Choose one" columns={2}>
			<RadioFields label="Evolution Choices" bind:checked={evolveToId} values={species.data.evolution.to.map((it) => ({ name: getName(it.id), value: it.id }))} required />
		</Fieldset>
		<section style:min-height="12em">
			{#if evolveToInfo}
				<p>{@html pokemonString.evolution(species.data.name, evolveToInfo, creatureString.evolutionWithLinks(base, $allSpecies, $allMoves))}</p>
				<p>Evolving this pokemon will have these effects:</p>
				<ul>
					{#if !typeWasCustomized && typeWillChange}<li>Type will change to <span class="cap">{newType?.data.join("/")}</span></li>{/if}
					<li>Max HP will increase by {gainedHp}</li>
					{#if gainedAc > 0}<li>AC will increase by {gainedAc}</li>{/if}
					{#if gainedProficiencies.length > 0}<li>Proficiency in <span class="cap">{gainedProficiencies.join(", ")}</span></li>{/if}
					{#if gainedSavingThrows.length > 0}<li>Proficiency in <span class="upper">{gainedSavingThrows.join(", ")}</span> saving throws</li>{/if}
					{#if newAbilityDetails && pokemon.ability !== newAbility.id}<li>Ability will change from {abilityDetails?.name} to {newAbilityDetails?.name}</li>{/if}
					{#if typeWasCustomized && typeWillChange}<li><strong>Note:</strong> This Pokémon's type will not change since its type was customized.</li>{/if}
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
