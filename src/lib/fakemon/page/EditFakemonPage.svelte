<script lang="ts">
	import { goto } from "$app/navigation"
	import Button from "$lib/design/Button.svelte"
	import Card from "$lib/design/Card.svelte"
	import { ActionArea } from "$lib/design/forms"
	import Title from "$lib/design/Title.svelte"
	import { Url } from "$lib/url"
	import type { Readable } from "svelte/store"
	import type { SingleFakemonStore } from "../store/SingleFakemonStore"
	import FakemonEditor, { type SubmitDetail } from "./FakemonEditor.svelte"
	import type { PokemonSpecies } from "$lib/creatures/species"
	import { EvolutionStore } from "$lib/pokemon/evolution"
	import { fakemonStore } from "../store"

	export let fakemon: SingleFakemonStore
	export let allSpecies: Readable<PokemonSpecies[]>
	$: allEvolutions = EvolutionStore.get($fakemon.value.species.id)

	$: canEdit = $fakemon.update != null

	let saving = false

	const onCancel = () => {
		goto(Url.fakemon($fakemon.value.data.readKey))
	}

	const onSubmit = (e: CustomEvent<SubmitDetail>) => {
		saving = true

		e.detail.evolutions.forEach((it) => {
			console.log("wanting to updae", it)
		})

		EvolutionStore.update(e.detail.evolutions.map((evolution) => ({
			type: "upsert",
			evolution,
			writeKeys: {
				from: fakemonStore.getWriteKey(evolution.from.toFakemonReadKey()),
				to: fakemonStore.getWriteKey(evolution.to.toFakemonReadKey()),
			},
		}))).then(() => {
			$fakemon.update?.info(e.detail.fakemon, {
				media: e.detail.newMedia,
			}).then(() => {
				goto(Url.fakemon($fakemon.value.data.readKey))
			}).catch(() => {
				saving = false
			})
		})

	}
</script>

<Title value="Edit {$fakemon.value.data.species.name}" />
<Card title="Edit {$fakemon.value.data.species.name}">
	{#if canEdit}
		<FakemonEditor fakemon={$fakemon.value} on:submit={onSubmit} on:cancel={onCancel} {saving} allSpecies={$allSpecies} allEvolutions={$allEvolutions} />
	{:else}
		<section>
			<p>You do not have permission to edit this fakémon.</p>
			<ActionArea>
				<Button href="{Url.fakemon($fakemon.value.data.readKey)}">Go Back</Button>
			</ActionArea>
		</section>
	{/if}
</Card>