<script lang="ts">
	import type { Snippet } from "svelte"
	import Container from "./Container.svelte"
	import { MAIN_CONTENT_ID } from "./SkipLinks.svelte"
	import { Theme, type ThemeColor } from "../theme"
	import IconShadow from "./IconShadow.svelte"
	import Backdrop from "./Backdrop.svelte"

	let {
		title,
		subtitle = undefined,
		large = false,
		containersize = "half",
		height = "auto",
		children,
		theme,
		icon,
	}: {
		title: string,
		subtitle?: string,
		large?: boolean,
		containersize?: "full" | "half",
		height?: "full" | "auto",
		children?: Snippet,
		theme?: ThemeColor,
		icon?: Snippet,
	} = $props()
</script>

<Theme id="page-theme" theme={theme ?? "red"}>
	{#if icon != null}
		<IconShadow>
			{@render icon()}
		</IconShadow>
	{/if}
	{#if theme != null}
		<Backdrop />
	{/if}
	<main id="{MAIN_CONTENT_ID}" class:large>
		<Container half={containersize === "half"} {height}>
			<header class:has-theme={theme != null}>
				<h1>{title}</h1>
				{#if subtitle}<p>{subtitle}</p>{/if}
			</header>
			{@render children?.()}
		</Container>
	</main>
</Theme>

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
	} header.has-theme {
		background: var(--skin-bg);
		color: var(--skin-bg-text);
		border-radius: 2em;
		padding: 1.5em 1.5em;
		text-align: center;
		display: flex;
		flex-direction: column;
		box-shadow: var(--elev-cumulus);
		margin-block-end: 2em;
	} header.has-theme p {
		margin: 0;
		text-wrap: balance;
	}

	.large header h1 {
		font-size: var(--font-sz-jupiter);
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
</style>
