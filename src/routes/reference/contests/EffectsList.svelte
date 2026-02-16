<script lang="ts">
	import type { ContestMoveEffect } from "$lib/moves/contest"

	export let effects: ContestMoveEffect[]
</script>

{#each effects as effect}
	<h3>{effect.name}</h3>
	<p>{effect.effect}</p>
{/each}
