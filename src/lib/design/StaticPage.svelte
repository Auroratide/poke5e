<script lang="ts">
	import Container from "./Container.svelte"
	import { MAIN_CONTENT_ID } from "./SkipLinks.svelte"

	export let title: string
	export let subtitle: string | undefined = undefined
</script>

<main id="{MAIN_CONTENT_ID}">
	<Container half>
		<header>
			<h1>{title}</h1>
			{#if subtitle}<p>{subtitle}</p>{/if}
		</header>
		<slot></slot>
	</Container>
</main>

<style>
	main {
		margin: auto;
		overflow: auto;
		height: 100%;
		padding: 2em 1em;
		view-transition-name: staticpage;
	}

	main :global(section) {
		margin-block-end: 3em;
	}

	header {
		text-align: center;
	} header p {
		font-size: var(--font-sz-neptune);
	} header h1 {
		font-size: var(--font-sz-saturn);
		margin-block-end: 0.5em;
	}

	main :global(h2) {
		font-size: var(--font-sz-uranus);
		margin-block-end: 0.333em;
	}

	main :global(p),
	main :global(ul),
	main :global(ol) {
		line-height: 1.4;
		margin-block-end: 2em;
	}

	main :global(a) {
		color: var(--red-dark);
	}
</style>
