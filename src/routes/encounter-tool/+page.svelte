<script lang="ts">
	import { page } from "$app/stores"
	import { Page } from "$lib/ui/layout"
	import { PokeballIcon } from "$lib/ui/icons"
	import { Button, Loader } from "$lib/ui/elements"
	import { MAIN_SEARCH_ID } from "$lib/ui/layout/SkipLinks.svelte"
	import { PokemonSpeciesList, SpeciesStore } from "$lib/poke5e/species"
	import { ListPageHeading } from "$lib/ui/page"
	import Title from "$lib/ui/layout/Title.svelte";
	import { SelectField, type SelectFieldOption } from "$lib/ui/forms";

	const canonList = SpeciesStore.canonList()

	$: themes = $page.data.themes
	$: ssrPokemon = $page.data.pokemonList
	$: pokemonToRender = ssrPokemon ?? $canonList


	$: themeOptions = (themes.item.themes ?? []).map((t: any) => ({
		name: t.name,
		value: t.id,
	}))
	console.log(themes);

	let theme = "forest"

	const generateEncounter = () => {
		console.log("GENERATE ENCOUNTER");
	}
</script>

<Page theme="grey">
	<Title value="Encounter Tool" />
	<PokeballIcon slot="icon" />
	
	<nav id="{MAIN_SEARCH_ID}" slot="side" class="table" aria-label="Pokémon List">
		{#if pokemonToRender !== undefined}
			<PokemonSpeciesList pokemons={pokemonToRender} />
		{:else}
			<Loader />
		{/if}
	</nav>
	
	<div>
		<SelectField label="Theme" options={themeOptions} bind:value={theme} disabled={false} />
		<Button on:click={generateEncounter}>Generate Encounter</Button>
	</div>
</Page>

<style>
	nav {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
