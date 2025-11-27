<script lang="ts">
	import type { PokemonId } from "$lib/trainers/types"
	import Card from "$lib/design/Card.svelte"
	import Button from "$lib/design/Button.svelte"
	import { ActionArea } from "$lib/ui/forms"
	import type { TrainerStore } from "../trainers"
	import { goto } from "$app/navigation"
	import Editor, { type UpdateDetail } from "./Editor.svelte"
	import { Url } from "$lib/url"
	import RequirePokemon from "./RequirePokemon.svelte"
	import WithSpecies from "$lib/creatures/species/WithSpecies.svelte"

	export let trainer: TrainerStore
	export let id: PokemonId
	
	$: canEdit = $trainer.update != null
	$: pokemon = $trainer.pokemon.find((it) => it.id === id)

	let saving = false
	const update = (e: CustomEvent<UpdateDetail>) => {
		saving = true
		$trainer.update?.pokemon(e.detail.pokemon, {
			updateAvatar: e.detail.updateAvatar,
		}).then(() => {
			return Promise.all([
				$trainer.update?.moveset(e.detail.pokemon) ?? Promise.resolve(),
				$trainer.update?.heldItems(e.detail.pokemon) ?? Promise.resolve(),
				$trainer.update?.pokemonFeats(e.detail.pokemon) ?? Promise.resolve(),
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
	<WithSpecies let:species ids={[pokemon?.pokemonId]}>
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
	</WithSpecies>
</RequirePokemon>