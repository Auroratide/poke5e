<script lang="ts">
	import { page } from "$app/stores"
	import { Page } from "$lib/ui/layout"
	import { PokeballIcon } from "$lib/ui/icons"
	import { Button, Loader } from "$lib/ui/elements"
	import { MAIN_SEARCH_ID } from "$lib/ui/layout/SkipLinks.svelte"
	import { PokemonSpecies, PokemonSpeciesList, SpeciesStore } from "$lib/poke5e/species"
	import Title from "$lib/ui/layout/Title.svelte";
	import { IntField, Removable, SelectField } from "$lib/ui/forms";
	import { PokemonType, TypeTag, type PokeType } from "$lib/pokemon/types";
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
	let selectedPokemon: {data: PokemonSpecies, count: number, level: number}[] = []
	let maxSrTotal = 5

	let partyPlayers: { id: number, level: number, numberOfPokemon: number }[] = [];
    let nextPlayerId = 1;

    const addPlayer = () => {
        partyPlayers = [...partyPlayers, { id: nextPlayerId++, level: 1, numberOfPokemon: 1 }];
    }

    const deletePlayer = (id: number) => {
        partyPlayers = partyPlayers.filter(p => p.id !== id);
    }

	const addPokemonToEncounter = (pokemon: PokemonSpecies) => {
		const pokemonId = pokemon.data.id

		// If already selected, increase count
		const existing = selectedPokemon.find((poke) => String(poke.data.id.data) === pokemonId)
		if (existing) {
			existing.count += 1
			selectedPokemon = [...selectedPokemon]
		} else {
			selectedPokemon = [...selectedPokemon, { data: pokemon, count: 1, level: 1}]
		}
	}

	const onDelete = (pokemon: {data: PokemonSpecies, count: number}) => {
		selectedPokemon = selectedPokemon.filter((poke) => poke !== pokemon)
	}

	const generateEncounter = () => {
		selectedPokemon = []
		const pokemonPool: PokemonSpecies[] = []

		// Build pool by biome (and optional type)
		for (let i = 0; i < pokemonToRender.length; i++) {
			const pokemon = pokemonToRender[i]
			const pokemonBiomes = pokemon.data.habitat.biomes

			const hasBiome = pokemonBiomes.includes(biome)
			console.log(pokemon.data.type);
			
			const hasType =
				!pokemonType ||
				pokemon.data.type.includes(pokemonType)

			if (hasBiome && hasType) {
				pokemonPool.push(pokemon)
			}
		}

		if (pokemonPool.length === 0) return

		let currentTotalSr = 0
		// Safety to avoid infinite loops
		let attempts = 0
		const MAX_ATTEMPTS = 500

		while (attempts < MAX_ATTEMPTS) {
			attempts++

			const randomPokemon =
				pokemonPool[Math.floor(Math.random() * pokemonPool.length)]

			const sr = Number(randomPokemon.data.sr)

			// Would exceed limit → skip
			if (currentTotalSr + sr > maxSrTotal) {
				// Check if *any* pokemon can still fit
				const canStillAdd = pokemonPool.some(
					(p) => currentTotalSr + Number(p.data.sr) <= maxSrTotal
				)

				if (!canStillAdd) break

				continue
			}

			// Add it
			currentTotalSr += sr
			addPokemonToEncounter(randomPokemon)
			// Stop if we hit exactly
			if (currentTotalSr === maxSrTotal) break
		}
	}


	const clearEncounter = () => {
		selectedPokemon = []
	}
</script>

<Page theme="grey">
	<Title value="Encounter Tool" />
	<PokeballIcon slot="icon" />
	
	<nav id="{MAIN_SEARCH_ID}" slot="side" class="table" aria-label="Pokémon List">
		{#if pokemonToRender !== undefined}
			<PokemonSpeciesList pokemons={pokemonToRender} onClick={addPokemonToEncounter} disableLink={true} />
		{:else}
			<Loader />
		{/if}
	</nav>
	
	<Card title="Encounter Tool">
		<section>
			<p>Welcome to the Encounter Tool! Please, keep in mind that this system is being currently testing and might not be accurately balanced.</p>
		</section>

		<section>
			<h2>Players</h2>
			{#if partyPlayers.length > 0}
				<div class="player-list">
					{#each partyPlayers as player}
						<div class="player-item">
							<Removable on:remove={() => deletePlayer(player.id)}>
								<div class="player-fields">
									<IntField label="Level" bind:value={player.level} min={1} />
									<IntField label="Pokémon" bind:value={player.numberOfPokemon} min={1} />
								</div>
							</Removable>
						</div>
					{/each}
				</div>
			{:else}
				<p>No Players in the Party.</p>
			{/if}
			<Button variant="success" on:click={addPlayer}>Add Player</Button>
		</section>
		<section>
			<h2>Configuration</h2>
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
		
			<Button on:click={generateEncounter}>Generate Encounter</Button>
		</section>
		<section>
			<h2>Encounter</h2>
			<div class="manual-pokemon-list">
				{#if selectedPokemon.length > 0}
					<div class="pokemon-list">
						{#each selectedPokemon as pokemon (pokemon.data.id)}
							<div class="pokemon-item">
								<div class="pokemon-info">
									<p class="pokemon-name">{pokemon.data.name} <span class="pokemon-level">Lv. <input type="number" bind:value={pokemon.level}></span></p>
									<p class="pokemon-stats">SR: {pokemon.data.sr}</p>
									<TypeTag type={pokemon.data.data.type} />
								</div>
								<Stepper bind:value={pokemon.count} deleteOnZero={true} on:delete={() => onDelete(pokemon)} />
							</div>
						{/each}
					</div>
				{:else}
					<p>No Pokémon added.</p>
				{/if}
				<Button variant="success" on:click={clearEncounter}>Clear encounter</Button>
				<p> </p>
			</div>
		</section>
	</Card>

	
</Page>

<style>
	nav {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.player-item {
		margin-bottom: 1em;
	}

	.player-fields {
		display: flex;
		gap: 1em;
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

	.pokemon-list {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 1em 0 2em;
	}

	.pokemon-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--skin-bg-light);
	}

	.pokemon-info > p {
		margin-bottom: 0;
	}

	.pokemon-name {
		font-size: 1.2em;
		font-weight: bold;
	}
	.pokemon-level {
		font-weight: normal;
		font-size: .8em;
	}
</style>
