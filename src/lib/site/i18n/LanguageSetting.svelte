<script lang="ts">
	import { page } from "$app/state"
	import { m } from "$lib/site/i18n/paraglide/messages"
	import { getLocale, locales, localizeHref } from "$lib/site/i18n/paraglide/runtime"
	import { Button } from "$lib/ui/elements"
</script>

<div class="language-setting">
	<p id="language-setting-label">Select your preferred language:</p>
	<ul role="listbox" tabindex="0" aria-labelledby="language-setting-label" aria-activedescendant="language-setting-option-{getLocale()}">
		{#each locales as locale}
			<li id="language-setting-option-{locale}" role="option" aria-selected="{getLocale() === locale}">
				<Button href="{localizeHref(page.url.pathname, { locale })}" variant={getLocale() === locale ? "solid" : "subtle"} width="full" reloadOnLink>
					{m.languageName({}, { locale })}
				</Button>
			</li>
		{/each}
	</ul>
</div>

<style>
	.language-setting {
		border: none;
		padding: 0;
		margin-inline: 0;
		margin-block-end: 1.5em;
		inline-size: 100%;
	}

	ul {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75em;
		text-align: center;
	}

	li {
		display: block;
	} li[aria-selected="true"] {
		font-weight: bold;
	}
</style>