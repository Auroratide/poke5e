<script lang="ts">
	import { goto } from "$app/navigation"
	import { Button } from "$lib/ui/elements"
	import Card from "$lib/design/Card.svelte"
	import { ActionArea } from "$lib/ui/forms"
	import { Title } from "$lib/ui/layout"
	import { Url } from "$lib/url"
	import type { Readable } from "svelte/store"
	import type { SingleFakemonStore } from "../store/SingleFakemonStore"
	import FakemonEditor, { type SubmitDetail } from "./FakemonEditor.svelte"
	import type { PokemonSpecies } from "$lib/creatures/species"
	import { EvolutionStore, type EvolutionUpdate } from "$lib/pokemon/evolution"
	import { fakemonStore } from "../store"
	import { Loader } from "$lib/ui/elements"
	import { error } from "$lib/design/errors/store"

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

		const originalEvolutions = $allEvolutions?.allEvolutions($fakemon.value.species.id)

		const upsertedEvolutions: EvolutionUpdate[] = e.detail.evolutions.map((evolution) => {
			const originalEvolution = originalEvolutions.find((it) => it.id === evolution.id)

			return {
				type: "upsert",
				evolution,
				writeKeys: {
					from: evolution.from.isFakemon() ? fakemonStore.getWriteKey(evolution.from.toFakemonReadKey()) : undefined,
					to:evolution.to.isFakemon() ? fakemonStore.getWriteKey(evolution.to.toFakemonReadKey()) : undefined,
				},
				originalKeys: originalEvolution != null ? {
					from: originalEvolution.from.isFakemon() ? fakemonStore.getWriteKey(originalEvolution.from.toFakemonReadKey()) : undefined,
					to: originalEvolution.to.isFakemon() ? fakemonStore.getWriteKey(originalEvolution.to.toFakemonReadKey()) : undefined,
				} : undefined,
			}
		})

		const removedEvolutions: EvolutionUpdate[] = originalEvolutions.filter((original) => !e.detail.evolutions.find((it) => it.id === original.id)).map((evolution) => ({
			type: "remove",
			evolution,
			writeKeys: {
				from: evolution.from.isFakemon() ? fakemonStore.getWriteKey(evolution.from.toFakemonReadKey()) : undefined,
				to: evolution.to.isFakemon() ? fakemonStore.getWriteKey(evolution.to.toFakemonReadKey()) : undefined,
			},
		})) ?? []

		$fakemon.update?.info(e.detail.fakemon, {
			media: e.detail.newMedia,
		}).then(() => {
			return EvolutionStore.update(upsertedEvolutions.concat(removedEvolutions))
		}).then(() => {
			goto(Url.fakemon($fakemon.value.data.readKey))
		}).catch((e: Error) => {
			error.show(e.message)
			saving = false
		})
	}
</script>

<Title value="Edit {$fakemon.value.data.species.name}" />
<Card title="Edit {$fakemon.value.data.species.name}">
	{#if canEdit}
		{#if $allEvolutions == null}
			<Loader caption="Loading details" />
		{:else}
			<FakemonEditor fakemon={$fakemon.value} on:submit={onSubmit} on:cancel={onCancel} {saving} allSpecies={$allSpecies} allEvolutions={$allEvolutions} />
		{/if}
	{:else}
		<section>
			<p>You do not have permission to edit this fakémon.</p>
			<ActionArea>
				<Button href="{Url.fakemon($fakemon.value.data.readKey)}">Go Back</Button>
			</ActionArea>
		</section>
	{/if}
</Card>