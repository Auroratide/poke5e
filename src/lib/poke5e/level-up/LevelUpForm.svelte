<script lang="ts">
	import type { LevelUpEffect } from "./effects/LevelUpEffect"

	let {
		effects,
	}: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		effects: LevelUpEffect<any, any>[],
	} = $props()
</script>

{#each effects as effect}
	<effect.Field value={effect} />
{/each}
