<script lang="ts" context="module">
	export type SearchFakemonByIdDetail = {
		value: Fakemon,
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { get } from "svelte/store"
	import { TextField, WithButton } from "$lib/ui/forms"
	import { SpeciesIdentifier } from "$lib/poke5e/species"
	import { fakemonStore } from "../store"
	import type { Fakemon } from "../Fakemon"

	const dispatch = createEventDispatcher()

	let id = ""
	$: id = id.toLocaleUpperCase().replace(/[^a-zA-Z0-9.]/g, "")

	let couldNotFind = ""

	let searching = false

	const onSubmit = () => {
		const identifier = new SpeciesIdentifier(id)
		if (!identifier.isFakemon()) {
			couldNotFind = id
			return
		}

		searching = true
		fakemonStore.get(identifier.toFakemonReadKey()).then((fakemon) => {
			if (fakemon) {
				searching = false
				couldNotFind = ""
				dispatch("found", {
					value: get(fakemon).value,
				})
			} else {
				searching = false
				couldNotFind = id
			}
		})
	}
</script>

<form on:submit|preventDefault={onSubmit} class="vertical spaced-lg">
	<WithButton label="Search" type="submit">
		<TextField label="Fakémon ID" bind:value={id} maxlength={15} placeholder="e.g. F.H4PF8E2GZA0A" disabled={searching} required />
	</WithButton>
	{#if couldNotFind.length > 0 && couldNotFind === id}
		<p class="font-sm error">No fakémon is registered with this id</p>
	{/if}
</form>

<style>
	.spaced-lg {
		margin-bottom: 1em;
	}

	.font-sm {
		font-size: 1rem;
	}

	.error {
		font-style: italic;
		color: var(--skin-danger-text);
	}

	.vertical {
		display: flex;
		flex-direction: column;
	}
</style>
