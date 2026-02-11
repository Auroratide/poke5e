<script lang="ts" context="module">
	export type TrainerResterSubmit = {
		trainer: TrainerData,
		didUpdatePokemon: boolean,
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { Button } from "$lib/ui/elements"
	import { ActionArea, Fieldset, Form, IntField, RadioFields, HintText, CheckboxFields } from "$lib/ui/forms"
	import { PokemonResting, TrainerResting, type RestType } from "./Rest"
	import type { TrainerData } from "$lib/trainers/data"
	import { trainerHitDiceSize } from "$lib/trainers/hit-dice"
	import PokemonBanner from "./PokemonBanner.svelte"
	import { TrainerPaths } from "$lib/trainers/paths"
	import { rulesVersion } from "$lib/site/rules-version"
	import { Art } from "$lib/ui/elements"
	import type { Readable } from "svelte/store"
	import type { PokemonSpecies, SpeciesIdentifier } from "$lib/poke5e/species"
	import { m } from "$lib/site/i18n"

	const dispatch = createEventDispatcher()

	const APPLY_TO_POKEMON = "apply-to-pokemon"

	export let trainer: TrainerData
	export let saving: boolean = false
	export let allSpecies: Readable<PokemonSpecies[]>

	const getSpecies = (pokemonId: SpeciesIdentifier) => $allSpecies.find((s) => s.id.data === pokemonId.data)

	$: disabled = saving
	$: hitDiceSize = $trainerHitDiceSize

	$: trainerPaths = TrainerPaths[$rulesVersion] 

	let restToPerform: RestType = undefined
	let hitDiceToSpend = 0
	let pokemonOptions: string[] = [APPLY_TO_POKEMON]
	$: applyToPokemon = pokemonOptions.includes(APPLY_TO_POKEMON)
	$: rest = restToPerform ? TrainerResting[restToPerform]({
		hitDiceToSpend,
		hitDiceSize,
		trainerPaths,
	}) : undefined
	$: applicableEffects = rest?.effects.filter((it) => it.isApplicable(trainer.info)) ?? []

	const options = Object.entries(TrainerResting).map(([key, value]) => ({
		name: value({ hitDiceToSpend: 0, hitDiceSize, trainerPaths }).name,
		value: key,
	}))

	const endEdit = () => {
		const afterResting = rest.apply(trainer.info)
		trainer.info = afterResting

		if (applyToPokemon) {
			trainer.pokemon = trainer.pokemon.map((pokemon) => {
				const hitDiceSize = pokemon.customHitDiceSize ?? getSpecies(pokemon.pokemonId).hitDice
				const rest = PokemonResting[restToPerform]({ hitDiceToSpend, hitDiceSize, rulesVersion: $rulesVersion })
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
	<div class="art-row">
		<Fieldset title={m["universal.chooseOne"]()} columns={1}>
			<RadioFields label="Rest Choices" bind:checked={restToPerform} values={options} required />
		</Fieldset>
		{#if trainer.info.avatar?.href}
			<Art src="{trainer.info.avatar.href}" alt="{trainer.info.name}" />
		{/if}
	</div>
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
				{#if restToPerform === "Pokecenter"}
					{#if applyToPokemon}
						<p>Resting will have these effects:</p>
						<ul>
							<li>{trainer.info.name}'s Pokémon will benefit from a {restToPerform} Rest.</li>
						</ul>
					{:else}
						<p>{trainer.info.name} does not benefit directly from resting at a Pokécenter!</p>
						<p>Ensure the <strong>"Apply to {trainer.info.name}'s Pokémon Also"</strong> is checked above to rest all of your Pokémon at the center</p>
					{/if}
				{:else}
					<p>{trainer.info.name} will benefit from these effects:</p>
					{#if applicableEffects.length > 0}
						<ul>
							{#each applicableEffects as effect}
								{#each effect.description(trainer.info) as description}
									<li>{@html description}</li>
								{/each}
							{/each}
						</ul>
					{:else}
						<p>{trainer.info.name} is already well-rested.</p>
					{/if}
					{#if applyToPokemon}
						<p>Additionally, their Pokémon will undergo a {restToPerform} Rest.</p>
					{/if}
				{/if}
			</div>
		{/if}
	</section>
	<ActionArea>
		<Button on:click={cancel} variant="ghost" {disabled}>{m["universal.cancel"]()}</Button>
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
		padding-block: 1em 0.5em;
		margin-block-end: 1em;
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
