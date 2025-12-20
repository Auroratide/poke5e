<script lang="ts">
	import type { PokemonId, TrainerPokemon } from "$lib/trainers/types"
	import { Card } from "$lib/ui/page"
	import { Button } from "$lib/ui/elements"
	import { ActionArea } from "$lib/ui/forms"
	import type { TrainerStore } from "../trainers"
	import { goto } from "$app/navigation"
	import { Url } from "$lib/site/url"
	import RequirePokemon from "./RequirePokemon.svelte"
	import { Rester } from "$lib/poke5e/resting"
	import { WithSpecies } from "$lib/poke5e/species"

	export let trainer: TrainerStore
	export let id: PokemonId
	
	$: canEdit = $trainer.update != null
	$: pokemon = $trainer.pokemon.find((it) => it.id === id)

	let saving = false
	const update = (e: CustomEvent<TrainerPokemon>) => {
		saving = true
		Promise.all([
			$trainer.update?.pokemon(e.detail),
			$trainer.update?.moveset(e.detail),
		]).then(() => {
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

<RequirePokemon trainer={$trainer} {id} titlePrefix="Rest">
	<WithSpecies let:species ids={[pokemon?.pokemonId]}>
		<Card title="Rest {pokemon.nickname}">
			{#if canEdit}
				<Rester {pokemon} {species} {saving} on:cancel={cancel} on:submit={update} />
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
