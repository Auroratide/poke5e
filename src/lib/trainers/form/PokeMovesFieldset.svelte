<script lang="ts">
	import Button from "$lib/design/Button.svelte"
	import Fieldset from "$lib/design/Form/Fieldset.svelte"
	import MoveEditor from "../pokemon-details/MoveEditor.svelte"
	import type { LearnedMove } from "../types"

	export let values: LearnedMove[]
	export let disabled: boolean

	let newMoveId = -1001
	const nextNewMoveId = () => (--newMoveId).toString()

	const removeMove = (id: string) => () => {
		values = values.filter((it) => it.id !== id)
	}

	const addMove = () => {
		values = [...values, {
			id: nextNewMoveId(),
			moveId: "tackle",
			pp: {
				current: 20,
				max: 20,
			},
			notes: "",
		} ]
	}
</script>

<Fieldset title="Moves">
	{#each values as move (move.id)}
		<MoveEditor {move} {disabled} on:remove={removeMove(move.id)} />
	{/each}
	<span></span>
	<Button on:click={addMove}>Add Move</Button>
</Fieldset>