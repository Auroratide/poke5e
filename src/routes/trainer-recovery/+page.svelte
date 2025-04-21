<script lang="ts">
	import { onMount } from "svelte"
	import Button from "$lib/design/Button.svelte"
	import Title from "$lib/design/Title.svelte"
	import { seenTrainerRecovery } from "$lib/trainers/migration/store"
	import StaticPage from "$lib/design/StaticPage.svelte"

	onMount(() => {
		seenTrainerRecovery.set(true)
	})
</script>

<Title value="Trainer Recovery" />
<StaticPage title="Trainer Recovery">
	<section class="content-section">
		<p>The Poke 5e App has recently moved to <strong>poke5e.app</strong> from <strong>auroratide.github.io/poke5e</strong>! I tried to automatically transfer the data from the old location, but if you're here, that probably didn't work.</p>
		<p>No worries! You can manually transfer your trainer data by visiting the following link and copying any Trainer IDs.</p>
		<p class="has-button"><Button href="https://auroratide.github.io/storage-migration/poke5e">Manually Transfer Trainers</Button></p>
		<p>If you cannot find your trainers at the above link or otherwise run into any other problems, let me know by creating an issue and I'll help as much as I can:</p>
		<p class="has-button"><Button href="https://github.com/Auroratide/poke5e/issues/new">Create Issue</Button></p>
	</section>
</StaticPage>

<style>
	.has-button {
		font-size: var(--font-sz-neptune);
		text-align: center;
		line-height: 1.2;
	}
</style>