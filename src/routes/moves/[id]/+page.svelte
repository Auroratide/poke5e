<script lang="ts">
	import type { PageData } from "./$types"
	import PokeMove from "$lib/moves/PokeMove.svelte"
	import Title from "$lib/design/Title.svelte"

	export let data: PageData
	$: move = data.move
</script>

<Title value={move.name} />
<PokeMove move={move} />
