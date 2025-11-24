<script lang="ts">
	import { WithSpecies } from "$lib/creatures/species"
	import Card from "$lib/design/Card.svelte"
	import { TypeTag } from "$lib/pokemon/types-2"
	import type { LearnedMove, PokemonId, TrainerPokemon } from "$lib/trainers/types"
	import type { TrainerStore } from "../trainers"
	import Info from "./Info.svelte"
	import RequirePokemon from "./RequirePokemon.svelte"
	import TrainerPokemonActions from "./TrainerPokemonActions.svelte"

	export let trainer: TrainerStore
	export let id: PokemonId

	$: canEdit = $trainer.update != null
	$: pokemon = $trainer.pokemon.find((it) => it.id === id)

	const onUpdateHealth = (e: CustomEvent<TrainerPokemon>) => {
		$trainer.update?.pokemon(e.detail, {
			optimistic: true,
		})
	}

	const onUpdatePp = (e: CustomEvent<LearnedMove>) => {
		$trainer.update?.move(e.detail, {
			optimistic: true,
		})
	}

	const onUpdateBond = (e: CustomEvent<TrainerPokemon>) => {
		$trainer.update?.pokemon(e.detail, {
			optimistic: true,
		})
	}
</script>

<RequirePokemon trainer={$trainer} {id}>
	<WithSpecies let:species ids={[pokemon?.pokemonId]}>
		<Card title={pokemon.nickname}>
			<TypeTag slot="header-extra" type={pokemon.type.data} />
			<Info trainer={$trainer.info} {pokemon} {species} editable={canEdit} on:update-health={onUpdateHealth} on:update-pp={onUpdatePp} on:update-bond={onUpdateBond} />
			{#if canEdit}
				<TrainerPokemonActions {trainer} {species} {pokemon} />
			{/if}
		</Card>
	</WithSpecies>
</RequirePokemon>
