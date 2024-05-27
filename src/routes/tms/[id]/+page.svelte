<script lang="ts">
	import type { PageData } from "./$types"
	import type { Move } from "$lib/moves/types"
	import Layout from "../_layout.svelte"
	import PokeMove from "$lib/moves/PokeMove.svelte"
	import Title from "$lib/design/Title.svelte"
	import TeachablePokemon from "$lib/moves/TeachablePokemon.svelte"

	export let data: PageData
	$: tm = data.tm
	$: move = tm.moveInfo as Move
</script>

<Title value={move.name} />
<Layout>
	<PokeMove move={move}>
		<section slot="extra">
			<TeachablePokemon pokemon={tm.pokemon} />
		</section>
	</PokeMove>
</Layout>
