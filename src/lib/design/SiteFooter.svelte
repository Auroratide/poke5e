<script lang="ts">
	import Container from "./Container.svelte"
	import { Url } from "$lib/url"
	import ChevronMenu from "./icon/ChevronMenu.svelte"

	export let currentVersion: string

	let showMore = false
	const toggleMore = () => showMore = !showMore
	const close = () => showMore = false
</script>

<footer>
	<Container>
		<div class="small-screen">
			<div class="summary">
				<p><a href="{Url.versionHistory()}" on:click={close}>{currentVersion}</a></p>
				<button aria-expanded="{showMore}" aria-controls="site-footer-more" on:click={toggleMore}>{showMore ? "Less" : "More"} <span class="icon chevron-menu"><ChevronMenu label="" /></span></button>
			</div>
			<div id="site-footer-more" class="animate-height" hidden={!showMore} aria-hidden="{!showMore}">
				<ul class="links">
					<li><a href="{Url.feedback()}" on:click={close}>Feedback</a></li>
					<li><a href="{Url.accessibility()}" on:click={close}>Accessibility</a></li>
					<li><a href="{Url.external.github()}">Github</a></li>
					<!-- <li><a href="{Url.external.discord()}">Discord</a></li> -->
				</ul>
				<p class="license"><small>Site by <a href="{Url.external.auroratide()}">Auroratide</a>. Content by the community. Pokémon and Pokémon character names are trademarks of Nintendo. Dungeons and Dragons is a trademark of Wizards of the Coast.</small></p>
			</div>
		</div>
		<div class="large-screen">
			<div class="summary">
				<p><a href="{Url.versionHistory()}">{currentVersion}</a></p>
				<ul class="links">
					<li><a href="{Url.feedback()}">Feedback</a></li>
					<li><a href="{Url.accessibility()}" on:click={close}>Accessibility</a></li>
					<li><a href="{Url.external.github()}">Github</a></li>
					<!-- <li><a href="{Url.external.discord()}">Discord</a></li> -->
				</ul>
			</div>
			<p class="license"><small>Site by <a href="{Url.external.auroratide()}">Auroratide</a>. Content by the community. Pokémon and Pokémon character names are trademarks of Nintendo. Dungeons and Dragons is a trademark of Wizards of the Coast.</small></p>
		</div>
	</Container>
</footer>

<style>
	footer {
		--skin-local-stroke: currentColor;
		background: var(--skin-footer);
		color: var(--skin-footer-text);
		padding: 0.25em 0.5em;
	}

	.summary {
		display: flex;
		justify-content: space-between;
		font-size: var(--font-sz-mars);
	}

	p { margin: 0; }

	button {
		all: unset;
		font-size: 1em;
		display: flex;
		align-items: center;
		gap: 0.25em;
	} button:hover, button:focus {
		border-block-end: 0.0625em dotted currentColor;
	}

	a {
		text-decoration: none;
		border-block-end: 0.0625em dotted currentColor;
	} a:hover, a:focus {
		border-block-end-width: 0;
	}

	.icon {
		display: inline-block;
		width: 1em;
		height: 1em;
	}

	.chevron-menu {
		transition: transform 0.25s ease-in-out;
	}

	[aria-expanded="true"] .chevron-menu {
		transform: rotate(180deg);
	}

	.license {
		flex: 1;
		font-size: var(--font-sz-mercury);
		margin: 0;
		text-wrap: balance;
		text-align: center;
	}

	.links {
		display: flex;
		justify-content: center;
		flex: 1;
		list-style: none;
		padding: 0;
		margin: 0 0 1em 0;
		text-align: center;
		gap: 1em;
	}

	.links li::before {
		content: "•";
		display: inline-block;
		margin-inline-end: 1em;
	} .links li:first-child::before {
		display: none;
	}

	.large-screen { display: none; }
	.large-screen .links {
		text-align: end;
		justify-content: flex-end;
		margin-block-end: 0.25em;
	}

	.small-screen .links {
		font-size: var(--font-sz-mars);
	}

	@supports (interpolate-size: allow-keywords) {
		.animate-height {
			height: auto;
			margin-block-start: 1em;
			transition: all 0.25s ease-in-out;
			overflow: hidden;
		} .animate-height[hidden] {
			display: block;
			margin-block-start: 0;
			height: 0;
		}
	}

	@media screen and (min-width: 75rem) {
		.large-screen {
			display: block;
		}

		.small-screen {
			display: none;
		}
	}
</style>