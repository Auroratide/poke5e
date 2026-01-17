<script lang="ts">
	import { browser } from "$app/environment"
	import { Url } from "$lib/site/url"
	import { Button } from "$lib/ui/elements"
	import { MY_ORIGIN } from "./migration/origins"
	import { migrationStatus } from "./migration/store"
	import { PageAction } from "./page-action"

	$: isNotMigrated =
		browser &&
		window.location.origin === MY_ORIGIN &&
		($migrationStatus === "done" || $migrationStatus === "failed")
</script>

<div class="scrollable">
	<section class="larger center more-space">
		<p>Here, you can manage trainers and their pokemon for your campaign!</p>
		<p>Create a trainer to get started:</p>
		<p class="larger more-space"><Button href="{Url.trainers(undefined, undefined, PageAction.newTrainer)}">Create Trainer</Button></p>
	</section>

	{#if isNotMigrated}
		<hr />
		<section class="center more-space">
			<p>The Poke 5e App has recently moved to <strong>poke5e.app</strong>! If you had trainer data, it should have been automatically transfered to here.</p>
			<p>If that didn't happen, learn how you can recover your trainer data by clicking the link below:</p>
			<p class="more-space"><Button href="{Url.trainerRecovery()}">Recover Trainers</Button></p>
		</section>
	{/if}
</div>

<style>
	.scrollable { overflow-y: auto; }

	.larger {
		font-size: var(--font-sz-neptune);
	}

	.center { text-align: center; }

	.more-space { margin-block: 2em; }
</style>