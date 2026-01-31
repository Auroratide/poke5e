<script lang="ts">
	import { page } from "$app/stores"
	import { Page } from "$lib/ui/layout"
	import { PokeballIcon } from "$lib/ui/icons"
	import { Button, Loader } from "$lib/ui/elements"
	import { MAIN_SEARCH_ID } from "$lib/ui/layout/SkipLinks.svelte"
	import { PokemonSpecies, PokemonSpeciesList, SpeciesStore } from "$lib/poke5e/species"
	import Title from "$lib/ui/layout/Title.svelte";
	import { SelectField, type SelectFieldOption } from "$lib/ui/forms";
	import { PokemonType, type PokeType } from "$lib/pokemon/types";
	import Card from "$lib/ui/page/Card.svelte";
	import Stepper from "$lib/ui/elements/Stepper.svelte";


	const NONE = ""
	const canonList = SpeciesStore.canonList()
	const noneOption = { name: "- None -", value: NONE }
	const primaryTypeOptions = [noneOption].concat(PokemonType.list.map((it) => ({ name: it, value: it })))
	const encounterCategoryOptions = [{name: "wild", value: "Wild"}, {name: "trainer", value: "Trainer"}]
	const wildEncounterOptions = [
		{name: "Random", value: "random"},
		{name: "Boss", value: "boss"},
		{name: "Boss with minions", value: "Boss_with_minions"},
		{name: "Duo Pokémon", value: "Duo"},
		{name: "Trio Pokémon", value: "Trio"},
		{name: "Horde", value: "horde"},
	]
	const trainerEncounterOptions = [
		{name: "Elite", value: "elite"},
		{name: "Gym Leader", value: "gym_leader"},
		{name: "Grunt", value: "grunt"},
		{name: "Random trainer", value: "random_trainer"},
	]

	$: biomes = $page.data.biomes
	$: ssrPokemon = $page.data.pokemonList
	$: pokemonToRender = ssrPokemon ?? $canonList
	$: biomeOptions = (biomes.item.biomes ?? []).map((t: any) => ({
		name: t.name,
		value: t.id,
	}))

	let biome = "forest"
	let pokemonType: PokeType
	let encounterCategory: 'Wild' | 'Trainer' = 'Wild'
	let wildEncounter: string
	let trainerEncounter: string
	let selectedPokemon: {data: PokemonSpecies, count: number}[] = []

	const onClickPokemon = (pokemon: PokemonSpecies, event: MouseEvent) => {
		event.preventDefault()
		const pokemonId = pokemon.data.id
		// If already selected, increase count
		const existing = selectedPokemon.find((poke) => String(poke.data.id.data) === pokemonId)
		
		if (existing) {
			existing.count += 1
			selectedPokemon = [...selectedPokemon]
		} else {
			selectedPokemon = [...selectedPokemon, { data: pokemon, count: 1 }]
		}
	}

	const onDelete = (pokemon: {data: PokemonSpecies, count: number}) => {
		selectedPokemon = selectedPokemon.filter((poke) => poke !== pokemon)
	}

	const generateEncounter = () => {
		console.log("GENERATE ENCOUNTER");
	}
</script>

<Page theme="grey">
	<Title value="Encounter Tool" />
	<PokeballIcon slot="icon" />
	
	<nav id="{MAIN_SEARCH_ID}" slot="side" class="table" aria-label="Pokémon List">
		{#if pokemonToRender !== undefined}
			<PokemonSpeciesList pokemons={pokemonToRender} onClick={onClickPokemon} disableLink={true} />
		{:else}
			<Loader />
		{/if}
	</nav>
	
	<Card title="Encounter Tool">
		<section>
			<div class="simple-type-field">
				<SelectField label="Biome" options={biomeOptions} bind:value={biome} />
				<SelectField label="Type in common" options={primaryTypeOptions} bind:value={pokemonType}/>
			</div>
			<div class="simple-type-field">
				<SelectField label="Encounter category" options={encounterCategoryOptions} bind:value={encounterCategory}/>
				{#if encounterCategory === 'Wild'}
					<SelectField label="Encounter type" options={wildEncounterOptions} bind:value={wildEncounter}/>
				{:else}
					<SelectField label="Encounter type" options={trainerEncounterOptions} bind:value={trainerEncounter}/>
				{/if}
			</div>
		
			<div class="manual-pokemon-list">
				{#if selectedPokemon.length > 0}
					<div class="pokemon-list">
						{#each selectedPokemon as pokemon (pokemon.data.id)}
							<div class="pokemon-item">
								<span>{pokemon.data.name}</span>
								<Stepper bind:value={pokemon.count} deleteOnZero={true} on:delete={() => onDelete(pokemon)} />
							</div>
						{/each}
					</div>
				{:else}
					<p>No Pokémon selected</p>
				{/if}
			</div>
		</section>
		<section>
			<Button on:click={generateEncounter}>Generate Encounter</Button>
			<p> </p>
		</section>
	</Card>

	
</Page>

<style>
	nav {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.simple-type-field {
		display: flex;
		inline-size: 100%;
		align-items: center;
		gap: 1em;
		margin-bottom: 1em;
	}
	.simple-type-field :global(> *) {
		flex: 1;
	}
</style>
