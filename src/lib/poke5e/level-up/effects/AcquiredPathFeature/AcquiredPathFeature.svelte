<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { FeatureInfo } from "$lib/trainers/paths"
	import { Fieldset, InstructionText } from "$lib/ui/forms"
	import type { AcquiredPathFeatureEffect } from "./AcquiredPathFeature"

	let {
		value,
	}: {
		value: AcquiredPathFeatureEffect,
	} = $props()	
</script>

<Fieldset title={m.newPathFeature()}>
	<InstructionText>{m.newPathFeatureInstructions()}</InstructionText>
	<div class="description">
		<FeatureInfo path={value.props.path} level={value.props.currentLevel.next()} />
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