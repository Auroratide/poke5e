<script lang="ts">
	export let title: string
	export let level: 1 | 2 | 3 | 4 | 5 | 6 = 1
	export let inline = false

	$: leveltag = `h${level}`
</script>

<div class="container" class:inline>
	<article>
		<header>
			<svelte:element this={leveltag}>{title}</svelte:element>
			<slot name="header-extra"></slot>
		</header>
		<div class="scrollable">
			<slot></slot>
		</div>
	</article>
</div>

<style>
	.container {
		height: 100%;
	} .container.inline {
		height: auto;
	}

	article {
		background-color: var(--skin-content);
		color: var(--skin-content-text);
		border-radius: 2em;
		box-shadow: var(--elev-cirrus);
		max-height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	article header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
		padding: 0.5em 1em;
		margin-bottom: 0.5em;
	}

	article header :global(:is(h1, h2, h3, h4, h5, h6)) {
		flex: 1;
		font-weight: 700;
		font-size: var(--font-sz-neptune);
	}

	article .scrollable {
		overflow: auto;
	}

	article :global(section) {
		padding: 0 1em;
	}

	article :global(section section) {
		padding-inline: 0;
	}

	article :global(section > p) {
		line-height: 1.4;
	}

	article :global(section > :is(ul, ol) > li) {
		margin-block-end: 0.25em;
		line-height: 1.25;
	}

	article :global(section h2) {
		font-size: 1.125em;
		font-weight: bold;
		position: relative;
		z-index: 2;
		color: var(--skin-bg-text);
		padding: 0.25em 0;
		margin-block: 1.5em 0.5em;
	} article :global(section h2::before) {
		content: "";
		display: block;
		background: var(--skin-bg);
		transform: skewX(var(--skew-angle));
		position: absolute;
		inset: 0 2em 0 -4em;
		z-index: -1;
	}

	article :global(section h3) {
		font-size: var(--font-sz-earth);
		font-weight: bold;
		margin-block-end: 0.5em;
	}
</style>