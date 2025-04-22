<script lang="ts">
	import type { ThemeColor } from "$lib/design/Theme.svelte"
	import Theme from "$lib/design/Theme.svelte"
	import Backdrop from "$lib/design/Backdrop.svelte"
	import IconShadow from "$lib/design/IconShadow.svelte"
	import { MAIN_CONTENT_ID } from "./SkipLinks.svelte"

	export let theme: ThemeColor
</script>

<Theme {theme}>
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
	} .page .side:has(+ main:empty) {
		height: 100%;
	}

	.page main {
		height: 67%;
	} .page main:empty {
		height: 0%;
	}

	@media screen and (min-width: 75rem) {
		.page {
			display: flex;
			flex-wrap: wrap;
			margin: auto;
			justify-content: center;
			max-width: 75rem;
			height: 100%;
		}

		.page .side, .page main {
			flex: 0 1 37.5rem;
			height: 100%;
		}
	}
</style>
