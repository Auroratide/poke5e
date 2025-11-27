<script lang="ts">
	import { Card } from "$lib/ui/page"
	import { Page } from "$lib/ui/layout"
	import { Title } from "$lib/ui/layout"
	import { CogIcon } from "$lib/ui/icons"
	import RulesVersionSection from "./RulesVersionSection.svelte"
</script>

<Title value="Settings" />
<Page theme="grey">
	<CogIcon slot="icon" />
	<Card title="Settings">
		<section>
			<p>In this section, you can update preferences.</p>
		</section>
		<RulesVersionSection />
	</Card>
</Page>
