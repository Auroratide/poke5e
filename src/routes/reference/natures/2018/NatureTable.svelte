<script lang="ts">
	import InfoTable from "$lib/design/InfoTable.svelte"
	import NatureRow from "./NatureRow.svelte"
	import { StandardNature } from "$lib/pokemon/nature/StandardNature.2018"
</script>

<p>As such, any Pokémon you come into contact with has its own <dfn>Nature</dfn> that may affect their ability scores and sticks with them for their entire life. The following table can be used by the DM to randomly give Pokémon a nature with a roll of a d20. When you choose your starter, you may choose any of the following with their effects.</p>
<InfoTable label="Natures">
	<thead>
		<tr>
			<th>d20</th>
			<th>Nature</th>
			<th>Increase</th>
			<th>Decrease</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.keys(StandardNature) as nature, index}
			<NatureRow name="{nature}" {index} effect={StandardNature[nature].effect} />
		{/each}
	</tbody>
</InfoTable>
