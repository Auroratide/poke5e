<script lang="ts">
	import type { Attribute } from "$lib/dnd/attributes"
	import type { Level } from "$lib/dnd/level"
	import { LearnableMoves } from "$lib/moves/LearnableMoves"
	import type { Move } from "$lib/moves/Move"
	import MoveEditor, { getMoveFieldName } from "$lib/moves/MoveEditor.svelte"
	import { MoveFilter } from "$lib/moves/MoveFilter"
	import { MoveSearchAndFilter } from "$lib/moves/form"
	import { LearnedMove } from "$lib/moves/learned"
	import { MovesStore } from "$lib/moves/store"
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { MoveOption } from "$lib/pokemon/move-pool"
	import { FeatureToggles } from "$lib/site/FeatureToggles"
	import { m } from "$lib/site/i18n"
	import { Button, Details, VisuallyHidden } from "$lib/ui/elements"
	import { Fieldset, focusInputField, InstructionText } from "$lib/ui/forms"

	// do not show all moves if above this number
	const SHOW_ALL_THRESHOLD = 25

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
		const pp = $MovesStore.result?.find((it) => it.id === newMove)?.pp ?? 20
		const nextId = nextNewMoveId()

		values = [...values, LearnedMove.create({
			id: nextId,
			moveId: newMove,
			pp: pp,
		})]

		focusInputField(getMoveFieldName(nextId))
	}

	const addSpecificMove = (move: Move) => () => {
		const nextId = nextNewMoveId()

		values = [...values, LearnedMove.create({
			id: nextId,
			moveId: move.id,
			pp: move.pp,
		})]
	}

	let moveNameFilter = ""
	let moveTypeFilter = ""
	let movePowerFilter = ""
	$: moveFilter = new MoveFilter()
		.name(moveNameFilter)
		.type(moveTypeFilter)
		.power(movePowerFilter as Attribute)
	$: filteredMoves = ($MovesStore.result ?? []).filter(moveFilter.apply)
	$: learnableMoves = LearnableMoves.groupMoves(filteredMoves, species, level)

	$: showAllMoves = filteredMoves.length <= SHOW_ALL_THRESHOLD
</script>

<Fieldset title="{m.moves()}">
	{#if FeatureToggles.MoveCustomization.isActive()}
		<div>
			<p><strong>Known Moves</strong></p>
			{#if values.length === 0}
				<InstructionText>No known moves yet. Tap "Show Add Moves" below to reveal a list of moves you can learn. Use the "+" button to add the move!</InstructionText>
			{/if}
			<div class="move-list">
				{#each values as move (move.id)}
					<MoveEditor bind:value={move} {species} {disabled} onremove={removeMove(move.id)} {level} />
				{/each}
			</div>
		</div>
		<hr />
		<div>
			<Details title="Add Moves">
				<MoveSearchAndFilter
					idPrefix="moves-to-add"
					label={m.findMoveToAdd()}
					matches={filteredMoves.length}
					bind:nameFilter={moveNameFilter}
					bind:typeFilter={moveTypeFilter}
					bind:powerFilter={movePowerFilter}
					{disabled}
				/>
				{#each learnableMoves.nonemptyGroups() as group}
					{#if group.name !== LearnableMoves.groups.Other || showAllMoves}
						<div class="move-group">
							<p style:margin-top="1em"><strong>{group.name}</strong></p>
							<div class="move-list">
								{#each group.moves as move}
									{@const isAdded = values.map((it) => it.moveId).includes(move.id)}
									<div class="move-option" class:added={isAdded}>
										<MoveOption idPrefix="moves-to-add" value={move} useTmName={group.name === LearnableMoves.groups.TMs}>
											{#if isAdded}
												<Button variant="subtle" disabled>
													<span class="smaller">Added</span>
												</Button>
											{:else}
												<Button variant="success" on:click={addSpecificMove(move)}>
													<strong><span aria-hidden="true">+</span><VisuallyHidden inline>{m.add()}</VisuallyHidden></strong>
												</Button>
											{/if}
										</MoveOption>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</Details>
		</div>
	{:else}
		{#each values as move (move.id)}
			<MoveEditor bind:value={move} {species} {disabled} onremove={removeMove(move.id)} {level} />
			<hr />
		{/each}
		<Button on:click={addMove}>{m.addMove()}</Button>
	{/if}

</Fieldset>

<style>
	hr {
		grid-column: span 2;
		margin: 0.25em auto;
		background: none;
		border: none;
		border-block-end: 0.0625em dotted var(--skin-bg);
	}

	.move-group {
		margin-block-end: 1.75em;
	}

	.move-list {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.smaller { font-size: var(--font-sz-venus); }
</style>