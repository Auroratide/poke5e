<script lang="ts">
	import Page from "$lib/design/Page.svelte"
	import Disc from "$lib/design/icon/Disc.svelte"
	import { Url } from "$lib/url"
	import { page } from "$app/stores"

	$: isMainRefPage = $page.url.pathname === "/reference"
</script>

<Page theme="navy">
	<Disc slot="icon" />
	<nav slot="side" aria-label="Reference">
		{#if isMainRefPage} <h1 class="title">Reference</h1> {:else} <p class="title">Reference</p> {/if}
		<ul>
			<li><a href="{Url.reference.status()}">Status Conditions</a></li>
		</ul>
	</nav>
	<slot></slot>
</Page>

<style>
	nav {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.title {
		font-size: var(--font-sz-neptune);
		font-weight: bold;
		margin-block-end: 0.5em;
	}

	ul {
		list-style: none;
		padding: 0;
		inline-size: 100%;
	} ul li {
		display: block;
		margin-block-end: 0.25em;
	}

	a {
		display: block;
		background: var(--skin-bg);
		color: var(--skin-bg-text);
		text-decoration: none;
		border-radius: 1em;
		padding: 0.125em 1em;
		box-shadow: var(--elev-cumulus);
	} a:hover, a:focus {
		background: var(--skin-bg-dark);
	}
</style>
