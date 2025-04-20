<script lang="ts">
	import FlatDl from "$lib/design/FlatDl.svelte"
	import { PokeTypes, type PokeType } from "$lib/pokemon/types"
	import { vulnerabilities, resistances, immunities, normalDamange } from "$lib/pokemon/type-interactions"
	import { Fieldset, CheckboxFields } from "$lib/design/forms"

	let types: PokeType[] = []

	const typeOptions = PokeTypes.map((it) => ({ name: it, value: it }))
	
	$: resistant = types.length > 0 ? Array.from(resistances(types)) : []
	$: vulnerable = types.length > 0 ? Array.from(vulnerabilities(types)) : []
	$: immune = types.length > 0 ? Array.from(immunities(types)) : []
	$: normal = types.length > 0 ? Array.from(normalDamange(types)) : []
</script>

<form>
	<Fieldset title="Types" columns={3}>
		<CheckboxFields label="Types" bind:checked={types} values={typeOptions} />
	</Fieldset>
</form>
<FlatDl>
	<dt>Resistant (&times;½)</dt>
	<dd class="cap">{resistant.join(", ")}</dd>
	<dt>Vulnerable (&times;2)</dt>
	<dd class="cap">{vulnerable.join(", ")}</dd>
	<dt>Immune (&times;0)</dt>
	<dd class="cap">{immune.join(", ")}</dd>
	<dt>Normal (&times;1)</dt>
	<dd class="cap">{normal.join(", ")}</dd>
</FlatDl>
