<script lang="ts">
	import type { ThemeColor } from "$lib/design/Theme.svelte"
	import Theme from "$lib/design/Theme.svelte"
	import Backdrop from "$lib/design/Backdrop.svelte"
	import IconShadow from "$lib/design/IconShadow.svelte"
	import { MAIN_CONTENT_ID } from "./SkipLinks.svelte"
	import { afterUpdate } from "svelte"

	export let theme: ThemeColor

	let mainEl: HTMLElement
	let isMainEmpty = true
	let sideEl: HTMLElement
	let isSideEmpty = true

	// I ended up doing this over simply using :empty because Safari
	// wasn't actually redrawing the screen
	afterUpdate(() => {
		isMainEmpty = mainEl.textContent.length === 0
		isSideEmpty = sideEl.textContent.length === 0
	})
</script>

<Theme id="page-theme" {theme}>
	<IconShadow>
		<slot name="icon"></slot>
	</IconShadow>
	<Backdrop />
	<div class="page" class:main-empty={isMainEmpty} class:side-empty={isSideEmpty}>
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
		height: 33%;
		view-transition-name: pageside;
	} .page.main-empty .side {
		height: 100%;
	} .page.side-empty .side {
		height: 0;
	}

	.page main {
		height: 67%;
		view-transition-name: pagemain;
	} .page.main-empty main {
		height: 0%;
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

		.page.side-empty .side {
			display: none;
		} .page.side-empty main {
			max-inline-size: 37.5em;
		}
	}
</style>
