<script lang="ts">
	import type { PageData } from "./$types"
	import PokemonStatblock from "$lib/creatures/Pokemon.svelte"
	import Layout from "../_layout.svelte"
	import Title from "$lib/design/Title.svelte"

	export let data: PageData
	$: pokemon = data.pokemon
</script>

<Title value={pokemon.name} />
<Layout>
	<PokemonStatblock {pokemon} />
</Layout>
