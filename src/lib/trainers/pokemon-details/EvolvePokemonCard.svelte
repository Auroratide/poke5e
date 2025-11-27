<script lang="ts">
	import type { PokemonId, TrainerPokemon } from "$lib/trainers/types"
	import Card from "$lib/design/Card.svelte"
	import { Button } from "$lib/ui/elements"
	import { ActionArea } from "$lib/ui/forms"
	import type { TrainerStore } from "../trainers"
	import { goto } from "$app/navigation"
	import { Url } from "$lib/url"
	import RequirePokemon from "./RequirePokemon.svelte"
	import type { Readable } from "svelte/store"
	import { type PokemonSpecies, WithSpecies } from "$lib/creatures/species"
	import { EvolutionStore, EvolveForm } from "$lib/pokemon/evolution"

	const evolutions = EvolutionStore.all()

	export let trainer: TrainerStore
	export let id: PokemonId
	export let allSpecies: Readable<PokemonSpecies[]>
	
	$: canEdit = $trainer.update != null
	$: pokemon = $trainer.pokemon.find((it) => it.id === id)

	let saving = false
	const update = (e: CustomEvent<TrainerPokemon>) => {
		saving = true
		$trainer.update?.pokemon(e.detail).then(() => {
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

<RequirePokemon trainer={$trainer} {id} titlePrefix="Evolve">
	<WithSpecies let:species ids={[pokemon?.pokemonId]}>
		<Card title="Evolve {pokemon.nickname}">
			{#if canEdit}
				<EvolveForm {pokemon} {species} {allSpecies} evolutions={evolutions} {saving} on:cancel={cancel} on:submit={update} />
			{:else}
				<section>
					<p>You do not have permission to evolve this pokemon.</p>
					<ActionArea>
						<Button href="{Url.trainers($trainer.info.readKey, id)}">Go Back</Button>
					</ActionArea>
				</section>
			{/if}
		</Card>
	</WithSpecies>
</RequirePokemon>
