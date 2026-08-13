<script lang="ts">
	import { LanguageIcon, LanguageSetting, m } from "$lib/site/i18n"
	import { Url } from "$lib/site/url"
</script>

<section>
	<h2 id="language"><span aria-hidden="true"><LanguageIcon /></span> {m["settings.language"]()}</h2>
	<LanguageSetting />
	<p class="smaller">{m["settings.translationNote"]()} <a href="{Url.external.discord()}">Discord</a></p>
</section>

<style>
	h2 {
		display: flex;
		align-items: center;
		gap: 0.25em;
	}

	.smaller { font-size: var(--font-sz-venus); }
</style>
