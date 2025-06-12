<script lang="ts">
	export let error: string
</script>

<section>
	<p class="large"><strong>Something went wrong...</strong></p>
	<blockquote>{error}</blockquote>
	<p>If you are seeing this error, then something may be wrong with one of the downstream systems. Please check back later to see if this is still an issue!</p>
	<p class="font-sm">You can also help by <a class="error" href="https://github.com/Auroratide/poke5e/issues/new">reporting this error</a>!</p>
</section>

<style>
	section {
		margin-block: 2em;
	}

	blockquote {
		border-inline-start: 0.5em solid var(--red-main);
		margin: 0 0 1em 0;
		padding-inline: 0.5em;
		padding-block: 0.25em;
	}

	.large { font-size: var(--font-sz-neptune); }

	p { line-height: 1.5; }

	.error { color: var(--red-text); }
</style>