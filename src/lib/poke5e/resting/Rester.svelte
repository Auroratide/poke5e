<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import Button from "$lib/design/Button.svelte"
	import { ActionArea, Fieldset, Form, IntField, RadioFields, HintText } from "$lib/design/forms"
	import { PokemonResting } from "./Rest"
	import type { TrainerPokemon } from "$lib/trainers/types"
	import { rulesVersion } from "$lib/design/rules-version"
	import { SpeciesPortrait } from "$lib/creatures/media"
	import type { PokemonSpecies } from "$lib/creatures/species"

	const dispatch = createEventDispatcher()

	export let pokemon: TrainerPokemon
	export let species: PokemonSpecies
	export let saving: boolean = false
	$: disabled = saving
	$: hitDiceSize = pokemon.customHitDiceSize ?? species.hitDice

	let restToPerform: keyof typeof PokemonResting = undefined
	let hitDiceToSpend = 0
	$: rest = restToPerform ? PokemonResting[restToPerform]({
		hitDiceToSpend,
		hitDiceSize,
		rulesVersion: $rulesVersion,
	}) : undefined
	$: applicableEffects = rest?.effects.filter((it) => it.isApplicable(pokemon)) ?? []

	const options = Object.entries(PokemonResting).map(([key, value]) => ({
		name: value({ hitDiceToSpend: 0, hitDiceSize, rulesVersion: $rulesVersion }).name,
		value: key,
	}))

	const endEdit = () => {
		const afterResting = rest.apply(pokemon)

		dispatch("submit", afterResting)
	}

	const cancel = () => {
		dispatch("cancel")
	}
</script>

<Form onsubmit={endEdit} {saving}>
	<div class="art-row">
		<Fieldset title="Choose one" columns={1}>
			<RadioFields label="Rest Choices" bind:checked={restToPerform} values={options} required />
		</Fieldset>
		<SpeciesPortrait avatar={pokemon.avatar} media={species.media} shiny={pokemon.isShiny} alt="{pokemon.nickname ?? species.data.name}" />
	</div>
	<section style:min-height="8em">
		{#if rest != null}
			{#if restToPerform === "Short"}
				<IntField label="Max Hit Dice to Spend" bind:value={hitDiceToSpend} min={0} max={pokemon.hitDice.current} />
				<HintText>This will stop spending hit dice once max HP is reached.</HintText>
			{/if}
			<div class="effects">
				<p>Resting will have these effects:</p>
				{#if applicableEffects.length > 0}
					<ul>
						{#each applicableEffects as effect}
							{#each effect.description(pokemon) as description}
								<li>{@html description}</li>
							{/each}
						{/each}
					</ul>
				{:else}
					<p>This Pokémon is already well-rested.</p>
				{/if}
			</div>
		{/if}
	</section>
	<ActionArea>
		<Button on:click={cancel} variant="ghost" {disabled}>Cancel</Button>
		<Button type="submit" disabled={disabled || rest == null}>Rest!</Button>
	</ActionArea>
</Form>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.effects {
		font-size: var(--font-sz-venus);
	}

	.art-row {
		display: flex;
	} .art-row :global(> :nth-child(1)) {
		flex: 2;
	} .art-row :global(> :nth-child(2)) {
		flex: 1;
		padding: 0 0.5em 0 0;
		block-size: 8em;
		justify-self: flex-end;
	}
</style>
