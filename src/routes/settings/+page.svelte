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
</script>

<Title value="{m["settings.title"]()}" />
<Page theme="grey">
	<CogIcon slot="icon" />
	<Card title="{m["settings.title"]()}">
		<section>
			<p>In this section, you can update preferences and manage backups.</p>
			<ul>
				<li><a href="#language">Language</a></li>
				<li><a href="#rules-version">Rules Version</a></li>
				<li><a href="#light-dark-colors">Light/Dark Colors</a></li>
				<li><a href="#backups-and-restoration">Backups and Restoration</a></li>
				<li><a href="#official-fakemon">"Official" Fakémon</a></li>
			</ul>
		</section>
		<LanguageSection />
		<RulesVersionSection />
		<DarkModeSection />
		<BackupsSection />
		<OfficialFakemonSection />
	</Card>
</Page>
