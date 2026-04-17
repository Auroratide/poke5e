<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Fieldset } from "$lib/ui/forms"
	import { AbilityPool } from "./AbilityPool"
	import AbilityPoolGroupFields from "./AbilityPoolGroupFields.svelte"

	export let value: AbilityPool
	export let disabled = false

	let normal = value.normal
	let hidden = value.hidden

	$: value = new AbilityPool({
		normal: normal.map((it) => it.data),
		hidden: hidden.map((it) => it.data),
	})
</script>

<Fieldset title={m.abilityPool()}>
	<AbilityPoolGroupFields idPrefix="nonhidden" title={m.nonHiddenAbilities()} bind:values={normal} {disabled} />
	<AbilityPoolGroupFields idPrefix="hidden" title={m.hiddenAbilities()} bind:values={hidden} {disabled} />
</Fieldset>
