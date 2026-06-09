<script lang="ts">
	import type { Trainer } from "$lib/trainers/types"
	import type { LevelUpEffect } from "./effects/LevelUpEffect"

	let {
		trainer,
		effects,
	}: {
		trainer: Trainer,
		effects: LevelUpEffect<any, any>[],
	} = $props()
</script>

{#each effects as effect}
	<effect.Field value={effect} />
{/each}
