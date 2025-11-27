<script lang="ts">
	import { InfoTable } from "$lib/ui/elements"
	import TableRow from "../TableRow.svelte"
</script>

<InfoTable label="Trainer Level Table">
	<thead>
		<tr>
			<th>Level</th>
			<th>Prof.</th>
			<th>Features</th>
			<th>Pokeslots</th>
			<th>Max SR</th>
		</tr>
	</thead>
	<tbody>
		<TableRow
			level={1}
			pokeslots={3}
			sr={2}
			features={["Starter Pokemon", "Specialization"]}
		/>
		<TableRow
			level={2}
			pokeslots={3}
			sr={2}
			features={["Trainer Path"]}
		/>
		<TableRow
			level={3}
			pokeslots={3}
			sr={5}
			features={["Control Upgrade"]}
		/>
		<TableRow
			level={4}
			pokeslots={3}
			sr={5}
			features={["Ability Score Improvement"]}
		/>
		<TableRow
			level={5}
			pokeslots={4}
			sr={5}
			features={["Trainer Path Feature", "Pokeslot"]}
		/>
		<TableRow
			level={6}
			pokeslots={4}
			sr={8}
			features={["Control Upgrade"]}
		/>
		<TableRow
			level={7}
			pokeslots={4}
			sr={8}
			features={["Specialization"]}
		/>
		<TableRow
			level={8}
			pokeslots={4}
			sr={10}
			features={["Ability Score Improvement", "Control Upgrade"]}
		/>
		<TableRow
			level={9}
			pokeslots={4}
			sr={10}
			features={["Trainer Path Feature"]}
		/>
		<TableRow
			level={10}
			pokeslots={5}
			sr={10}
			features={["Trainer's Resolve", "Pokeslot"]}
		/>
		<TableRow
			level={11}
			pokeslots={5}
			sr={12}
			features={["Control Upgrade"]}
		/>
		<TableRow
			level={12}
			pokeslots={5}
			sr={12}
			features={["Ability Score Improvement"]}
		/>
		<TableRow
			level={13}
			pokeslots={5}
			sr={12}
			features={["Pokemon Tracker"]}
		/>
		<TableRow
			level={14}
			pokeslots={5}
			sr={14}
			features={["Control Upgrade"]}
		/>
		<TableRow
			level={15}
			pokeslots={6}
			sr={14}
			features={["Trainer Path Feature", "Pokeslot"]}
		/>
		<TableRow
			level={16}
			pokeslots={6}
			sr={14}
			features={["Ability Score Improvement"]}
		/>
		<TableRow
			level={17}
			pokeslots={6}
			sr={15}
			features={["Control Upgrade"]}
		/>
		<TableRow
			level={18}
			pokeslots={6}
			sr={15}
			features={["Specialization"]}
		/>
		<TableRow
			level={19}
			pokeslots={6}
			sr={15}
			features={["Epic Boon"]}
		/>
		<TableRow
			level={20}
			pokeslots={6}
			sr={15}
			features={["Master Trainer"]}
		/>
	</tbody>
</InfoTable>

<style>
	th:nth-child(1),
	th:nth-child(2),
	th:nth-child(4),
	th:nth-child(5) {
		text-align: center;
	}
</style>