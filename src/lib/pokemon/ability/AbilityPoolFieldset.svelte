<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Fieldset } from "$lib/ui/forms"
	import type { AbilityPool } from "./AbilityPool"
	import AbilityPoolGroupFields from "./AbilityPoolGroupFields.svelte"

	export let value: AbilityPool
	export let disabled = false
</script>

<Fieldset title={m.abilityPool()}>
	<AbilityPoolGroupFields title={m.nonHiddenAbilities()} bind:values={value.data.normal} {disabled} />
	<AbilityPoolGroupFields title={m.hiddenAbilities()} bind:values={value.data.hidden} {disabled} />
</Fieldset>
