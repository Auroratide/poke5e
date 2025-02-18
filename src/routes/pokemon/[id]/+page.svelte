<script lang="ts">
	import type { PageData } from "./$types"
	import PokemonStatblock from "$lib/creatures/Pokemon.svelte"
	import Title from "$lib/design/Title.svelte"

	export let data: PageData
	$: pokemon = data.pokemon
</script>

<Title value={pokemon.name} />
<PokemonStatblock {pokemon} />
