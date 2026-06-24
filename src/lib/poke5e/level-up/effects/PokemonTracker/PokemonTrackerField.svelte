<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Fieldset } from "$lib/ui/forms"
	import type { PokemonTrackerEffect } from "./PokemonTracker"

	let {
		// needed for type check in PokemonTracker
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		value,
	}: {
		value: PokemonTrackerEffect,
	} = $props()
</script>

<Fieldset title={m.pokemonTracker()}>
	<div class="description">
		{@html m.pokemonTrackerDescriptionHtml()}
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
