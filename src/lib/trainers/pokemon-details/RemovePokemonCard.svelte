<script lang="ts">
	import type { PokemonId } from "$lib/trainers/types"
	import { Card } from "$lib/ui/page"
	import { Button } from "$lib/ui/elements"
	import { ActionArea, Saveable } from "$lib/ui/forms"
	import type { TrainerStore } from "../trainers"
	import { goto } from "$app/navigation"
	import RequirePokemon from "./RequirePokemon.svelte"
	import { SpeciesPortrait } from "$lib/poke5e/species/media"
	import { WithSpecies } from "$lib/poke5e/species"
	import { Url } from "$lib/site/url"
	import { m } from "$lib/site/i18n"

	export let trainer: TrainerStore
	export let id: PokemonId
	
	$: canEdit = $trainer.update != null
	$: pokemon = $trainer.pokemon.find((it) => it.id === id)

	let saving = false
	const remove = () => {
		saving = true
		$trainer.update?.removeFromTeam(id).then(() => {
			goto(Url.trainers($trainer.info.readKey))
		}).catch(() => {
			saving = false
		})
	}
</script>

<RequirePokemon trainer={$trainer} {id} titlePrefix="Remove">
	<WithSpecies let:species ids={[pokemon?.pokemonId]}>
		<Card title="Remove {pokemon.nickname}?">
			{#if canEdit}
				<Saveable {saving}>
					<section>
						<p>Are you sure you want to remove {pokemon.nickname} from {$trainer.info.name}'s team?</p>
						<p>Removal is permanent and cannot be undone!</p>
						{#if species.media?.data.values.normalPortrait}
							<p class="centered greyscale">
								<SpeciesPortrait media={species.media} alt={species.data.name} />
							</p>
						{/if}
						<ActionArea>
							<Button href="{Url.trainers($trainer.info.readKey, pokemon.id)}" variant="ghost">{m.cancel()}</Button>
							<Button on:click={remove} variant="danger">{m.delete()}</Button>
						</ActionArea>
					</section>
				</Saveable>
			{:else}
				<section>
					<p>You do not have permission to remove this pokemon.</p>
					<ActionArea>
						<Button href="{Url.trainers($trainer.info.readKey, pokemon.id)}">Go Back</Button>
					</ActionArea>
				</section>
			{/if}
		</Card>
	</WithSpecies>
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