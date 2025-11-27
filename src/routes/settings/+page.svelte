<script lang="ts">
	import Card from "$lib/design/Card.svelte"
	import { Page } from "$lib/ui/layout"
	import { Title } from "$lib/ui/layout"
	import { PencilNotesIcon } from "$lib/ui/icons"
	import RulesVersionSection from "./RulesVersionSection.svelte"
</script>

<Title value="Settings" />
<Page theme="navy">
	<PencilNotesIcon slot="icon" />
	<Card title="Settings">
		<section>
			<p>In this section, you can update preferences and manage backups of your trainers.</p>
		</section>
		<RulesVersionSection />
	</Card>
</Page>
