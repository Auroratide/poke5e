<script lang="ts">
	import type { ContestMoveEffect } from "$lib/moves/contest"
	import { RenderChosenEdition } from "$lib/site/edition"
	import type { Edition } from "$lib/srd/editions"
	import { Heading } from "$lib/ui/elements"

	let {
		effects,
	}: {
		effects: Record<Edition, ContestMoveEffect[]>
	} = $props()
</script>

<RenderChosenEdition values={effects}>
	{#snippet render(effects, edition)}
		{#each effects as effect}
			<Heading level="3" id="contest-effect-{edition}-{effect.id}">{effect.name}</Heading>
			<p>{effect.effect}</p>
		{/each}
	{/snippet}
</RenderChosenEdition>
