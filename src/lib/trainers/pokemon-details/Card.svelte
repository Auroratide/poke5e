<script lang="ts">
	import type { LearnedMove, PokemonId, TrainerPokemon } from "$lib/trainers/types"
	import { pokemon as pokeData } from "$lib/creatures/store"
	import Loader from "$lib/design/Loader.svelte"
	import Info from "./Info.svelte"
	import Card from "$lib/design/Card.svelte"
	import Button from "$lib/design/Button.svelte"
	import { ActionArea } from "$lib/design/forms"
	import TypeTag from "$lib/pokemon/TypeTag.svelte"
	import type { TrainerStore } from "../trainers"
	import { PageAction } from "../page-action"
	import { Url } from "$lib/url"
	import RequirePokemon from "./RequirePokemon.svelte"

	export let trainer: TrainerStore
	export let id: PokemonId

	$: canEdit = $trainer.update != null
	$: pokemon = $trainer.pokemon.find((it) => it.id === id)
	$: species = $pokeData?.find((it) => it.id === pokemon?.pokemonId)

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
</script>

<RequirePokemon trainer={$trainer} {id}>
	{#if species}
		<Card title={pokemon.nickname}>
			<TypeTag slot="header-extra" type={pokemon.type} />
			<Info {pokemon} {species} editable={canEdit} on:update-health={onUpdateHealth} on:update-pp={onUpdatePp} />
			{#if canEdit}
				<ActionArea>
					<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.removePokemon)}" variant="ghost">Remove</Button>
					{#if species.evolution?.to?.length > 0}
						<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.evolvePokemon)}" variant="ghost">Evolve</Button>
					{/if}
					<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.editPokemon)}">Edit</Button>
				</ActionArea>
			{/if}
		</Card>
	{:else}
		<Loader />
	{/if}
</RequirePokemon>
