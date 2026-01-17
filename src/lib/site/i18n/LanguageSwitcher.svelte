<script lang="ts">
	import { page } from "$app/state"
	import { locales, localizeHref, getLocale } from "$lib/site/i18n/paraglide/runtime"
	import { m } from "$lib/site/i18n/paraglide/messages"
	import LanguageIcon from "./LanguageIcon.svelte"
</script>

<!-- TODO: Integrate into main nav? -->
<nav aria-label="{m["settings.language"]()}">
	<details>
		<summary>
			<LanguageIcon /> <span class="upper">{getLocale()}</span>
		</summary>
		<ul>
			{#each locales as locale}
				<li>
					<a href="{localizeHref(page.url.pathname, { locale })}" data-sveltekit-reload>
						{m.languageName({}, { locale })}
					</a>
				</li>
			{/each}
		</ul>
	</details>
</nav>

<style>
	details {
		position: relative;
	}

	details summary::marker {
		display: none;
	}

	summary {
		cursor: pointer;
	}

	ul {
		position: absolute;
	}

	.upper { text-transform: uppercase; }
</style>