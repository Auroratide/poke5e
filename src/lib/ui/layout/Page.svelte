<script lang="ts">
	import { type ThemeColor, Theme } from "$lib/ui/theme";
	import Backdrop from "./Backdrop.svelte";
	import IconShadow from "./IconShadow.svelte";
	import { MAIN_CONTENT_ID } from "./SkipLinks.svelte";

	export let theme: ThemeColor
</script>

<Theme id="page-theme" {theme}>
	<IconShadow>
		<slot name="icon"></slot>
	</IconShadow>
	<Backdrop />
	<div class="page">
		<div class="side">
			<slot name="side"></slot>
		</div>
		<main id="{MAIN_CONTENT_ID}">
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
	} .page:has(main:empty) .side {
		height: 100%;
	} .page .side:empty {
		height: 0;
	}

	.page main {
		height: 67%;
		view-transition-name: pagemain;
	} .page main:empty {
		height: 0%;
	} .page:has(.side:empty) main {
		height: calc(100% - 1em);
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
