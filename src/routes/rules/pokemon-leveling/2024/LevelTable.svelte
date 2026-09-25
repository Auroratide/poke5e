<script lang="ts">
	import { InfoTable } from "$lib/ui/elements"	
	import LevelTableRow from "./LevelTableRow.svelte"
</script>

<InfoTable label="Pokémon Level Table">
	<thead>
		<tr>
			<th>Level</th>
			<th>Prof.</th>
			<th>Features</th>
		</tr>
	</thead>
	<tbody>
		<LevelTableRow
			level={1}
			features={[]}
		/>
		<LevelTableRow
			level={2}
			features={["New Moves"]}
		/>
		<LevelTableRow
			level={3}
			features={[]}
		/>
		<LevelTableRow
			level={4}
			features={["Ability Score Improvement"]}
		/>
		<LevelTableRow
			level={5}
			features={["Damage Increase"]}
		/>
		<LevelTableRow
			level={6}
			features={["New Moves"]}
		/>
		<LevelTableRow
			level={7}
			features={[]}
		/>
		<LevelTableRow
			level={8}
			features={["Ability Score Improvement"]}
		/>
		<LevelTableRow
			level={9}
			features={[]}
		/>
		<LevelTableRow
			level={10}
			features={["New Moves", "Damage Increase"]}
		/>
		<LevelTableRow
			level={11}
			features={[]}
		/>
		<LevelTableRow
			level={12}
			features={["Ability Score Improvement"]}
		/>
		<LevelTableRow
			level={13}
			features={[]}
		/>
		<LevelTableRow
			level={14}
			features={["New Moves"]}
		/>
		<LevelTableRow
			level={15}
			features={[]}
		/>
		<LevelTableRow
			level={16}
			features={["Ability Score Improvement"]}
		/>
		<LevelTableRow
			level={17}
			features={["Damage Increase"]}
		/>
		<LevelTableRow
			level={18}
			features={["New Moves"]}
		/>
		<LevelTableRow
			level={19}
			features={[]}
		/>
		<LevelTableRow
			level={20}
			features={["Peak Power"]}
		/>
	</tbody>
</InfoTable>