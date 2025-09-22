<script lang="ts">
	import type { ComponentType } from "svelte"
	import { base } from "$app/paths"
	import type { ThemeColor } from "./Theme.svelte"
	import Container from "./Container.svelte"
	import MenuIcon from "./icon/Menu.svelte"
	import { Url } from "$lib/url"

	const NUMBER_OF_UNMENUED_ITEMS = 6

	export let items: {
		id: string,
		name: string,
		color: ThemeColor,
		icon: ComponentType,
	}[]

	$: firstFewItems = items.slice(0, NUMBER_OF_UNMENUED_ITEMS)
	$: exceedsUnmenued = items.length > NUMBER_OF_UNMENUED_ITEMS

	export let active: string

	let dialog: HTMLDialogElement

	const openDialog = () => dialog.showModal()

	const closeDialog = () => setTimeout(() => dialog.close(), 100)
</script>

<nav aria-label="Site" class="row space-between">
	<p class="site-title"><a href="{Url.home()}">Pokémon 5e</a></p>
	<div class="nav-bar">
		<ul class="no-list row space-large nav-list lg:show" style:gap="1.375em">
			{#each firstFewItems as item}
				<li class:active={active === item.id} class="theme-{item.color}">
					<a class="row space-small" href="{base}/{item.id}" on:click={closeDialog}>
						<span class="icon" aria-hidden="true">
							<svelte:component this={item.icon} />
						</span>
						<span>{item.name}</span>
					</a>
				</li>
			{/each}
		</ul>
		<button on:click={openDialog} class="menu-button row space-small" class:lg:hide={!exceedsUnmenued}>
			<span class="icon no-rotate"><MenuIcon /></span>
			<span class="lg:hide">Menu</span>
			<span class="lg:show">More</span>
		</button>
	</div>
</nav>

<dialog bind:this={dialog} class="open-transition">
	<div class="backdrop"></div>
	<div class="full-center">
		<Container half>
			<header class="row space-between transitioned">
				<p class="title">Menu</p>
				<form method="dialog">
					<button class="close-button" aria-label="close">&times;</button>
				</form>
			</header>
			<ul class="no-list grid">
				{#each items as item}
					<li class:active={active === item.id} class="theme-{item.color} transitioned">
						<a href="{base}/{item.id}" class="center-column uppercase-link" on:click={closeDialog}>
							<div class="bubble" aria-hidden="true">
								<svelte:component this={item.icon} />
							</div>
							<span>{item.name}</span>
						</a>
					</li>
				{/each}
			</ul>
		</Container>
	</div>
</dialog>

<style>
	nav {
		text-align: end;
		view-transition-name: topbar;
	}

	.nav-bar {
		display: inline-flex;
		gap: 1.375em;
		position: relative;
		padding-block: 0.375em;
		padding-inline: 2em;
		margin-block: 0.25em;
	} .nav-bar::before {
		content: "";
		position: absolute;
		inset: 0 -1000rem 0 0;
		background: var(--skin-bg);
		transform: skewX(var(--skew-angle));
		z-index: 1;
	}

	.menu-button {
		all: unset;
		--skin-local-stroke: var(--skin-bg-text);
		position: relative;
		color: var(--skin-bg-text);
		cursor: pointer;
		z-index: 2;
	} .menu-button:hover, .menu-button:focus {
		--skin-local-stroke: var(--red-light);
		color: var(--red-light);
	}

	.nav-list {
		position: relative;
		margin: 0;
		z-index: 2;
	} .nav-list a {
		--skin-local-stroke: var(--skin-bg-text);
		color: var(--skin-bg-text);
		text-decoration: none;
	} .nav-list a:hover, .nav-list a:focus {
		--skin-local-stroke: var(--theme-light);
		color: var(--theme-light);
	} .nav-list .active a {
		--skin-local-stroke: var(--skin-bg-text);
		color: var(--skin-bg-text);
		font-weight: bold;
	} .nav-list .active :global(.stroke) {
		stroke-width: 10;
	} .nav-list .active :global(.stroke.thin) {
		stroke-width: 8;
	}

	.icon {
		inline-size: 1em;
		block-size: 1em;
		transform: rotate(var(--skew-angle));
	} .icon.no-rotate {
		transform: rotate(0deg);
	}

	.site-title {
		margin: 0;
		font-size: var(--font-sz-neptune);
		font-weight: bold;
		padding-inline: 0.5em;
	} .site-title a {
		text-decoration: none;
	} .site-title a:hover, .site-title a:focus {
		text-decoration: underline;
	}

	dialog {
		background: transparent;
		border: none;
		position: fixed;
		inset: 0;
		z-index: 9;
		inline-size: 100%;
		block-size: 100%;
		overflow: visible;
		margin: 0;
		max-inline-size: 100%;
		max-block-size: 100%;
		view-transition-name: navdialog;
	}  dialog::backdrop {
		background: oklch(0% 0 0 / 0.333);
	}

	.full-center {
		inline-size: 100%;
		block-size: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	} .full-center > :global(.container) {
		inline-size: 100%;
	}

	.no-list {
		list-style: none;
		padding: 0;
	}

	.grid {
		--item-width: 5em;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(var(--item-width) - 1em)), 1fr));
		gap: 2.5em;
	}

	.bubble {
		--skin-local-stroke: var(--theme-main);
		inline-size: 100%;
		block-size: 100%;
		color: var(--theme-main);
		background: var(--skin-content);
		border-radius: 100%;
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.667em;
		transform: rotate(var(--skew-angle));
		box-shadow: var(--elev-cumulus);
	} a:hover .bubble, a:focus .bubble {
		background: var(--skin-bg);
	} .bubble :global(svg) {
		inline-size: 100%;
		block-size: 100%;
	}

	.center-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5em;
	}

	.uppercase-link {
		text-transform: uppercase;
		text-decoration: none;
		color: var(--skin-bg-text);
	} .uppercase-link:hover, .uppercase-link:focus {
		text-decoration: underline;
	}

	.backdrop {
		position: absolute;
		inset: 0;
		inset-inline-start: 50%;
		background: var(--red-main);
		border-inline: 10rem solid var(--red-dark);
		transform: translateX(-50%) skewX(var(--skew-angle));
		z-index: -1;
		inline-size: calc(45% + 50em);
		box-shadow: var(--elev-cirrus);
	}

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.space-between { justify-content: space-between; }
	.space-small { gap: 0.2em; }
	.space-large { gap: 1.375em; }

	.title {
		color: var(--skin-bg-text);
		font-weight: bold;
		font-size: var(--font-sz-neptune);
		margin: 0;
	}

	.close-button {
		display: block;
		background: none;
		border: none;
		color: var(--skin-bg-text);
		font-size: var(--font-sz-saturn);
		border-radius: 50%;
		inline-size: 1.25em;
		block-size: 1.25em;
		cursor: pointer;
	} .close-button:focus, .close-button:hover {
		background: var(--skin-bg);
	} .close-button:active {
		background: var(--skin-content);
		color: var(--skin-content-text);
	}

	header {
		margin-block-end: 1.5em;
	}


	/* Transition
	/*************************************************************************/
	.open-transition {
		--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
		--ease-out-back: cubic-bezier(0.68, -0.6, 0.32, 1.6);
		--dur: 0.4s;
		animation: disappear 1s ease-out;
	} .open-transition[open] {
		animation: appear var(--dur) ease-out;
	}
	
	.open-transition .backdrop {
		animation: wipe-out var(--dur) var(--ease-out-quint) forwards;
	} .open-transition[open] .backdrop {
		animation: wipe-in var(--dur) var(--ease-out-quint);
	}
	
	.open-transition li.transitioned a {
		animation: pop-out var(--dur) var(--ease-out-back) forwards;
	} .open-transition[open] li.transitioned a {
		opacity: 0;
		animation: pop-in var(--dur) var(--ease-out-back) forwards;
	}
	
	.open-transition header.transitioned {
		animation: fade-out var(--dur) ease-out forwards;
	} .open-transition[open] header.transitioned {
		opacity: 0;
		animation: fade-in var(--dur) ease-out forwards;
	}
	
	.open-transition::backdrop {
		animation: fade-out var(--dur) ease-out forwards;
	} .open-transition[open]::backdrop {
		opacity: 0;
		animation: fade-in var(--dur) ease-out forwards;
	}

	.open-transition li.transitioned:nth-child(1) a {
		animation-delay: 0s;
	} .open-transition li.transitioned:nth-child(2) a {
		animation-delay: 0.05s;
	} .open-transition li.transitioned:nth-child(3) a {
		animation-delay: 0.1s;
	} .open-transition li.transitioned:nth-child(4) a {
		animation-delay: 0.15s;
	} .open-transition li.transitioned:nth-child(5) a {
		animation-delay: 0.2s;
	} .open-transition li.transitioned:nth-child(6) a {
		animation-delay: 0.25s;
	} .open-transition li.transitioned:nth-child(7) a {
		animation-delay: 0.3s;
	}

	.open-transition[open] li.transitioned:nth-child(1) a {
		animation-delay: 0s;
	} .open-transition[open] li.transitioned:nth-child(2) a {
		animation-delay: 0.05s;
	} .open-transition[open] li.transitioned:nth-child(3) a {
		animation-delay: 0.1s;
	} .open-transition[open] li.transitioned:nth-child(4) a {
		animation-delay: 0.15s;
	} .open-transition[open] li.transitioned:nth-child(5) a {
		animation-delay: 0.2s;
	} .open-transition[open] li.transitioned:nth-child(6) a {
		animation-delay: 0.25s;
	} .open-transition[open] li.transitioned:nth-child(7) a {
		animation-delay: 0.3s;
	}

	@keyframes appear {
		0% { display: none; }
		100% { display: block; }
	} @keyframes disappear {
		0% { display: block; }
		100% { display: none; }
	}

	@keyframes wipe-in {
		0% {
			inline-size: 0;
			border-inline-width: 0;
		} 100% {
			border-inline-width: 10rem;
			inline-size: calc(45% + 50em);
		}
	} @keyframes wipe-out {
		0% {
			border-inline-width: 10rem;
			inline-size: calc(45% + 50em);
		} 100% {
			inline-size: 0;
			border-inline-width: 0;
		}
	}

	@keyframes pop-in {
		0% {
			opacity: 0;
			transform: translateY(10%);
		} 100% {
			opacity: 1;
			transform: translateY(0%);
		}
	} @keyframes pop-out {
		0% {
			opacity: 1;
			transform: translateY(0%);
		} 100% {
			opacity: 0;
			transform: translateY(10%);
		}
	}

	@keyframes fade-in {
		0% { opacity: 0; }
		100% { opacity: 1; }
	} @keyframes fade-out {
		0% { opacity: 1; }
		100% { opacity: 0; }
	}

	@media (prefers-reduced-motion) {
		.open-transition, .open-transition[open],
		.open-transition::backdrop, .open-transition[open]::backdrop,
		.open-transition .backdrop, .open-transition[open] .backdrop,
		.open-transition header.transitioned, .open-transition[open] header.transitioned,
		.open-transition li.transitioned a, .open-transition[open] li.transitioned a {
			opacity: 1;
			animation: none;
		}
	}

	.lg\:show { display: none; }

	@media screen and (min-width: 75rem) {
		.lg\:show { display: flex; }
		.lg\:hide { display: none; }
	}
</style>
