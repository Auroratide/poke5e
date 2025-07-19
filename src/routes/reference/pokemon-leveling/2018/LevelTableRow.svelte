<script lang="ts">
	import { Level } from "$lib/dnd/level"

	export let level: number
	export let features: string[]

	$: stab = Math.floor(0.25 * (level + 1))
</script>

<tr>
	<td>{level}</td>
	<td>+{new Level(level).proficiencyBonus}</td>
	<td>{features.join(", ")}</td>
	<td>+{stab}</td>
</tr>

<style>
	td:nth-child(1),
	td:nth-child(2),
	td:nth-child(4) {
		text-align: center;
	}
</style>
