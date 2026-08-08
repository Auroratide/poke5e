<script lang="ts">
	import type { ContestMoveEffect } from "$lib/moves/contest"
	import { Heading } from "$lib/ui/elements"

	export let effects: ContestMoveEffect[]
</script>

{#each effects as effect}
	<Heading level="3" id="contest-effect-{effect.id}">{effect.name}</Heading>
	<p>{effect.effect}</p>
{/each}
