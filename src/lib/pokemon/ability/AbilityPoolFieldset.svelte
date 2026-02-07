<script lang="ts">
	import { m } from "$lib/site/i18n";
	import { Fieldset } from "$lib/ui/forms"
	import type { AbilityPool } from "./AbilityPool"
	import AbilityPoolGroupFields from "./AbilityPoolGroupFields.svelte"

	export let value: AbilityPool
	export let disabled = false
</script>

<Fieldset title={m["universal.abilityPool"]()}>
	<AbilityPoolGroupFields title={m["universal.nonHiddenAbilities"]()} bind:values={value.data.normal} {disabled} />
	<AbilityPoolGroupFields title={m["universal.hiddenAbilities"]()} bind:values={value.data.hidden} {disabled} />
</Fieldset>
