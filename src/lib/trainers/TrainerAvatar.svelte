<script lang="ts">
	import { TOKEN_DEFAULTCOLOR } from "$lib/dnd/token"
	import type { TrainerInfo } from "./types"

	let {
		trainer,
	}: {
		trainer: Pick<TrainerInfo, "name" | "avatar" | "token">,
	} = $props()
</script>

<!--
	The trainer's picture, or their initials over their token colour. Lifted out
	of TrainerList.svelte unchanged so TrainerSummary could reuse it; the markup
	and styling are the original's.

	Fills its container, so the parent owns the size and any grid placement.
	The ring colour comes from --trainer-avatar-border so a badge can keep it
	matched to whatever surface it sits on, including on hover.
-->
<div class="avatar" style:--token-color="{trainer.token?.color ?? TOKEN_DEFAULTCOLOR}" aria-hidden="true">
	{#if trainer.avatar?.href}
		<img class="img-avatar" src="{trainer.avatar.href}" alt="{trainer.name}" />
	{:else}
		<span class="initials">{trainer.name.slice(0, 2)}</span>
	{/if}
</div>

<style>
	.avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--token-color);
		inline-size: 100%;
		aspect-ratio: 1;
		border-radius: 1.5em;
		border: 0.125em solid var(--trainer-avatar-border, var(--skin-bg));
		overflow: hidden;
	}

	.img-avatar {
		display: block;
		inline-size: 100%;
		aspect-ratio: 1;
		object-fit: contain;
	}

	.initials {
		font-size: var(--font-sz-neptune);
		font-weight: bold;
		color: var(--skin-bg-text);
	}
</style>
