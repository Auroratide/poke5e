<script lang="ts">
	import { formatMoney } from "$lib/pokemon/money"
	import { InfoTable } from "$lib/ui/elements"
	import { Url } from "$lib/url"
	import ReferencePage from "../ReferencePage.svelte"
	import type { PageData } from "./$types"

	export let data: PageData
</script>

<ReferencePage title="TMs">
	<section>
		<p>TMs (Technical Machines) are items that can be used to teach moves to your Pokémon, even if they do not learn them in their natural progression of leveling. TMs are destroyed after one use.</p>
		<p><strong>Note:</strong> If a TM move is replaced, it can only be relearned by purchasing another TM.</p>
		<p>View the <strong><a href="{Url.tms()}">list of TMs</a></strong> or refer to the table below:</p>
		<InfoTable label="List of TMs">
			<thead>
				<tr>
					<th>TM</th>
					<th>Move</th>
					<th>Cost</th>
				</tr>
			</thead>
			<tbody>
				{#each data.tmList as tm}
					{@const tmNameNoNumber = tm.moveInfo.name.substring(tm.moveInfo.name.indexOf("-") + 2)}
					<tr>
						<td>{tm.id.toString().padStart(2, "0")}</td>
						<td><a href="{Url.tms(tm.id.toString())}">{tmNameNoNumber}</a></td>
						<td>{formatMoney(tm.cost)}</td>
					</tr>
				{/each}
			</tbody>
		</InfoTable>
	</section>
</ReferencePage>
