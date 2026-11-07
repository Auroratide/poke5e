<script lang="ts">
	import { onMount } from "svelte"
	import { computePosition, offset, shift } from "@floating-ui/dom"

	export let id: string
	export let block = false
	export let size: "md" | "lg" = "md"

	$: popoverId = `${id}-popover-content`

	let button: HTMLButtonElement
	let popover: HTMLElement

	const VIEWPORT_PADDING = 8

	const repositionPopover = () => {
		computePosition(button, popover, {
			placement: "bottom",
			middleware: [
				offset({
					mainAxis: 4,
					crossAxis: 2,
				}),
				shift({ padding: VIEWPORT_PADDING }),
			],
		}).then(({ x, y, middlewareData }) => {
			Object.assign(popover.style, {
				top: `${y}px`,
				left: `${x}px`,
			})

			// keep the arrow pointing at the activator when the popover is shifted
			popover.style.setProperty("--arrow-shift", `${middlewareData.shift?.x ?? 0}px`)
		})
	}

	const showPopover = () => {
		if (popover == null) return

		popover.showPopover()
		repositionPopover()

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

		popover.addEventListener("toggle", (e: ToggleEvent) => {
			if (e.newState === "open") {
				showPopover()
			}
		})

		repositionPopover()
	})
</script>

<div {id} class="popover size-{size}">
	<button bind:this={button} popovertarget="{popoverId}" popovertargetaction="show" class="activator" class:block>
		<slot name="activator"></slot>
	</button>
	<div bind:this={popover} id="{popoverId}" popover="" class="content">
		<slot></slot>
	</div>
</div>

<style>
	button {
		all: unset;
		cursor: help;
	} button:focus-visible {
		outline: 0.125em solid var(--skin-focus);
	} button.block {
		display: block;
	}

	.popover {
		display: flex;
		align-items: center;
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
		top: 0;
		left: 0;
		/* never exceed the viewport (accounting for padding and edge spacing) */
		max-inline-size: calc(100vw - 2 * 8px - 1em);
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
		left: calc(50% - var(--arrow-shift, 0px));
		z-index: -1;
		box-shadow: var(--elev-cirrus);
	}

	.popover.size-md .content {
		inline-size: 15em;
	}

	.popover.size-lg .content {
		inline-size: 30em;
	}
</style>
