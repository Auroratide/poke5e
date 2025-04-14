<script lang="ts">
	import { page } from "$app/stores"
	import { base } from "$app/paths"
	import MissingNo from "$lib/design/MissingNo.svelte"
	import Title from "$lib/design/Title.svelte"
	import { MAIN_CONTENT_ID } from "$lib/design/SkipLinks.svelte"

	const title = $page.status === 404
		? "MissingNo."
		: "We're sorry!"
	
	const message = $page.status === 404
		? "Looks like there's nothing here!"
		: "A problem seems to have occurred."
</script>

<Title />
<main id="{MAIN_CONTENT_ID}">
	<h1>{title}</h1>
	<p>{message}</p>
	<p class="missingno"><MissingNo /></p>
	<p>Try <a href="{base}/">returning to the home page.</a></p>
</main>

<style>
	main {
		max-width: calc(0.5 * var(--container-width));
		margin: auto;
		overflow: auto;
		height: 100%;
		padding: 2em 1em;
		text-align: center;
	}

	h1 {
		font-size: var(--font-sz-jupiter);
		margin-bottom: 0.5em;
	}

	p {
		font-size: var(--font-sz-neptune);
		line-height: 1.5;
		margin-bottom: 3em;
	}

	p:last-child {
		margin: 0;
	}

	.missingno {
		height: 33vh;
	}
</style>