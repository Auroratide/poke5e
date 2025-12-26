<script lang="ts">
	import { Fieldset } from "$lib/ui/forms"
	import type { MovePool } from "./MovePool"
	import MovePoolGroupFields from "./MovePoolGroupFields.svelte"
	import { MovesStore, TmsStore } from "$lib/moves/store"

	export let value: MovePool
	export let disabled = false

	let tmString = value.data.tm.map((it) => it.toString())
	$: value.data.tm = tmString.map((it) => parseInt(it)).sort((a, b) => a - b)
</script>

<Fieldset title="Move Pool">
	<MovePoolGroupFields title="Starting Moves" bind:values={value.data.start} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title="Level 2 Moves" bind:values={value.data.level2} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title="Level 6 Moves" bind:values={value.data.level6} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title="Level 10 Moves" bind:values={value.data.level10} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title="Level 14 Moves" bind:values={value.data.level14} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title="Level 18 Moves" bind:values={value.data.level18} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title="Egg Moves" bind:values={value.data.egg} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title="TMs" bind:values={tmString} moves={$TmsStore} {disabled} />
</Fieldset>
