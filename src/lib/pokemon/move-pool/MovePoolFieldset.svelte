<script lang="ts">
	import { Fieldset } from "$lib/ui/forms"
	import type { MovePool } from "./MovePool"
	import MovePoolGroupFields from "./MovePoolGroupFields.svelte"
	import { MovesStore, TmsStore } from "$lib/moves/store"
	import { m } from "$lib/site/i18n"

	export let value: MovePool
	export let disabled = false

	// TODO: This looks circular. Surely there's a better way to do this.
	let tmMoveIds = $TmsStore?.filter((tm) => value.data.tm.includes(tm.tm.id))?.map((tm) => tm.id) ?? []
	$: value.data.tm = $TmsStore?.filter((tm) => tmMoveIds?.includes(tm.id))?.map((tm) => tm.tm.id) ?? []
</script>

<Fieldset title={m["universal.movePool"]()}>
	<MovePoolGroupFields title={m["universal.startingMoves"]()} bind:values={value.data.start} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title={m["universal.levelXMoves"]({level: "2"})} bind:values={value.data.level2} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title={m["universal.levelXMoves"]({level: "6"})} bind:values={value.data.level6} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title={m["universal.levelXMoves"]({level: "10"})} bind:values={value.data.level10} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title={m["universal.levelXMoves"]({level: "14"})} bind:values={value.data.level14} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title={m["universal.levelXMoves"]({level: "18"})} bind:values={value.data.level18} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title={m["universal.eggMoves"]()} bind:values={value.data.egg} moves={$MovesStore} {disabled} />
	<MovePoolGroupFields title={m["universal.tms"]()} bind:values={tmMoveIds} moves={$TmsStore} {disabled} useTmName />
</Fieldset>
