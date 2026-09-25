<script>
	import { IconedCardHeading } from "$lib/ui/page"
	import {
		NonVolatileStatus,
		VolatileStatus,
		NonVolatileStatus2018,
		VolatileStatus2018,
	} from "$lib/pokemon/status"
	import StatusTag from "$lib/pokemon/StatusTag.svelte"
	import ReferencePage from "../ReferencePage.svelte"
	import { currentEdition } from "$lib/site/edition"
	import { Markdown } from "$lib/ui/rendering"
	import { Heading } from "$lib/ui/elements"

	$: nonVolatileList = $currentEdition === "2018" ? Object.values(NonVolatileStatus2018) : Object.values(NonVolatileStatus)
	$: volatileList = $currentEdition === "2018" ? Object.values(VolatileStatus2018) : Object.values(VolatileStatus)
</script>

<ReferencePage title="Status Conditions">
	<section>
		<p>Status conditions affect a creature's ability to perform in combat. Conditions listed here are often inflicted by many different moves. Some moves may confer unique conditions, the details of which are provided in the move description.</p>
	</section>
	<section>
		<Heading level="2" id="grace-period">Grace Period</Heading>
		<p>When a Pokémon recovers from a status effect, they cannot succumb to the <strong>same</strong> effect until after the end of their next turn.</p>
	</section>
	<section>
		<Heading level="2" id="non-volatile-conditions">Non-Volatile Conditions</Heading>
		<p>A Pokémon can only be affected by one non-volatile status at a time. If a Pokémon is already affected by a non-volatile status, it cannot be affected by another until cured of the original status.</p>
		{#each nonVolatileList as status}
			<div class="status-block">
				<IconedCardHeading>
					{status.name}
					<StatusTag slot="icon" value={status.id} />
				</IconedCardHeading>
				<p>{status.effect}</p>
				{#if status.immunity}
					<p>{status.immunity}</p>
				{/if}
			</div>
		{/each}
	</section>
	<section>
		<Heading level="2" id="volatile-conditions">Volatile Conditions</Heading>
		<p>A Pokémon can be affected by both a volatile and non-volatile condition. Volatile conditions immediately end outside of combat or when the Pokémon is switched out.</p>
		{#each volatileList as status}
			<div class="status-block">
				<Heading level="3" id="{status.id}">{status.name}</Heading>
				<Markdown value="{status.effect}" />
				{#if status.immunity}
					<p>{status.immunity}</p>
				{/if}
			</div>
		{/each}
	</section>
</ReferencePage>

<style>
	.status-block {
		margin-block-end: 2em;
	}

	p { line-height: 1.25; }
</style>