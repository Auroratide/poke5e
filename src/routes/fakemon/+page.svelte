<script lang="ts">
	import { browser } from "$app/environment"
	import { page } from "$app/state"
	import { GreatballIcon } from "$lib/ui/icons"
	import { Loader } from "$lib/ui/elements"
	import { Page } from "$lib/ui/layout"
	import { MAIN_SEARCH_ID } from "$lib/ui/layout/SkipLinks.svelte"
	import { Title } from "$lib/ui/layout"
	import {
		AddFakemonPage,
		EditFakemonPage,
		FakemonList,
		PageAction,
		InfoFakemonPage,
		FindFakemonPage,
		AccessKeyPage,
		RemoveFakemonPage,
	} from "$lib/fakemon/page"
	import {
		fakemonStore,
		type SingleFakemonStore,
		type FakemonListStore,
	} from "$lib/fakemon/store"
	import ErrorMessage from "$lib/trainers/ErrorMessage.svelte"
	import { CanCreateCustomPokemonBanner } from "$lib/poke5e/species/CanCreateCustomPokemonBanner"
	import { onMount } from "svelte"
	import { type Readable } from "svelte/store"
	import { SpeciesStore, type PokemonSpecies } from "$lib/poke5e/species"
	import { MaintenanceAnnouncement, MaintenanceOverlay } from "$lib/site/maintenance"

	let fakemonId = $derived(browser ? page.url.searchParams.get("id") : undefined)
	let action = $derived(browser ? page.url.searchParams.get("action") : undefined)

	let fakemon = $state<Promise<undefined | SingleFakemonStore> | undefined>(undefined)
	let allSpecies = $state<Promise<Readable<PokemonSpecies[]>> | undefined>(browser ? SpeciesStore.completeList() : undefined)

	let list = $state<FakemonListStore | undefined>(undefined)
	let listLoading = $state(true)
	let listError = $state<Error | string | undefined>(undefined)

	const refreshList = () => {
		fakemonStore.all().then((it) => {
			list = it
			listError = undefined
		}).catch((error) => {
			listError = error
		}).finally(() => {
			listLoading = false
		})
	}

	$effect(() => {
		console.log("effect")
		if (fakemonId && browser) {
			refreshList()
			fakemon = fakemonStore.get(fakemonId)
		} else if (!fakemonId && browser) {
			refreshList()
			fakemon = undefined
		} else {
			fakemon = undefined
			list = undefined
			listLoading = true
			listError = undefined
		}
	})

	onMount(() => {
		CanCreateCustomPokemonBanner.set(true)
	})
</script>

<Title value="Fakémon" />
<MaintenanceOverlay>
	<Page theme="pink">
		<GreatballIcon slot="icon" />
		<nav id="{MAIN_SEARCH_ID}" slot="side" class="table" aria-label="Fakémon List">
			<MaintenanceAnnouncement />
			{#if list}
				<FakemonList fakemon={list} showGetStarted={action == null} />
			{:else}
				{#if listLoading}
					<Loader />
				{:else if listError}
					<ErrorMessage error={listError} action="Loading Fakemon List" />
				{/if}
			{/if}
		</nav>
		{#if fakemonId}
			{#await fakemon}
				<Loader />
			{:then fakemon}
				{#if !fakemon}
					<br />
				{:else if action === PageAction.edit}
					{#await allSpecies}
						<Loader />
					{:then allSpecies}
						{#if allSpecies}
							<EditFakemonPage {fakemon} {allSpecies} />
						{/if}
					{/await}
				{:else if action === PageAction.accessKey}
					<AccessKeyPage {fakemon} />
				{:else if action === PageAction.remove}
					<RemoveFakemonPage {fakemon} />
				{:else}
					<InfoFakemonPage {fakemon} />
				{/if}
			{:catch error}
				<ErrorMessage error={error} action="Loading Fakemon {fakemonId}" />
			{/await}
		{:else}
			{#if action === PageAction.add}
				<AddFakemonPage />
			{:else if action === PageAction.find}
				<FindFakemonPage />
			{:else}
				<Title value="Fakémon" />
			{/if}
		{/if}
	</Page>
</MaintenanceOverlay>

<style>
	nav {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
