<script lang="ts">
	import { browser } from "$app/environment"
	import { base } from "$app/paths"
	import Button from "$lib/design/Button.svelte"

	const isNotMigrated =
		browser &&
		window.location.origin === "https://poke5e.app" &&
		localStorage.getItem("migrated") != null
</script>

<section class="larger center more-space">
	<p>Here, you can manage trainers and their pokemon for your campaign!</p>
	<p>Create a trainer to get started:</p>
	<p class="larger more-space"><Button href="{base}/trainers?action=new-trainer">Create Trainer</Button></p>
</section>

{#if isNotMigrated}
	<hr />
	<section class="center more-space">
		<p>The Poke 5e App has recently moved to a new home: <strong>poke5e.app</strong>! If you had trainer data, it should have been automatically transfered to here.</p>
		<p>If that didn't happen, you can manually transfer your trainer data by visiting the following link and copying any Trainer IDs.</p>
		<p class="more-space"><Button href="https://auroratide.github.io/storage-migration/poke5e">Manually Transfer Trainers</Button></p>
	</section>
{/if}

<style>
	.larger {
		font-size: var(--font-sz-neptune);
	}

	.center { text-align: center; }

	.more-space { margin-block: 2em; }
</style>