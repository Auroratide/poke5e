<script lang="ts">
	import Pokeball from "$lib/design/icon/Pokeball.svelte"
	import Hit from "$lib/design/icon/Hit.svelte"
	import Disc from "$lib/design/icon/Disc.svelte"
	import Backpack from "$lib/design/icon/Backpack.svelte"
	import Title from "$lib/design/Title.svelte"
	import IdBadge from "$lib/design/icon/IdBadge.svelte"
	import PencilNotes from "$lib/design/icon/PencilNotes.svelte"
	import { Url } from "$lib/url"
	import StaticPage from "$lib/design/StaticPage.svelte"
</script>

<Title />
<StaticPage large title="Pokemon 5th Edition" subtitle="An online reference for pokemon dungeons and dragons homebrew!">
	<ul>
		<li class="theme-red">
			<a href="{Url.pokemon()}">Pokemon</a>
			<span class="icon"><Pokeball /></span>
		</li>
		<li class="theme-blue">
			<a href="{Url.moves()}">Moves</a>
			<span class="icon"><Hit /></span>
		</li>
		<li class="theme-purple">
			<a href="{Url.tms()}">TMs</a>
			<span class="icon"><Disc /></span>
		</li>
		<li class="theme-yellow">
			<a href="{Url.items()}">Items</a>
			<span class="icon"><Backpack /></span>
		</li>
		<li class="theme-green">
			<a href="{Url.trainers()}">Trainers</a>
			<span class="icon"><IdBadge /></span>
		</li>
		<li class="theme-navy">
			<a href="{Url.reference.all()}">Reference</a>
			<span class="icon"><PencilNotes /></span>
		</li>
	</ul>
	<address>
		<p>Homebrew by the community. Website by <a href="{Url.external.auroratide()}">Auroratide</a>. Source code on <a href="{Url.external.github()}">Github</a>.</p>
	</address>
</StaticPage>

<style>
	address {
		font-style: normal;
		text-align: center;
		font-size: var(--font-sz-venus);
		margin: 0;
	}

	ul {
		list-style: none;
		margin: 0 auto 4em;
		padding: 0;
		max-width: calc(0.33 * var(--container-width));
	}

	/* 43.5 = 75 / 2 + 4 (counteract negative margin) + 2 (additional padding) */
	@media screen and (min-width: 43.5rem) {
		ul {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 0.5em 1.5em;
			max-width: none;
			margin-inline: -2em;
		}
	}

	ul li {
		--skin-local-stroke: var(--theme-main);
		position: relative;
		display: block;
		font-size: var(--font-sz-uranus);
		padding: 1em 1.25em;
		overflow: hidden;
		background-color: var(--skin-content);
		border-radius: 2em;
		box-shadow: var(--elev-cirrus);
		margin-bottom: 1em;
	}

	ul a {
		color: var(--skin-content-text);
		text-decoration: none;
	}

	ul a::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
	}

	ul .icon {
		position: absolute;
		display: block;
		right: 0.5em;
		top: 0;
		width: 4em;
		height: 4em;
		z-index: 1;
		transform: rotate(var(--skew-angle));
	}

	ul li:hover {
		background-color: var(--skin-bg);
	}

	ul li:hover a {
		color: var(--skin-bg-text);
	}
</style>