<script lang="ts" context="module">
	export const getMoveFieldName = (id: string) => `move-id-${id}`
</script>

<script lang="ts">
	import { moves, tms } from "$lib/moves/store"
	import { groupByLearnability } from "$lib/moves/group"
	import {
		MarkdownField,
		Removable,
		SelectField,
		IntField,
	} from "$lib/ui/forms"
	import type { LearnedMove } from "$lib/trainers/types"
	import type { PokemonSpecies } from "$lib/creatures/species"

	export let value: LearnedMove
	export let species: PokemonSpecies
	export let level: number
	export let disabled: boolean = false

	$: moveGroups = groupByLearnability($moves ?? [], $tms ?? [], species, level)
	$: moveOptions = moveGroups.map((it) => ({
		name: it.name,
		values: it.moves.map((it) => ({ name: it.name, value: it.id })),
	}))
	$: moveFieldName = getMoveFieldName(value.id)

	const onMoveChange = () => {
		const pp = $moves.find((it) => it.id === value.moveId)?.pp ?? 0
		value.pp.current = pp
		value.pp.max = pp
	}
</script>

<div class="move-editor">
	<Removable on:remove>
		<SelectField label="Move" name="{moveFieldName}" bind:value={value.moveId} options={moveOptions} {disabled} on:change={onMoveChange} />
	</Removable>
	<IntField label="Max PP" name="move-pp-{value.id}" bind:value={value.pp.max} {disabled} />
	<MarkdownField label="Notes" name="move-notes-{value.id}" bind:value={value.notes} {disabled} />
</div>

<style>
	.move-editor {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
</style>
