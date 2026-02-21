<script lang="ts">
	import type { PokemonType } from "./PokemonType"
	import { InlineTypeName } from "."
	import { m } from "$lib/site/i18n"

	export let type: PokemonType

	$: vul = type.vulnerabilities()
	$: res = type.resistances()
	$: imm = type.immunities()
</script>

<dt>{m.vulnerabilities()}</dt>
<div>
	{#if vul.length === 0}
		<dd class="none">{m.noneFemenine()}</dd>
	{/if}
	{#each vul as value}
		<dd><InlineTypeName {value} /></dd>
	{/each}
</div>
<dt>{m.resistances()}</dt>
<div>
	{#if res.length === 0}
		<dd class="none">{m.noneFemenine()}</dd>
	{/if}
	{#each res as value}
		<dd><InlineTypeName {value} /></dd>
	{/each}
</div>
<dt>{m.immunities()}</dt>
<div>
	{#if imm.length === 0}
		<dd class="none">{m.noneFemenine()}</dd>
	{/if}
	{#each imm as value}
		<dd><InlineTypeName {value} /></dd>
	{/each}
</div>

<style>
	dt {
		margin-block: 0.25em;
	}

	div {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0 0.25em;
		margin-block: 0.25em;
	}

	.none {
		display: inline-block;
		padding-block: 0.0625em;
	}
</style>
