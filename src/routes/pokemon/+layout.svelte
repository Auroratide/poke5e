<script lang="ts">
	import { page } from "$app/stores"
	import Page from "$lib/design/Page.svelte"
	import PokemonList from "$lib/creatures/PokemonList.svelte"
	import Pokeball from "$lib/design/icon/Pokeball.svelte"
	import Loader from "$lib/design/Loader.svelte"
	import { pokemon } from "$lib/creatures/store"

	$: ssrPokemon = $page.data.pokemonList
	$: pokemonToRender = ssrPokemon ?? $pokemon
</script>

<Page theme="red">
	<Pokeball slot="icon" />
	<nav slot="side" class="table" aria-label="Pokemon List">
		{#if pokemonToRender !== undefined}
			<PokemonList pokemons={pokemonToRender} />
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
