<script lang="ts" context="module">
	export type TrainerResterSubmit = {
		trainer: TrainerData,
		didUpdatePokemon: boolean,
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import Button from "$lib/design/Button.svelte"
	import { ActionArea, Fieldset, Form, IntField, RadioFields, HintText, CheckboxFields } from "$lib/design/forms"
	import { PokemonResting, TrainerResting, type RestType } from "./Rest"
	import type { TrainerData } from "$lib/trainers/data"
	import { trainerHitDiceSize } from "$lib/trainers/hit-dice"
	import PokemonBanner from "./PokemonBanner.svelte"
	import { pokemon as allPokemon } from "$lib/creatures/store"

	const dispatch = createEventDispatcher()
	const getSpecies = (pokemonId: string) => $allPokemon.find((s) => s.id === pokemonId)

	const APPLY_TO_POKEMON = "apply-to-pokemon"

	export let trainer: TrainerData
	export let saving: boolean = false
	$: disabled = saving
	$: hitDiceSize = $trainerHitDiceSize

	let restToPerform: RestType = undefined
	let hitDiceToSpend = 0
	let pokemonOptions: string[] = [APPLY_TO_POKEMON]
	$: applyToPokemon = pokemonOptions.includes(APPLY_TO_POKEMON)
	$: rest = restToPerform ? TrainerResting[restToPerform]({ hitDiceToSpend, hitDiceSize }) : undefined
	$: applicableEffects = rest?.effects.filter((it) => it.isApplicable(trainer.info)) ?? []

	const options = Object.entries(TrainerResting).map(([key, value]) => ({
		name: value({ hitDiceToSpend: 0, hitDiceSize }).name,
		value: key,
	}))

	const endEdit = () => {
		const afterResting = rest.apply(trainer.info)
		trainer.info = afterResting

		if (applyToPokemon) {
			trainer.pokemon = trainer.pokemon.map((pokemon) => {
				const hitDiceSize = pokemon.customHitDiceSize ?? getSpecies(pokemon.pokemonId).hitDice
				const rest = PokemonResting[restToPerform]({ hitDiceToSpend, hitDiceSize })
				return rest.apply(pokemon)
			})
		}

		dispatch("submit", {
			trainer,
			didUpdatePokemon: applyToPokemon,
		})
	}

	const cancel = () => {
		dispatch("cancel")
	}
</script>

<Form onsubmit={endEdit} {saving}>
	<Fieldset title="Choose one" columns={1}>
		<RadioFields label="Rest Choices" bind:checked={restToPerform} values={options} required />
	</Fieldset>
	<section class="pokemon">
		<CheckboxFields label="Apply to {trainer.info.name}'s Pokémon also" name="{APPLY_TO_POKEMON}" values={[{
			name: `Apply to ${trainer.info.name}'s Pokémon also`,
			value: APPLY_TO_POKEMON,
		}]} bind:checked={pokemonOptions} {disabled} />
		<PokemonBanner pokemon={trainer.pokemon} darken={!applyToPokemon} />
	</section>
	<section style:min-height="8em">
		{#if rest != null}

			{#if restToPerform === "Short"}
				<IntField label="Max Hit Dice to Spend" bind:value={hitDiceToSpend} min={0} max={trainer.info.hitDice.current} {disabled} />
				<HintText>This will stop spending hit dice once max HP is reached.</HintText>
			{/if}
			<div class="effects">
				<p>Resting will have these effects:</p>
				{#if applicableEffects.length > 0 || applyToPokemon}
					<ul>
						{#each applicableEffects as effect}
							{#each effect.description(trainer.info) as description}
								<li>{@html description}</li>
							{/each}
						{/each}
						{#if applyToPokemon}
							<li>Pokemon will undergo a {restToPerform} Rest.</li>
						{/if}
					</ul>
				{:else}
					<p>{trainer.info.name} is already well-rested.</p>
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

	.pokemon {
		border-block: 0.125em solid var(--skin-bg);
		margin-inline: 1em;
		padding-block: 1em 0.25em;
		margin-block-end: 1em;
	}
</style>
