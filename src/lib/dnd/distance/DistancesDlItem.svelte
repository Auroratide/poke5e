<script lang="ts">
	import type { DistanceSet } from "$lib/dnd/distance"

	export let label: string
	export let values: DistanceSet<string>
	export let tostring: (value: { type: string, value: number }) => string

	$: hasAnything = Object.values(values.data).find((it) => it > 0) != null
</script>

{#if hasAnything}
	<dt>{label}</dt>
	<div class="cap">
		{#each Object.entries(values.data) as [type, value]}
			{#if value != null && value > 0}
				<dd>{tostring({ type, value })}</dd>
			{/if}
		{/each}
	</div>
{/if}
