<script lang="ts">
	import Card from "$lib/design/Card.svelte"
	import Button from "$lib/design/Button.svelte"
	import { ActionArea } from "$lib/ui/forms"
	import type { TrainerStore } from "../trainers"
	import { Url } from "$lib/url"
	import { TrainerRester, type TrainerResterSubmit } from "$lib/poke5e/resting"
	import Title from "$lib/design/Title.svelte"
	import { goto } from "$app/navigation"
	import type { Readable } from "svelte/store"
	import type { PokemonSpecies } from "$lib/creatures/species"

	export let trainer: TrainerStore
	export let allSpecies: Readable<PokemonSpecies[]>
	
	$: canEdit = $trainer.update != null

	let saving = false
	const update = (e: CustomEvent<TrainerResterSubmit>) => {
		saving = true
		const updates = [$trainer.update?.info(e.detail.trainer.info)]
		if (e.detail.didUpdatePokemon) {
			updates.push(...e.detail.trainer.pokemon.map((pokemon) =>
				$trainer.update?.pokemon(pokemon),
			))

			updates.push(...e.detail.trainer.pokemon.map((pokemon) =>
				$trainer.update?.moveset(pokemon),
			))
		}

		Promise.all(updates).then(() => {
			saving = false
			goto(Url.trainers($trainer.info.readKey))
		}).catch(() => {
			saving = false
		})
	}

	const cancel = () => {
		goto(Url.trainers($trainer.info.readKey))
	}
</script>

<Title value="Rest {$trainer.info.name}" />
<Card title="Rest {$trainer.info.name}">
	{#if canEdit}
		<TrainerRester trainer={$trainer} {allSpecies} {saving} on:cancel={cancel} on:submit={update} />
	{:else}
		<section>
			<p>You do not have permission to edit this trainer.</p>
			<ActionArea>
				<Button href="{Url.trainers($trainer.info.readKey)}">Go Back</Button>
			</ActionArea>
		</section>
	{/if}
</Card>
