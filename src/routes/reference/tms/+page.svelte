<script lang="ts">
	import { formatMoney } from "$lib/pokemon/money"
	import { InfoTable } from "$lib/ui/elements"
	import { Url } from "$lib/site/url"
	import ReferencePage from "../ReferencePage.svelte"
	import type { PageData } from "./$types"
	import TmImg from "./tm.png"

	export let data: PageData
</script>

<ReferencePage title="TMs">
	<section>
		<p>TMs (Technical Machines) are items that can be used to teach moves to your Pokémon, even if they do not learn them in their natural progression of leveling.</p>
	</section>
	<section>
		<h2>Applying a TM</h2>
		<div class="row">
			<p>In the world of Pokémon, a TM is a small, compact disc upon which is stored all the information needed for a Pokémon to learn the contained move.</p>
			<img class="cd" src="{TmImg}" alt="A CD" />
		</div>
		<p>A Pokémon may learn the move on a TM during a long rest, replacing a move it already knows if it knows four moves (or more with the Extra Move feat). Pokémon may only learn moves from TMs that are listed on their stat blocks.</p>
		<p>The TM is destroyed during the process. Once used, the TM's move may only be relearned by purchasing another TM.</p>
	</section>
	<section>
		<h2>List of TMs</h2>
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

<style>
	.row {
		display: flex;
		gap: 1.5em;
	} .row p {
		flex: 1;
	}

	.cd {
		display: block;
		inline-size: 5em;
		block-size: 5em;
	}
</style>
