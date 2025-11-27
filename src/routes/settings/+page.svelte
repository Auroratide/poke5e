<script lang="ts">
	import Card from "$lib/design/Card.svelte"
	import Page from "$lib/design/Page.svelte"
	import Title from "$lib/design/Title.svelte"
	import PencilNotes from "$lib/design/icon/PencilNotes.svelte"
	import RulesVersionSection from "./RulesVersionSection.svelte"
</script>

<Title value="Settings" />
<Page theme="navy">
	<PencilNotes slot="icon" />
	<Card title="Settings">
		<section>
			<p>In this section, you can update preferences and manage backups of your trainers.</p>
		</section>
		<RulesVersionSection />
	</Card>
</Page>
