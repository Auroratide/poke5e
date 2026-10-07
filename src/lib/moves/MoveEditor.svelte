<script lang="ts" module>
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
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { LearnableMoves } from "./LearnableMoves"
	import type { Level } from "$lib/dnd/level"
	import { m } from "$lib/site/i18n"
	import { MoveOption } from "$lib/pokemon/move-pool"
	import { Button, VisuallyHidden } from "$lib/ui/elements"
	import { FeatureToggles } from "$lib/site/FeatureToggles"
	import type { LearnedMove } from "./learned"
	import { MoveTypeField } from "./type"

	let {
		value = $bindable(),
		species,
		level,
		disabled = false,
		onremove = () => {},
		onchange,
	}: {
		value: LearnedMove,
		species: PokemonSpecies,
		level: Level,
		disabled?: boolean,
		onremove?: () => void,
		onchange?: (move: LearnedMove) => void,
	} = $props()

	const advancedEditorId = $derived(`advanced-move-editor-${value.id}`)
	let advancedEditorOpen = $state(false)

	const learnableMoves = $derived(LearnableMoves.groupMoves($MovesStore.result ?? [], species, level))
	const moveOptions = $derived(learnableMoves.nonemptyGroups().map((it) => ({
		name: it.name,
		values: it.moves.map((it) => ({ name: it.name, value: it.id })),
	})))
	const moveFieldName = $derived(getMoveFieldName(value.id))

	const theMove = $derived($MovesStore.result?.find((it) => it.id === value.moveId))

	const onMoveChange = () => {
		const pp = $MovesStore.result?.find((it) => it.id === value.moveId)?.pp ?? 0
		value.pp.current = pp
		value.pp.max = pp
		onchange?.(value)
	}
</script>

<div class="move-editor">
	{#if FeatureToggles.MoveCustomization.isActive()}
		{#if theMove}
			<MoveOption idPrefix="move-editor" value={theMove}>
				<Button variant="subtle" controls={advancedEditorId} bind:expanded={advancedEditorOpen}>
					<span class="smaller">{#if advancedEditorOpen}-{:else}+{/if} Edit</span>
				</Button>
				<Button variant="danger" on:click={onremove}>
					<strong><span aria-hidden="true">-</span><VisuallyHidden inline>{m.remove()}</VisuallyHidden></strong>
				</Button>
			</MoveOption>
			<div id={advancedEditorId} class="advanced-editor" hidden={!advancedEditorOpen}>
				<IntField label={m.maxPp()} name="move-pp-{value.id}" bind:value={value.pp.max} {disabled} />
				<MarkdownField label={m.notes()} name="move-notes-{value.id}" bind:value={value.notes} {disabled} />
				<IntField label="To Hit Modifier" name="move-tohit-{value.id}" bind:value={value.modifiers.toHit} {disabled} />
				<IntField label="Damage Modifier" name="move-damage-{value.id}" bind:value={value.modifiers.damage} {disabled} />
				<IntField label="Save DC Modifier" name="move-savedc-{value.id}" bind:value={value.modifiers.saveDc} {disabled} />
				<MoveTypeField label="Custom Type" name="custom-type-{value.id}" bind:value={value.customization.type} defaultable {disabled} />
			</div>
		{/if}
	{:else}
		<Removable on:remove={onremove}>
			<SelectField label={m.move()} name={moveFieldName} bind:value={value.moveId} options={moveOptions} {disabled} on:change={onMoveChange} />
		</Removable>
		<IntField label={m.maxPp()} name="move-pp-{value.id}" bind:value={value.pp.max} {disabled} />
		<MarkdownField label={m.notes()} name="move-notes-{value.id}" bind:value={value.notes} {disabled} />
	{/if}
</div>

<style>
	.move-editor {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.advanced-editor {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 0 0.5em 1em;
	}

	.advanced-editor[hidden] {
		display: none;
	}

	.smaller {
		font-size: var(--font-sz-venus);
	}
</style>
