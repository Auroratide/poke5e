<script lang="ts">
	import { Card } from "$lib/ui/page"
	import { Page } from "$lib/ui/layout"
	import { Title } from "$lib/ui/layout"
	import { CogIcon } from "$lib/ui/icons"
	import RulesVersionSection from "./RulesVersionSection.svelte"
	import BackupsSection from "./BackupsSection.svelte"
	import OfficialFakemonSection from "./OfficialFakemonSection.svelte"
	import LanguageSection from "./LanguageSection.svelte"
	import { FeatureToggles } from "$lib/site/FeatureToggles"
	import { m } from "$lib/site/i18n"
</script>

<Title value="{m["settings.title"]()}" />
<Page theme="grey">
	<CogIcon slot="icon" />
	<Card title="{m["settings.title"]()}">
		<section>
			<p>In this section, you can update preferences and manage backups.</p>
		</section>
		{#if FeatureToggles.Localization()}
			<LanguageSection />
		{/if}
		<RulesVersionSection />
		<BackupsSection />
		<OfficialFakemonSection />
	</Card>
</Page>
