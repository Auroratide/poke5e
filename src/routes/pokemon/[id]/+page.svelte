<script lang="ts">
	import type { PageData } from "./$types"
	import { Title } from "$lib/ui/layout"
	import { PokemonSpeciesCard } from "$lib/poke5e/species"

	export let data: PageData
	$: pokemon = data.pokemon
</script>

<Title value={pokemon.data.name} />
<PokemonSpeciesCard value={pokemon} />
