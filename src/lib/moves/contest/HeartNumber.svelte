<script lang="ts">
	import { VisuallyHidden } from "$lib/ui/elements"
	import { HeartIcon } from "$lib/ui/icons"

	export let value: number
	export let filled = false
	$: count = Array(value)
</script>

<span>
	<VisuallyHidden inline>{value}</VisuallyHidden>
	<span class="row" aria-hidden="true">
		{#each count as i (i)}
			<HeartIcon {filled} />
		{/each}
	</span>
</span>

<style>
	.row {
		display: flex;
		justify-content: center;
	} .row :global(svg) {
		margin-inline: -0.15em;
		inline-size: 1.5em;
	}
</style>
