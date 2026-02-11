<script lang="ts">
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { Button } from "$lib/ui/elements"
	import { Fieldset, focusInputField } from "$lib/ui/forms"
	import MoveEditor, { getMoveFieldName } from "$lib/moves/MoveEditor.svelte"
	import { MovesStore } from "$lib/moves/store"
	import type { LearnedMove } from "$lib/trainers/types"
	import type { Level } from "$lib/dnd/level"
	import { m } from "$lib/site/i18n"

	export let values: LearnedMove[]
	export let species: PokemonSpecies
	export let level: Level
	export let disabled: boolean

	let newMoveId = -1001
	const nextNewMoveId = () => (--newMoveId).toString()

	const removeMove = (id: string) => () => {
		values = values.filter((it) => it.id !== id)
	}

	const addMove = () => {
		const newMove = species?.moves?.data?.start?.[0] ?? "tackle"
		const pp = $MovesStore?.find((it) => it.id === newMove)?.pp ?? 20
		const nextId = nextNewMoveId()

		values = [...values, {
			id: nextId,
			moveId: species?.moves?.data?.start?.[0] ?? "tackle",
			pp: {
				current: pp,
				max: pp,
			},
			notes: "",
		} ]

		focusInputField(getMoveFieldName(nextId))
	}
</script>

<Fieldset title="{m["universal.moves"]()}">
	{#each values as move (move.id)}
		<MoveEditor value={move} {species} {disabled} on:remove={removeMove(move.id)} {level} />
		<hr />
	{/each}
	<Button on:click={addMove}>{m["universal.addMove"]()}</Button>
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