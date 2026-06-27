<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Fieldset } from "$lib/ui/forms"
	import type { MasterTrainerEffect } from "./MasterTrainer"

	let {
		// needed for type check in PokemonTracker
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		value,
	}: {
		value: MasterTrainerEffect,
	} = $props()
</script>

<Fieldset title={m.masterTrainer()}>
	<div class="description">
		{@html m.masterTrainerDescriptionHtml()}
	</div>
</Fieldset>

<style>
	.description {
		line-height: 1.4;
	}

	.description :global(h3) {
		font-weight: bold;
		font-size: var(--font-sz-earth);
		margin-block: 0.25em;
	}
</style>
