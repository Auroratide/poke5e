<script lang="ts">
	import { DragHandle, Level } from "$lib/ui/elements"
	import type { ReorderListChangeEventDetail } from "@auroratide/reorder-list/lib/events"
	import type { Trainer } from "./types"
	import { Url } from "$lib/site/url"
	import TrainerAvatar from "./TrainerAvatar.svelte"

	let {
		list,
		onreorder,
		saving = false,
	}: {
		list: Trainer[],
		onreorder: (event: CustomEvent<ReorderListChangeEventDetail>) => void,
		saving?: boolean,
	} = $props()
</script>

<reorder-list class="trainer-list" oncommit={onreorder} class:saving>
	{#each list as trainer (trainer.id)}
		<reorder-item>
			<a class="bubble" href="{Url.trainers(trainer.readKey)}">
				<div class="art">
					<TrainerAvatar {trainer} />
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
			<div class="handle-container">
				<DragHandle inert={saving} />
			</div>
		</reorder-item>
	{/each}
</reorder-list>

<style>
	.trainer-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		flex: 1;
		block-size: 0;
		overflow-y: scroll;
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

	.handle-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.saving {
		opacity: 0.875;
	}

	.saving .handle-container {
		cursor: wait;
	}
</style>