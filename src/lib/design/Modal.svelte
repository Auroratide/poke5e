<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { fade } from "svelte/transition"
	import Card from "./Card.svelte"

	export let title: string
	export let isOpen = false

	const dispatch = createEventDispatcher()

	const dismiss = () => {
		dispatch("dismiss")
	}

	const onShadeClicked = (e: Event) => {
	// do not activate if the card is clicked basically
		if (e.target === e.currentTarget) {
			dismiss()
		}
	}

		// TODO: focus trapping, don't forget
</script>

{#if isOpen}
	<div role="dialog" aria-label={title} class="modal" transition:fade|global={{ duration: 200 }} on:click={onShadeClicked}>
		<div class="card">
			<Card {title}>
					<button class="close-button" slot="header-extra" on:click={dismiss} aria-label="close">&times;</button>
					<slot></slot>
			</Card>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 999;
		background: var(--skin-shade);
		box-shadow: var(--elev-cirrus);
		padding: clamp(0.5em, 2vw, 1em);
	}

	.card {
		max-width: var(--container-half);
		height: 100%;
		margin: auto;
	}

	.close-button {
		background: none;
		border: none;
		color: var(--skin-bg-text);
		font-size: var(--font-sz-uranus);
		width: 1.5em;
		text-align: right;
		cursor: pointer;

		&:hover, &:active {
			color: var(--skin-bg-softtext);
		}
	}
</style>
