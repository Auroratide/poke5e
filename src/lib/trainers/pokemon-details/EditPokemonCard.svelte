<script lang="ts">
	import type { PokemonId, TrainerPokemon } from "$lib/trainers/types"
	import { pokemon as pokeData } from "$lib/creatures/store"
	import Loader from "$lib/design/Loader.svelte"
	import Card from "$lib/design/Card.svelte"
	import Button from "$lib/design/Button.svelte"
	import { ActionArea } from "$lib/design/forms"
	import type { TrainerStore } from "../trainers"
	import { goto } from "$app/navigation"
	import Editor from "./Editor.svelte"
	import { Url } from "$lib/url"
	import RequirePokemon from "./RequirePokemon.svelte"

	export let trainer: TrainerStore
	export let id: PokemonId
	
	$: canEdit = $trainer.update != null
	$: pokemon = $trainer.pokemon.find((it) => it.id === id)
	$: species = $pokeData?.find((it) => it.id === pokemon?.pokemonId)

	let saving = false
	const update = (e: CustomEvent<TrainerPokemon>) => {
		saving = true
		$trainer.update?.pokemon(e.detail).then(() => {
			return Promise.all([
				$trainer.update?.moveset(e.detail) ?? Promise.resolve(),
				$trainer.update?.heldItems(e.detail) ?? Promise.resolve(),
				$trainer.update?.pokemonFeats(e.detail) ?? Promise.resolve(),
			])
		}).then(() => {
			saving = false
			goto(Url.trainers($trainer.info.readKey, id))
		}).catch(() => {
			saving = false
		})
	}
	const cancel = () => {
		goto(Url.trainers($trainer.info.readKey, id))
	}
</script>

<RequirePokemon trainer={$trainer} {id} titlePrefix="Edit">
	{#if species}
		<Card title="Edit {pokemon.nickname}">
			{#if canEdit}
				<Editor {pokemon} {species} {saving} on:cancel={cancel} on:update={update} />
			{:else}
				<section>
					<p>You do not have permission to edit this pokemon.</p>
					<ActionArea>
						<Button href="{Url.trainers($trainer.info.readKey, id)}">Go Back</Button>
					</ActionArea>
				</section>
			{/if}
		</Card>
	{:else}
		<Loader />
	{/if}
</RequirePokemon>