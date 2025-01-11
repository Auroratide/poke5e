<script>
	import Card from "$lib/design/Card.svelte"
	import Title from "$lib/design/Title.svelte"
	import { NonVolatileStatus, VolatileStatus } from "$lib/pokemon/status"
	import StatusTag from "$lib/pokemon/StatusTag.svelte"

	const nonVolatileList = Object.values(NonVolatileStatus)
	const volatileList = Object.values(VolatileStatus)
</script>

<Title value="Status Conditions" />
<Card title="Status Conditions">
	<section>
		<p>Status conditions affect a creature's ability to perform in combat. Conditions listed here are often inflicted by many different moves. Some moves may confer unique conditions, the details of which are provided in the move description.</p>
	</section>
	<section>
		<h2>Non-Volatile Conditions</h2>
		<p>A Pokémon can only be affected by one non-volatile status at a time. If a Pokémon is already affected by a non-volatile status, it cannot be affected by another until cured of the original status.</p>
		{#each nonVolatileList as status}
			<div class="status-block">
				<div class="row">
					<h3 class="no-margin">{status.name}</h3>
					<span aria-hidden="true"><StatusTag value={status.id} /></span>
				</div>
				<p>{status.effect}</p>
				{#if status.immunity}
					<p>{status.immunity}</p>
				{/if}
			</div>
		{/each}
	</section>
	<section>
		<h2>Volatile Conditions</h2>
		<p>A Pokémon can be affected by both a volatile and non-volatile condition. Volatile conditons immediately end outside of combat or when the Pokémon is switched out.</p>
		{#each volatileList as status}
			<div class="status-block">
				<h3>{status.name}</h3>
				<p>{status.effect}</p>
				{#if status.immunity}
					<p>{status.immunity}</p>
				{/if}
			</div>
		{/each}
	</section>
</Card>

<style>
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-block-end: 0.5em;
	}

	h3.no-margin { margin: 0; }

	.status-block {
		margin-block-end: 2em;
	}

	p { line-height: 1.25; }
</style>