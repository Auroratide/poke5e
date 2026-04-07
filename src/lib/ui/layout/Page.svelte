<script lang="ts">
	import { type ThemeColor, Theme } from "$lib/ui/theme"
	import { onDestroy, onMount } from "svelte"
	import Backdrop from "./Backdrop.svelte"
	import IconShadow from "./IconShadow.svelte"
	import { MAIN_CONTENT_ID } from "./SkipLinks.svelte"
	import { browser } from "$app/environment"

	export let theme: ThemeColor

	// This is absolutely obscene, but I cannot use :has with :empty
	// because Safari refuses to repaint if :empty state changes. Instead,
	// we have to detect all of it manually and track it with a class name.
	let sideEl: HTMLElement
	let mainEl: HTMLElement

	let isSideEmpty: boolean
	let isMainEmpty: boolean

	const sideObserver = browser ? new MutationObserver(() => {
		isSideEmpty = sideEl?.textContent.trim() === ""
	}) : undefined

	const mainObserver = browser ? new MutationObserver(() => {
		isMainEmpty = mainEl?.textContent.trim() === ""
	}) : undefined

	onMount(() => {
		isSideEmpty = sideEl?.textContent.trim() === ""
		isMainEmpty = mainEl?.textContent.trim() === ""

		if (mainEl) {
			mainObserver?.observe(mainEl, {
				childList: true,
				attributes: false,
				subtree: false,
			})
		}

		if (sideEl) {
			sideObserver?.observe(sideEl, {
				childList: true,
				attributes: false,
				subtree: false,
			})
		}
	})

	onDestroy(() => {
		sideObserver?.disconnect()
		mainObserver?.disconnect()
	})
</script>

<Theme id="page-theme" {theme}>
	<IconShadow>
		<slot name="icon"></slot>
	</IconShadow>
	<Backdrop />
	<div class="page" class:side-empty={isSideEmpty} class:main-empty={isMainEmpty}>
		<div bind:this={sideEl} class="side">
			<slot name="side"></slot>
		</div>
		<main bind:this={mainEl} id="{MAIN_CONTENT_ID}">
			<slot></slot>
		</main>
	</div>
</Theme>

<style>
	.page {
		height: 100%;
		max-width: calc(0.5 * var(--container-width));
		margin: auto;
		view-transition-name: page;
	}

	.page .side, .page main {
		padding: 0.5em;
	}

	.page .side {
		position: relative;
		z-index: 2;
		height: 33%;
		transition: height 0.25s ease-in-out;
		view-transition-name: pageside;
	} .page.main-empty .side {
		height: 100%;
		transform: translateZ(0);
	} .page .side:empty {
		height: 0;
	}

	.page main {
		position: relative;
		z-index: 1;
		height: 67%;
		transition: height 0.25s ease-in-out;
		view-transition-name: pagemain;
	} .page main:empty {
		height: 0%;
	} .page.side-empty main {
		height: calc(100% - 1em);
		transform: translateZ(0);
	}

	@media screen and (min-width: 37.5rem) {
		.page {
			display: flex;
			margin: auto;
			justify-content: center;
			max-width: 75rem;
			height: 100%;
		}

		.page .side, .page main {
			flex: 1 1 37.5rem;
			width: 50%;
			height: 100%;
		}

		.page .side:empty {
			display: none;
		} .page:has(.side:empty) main {
			max-inline-size: 37.5em;
		}
	}
</style>
