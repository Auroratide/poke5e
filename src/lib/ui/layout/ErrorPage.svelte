<script lang="ts">
	import { onMount } from "svelte"
	import Container from "./Container.svelte"
	import { MAIN_CONTENT_ID } from "./SkipLinks.svelte"
	import { ErrorMessages, ErrorsDb } from "$lib/site/errors"
	import { Url } from "$lib/site/url"

	let {
		title,
		error,
		action,
	}: {
		title: string,
		error: unknown,
		action: string,
	} = $props()

	let referenceId: string | undefined = $state(undefined)

	onMount(() => {
		ErrorsDb.report(action, error).then((id) => {
			referenceId = id
		})
	})
</script>

<main id="{MAIN_CONTENT_ID}">
	<Container half>
		<header>
			<h1>{title}</h1>
		</header>
		<blockquote>{ErrorMessages.simple(error)}</blockquote>
		{#if referenceId != null}
			<p><strong>Error ID</strong>: <code>{referenceId}</code></p>
		{/if}
		<p>Please try refreshing the page <a href="{Url.home()}">returning to the homepage</a>.</p>
		<p class="font-sm">You can also help by <a class="error" href="https://github.com/Auroratide/poke5e/issues/new">reporting this error</a>!</p>
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

	blockquote {
		border-inline-start: 0.5em solid var(--red-main);
		margin: 0 0 1em 0;
		padding-inline: 0.5em;
		padding-block: 0.25em;
	}

	header {
		text-align: center;
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
