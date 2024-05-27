<script lang="ts">
	import type { ThemeColor } from "$lib/design/Theme.svelte"
	import Theme from "$lib/design/Theme.svelte"
	import Backdrop from "$lib/design/Backdrop.svelte"
	import IconShadow from "$lib/design/IconShadow.svelte"

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
		<main>
			<slot></slot>
		</main>
	</div>
</Theme>

<style>
	.page {
		height: 100%;
		max-width: calc(0.5 * var(--container-width));
		margin: auto;
	}

	.page .side, .page main {
		padding: 0.5em;
	}

	.page .side {
		height: 33%;
	}

	.page main {
		height: 67%;
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
