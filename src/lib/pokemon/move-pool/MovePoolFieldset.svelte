<script lang="ts">
	import { Fieldset } from "$lib/ui/forms"
	import type { MovePool } from "./MovePool"
	import MovePoolGroupFields from "./MovePoolGroupFields.svelte"
	import { MovesStore, TmsStore } from "$lib/moves/store"

	export let value: MovePool
	export let disabled = false

	// TODO: This looks circular. Surely there's a better way to do this.
	let tmMoveIds = $TmsStore?.filter((tm) => value.data.tm.includes(tm.tm.id))?.map((tm) => tm.id) ?? []
	$: value.data.tm = $TmsStore?.filter((tm) => tmMoveIds?.includes(tm.id))?.map((tm) => tm.tm.id) ?? []
</script>

<Fieldset title="Move Pool">
	<MovePoolGroupFields title="Starting Moves" bind:values={value.data.start} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title="Level 2 Moves" bind:values={value.data.level2} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title="Level 6 Moves" bind:values={value.data.level6} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title="Level 10 Moves" bind:values={value.data.level10} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title="Level 14 Moves" bind:values={value.data.level14} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title="Level 18 Moves" bind:values={value.data.level18} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title="Egg Moves" bind:values={value.data.egg} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title="TMs" bind:values={tmMoveIds} moves={$TmsStore} {disabled} useTmName />
</Fieldset>
