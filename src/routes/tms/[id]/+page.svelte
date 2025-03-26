<script lang="ts">
	import type { PageData } from "./$types"
	import type { Move } from "$lib/moves/types"
	import PokeMove from "$lib/moves/PokeMove.svelte"
	import Title from "$lib/design/Title.svelte"
	import SimplePokemonList from "$lib/pokemon/SimplePokemonList.svelte"

	export let data: PageData
	$: tm = data.tm
	$: move = tm.moveInfo as Move
</script>

<Title value={move.name} />
<PokeMove move={move}>
	<section slot="extra">
		<h2>Can teach this to:</h2>
		<SimplePokemonList pokemon={tm.pokemon} />
	</section>
</PokeMove>
