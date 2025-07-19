<script lang="ts">
	import { Level } from "$lib/dnd/level"

	export let level: number
	export let features: string[]
	export let pokeslots: number
	export let sr: number
</script>

<tr>
	<td>{level}</td>
	<td>+{new Level(level).proficiencyBonus}</td>
	<td>{features.join(", ")}</td>
	<td>{pokeslots}</td>
	<td>{sr}</td>
</tr>

<style>
	td:nth-child(1),
	td:nth-child(2),
	td:nth-child(4),
	td:nth-child(5) {
		text-align: center;
	}
</style>
