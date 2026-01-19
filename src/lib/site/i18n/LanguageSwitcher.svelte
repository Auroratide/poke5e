<script lang="ts">
	import { page } from "$app/stores"
	import { locales, localizeHref, getLocale } from "$lib/site/i18n/paraglide/runtime"
	import { m } from "$lib/site/i18n/paraglide/messages"
	import LanguageIcon from "./LanguageIcon.svelte"
	import { ChevronIcon } from "$lib/ui/icons"

	$: pathname = $page.url.pathname
</script>

<nav aria-label="{m["settings.language"]()}">
	<details>
		<summary>
			<LanguageIcon />
			<span class="upper">{getLocale()}</span>
			<span class="icon chevron-menu"><ChevronIcon.Menu label="" /></span>
		</summary>
		<div class="full-width animate-height">
			<div class="flush-to-viewport">
				<ul>
					{#each locales as locale}
						<li class:active={locale === getLocale()}>
							<a href="{localizeHref(pathname, { locale })}" data-sveltekit-reload>
								{m.languageName({}, { locale })}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</details>
</nav>

<style>
	details {
		position: relative;
	}

	summary {
		cursor: pointer;
		list-style: none;
		display: flex;
		align-items: center;
		gap: 0.25em;
		border-block-end: 0.0625em dotted currentColor;
	} summary::marker, summary::-webkit-details-marker {
		display: none;
	}

	.full-width {
		inline-size: 100dvw;
		background: var(--skin-bg);
		font-size: var(--font-sz-neptune);
		position: absolute;
		bottom: 3.3em;
	}

	.flush-to-viewport {
		position: fixed;
		left: 0; right: 0;
		inline-size: 100dvw;
		background: var(--skin-bg);
	}

	ul {
		max-inline-size: var(--container-width);
		margin: auto;
		list-style: none;
		padding: 0.5em 0.5em;
		display: flex;
		gap: 0.5em;
		justify-content: flex-end;
	} li::after {
		content: "•";
		display: inline-block;
		margin-inline-start: 0.25em;
	} li:last-child::after {
		display: none;
	}

	.active { font-weight: bold; }

	.upper { text-transform: uppercase; }

	.icon {
		display: inline-block;
		width: 1em;
		height: 1em;
	}

	.chevron-menu {
		transition: transform 0.25s ease-in-out;
	}

	[open] .chevron-menu {
		transform: rotate(180deg);
	}

	@supports (interpolate-size: allow-keywords) {
		[open] .animate-height {
			height: auto;
			transition: all 0.25s ease-in-out;
			overflow: hidden;
		} .animate-height {
			display: block;
			margin-block-start: 0;
			height: 0;
		}
	}
</style>