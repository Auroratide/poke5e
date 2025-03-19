<script>
	import Card from "$lib/design/Card.svelte"
	import InfoTable from "$lib/design/InfoTable.svelte"
	import Title from "$lib/design/Title.svelte"
</script>

<Title value="Weather" />
<Card title="Weather">
	<section>
		<p>Weather plays a significant role on most Pokémon journeys. Many Pokémon have abilities that are affected by the surrounding weather or terrain, and weather can impact the power of certain Pokémon types.</p>
		<InfoTable label="Weather Effects">
			<thead>
				<tr>
					<th>Weather</th>
					<th>Effect</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Harsh Sunlight</td>
					<td>Advantage on damage rolls for Fire-type moves. Disadvantage on damage rolls for Water-type moves.</td>
				</tr>
				<tr>
					<td>Rain</td>
					<td>Advantage on damage rolls for Water-type moves. Disadvantage on damage rolls for Fire-type moves.</td>
				</tr>
				<tr>
					<td>Sandstorm</td>
					<td>Lightly obscured. Rock-type Pokémon add +1 to their AC. If triggered by a Pokémon, the sandstorm my deal damage over time.</td>
				</tr>
				<tr>
					<td>Hail</td>
					<td>If triggered by a Pokémon, the hail may deal damage over time.</td>
				</tr>
				<tr>
					<td>Snow</td>
					<td>Ice-type Pokémon add +1 to their AC. If triggered by a Pokémon, the AC bonus may be higher.</td>
				</tr>
				<tr>
					<td>Fog</td>
					<td>Heavily obscured.</td>
				</tr>
			</tbody>
		</InfoTable>
	</section>
</Card>

<style>
	td:first-child {
		white-space: pre;
	}
</style>