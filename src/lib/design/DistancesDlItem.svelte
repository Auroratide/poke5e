<script lang="ts">
	export let label: string
	export let values: Record<string, number>
	export let tostring: (value: { type: string, value: number }) => string

	$: hasAnything = Object.values(values).find((it) => it > 0) != null
</script>

{#if hasAnything}
	<dt>{label}</dt>
	<div class="cap">
		{#each Object.entries(values) as [type, value]}
			{#if value != null && value > 0}
				<dd>{tostring({ type, value })}</dd>
			{/if}
		{/each}
	</div>
{/if}
