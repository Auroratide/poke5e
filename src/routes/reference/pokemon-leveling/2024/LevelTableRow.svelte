<script lang="ts">
	import { proficiencyBonus } from "$lib/dnd/proficiency"

	export let level: number
	export let features: string[]
</script>

<tr>
	<td>{level}</td>
	<td>+{proficiencyBonus(level)}</td>
	<td>{features.join(", ")}</td>
</tr>

<style>
	td:nth-child(1),
	td:nth-child(2) {
		text-align: center;
	}
</style>
