<script lang="ts">
	import { InfoTable } from "$lib/ui/elements"
	import { Url } from "$lib/site/url"
</script>

<InfoTable label="Terrain Effects">
	<thead>
		<tr>
			<th>Terrain</th>
			<th>Effect</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Electric</td>
			<td><p>Creatures may double their MOVE modifier on damage rolls for electric-type moves activated inside the terrain. In addition, grounded creatures cannot be asleep.</p></td>
		</tr>
		<tr>
			<td>Grassy</td>
			<td><p>Creatures may double their MOVE modifier on damage rolls for grass-type moves activated inside the terrain. In addition, grounded creatures that end their turn within the terrain heal an amount of hit points equal to their proficiency bonus.</p></td>
		</tr>
		<tr>
			<td>Misty</td>
			<td><p>Grounded creatures in the terrain are resistant to dragon-type damage, or if they were vulnerable to dragon-type damage, they take regular damage instead. In addition, grounded creatures cannot suffer new <a href="{Url.reference.status()}">status conditions</a>.</p></td>
		</tr>
		<tr>
			<td>Psychic</td>
			<td><p>Creatures may double their MOVE modifier on damage rolls for psychic-type moves activated inside the terrain. In addition, grounded creatures in the terrain cannot use bonus actions.</p></td>
		</tr>
	</tbody>
</InfoTable>