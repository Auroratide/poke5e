<script lang="ts">
	import FlatDl from "$lib/design/FlatDl.svelte"
	import { Fieldset, CheckboxFields } from "$lib/design/forms"
	import { PokemonType, type PokeType } from "$lib/pokemon/types-2"

	let types: PokeType[] = []

	const typeOptions = PokemonType.list.map((it) => ({ name: it, value: it }))
	
	$: resistant = types.length > 0 ? Array.from(new PokemonType(types).resistances()) : []
	$: vulnerable = types.length > 0 ? Array.from(new PokemonType(types).vulnerabilities()) : []
	$: immune = types.length > 0 ? Array.from(new PokemonType(types).immunities()) : []
	$: normal = types.length > 0 ? Array.from(new PokemonType(types).normalDamange()) : []
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
