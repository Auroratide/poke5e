<script lang="ts" context="module">
	export const getMoveFieldName = (id: string) => `move-id-${id}`
</script>

<script lang="ts">
	import { MovesStore } from "$lib/moves/store"
	import {
		MarkdownField,
		Removable,
		SelectField,
		IntField,
	} from "$lib/ui/forms"
	import type { LearnedMove } from "$lib/trainers/types"
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { LearnableMoves } from "./LearnableMoves"
	import type { Level } from "$lib/dnd/level"
	import { m } from "$lib/site/i18n"

	export let value: LearnedMove
	export let species: PokemonSpecies
	export let level: Level
	export let disabled: boolean = false

	$: learnableMoves = LearnableMoves.groupMoves($MovesStore ?? [], species, level)
	$: moveOptions = learnableMoves.nonemptyGroups().map((it) => ({
		name: it.name,
		values: it.moves.map((it) => ({ name: it.name, value: it.id })),
	}))
	$: moveFieldName = getMoveFieldName(value.id)

	const onMoveChange = () => {
		const pp = $MovesStore.find((it) => it.id === value.moveId)?.pp ?? 0
		value.pp.current = pp
		value.pp.max = pp
	}
</script>

<div class="move-editor">
	<Removable on:remove>
		<SelectField label="{m.move()}" name="{moveFieldName}" bind:value={value.moveId} options={moveOptions} {disabled} on:change={onMoveChange} />
	</Removable>
	<IntField label="{m.maxPp()}" name="move-pp-{value.id}" bind:value={value.pp.max} {disabled} />
	<MarkdownField label="{m.notes()}" name="move-notes-{value.id}" bind:value={value.notes} {disabled} />
</div>

<style>
	.move-editor {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
</style>
