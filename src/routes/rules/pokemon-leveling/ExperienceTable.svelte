<script lang="ts">
	import { InfoTable } from "$lib/ui/elements"
	import ExpTableRow from "./ExpTableRow.svelte"
	import { ExperienceNeededPerLevel } from "$lib/poke5e/experience"
</script>

<InfoTable label="Experience Table">
	<thead>
		<tr>
			<th>Level</th>
			<th>Experience Needed</th>
		</tr>
	</thead>
	<tbody>
		{#each ExperienceNeededPerLevel as exp, i}
			<ExpTableRow
				level={i + 1}
				exp={exp}
			/>
		{/each}
	</tbody>
</InfoTable>