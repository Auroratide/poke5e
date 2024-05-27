<script lang="ts">
	import type { TrainerPokemon } from "../types"
	import { createEventDispatcher } from "svelte"
	import Button from "$lib/design/Button.svelte"
	import Fieldset from "$lib/design/Form/Fieldset.svelte"
	import ActionArea from "$lib/design/Form/ActionArea.svelte"
	import type { Pokemon } from "$lib/creatures/types"
	import Saveable from "$lib/design/Saveable.svelte"
	import { pokemon as allPokemon } from "$lib/creatures/store"
	import { moves as allMoves } from "$lib/moves/store"
	import * as pokemonString from "$lib/pokemon/string"
	import * as creatureString from "$lib/creatures/string"
	import { base } from "$app/paths"
	import * as list from "$lib/list"

	const dispatch = createEventDispatcher()

	export let pokemon: TrainerPokemon
	export let species: Pokemon
	export let saving: boolean = false
	$: disabled = saving

	$: ability = species.abilities.find((it) => it.id === pokemon.ability)
	$: currentAbilityIndex = species.abilities.indexOf(ability)

	// if there is only one choice, default it to be selected
	let evolveToId = species.evolution?.to?.length === 1 ? species.evolution.to[0].id : undefined
	$: evolveToInfo = species.evolution?.to?.find((it) => it.id === evolveToId)
	$: evolveToPokemon = $allPokemon?.find((it) => it.id === evolveToId)

	$: gainedHp = pokemon.level * 2
	$: gainedAc = Math.max(0, (evolveToPokemon?.ac ?? 0) - pokemon.ac)
	$: gainedProficiencies = list.difference(evolveToPokemon?.skills ?? [])(pokemon.proficiencies)
	$: gainedSavingThrows = list.difference(evolveToPokemon?.savingThrows ?? [])(pokemon.savingThrows)
	$: newAbility = evolveToPokemon?.abilities[Math.min(evolveToPokemon?.abilities.length - 1, currentAbilityIndex)]

	const cancel = () => {
		dispatch("cancel")
	}
	const endEdit = () => {
		const afterEvolution: TrainerPokemon = {
			...pokemon,
			pokemonId: evolveToId,
			nickname: pokemon.nickname === species.name ? evolveToPokemon.name : pokemon.nickname,
			hp: {
				current: pokemon.hp.max + gainedHp,
				max: pokemon.hp.max + gainedHp,
			},
			ac: pokemon.ac + gainedAc,
			proficiencies: pokemon.proficiencies.concat(gainedProficiencies),
			savingThrows: pokemon.savingThrows.concat(gainedSavingThrows),
			ability: newAbility?.id ?? pokemon.ability,
		}

		dispatch("submit", afterEvolution)
	}
</script>

<Saveable {saving}>
	{#if species.evolution?.to?.length > 0}
		<form on:submit|preventDefault={endEdit}>
			<Fieldset title="Choose one" columns={2}>
					{#each species.evolution.to as to}
						{@const name = $allPokemon?.find((it) => it.id === to.id)?.name ?? ""}
						<input id="evolve-to-{to.id}" name="evolve-to" type="radio" value={to.id} bind:group={evolveToId} {disabled} required />
						<label for="evolve-to-{to.id}">{name}</label>
					{/each}
			</Fieldset>
			<section style:min-height="12em">
					{#if evolveToInfo}
						<p>{@html pokemonString.evolution(species.name, evolveToInfo, creatureString.evolutionWithLinks(base, $allPokemon, $allMoves))}</p>
						<p>Evolving this pokemon will have these effects:</p>
						<ul>
							<li>Max HP will increase by {gainedHp}</li>
							{#if gainedAc > 0}<li>AC will increase by {gainedAc}</li>{/if}
							{#if gainedProficiencies.length > 0}<li>Proficiency in <span class="cap">{gainedProficiencies.join(", ")}</span></li>{/if}
							{#if gainedSavingThrows.length > 0}<li>Proficiency in <span class="upper">{gainedSavingThrows.join(", ")}</span> saving throws</li>{/if}
							{#if newAbility && pokemon.ability !== newAbility.id}<li>Ability will change from {ability.name} to {newAbility.name}</li>{/if}
						</ul>
					{/if}
			</section>
			<ActionArea>
					<Button on:click={cancel} variant="ghost" {disabled}>Cancel</Button>
					<Button type="submit" {disabled}>Evolve!</Button>
			</ActionArea>
		</form>
	{/if}
</Saveable>

<style>
	section {
		font-size: var(--font-sz-venus);
	}
</style>
