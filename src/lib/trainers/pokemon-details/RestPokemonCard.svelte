<script lang="ts">
	import type { PokemonId, TrainerPokemon } from "$lib/trainers/types"
	import Card from "$lib/design/Card.svelte"
	import Button from "$lib/design/Button.svelte"
	import { ActionArea } from "$lib/design/forms"
	import type { TrainerStore } from "../trainers"
	import { goto } from "$app/navigation"
	import { Url } from "$lib/url"
	import RequirePokemon from "./RequirePokemon.svelte"
	import { Rester } from "$lib/poke5e/resting"

	export let trainer: TrainerStore
	export let id: PokemonId
	
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

<RequirePokemon trainer={$trainer} {id} titlePrefix="Rest">
	<Card title="Rest {pokemon.nickname}">
		{#if canEdit}
			<Rester {pokemon} {saving} on:cancel={cancel} on:submit={update} />
		{:else}
			<section>
				<p>You do not have permission to edit this pokemon.</p>
				<ActionArea>
					<Button href="{Url.trainers($trainer.info.readKey, id)}">Go Back</Button>
				</ActionArea>
			</section>
		{/if}
	</Card>
</RequirePokemon>
