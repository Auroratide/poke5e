<script lang="ts">
	import type { PokemonType, PokeType } from "./PokemonType"

	export let type: PokemonType

	$: vul = Array.from(type.vulnerabilities())
	$: res = Array.from(type.resistances())
	$: imm = Array.from(type.immunities())

	const showTypeList = (list: PokeType[]) => list.length === 0 ? "none" : list.join(", ")
</script>

<dt>Vulnerabilities</dt>
<dd>{showTypeList(vul)}</dd>
<dt>Resistances</dt>
<dd>{showTypeList(res)}</dd>
<dt>Immunities</dt>
<dd>{showTypeList(imm)}</dd>

<style>
	dd {
		text-transform: capitalize;
	}
</style>
