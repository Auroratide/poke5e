<script lang="ts">
	import { goto } from "$app/navigation";
	import { LevelUp, LevelUpTrainer } from "$lib/poke5e/level-up";
	import { PokemonLevelTable } from "$lib/poke5e/level-up/PokemonLevelTable";
	import { PokemonSpecies } from "$lib/poke5e/species";
	import { m } from "$lib/site/i18n";
	import { Url } from "$lib/site/url";
	import { Button } from "$lib/ui/elements";
	import { ActionArea, Saveable } from "$lib/ui/forms";
	import { Title } from "$lib/ui/layout";
	import { Card } from "$lib/ui/page";
	import type { TrainerStore } from "../trainers";
	import type { TrainerPokemon } from "../types";

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

	const template = $derived(PokemonLevelTable.toLevel(pokemon.level.next())(pokemon, species))

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

<Title value="Level Up Pokemon" />
<Card title="Level Up yay pokemon!">
	{#if canEdit}
		<Saveable {saving}>
			<section>
				<p>Congratulations yay!</p>
			</section>
			<LevelUpTrainer trainer={$trainer.info} effects={template} />
			<ActionArea>
				<Button href={Url.trainers($trainer.info.readKey, pokemon.id)} variant="subtle">{m.back()}</Button>
				<Button on:click={applyLevelUp}>Confirm</Button>
			</ActionArea>
		</Saveable>
	{:else}
		<section>
			<p>You do not have permission to level up this pokémon.</p>
		</section>
		<ActionArea>
			<Button href={Url.trainers($trainer.info.readKey)} variant="subtle">{m.back()}</Button>
		</ActionArea>
	{/if}
</Card>
