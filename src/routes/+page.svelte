<script lang="ts">
	import Pokeball from "$lib/design/icon/Pokeball.svelte"
	import Hit from "$lib/design/icon/Hit.svelte"
	import Disc from "$lib/design/icon/Disc.svelte"
	import { base } from "$app/paths"
	import Title from "$lib/design/Title.svelte"
	import IdBadge from "$lib/design/icon/IdBadge.svelte"
</script>

<Title />
<main>
	<section class="title-section">
		<h1>Pokemon 5th Edition</h1>
		<p>An online reference for pokemon dungeons and dragons homebrew!</p>
	</section>
	<ul>
		<li class="theme-red">
			<a href="{base}/pokemon">Pokemon</a>
			<span class="icon"><Pokeball /></span>
		</li>
		<li class="theme-blue">
			<a href="{base}/moves">Moves</a>
			<span class="icon"><Hit /></span>
		</li>
		<li class="theme-purple">
			<a href="{base}/tms">TMs</a>
			<span class="icon"><Disc /></span>
		</li>
		<li class="theme-green">
			<a href="{base}/trainers">Trainers</a>
			<span class="icon"><IdBadge /></span>
		</li>
	</ul>
	<section class="footer-section">
		<p>Homebrew by <a href="https://twitter.com/JOEtheDM">@JOEtheDM</a>. Website by <a href="https://auroratide.com">Auroratide</a>. Source code on <a href="https://github.com/Auroratide/poke5e">Github</a>.</p>
	</section>
</main>

<style lang="scss">
	main {
		max-width: calc(0.5 * var(--container-width));
		margin: auto;
		overflow: auto;
		height: 100%;
		padding: 2em 1em;
	}

	section {
		text-align: center;
		margin-bottom: 3em;
	}

	.title-section {
		h1 {
			font-size: var(--font-sz-jupiter);
			margin-bottom: 0.5em;
		}

		p {
			font-size: var(--font-sz-neptune);
			line-height: 1.5;
		}
	}

	.footer-section {
		font-size: var(--font-sz-venus);
		margin: 0;
	}

	ul {
		list-style: none;
		margin: 0 auto 4em;
		padding: 0;
		max-width: calc(0.33 * var(--container-width));

		li {
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

		a {
			color: var(--skin-content-text);
			text-decoration: none;
		}

		a::before {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 2;
		}

		.icon {
			position: absolute;
			display: block;
			right: 0.5em;
			top: 0;
			width: 4em;
			height: 4em;
			z-index: 1;
			transform: rotate(var(--skew-angle));
		}

		li:hover {
			background-color: var(--skin-bg);

			a {
					color: var(--skin-bg-text);
			}
		}
	}
</style>