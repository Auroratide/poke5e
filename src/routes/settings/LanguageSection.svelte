<script lang="ts">
	import { LanguageIcon, LanguageSetting, m } from "$lib/site/i18n"
	import { Url } from "$lib/site/url"
</script>

<section>
	<h2><span aria-hidden="true"><LanguageIcon /></span> {m["settings.language"]()}</h2>
	<LanguageSetting />
	<p class="smaller"><strong>Note:</strong> Languages other than English may not have everything translated. If you would like to help translate Pokémon 5th Edition, let us know on our <a href="{Url.external.discord()}">Discord Server</a>!</p>
</section>

<style>
	h2 {
		display: flex;
		align-items: center;
		gap: 0.25em;
	}

	.smaller { font-size: var(--font-sz-venus); }
</style>
