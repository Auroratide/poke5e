<script lang="ts">
	import type { LevelUpEffect } from "./effects/LevelUpEffect"

	let {
		effects,
	}: {
		effects: LevelUpEffect<any, any>[],
	} = $props()
</script>

{#each effects as effect}
	<effect.Field value={effect} />
{/each}
