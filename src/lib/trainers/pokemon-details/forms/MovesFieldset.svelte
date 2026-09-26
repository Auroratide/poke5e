<script lang="ts">
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { Button, Details, VisuallyHidden } from "$lib/ui/elements"
	import { Fieldset, focusInputField } from "$lib/ui/forms"
	import MoveEditor, { getMoveFieldName } from "$lib/moves/MoveEditor.svelte"
	import { MovesStore } from "$lib/moves/store"
	import type { Level } from "$lib/dnd/level"
	import { m } from "$lib/site/i18n"
	import { LearnableMoves } from "$lib/moves/LearnableMoves"
	import { MoveOption } from "$lib/pokemon/move-pool"
	import { FeatureToggles } from "$lib/site/FeatureToggles"
	import type { Move } from "$lib/moves/Move"
	import type { LearnedMove } from "$lib/moves/learned"

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

	const addSpecificMove = (move: Move) => () => {
		const nextId = nextNewMoveId()

		values = [...values, {
			id: nextId,
			moveId: move.id,
			pp: {
				current: move.pp,
				max: move.pp,
			},
			notes: "",
		} ]
	}

	$: learnableMoves = LearnableMoves.groupMoves($MovesStore.result ?? [], species, level)
</script>

<Fieldset title="{m.moves()}">
	{#if FeatureToggles.MoveCustomization()}
		<div>
			<p><strong>Known Moves</strong></p>
			<div class="move-list">
				{#each values as move (move.id)}
						<MoveEditor value={move} {species} {disabled} onremove={removeMove(move.id)} {level} />
				{/each}
			</div>
		</div>
		<hr />
		<div>
			<Details title="Add Moves">
				{#each learnableMoves.nonemptyGroups() as group}
					{#if group.name !== LearnableMoves.groups.Other}
						<div class="move-group">
							<p style:margin-top="1em"><strong>{group.name}</strong></p>
							<div class="move-list">
								{#each group.moves as move}
									{#if !values.map((it) => it.moveId).includes(move.id)}
										<MoveOption idPrefix="whatwhat" value={move} useTmName={group.name === LearnableMoves.groups.TMs}>
											<Button variant="success" on:click={addSpecificMove(move)}>
												<strong><span aria-hidden="true">+</span><VisuallyHidden inline>{m.add()}</VisuallyHidden></strong>
											</Button>
										</MoveOption>
									{/if}
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</Details>
		</div>
	{:else}
		{#each values as move (move.id)}
			<MoveEditor value={move} {species} {disabled} onremove={removeMove(move.id)} {level} />
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
</style>