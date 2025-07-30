<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import Button from "$lib/design/Button.svelte"
	import { ActionArea, Fieldset, Form, RadioFields } from "$lib/design/forms"
	import { PokemonResting } from "./Rest"
	import type { TrainerPokemon } from "$lib/trainers/types"
	import IntField from "$lib/design/forms/IntField.svelte"
	import type { Pokemon } from "$lib/creatures/types"

	const dispatch = createEventDispatcher()

	export let pokemon: TrainerPokemon
	export let species: Pokemon
	export let saving: boolean = false
	$: disabled = saving

	let restToPerform: keyof typeof PokemonResting = undefined
	let hitDiceToSpend = 0
	$: rest = restToPerform ? PokemonResting[restToPerform]({ hitDiceToSpend, hitDiceSize: species.hitDice }) : undefined
	$: applicableEffects = rest?.effects.filter((it) => it.isApplicable(pokemon)) ?? []

	const options = Object.entries(PokemonResting).map(([key, value]) => ({
		name: value({ hitDiceToSpend: 0, hitDiceSize: species.hitDice }).name,
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
				<IntField label="Hit Dice to Spend" bind:value={hitDiceToSpend} min={0} max={pokemon.hitDice.current} />
			{/if}
			<div class="effects">
				<p>Resting will have these effects:</p>
				{#if applicableEffects.length > 0}
					<ul>
						{#each applicableEffects as effect}
							<li>{@html effect.description(pokemon)}</li>
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
