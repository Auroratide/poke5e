<script lang="ts">
	import { MovesStore } from "$lib/moves/store"
	import { MoveOption, type MovePoolLandmarks } from "$lib/pokemon/move-pool"
	import { m } from "$lib/site/i18n"
	import { Fieldset, InstructionText } from "$lib/ui/forms"
	import type { NewMovesEffect } from "./NewMoves"

	let {
		value,
	}: {
		value: NewMovesEffect,
	} = $props()

	
	const nextLevel = $derived(value.props.currentLevel.next())
	const levelKey = $derived(`level${nextLevel.data}` as MovePoolLandmarks)
	const newMoveIds = $derived(value.props.movePool[levelKey] ?? [])
	const newMoves = $derived(newMoveIds.map((id) => $MovesStore?.find((it) => it.id === id)).filter((it) => it != null))
</script>

{#if newMoves.length > 0}
	<Fieldset title={m.newMoves()}>
		<InstructionText>{m.newMovesInstructions()}</InstructionText>
		{#each newMoves as move}
			<MoveOption idPrefix="level-up" value={move} />
		{/each}
	</Fieldset>
{/if}
