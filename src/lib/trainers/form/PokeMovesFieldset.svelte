<script lang="ts">
	import type { Pokemon } from "$lib/creatures/types"
	import Button from "$lib/design/Button.svelte"
	import Fieldset from "$lib/design/Form/Fieldset.svelte"
	import MoveEditor from "../pokemon-details/MoveEditor.svelte"
	import type { LearnedMove } from "../types"
	import { moves } from "$lib/moves/store"

	export let values: LearnedMove[]
	export let species: Pokemon
	export let disabled: boolean

	let newMoveId = -1001
	const nextNewMoveId = () => (--newMoveId).toString()

	const removeMove = (id: string) => () => {
		values = values.filter((it) => it.id !== id)
	}

	const addMove = () => {
		const newMove = species?.moves?.start?.[0] ?? "tackle"
		const pp = $moves?.find((it) => it.id === newMove)?.pp ?? 20

		values = [...values, {
			id: nextNewMoveId(),
			moveId: species?.moves?.start?.[0] ?? "tackle",
			pp: {
				current: pp,
				max: pp,
			},
			notes: "",
		} ]
	}
</script>

<Fieldset title="Moves">
	{#each values as move (move.id)}
		<MoveEditor {move} {species} {disabled} on:remove={removeMove(move.id)} />
	{/each}
	<span></span>
	<Button on:click={addMove}>Add Move</Button>
</Fieldset>