<script lang="ts">
	import { Level } from "$lib/ui/elements"
	import { Url } from "$lib/site/url"
	import { m } from "$lib/site/i18n"
	import TrainerAvatar from "../TrainerAvatar.svelte"
	import type { Trainer } from "../types"

	let {
		trainer,
		current = false,
	}: {
		trainer: Trainer,
		current?: boolean,
	} = $props()
</script>

<!--
	Wears the same skin as the pokemon badges in PokemonSummary so the trainer
	reads as the same kind of thing as the pokemon listed beneath them. The
	title carries the destination rather than an aria-label, which would replace
	the badge's own text as the link's accessible name.
-->
<a
	class="selectable-bubble gridded"
	href="{Url.trainers(trainer.readKey)}"
	title={m["trainers.viewProfileOf"]({ name: trainer.name })}
	aria-current={current ? "page" : undefined}
>
	<span class="art"><TrainerAvatar {trainer} /></span>
	<span class="name">{trainer.name}</span>
	<span class="info">
		<Level value={trainer.level.data} />
		{#if trainer.path.name}
			<span class="bullet" aria-hidden="true">•</span>
			<span>{trainer.path.name}</span>
		{/if}
	</span>
</a>

<style>
	/* Deliberately duplicated from PokemonSummary: the bubble variants across
	   the app differ on purpose, so there is no shared component to reach for. */
	.selectable-bubble {
		--trainer-avatar-border: var(--skin-content);
		background-color: var(--skin-content);
		padding: 0.375em 1.5em 0.375em 0.5em;
		border-radius: 3em;
		text-decoration: none;
		color: var(--skin-content-text);
		box-shadow: var(--elev-cumulus);
	}

	.selectable-bubble:hover,
	.selectable-bubble:focus {
		--trainer-avatar-border: var(--skin-bg);
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
	}

	.gridded {
		display: grid;
		grid-template-columns: 3em 1fr;
		grid-template-areas:
			"art name"
			"art info";
		column-gap: 0.5em;
	}

	.art {
		grid-area: art;
		place-self: center;
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

	.bullet {
		margin-inline: 0.5em;
	}
</style>
