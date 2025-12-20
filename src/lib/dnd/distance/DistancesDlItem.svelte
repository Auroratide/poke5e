<script lang="ts" generics="T extends DistanceSet<string>">
	import type { DistanceSet } from "$lib/dnd/distance"

	export let label: string
	export let values: T

	$: hasAnything = Object.values(values.data).find((it) => it > 0) != null
</script>

{#if hasAnything}
	<dt>{label}</dt>
	<div class="cap">
		{#each Object.entries(values.data) as [type, value]}
			{#if value != null && value > 0}
				<dd>{values.formatString(type)}</dd>
			{/if}
		{/each}
	</div>
{/if}
