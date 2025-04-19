<script lang="ts">
	import type { Pokemon } from "$lib/creatures/types"
	import Button from "$lib/design/Button.svelte"
	import { Fieldset } from "$lib/design/forms"
	import MoveEditor from "$lib/moves/MoveEditor.svelte"
	import { moves } from "$lib/moves/store"
	import type { LearnedMove } from "$lib/trainers/types"

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
		<MoveEditor value={move} {species} {disabled} on:remove={removeMove(move.id)} />
		<hr />
	{/each}
	<Button on:click={addMove}>Add Move</Button>
</Fieldset>

<style>
	hr {
		grid-column: span 2;
		margin: 0.25em auto;
		background: none;
		border: none;
		border-block-end: 0.0625em dotted var(--skin-bg);
	}
</style>