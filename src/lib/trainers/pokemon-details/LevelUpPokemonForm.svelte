<script lang="ts">
	import { goto } from "$app/navigation"
	import { LevelUp, LevelUpForm } from "$lib/poke5e/level-up"
	import { PokemonLevelTable } from "$lib/poke5e/level-up/PokemonLevelTable"
	import { PokemonSpecies } from "$lib/poke5e/species"
	import { EvolutionStore } from "$lib/pokemon/evolution"
	import { m } from "$lib/site/i18n"
	import { Url } from "$lib/site/url"
	import { Button } from "$lib/ui/elements"
	import { ActionArea } from "$lib/ui/forms"
	import { Title } from "$lib/ui/layout"
	import { Card } from "$lib/ui/page"
	import type { TrainerStore } from "../trainers"
	import type { TrainerPokemon } from "../types"

	let {
		pokemon,
		species,
		trainer,
	}: {
		pokemon: TrainerPokemon,
		species: PokemonSpecies,
		trainer: TrainerStore
	} = $props()

	let canEdit = $derived($trainer.update != null)
	let evolutions = $derived(EvolutionStore.get(species.id))

	const template = $derived(PokemonLevelTable.toLevel(pokemon.level.next())(pokemon, species, $evolutions))

	let saving = $state(false)
	const applyLevelUp = async () => {
		saving = true
		const updatedPokemon = LevelUp.apply(pokemon, template)
		await $trainer.update?.pokemon(updatedPokemon).then(() => {
			goto(Url.trainers($trainer.info.readKey, pokemon.id))
		}).catch(() => {
			saving = false
		})
	}
</script>

<Title value={m.levelUp()} />
<Card title={m.levelUpName({ name: pokemon.nickname ?? species.name })}>
	{#if canEdit}
		<LevelUpForm {saving} backHref={Url.trainers($trainer.info.readKey, pokemon.id)} effects={template} onsubmit={applyLevelUp} />
	{:else}
		<section>
			<p>{m.noLevelUpPermission()}</p>
		</section>
		<ActionArea>
			<Button href={Url.trainers($trainer.info.readKey)} variant="subtle">{m.back()}</Button>
		</ActionArea>
	{/if}
</Card>
