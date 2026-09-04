<script>
	import ReferencePage from "../ReferencePage.svelte"
	import { Heading, InfoTable } from "$lib/ui/elements"
	import { Url } from "$lib/site/url"
	import Rules2018 from "./2018"
	import Rules2024 from "./2024"
	import { currentEdition } from "$lib/site/edition"
</script>

<ReferencePage title="Terrain Effects">
	<section>
		<p>Certain Pokémon or environmental effects can empower the terrain with elemental energy, affecting creatures in the area. The effect of these types of terrains are provided below:</p>
		{#if $currentEdition === "2018"}
			<Rules2018.TerrainTable />
		{:else}
			<Rules2024.TerrainTable />
		{/if}
		<p><strong>Note</strong>: For the sake of terrain effects, <dfn>grounded creatures</dfn> include creatures that do not have a flying speed or Levitate, Magnet Rise, or similar ability.</p>
	</section>
	<section>
		<Heading level="2" id="extent-and-duration">Extent and Duration</Heading>
		<p>Certain Pokémon moves may induce terrain effects for a distance and duration depending on the move. Besides moves, terrain effects may be present by some environmental means, the cause, extent, and duration of which are determined by the DM.</p>
		<InfoTable label="Terrain Extent">
			<thead>
				<tr>
					<th>Move</th>
					<th>Extent</th>
					<th>Duration</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><a href="{Url.moves("electric-terrain")}">Electric Terrain</a></td>
					<td>40ft radius</td>
					<td>3 rounds</td>
				</tr>
				<tr>
					<td><a href="{Url.moves("grassy-terrain")}">Grassy Terrain</a></td>
					<td>40ft radius</td>
					<td>3 rounds</td>
				</tr>
				<tr>
					<td><a href="{Url.moves("misty-terrain")}">Misty Terrain</a></td>
					<td>60ft radius</td>
					<td>3 rounds</td>
				</tr>
				<tr>
					<td><a href="{Url.moves("psychic-terrain")}">Psychic Terrain</a></td>
					<td>40ft radius</td>
					<td>3 rounds</td>
				</tr>
			</tbody>
		</InfoTable>
	</section>
</ReferencePage>

<style>
	p { line-height: 1.25; }
</style>