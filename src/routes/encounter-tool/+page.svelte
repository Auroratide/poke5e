<script lang="ts">
	import { page } from "$app/stores"
	import { Page } from "$lib/ui/layout"
	import { VsIcon } from "$lib/ui/icons"
	import { Button, Loader } from "$lib/ui/elements"
	import { MAIN_SEARCH_ID } from "$lib/ui/layout/SkipLinks.svelte"
	import { PokemonSpecies, PokemonSpeciesList, SpeciesStore } from "$lib/poke5e/species"
	import Title from "$lib/ui/layout/Title.svelte"
	import { IntField, Removable, SelectField } from "$lib/ui/forms"
	import { PokemonType, TypeTag, type PokeType } from "$lib/pokemon/types"
	import Card from "$lib/ui/page/Card.svelte"
	import { experienceAwarded } from "$lib/poke5e/experience"
	import { tick } from "svelte"
	import Stepper from "$lib/ui/elements/Stepper.svelte"
	import { SpeciesSprite } from "$lib/poke5e/species/media"
	import { Encounter } from "$lib/poke5e/encounters"

	const NONE = ""
	const canonList = SpeciesStore.canonList()
	const noneOption = { name: "- None -", value: NONE }
	const primaryTypeOptions = [noneOption].concat(PokemonType.list.map((it) => ({ name: it, value: it })))
	const difficultyOptions = [
		{name: "Low", value: "low"},
		{name: "Moderate", value: "moderate"},
		{name: "High", value: "high"},
	]
	const pokemonLimitOptions = [
		{name: "No", value: "no"},
		{name: "Yes", value: "yes"},
	]
	const difficultyMultipliers = {
		low: 1,
		moderate: 1.5,
		high: 2,
	}

	$: biomes = $page.data.biomes
	$: ssrPokemon = $page.data.pokemonList
	$: pokemonToRender = ssrPokemon ?? $canonList
	$: biomeOptions = [
		{ name: "- None -", value: "" },
		...(biomes.item.biomes ?? []).map((t: { name: string, id: string }) => ({
			name: t.name,
			value: t.id,
		})),
	]
	$: maxPlayerLevel = partyPlayers.length > 0 
		? Math.max(...partyPlayers.map(p => p.level)) 
		: 1
	$: totalPartyLevels = partyPlayers.reduce((sum, p) => sum + p.level, 0)
	$: pokemonExtraModifier = partyPlayers.reduce((acc, p) => {
		const extra = p.numberOfPokemon > 1 ? (p.numberOfPokemon - 1) * 0.1 : 0
		return acc + extra
	}, 0)
	$: maxExpTotal = Math.round((totalPartyLevels * 50) * (1 + pokemonExtraModifier) * difficultyMultipliers[difficulty])

	let biome = ""
	let difficulty: "low" | "moderate" | "high" = "low"
	let pokemonType: PokeType
	let arePokemonLimited: "yes" | "no" = "no"
	let pokemonLimit: number = 1
	let encounter = Encounter.createEmpty()
	let noMatches = false
	let partyPlayers: { id: number, level: number, numberOfPokemon: number }[] = []
	let nextPlayerId = 1

	$: currentEncounterExp = Encounter.totalExp(encounter)
	$: encounterDifficulty = (() => {
		const ratio = currentEncounterExp / maxExpTotal * difficultyMultipliers[difficulty]
		if (ratio < 0.9) return { label: "Trivial", color: "#9e9e9e" }
		if (ratio <= 1.15) return { label: "Low", color: "#4caf50" }
		if (ratio <= 1.5) return { label: "Moderate", color: "#ff9800" }
		if (ratio <= 2) return { label: "High", color: "#f44336" }
		return { label: "Deadly", color: "#7b1fa2" }
	})()

	const addPlayer = () => {
		partyPlayers = [...partyPlayers, { id: nextPlayerId++, level: 1, numberOfPokemon: 1 }]
	}

	const deletePlayer = (id: number) => {
		partyPlayers = partyPlayers.filter(p => p.id !== id)
	}

	const addPokemonToEncounter = (pokemon: PokemonSpecies, level?: number) => {
		if (!partyPlayers.length) {
			addPlayer()
		}

		encounter = Encounter.addPokemon(encounter, pokemon, level ?? 1)
		console.log("??")
		noMatches = false
	}

	const onDelete = (pokemon: {data: PokemonSpecies, count: number}) => {
		encounter = Encounter.removePokemon(encounter, pokemon.data)
	}

	const generateEncounter = async () => {
		// Generate default party if there is none
		if (!partyPlayers.length) {
			for (let index = 0; index < 4; index++) {
				addPlayer()
			}
			// So Svelte can trigger the changes in the side variables
			await tick()
		}
		
		const pokemonPool: PokemonSpecies[] = []

		// Add Pokémon to the pool
		for (let i = 0; i < pokemonToRender.length; i++) {
			const pokemon = pokemonToRender[i]
			const hasBiome = biome === "" || pokemon.data.habitat.biomes.includes(biome)
			const hasType = !pokemonType || pokemon.data.type.includes(pokemonType)

			if (hasBiome && hasType) {
				pokemonPool.push(pokemon)
			}
		}

		if (pokemonPool.length === 0) {
			noMatches = true
			return
		}

		encounter = Encounter.generate({
			pool: pokemonPool,
			targetExp: maxExpTotal,
			pokemonLimit: arePokemonLimited === "yes" ? pokemonLimit : Infinity,
			maxLevel: maxPlayerLevel,
		})

		if (encounter.pokemon.length === 0) {
			noMatches = true
		}
	}

	const clearEncounter = () => {
		encounter = Encounter.createEmpty()
	}
</script>

<Page theme="forest">
	<Title value="Encounter Tool" />
	<VsIcon slot="icon" />
	
	<nav id="{MAIN_SEARCH_ID}" slot="side" class="table" aria-label="Pokémon List">
		{#if pokemonToRender !== undefined}
			<PokemonSpeciesList pokemons={pokemonToRender} onClick={(pokemon) => addPokemonToEncounter(pokemon)} disableLink={true} />
		{:else}
			<Loader />
		{/if}
	</nav>
	
	<Card title="Encounter Tool">
		<section>
			<p>Welcome to the Encounter Tool! Please, keep in mind that this system is being currently tested and might not be accurately balanced.</p>
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
				<SelectField label="Difficulty" options={difficultyOptions} bind:value={difficulty}/>
				<p class="xp-awarded">{maxExpTotal} XP</p>
			</div>
			<div class="simple-type-field">
				<SelectField label="Pokémon Limit" options={pokemonLimitOptions} bind:value={arePokemonLimited}/>
				{#if arePokemonLimited === "yes"}
					<IntField label="Limit" bind:value={pokemonLimit} min={1}/>
				{:else}
					<p></p>
				{/if}
			</div>
		
			<Button on:click={generateEncounter}>Generate Encounter</Button>
		</section>
		<section>
			<h2>Encounter</h2>
			<div class="manual-pokemon-list">
				{#if encounter.pokemon.length > 0}
					<div class="pokemon-list">
						{#each encounter.pokemon as pokemon (pokemon.data.id.data)}
							<div class="pokemon-item">
								<div class="pokemon-data">
									<div class="pokemon-sprite">
										<SpeciesSprite media={pokemon.data.media} alt="{pokemon.data.name}" />
									</div>
									<div class="pokemon-info">
										<p class="pokemon-name">{pokemon.data.name} <label class="pokemon-level">Lv. <input type="number" min={1} bind:value={pokemon.level} /></label></p>
										<p class="pokemon-stats">SR: {pokemon.data.sr} • XP: {experienceAwarded(pokemon.level, pokemon.data.data.sr)}</p>
										<TypeTag type={pokemon.data.data.type} />
									</div>
								</div>
								<Stepper bind:value={pokemon.count} deleteOnZero={true} on:delete={() => onDelete(pokemon)} />
							</div>
						{/each}
					</div>
				{:else if noMatches}
					<p class="no-matches">No Pokémon meet the criteria!</p>
				{:else}
					<p>No Pokémon added.</p>
				{/if}

				{#if encounter.pokemon.length > 0}
					<div>
						<p>
							<strong>Total XP:</strong> {currentEncounterExp} ({Math.round(currentEncounterExp / partyPlayers.length)}/player)
							<span class="difficulty-badge" style="background-color: {encounterDifficulty.color}">
								{encounterDifficulty.label}
							</span>
							</p>
					</div>
				{/if}

				<Button variant="danger" on:click={clearEncounter}>Clear encounter</Button>
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

	.xp-awarded {
		margin-bottom: 0;
		margin-top: 1em;
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
		padding-bottom: 1em;
	}

	.pokemon-data {
		display: flex;
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
	.pokemon-level>input {
		width: 40px;
	}

	.pokemon-sprite {
		display: block;
		border: none;
		box-shadow: none;
		aspect-ratio: 1;
		object-fit: contain;
		width: 4em;
		padding-bottom: 1em;
	}

    .difficulty-badge {
        padding: 0.2em 0.8em;
        border-radius: 100px;
        color: var(--skin-bg-text);
        font-size: 0.9em;
        font-weight: bold;
        margin-left: 0.5em;
        text-transform: uppercase;
    }

	.no-matches {
		color: var(--skin-danger-text);
		font-style: italic;
	}

	@media screen and (min-width: 50rem) {
		.pokemon-level>input {
			width: 65px;
		}
		.pokemon-sprite {
			width: 6em;
		}
		.pokemon-item {
			padding-bottom: 0;
		}
	}
</style>
