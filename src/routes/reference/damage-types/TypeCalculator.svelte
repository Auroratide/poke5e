<script lang="ts">
	import FlatDl from "$lib/design/FlatDl.svelte"
	import Fieldset from "$lib/design/Form/Fieldset.svelte"
	import { PokeTypes, type PokeType } from "$lib/pokemon/types"
	import { vulnerabilities, resistances, immunities, normalDamange } from "$lib/pokemon/type-interactions"

	let types: PokeType[] = []
	
	$: resistant = types.length > 0 ? Array.from(resistances(types)) : []
	$: vulnerable = types.length > 0 ? Array.from(vulnerabilities(types)) : []
	$: immune = types.length > 0 ? Array.from(immunities(types)) : []
	$: normal = types.length > 0 ? Array.from(normalDamange(types)) : []
</script>

<form>
	<Fieldset title="Types" columns={3}>
		{#each PokeTypes as type}
			<input value={type} bind:group={types} type="checkbox" id="type-input-{type}" name="types" />
			<label for="type-input-{type}" class="cap">{type}</label>
		{/each}
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
