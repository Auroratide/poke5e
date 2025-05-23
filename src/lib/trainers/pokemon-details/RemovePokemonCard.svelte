<script lang="ts">
	import type { PokemonId } from "$lib/trainers/types"
	import { pokemon as pokeData } from "$lib/creatures/store"
	import Loader from "$lib/design/Loader.svelte"
	import Card from "$lib/design/Card.svelte"
	import Button from "$lib/design/Button.svelte"
	import { ActionArea } from "$lib/design/forms"
	import type { TrainerStore } from "../trainers"
	import { base } from "$app/paths"
	import Saveable from "$lib/design/Saveable.svelte"
	import { goto } from "$app/navigation"
	import RequirePokemon from "./RequirePokemon.svelte"
	import PokemonArt from "$lib/creatures/PokemonArt.svelte"

	export let trainer: TrainerStore
	export let id: PokemonId
	
	$: canEdit = $trainer.update != null
	$: pokemon = $trainer.pokemon.find((it) => it.id === id)
	$: species = $pokeData?.find((it) => it.id === pokemon?.pokemonId)

	let saving = false
	const remove = () => {
		saving = true
		$trainer.update?.removeFromTeam(id).then(() => {
			goto(`${base}/trainers?id=${$trainer.info.readKey}`)
		}).catch(() => {
			saving = false
		})
	}
</script>

<RequirePokemon trainer={$trainer} {id} titlePrefix="Remove">
	{#if species}
		<Card title="Remove {pokemon.nickname}?">
			{#if canEdit}
					<Saveable {saving}>
						<section>
							<p>Are you sure you want to remove {pokemon.nickname} from {$trainer.info.name}'s team?</p>
							<p>Removal is permanent and cannot be undone!</p>
							{#if species.media?.main}
									<p class="centered greyscale">
										<PokemonArt media={species.media} alt={species.name} />
									</p>
							{/if}
							<ActionArea>
									<Button href="{base}/trainers?id={$trainer.info.readKey}&pokemon={pokemon.id}" variant="ghost">Cancel</Button>
									<Button on:click={remove} variant="danger">Delete</Button>
							</ActionArea>
						</section>
					</Saveable>
			{:else}
					<section>
						<p>You do not have permission to remove this pokemon.</p>
						<ActionArea>
							<Button href="{base}/trainers?id={$trainer.info.readKey}&pokemon={pokemon.id}">Go Back</Button>
						</ActionArea>
					</section>
			{/if}
		</Card>
	{:else}
		<Loader />
	{/if}
</RequirePokemon>

<style>
	.centered {
		text-align: center;
		max-width: 10rem;
		margin: auto;
	}

	.greyscale {
		filter: grayscale()
	}
</style>