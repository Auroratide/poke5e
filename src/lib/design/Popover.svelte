<script lang="ts">
	import { onMount } from "svelte"
	import { computePosition, offset } from "@floating-ui/dom"

	export let id: string

	$: popoverId = `${id}-popover-content`

	let button: HTMLButtonElement

	const showPopover = () => {
		const popover = document.querySelector<HTMLElement>(`#${popoverId}`)
		if (popover == null) return

		popover.showPopover()

		computePosition(button, popover, {
			placement: "bottom",
			middleware: [offset(2.5)],
		}).then(({ x, y }) => {
			Object.assign(popover.style, {
				top: `${y}px`,
				left: `${x}px`,
			})
		})

		const container = document.querySelector<HTMLElement>(`#${id}`)
		container?.addEventListener("mouseleave", () => {
			popover.hidePopover()
		}, {
			once: true,
		})
	}

	onMount(() => {
		let timeout = -1

		button.addEventListener("mouseenter", () => {
			timeout = window.setTimeout(showPopover, 250)
		})

		button.addEventListener("mouseleave", () => {
			window.clearTimeout(timeout)
		})
	})
</script>

<div {id} class="popover">
	<button bind:this={button} popovertarget="{popoverId}" popovertargetaction="show" class="activator">
		<slot name="activator"></slot>
	</button>
	<div id="{popoverId}" popover class="content">
		<slot></slot>
	</div>
</div>

<style>
	button {
		all: unset;
		cursor: help;
	}

	.popover .content {
		border: none;
		background: var(--skin-bg-dark);
		color: var(--skin-bg-text);
		box-shadow: var(--elev-cirrus);
		font-size: var(--font-sz-venus);
		padding: 0.5em;
		line-height: 1.25;
		margin: 0;
		overflow: visible;

		position: absolute;
		inline-size: 15em;
		top: 0;
		left: 0;
	} .popover .content :global(*:last-child) {
		margin-block-end: 0;
	} .popover .content::before {
		content: "";
		position: absolute;
		inline-size: 1.5em;
		block-size: 1.5em;
		background: var(--skin-bg-dark);
		transform: translateX(-60%) rotate(45deg);
		top: -0.25em;
		left: 50%;
		z-index: -1;
		box-shadow: var(--elev-cirrus);
	}
</style>
