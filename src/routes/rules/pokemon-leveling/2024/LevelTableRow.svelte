<script lang="ts">
	import { Level } from "$lib/dnd/level"

	export let level: number
	export let features: string[]
</script>

<tr>
	<td>{level}</td>
	<td>+{new Level(level).proficiencyBonus}</td>
	<td>{features.join(", ")}</td>
</tr>

<style>
	td:nth-child(1),
	td:nth-child(2) {
		text-align: center;
	}
</style>
