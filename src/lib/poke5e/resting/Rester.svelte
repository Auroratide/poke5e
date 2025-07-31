<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import Button from "$lib/design/Button.svelte"
	import { ActionArea, Fieldset, Form, IntField, RadioFields, HintText } from "$lib/design/forms"
	import { PokemonResting } from "./Rest"
	import type { TrainerPokemon } from "$lib/trainers/types"
	import type { Pokemon } from "$lib/creatures/types"

	const dispatch = createEventDispatcher()

	export let pokemon: TrainerPokemon
	export let species: Pokemon
	export let saving: boolean = false
	$: disabled = saving
	$: hitDiceSize = pokemon.customHitDiceSize ?? species.hitDice

	let restToPerform: keyof typeof PokemonResting = undefined
	let hitDiceToSpend = 0
	$: rest = restToPerform ? PokemonResting[restToPerform]({ hitDiceToSpend, hitDiceSize }) : undefined
	$: applicableEffects = rest?.effects.filter((it) => it.isApplicable(pokemon)) ?? []

	const options = Object.entries(PokemonResting).map(([key, value]) => ({
		name: value({ hitDiceToSpend: 0, hitDiceSize }).name,
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
	<Fieldset title="Choose one" columns={1}>
		<RadioFields label="Rest Choices" bind:checked={restToPerform} values={options} required />
	</Fieldset>
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
</style>
