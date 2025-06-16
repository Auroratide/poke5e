<script lang="ts">
	import type { PageData } from "./$types"
	import type { Move } from "$lib/moves/types"
	import PokeMove from "$lib/moves/PokeMove.svelte"
	import Title from "$lib/design/Title.svelte"

	export let data: PageData
	$: tm = data.tm
	$: move = tm.moveInfo as Move
</script>

<Title value={move.name} />
<PokeMove move={move} />
