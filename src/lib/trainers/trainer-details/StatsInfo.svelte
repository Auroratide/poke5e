<script lang="ts">
	import type { TrainerInfo } from "../types"
	import FlatDl from "$lib/design/FlatDl.svelte"
	import { proficiencyBonus } from "$lib/dnd/proficiency"

	export let trainer: TrainerInfo

	$: pb = proficiencyBonus(trainer.level)
</script>

<FlatDl columns={2}>
	<dt><abbr title="Armor Class">AC</abbr></dt>
	<dd>{trainer.ac}</dd>
	<dt>Bonus</dt>
	<dd>+{pb}</dd>
</FlatDl>
