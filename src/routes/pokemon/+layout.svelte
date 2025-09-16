<script lang="ts">
	import { page } from "$app/stores"
	import Page from "$lib/design/Page.svelte"
	import Pokeball from "$lib/design/icon/Pokeball.svelte"
	import Loader from "$lib/design/Loader.svelte"
	import { MAIN_SEARCH_ID } from "$lib/design/SkipLinks.svelte"
	import { PokemonSpeciesList, SpeciesStore } from "$lib/creatures/species"
	import ListPageHeading from "$lib/design/ListPageHeading.svelte"

	$: ssrPokemon = $page.data.pokemonList
	$: pokemonToRender = ssrPokemon ?? $SpeciesStore
</script>

<Page theme="red">
	<Pokeball slot="icon" />
	<nav id="{MAIN_SEARCH_ID}" slot="side" class="table" aria-label="Pokémon List">
		<ListPageHeading title="Pokémon List" target="/pokemon" />
		{#if pokemonToRender !== undefined}
			<PokemonSpeciesList pokemons={pokemonToRender} />
		{:else}
			<Loader />
		{/if}
	</nav>
	<slot></slot>
</Page>

<style>
	nav {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
