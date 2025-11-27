<script lang="ts">
	import { page } from "$app/stores"
	import { Page } from "$lib/ui/layout"
	import { PokeballIcon } from "$lib/ui/icons"
	import { Loader } from "$lib/ui/elements"
	import { MAIN_SEARCH_ID } from "$lib/ui/layout/SkipLinks.svelte"
	import { PokemonSpeciesList, SpeciesStore } from "$lib/creatures/species"
	import ListPageHeading from "$lib/design/ListPageHeading.svelte"

	const canonList = SpeciesStore.canonList()

	$: ssrPokemon = $page.data.pokemonList
	$: pokemonToRender = ssrPokemon ?? $canonList
</script>

<Page theme="red">
	<PokeballIcon slot="icon" />
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
