<script lang="ts">
	import { DragHandle, Level } from "$lib/ui/elements"
	import type { ReorderListChangeEventDetail } from "@auroratide/reorder-list/lib/events"
	import type { Trainer } from "./types"
	import { Url } from "$lib/site/url"

	let {
		list,
		onreorder,
	}: {
		list: Trainer[],
		onreorder: (event: CustomEvent<ReorderListChangeEventDetail>) => void,
	} = $props()
</script>

<reorder-list class="trainer-list" oncommit={onreorder}>
	{#each list as trainer (trainer.id)}
		<reorder-item>
			<a class="bubble" href="{Url.trainers(trainer.readKey)}">
				<div class="art">
					{#if trainer.avatar?.href}
						<img class="img-avatar" src="{trainer.avatar?.href}" alt="{trainer.name}" />
					{:else}
						<div class="default-avatar">{trainer.name.slice(0, 2)}</div>
					{/if}
				</div>
				<div class="name">{trainer.name}</div>
				<div class="info">
					<div class="level"><Level value={trainer.level.data} /></div>
					{#if trainer.path.name}
						<div class="bullet">•</div>
						<div class="class">{trainer.path.name}</div>
					{/if}
				</div>
			</a>
			<DragHandle />
		</reorder-item>
	{/each}
</reorder-list>

<style>
	.trainer-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.5em;
	}

	reorder-item {
		display: flex;
	}

	.bubble {
		flex: 1;
		background: var(--skin-bg);
		color: var(--skin-bg-text);
		padding: 0.125em 0.125em;
		border-radius: 2em;
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas:
			"art name"
			"art info";
		text-decoration: none;
		column-gap: 0.5em;
		box-shadow: var(--elev-cumulus);
	}

	.bubble:hover, .bubble:focus {
		background: var(--skin-bg-text);
		color: var(--skin-bg);
	}

	.art {
		grid-area: art;
		place-self: center;
		inline-size: 2.75em;
		/* margin-inline-end: 0.5em; */
	}

	.art img {
		display: block;
		inline-size: 100%;
		aspect-ratio: 1;
		border-radius: 1.5em;
		border: 0.125em solid var(--skin-bg);
	}

	.name {
		grid-area: name;
		font-size: 1.125em;
		padding-block-start: 0.125em;
	}

	.info {
		grid-area: info;
		font-size: var(--font-sz-venus);
		display: flex;
		align-items: flex-end;
		padding-block-end: 0.125em;
	}

	.level {
		grid-area: level;
		display: flex;
		align-items: center;
	}

	.bullet {
		margin-inline: 0.5em;
	}

	.class {
		grid-area: id;
		display: flex;
		align-items: center;
	}

	.default-avatar {
		background: red;
		inline-size: 100%;
		aspect-ratio: 1;
		border-radius: 1.5em;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--font-sz-neptune);
		font-weight: bold;
		border: 0.125em solid var(--skin-bg);
		color: var(--skin-bg-text);
	}
</style>