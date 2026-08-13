<script lang="ts">
	import { Card } from "$lib/ui/page"
	import { Page } from "$lib/ui/layout"
	import { Title } from "$lib/ui/layout"
	import { CogIcon } from "$lib/ui/icons"
	import RulesVersionSection from "./RulesVersionSection.svelte"
	import BackupsSection from "./BackupsSection.svelte"
	import OfficialFakemonSection from "./OfficialFakemonSection.svelte"
	import LanguageSection from "./LanguageSection.svelte"
	import DarkModeSection from "./DarkModeSection.svelte"
	import { m } from "$lib/site/i18n"
	import BetaTestingSection from "./BetaTestingSection.svelte"
</script>

<Title value="{m["settings.title"]()}" />
<Page theme="grey">
	<CogIcon slot="icon" />
	<Card title="{m["settings.title"]()}">
		<section>
			<p>{m["settings.intro"]()}</p>
			<ul>
				<li><a href="#language">{m["settings.language"]()}</a></li>
				<li><a href="#rules-version">{m["settings.rulesVersion"]()}</a></li>
				<li><a href="#light-dark-colors">{m["settings.colors"]()}</a></li>
				<li><a href="#backups-and-restoration">{m["settings.backups"]()}</a></li>
				<li><a href="#official-fakemon">{m["settings.officialFakemon"]()}</a></li>
				<li><a href="#beta-testing">{m["settings.betaTesting"]()}</a></li>
			</ul>
		</section>
		<LanguageSection />
		<RulesVersionSection />
		<DarkModeSection />
		<BackupsSection />
		<OfficialFakemonSection />
		<BetaTestingSection />
	</Card>
</Page>
