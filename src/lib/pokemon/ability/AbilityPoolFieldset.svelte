<script lang="ts">
	import { Fieldset } from "$lib/design/forms"
	import type { AbilityPool } from "./AbilityPool"
	import AbilityPoolGroupFields from "./AbilityPoolGroupFields.svelte"

	export let value: AbilityPool
	export let disabled = false
</script>

<Fieldset title="Ability Pool">
	<AbilityPoolGroupFields title="Non-Hidden Abilities" bind:values={value.data.normal} {disabled} />
	<AbilityPoolGroupFields title="Hidden Abilities" bind:values={value.data.hidden} {disabled} />
</Fieldset>
