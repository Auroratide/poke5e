<script lang="ts">
	import { browser } from "$app/environment"
	import { page } from "$app/stores"
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
	import { CanCreateCustomPokemonBanner } from "$lib/creatures/species/CanCreateCustomPokemonBanner"
	import { onMount } from "svelte"
	import { type Readable } from "svelte/store"
	import { SpeciesStore, type PokemonSpecies } from "$lib/creatures/species"

	$: fakemonId = browser ? $page.url.searchParams.get("id") : undefined
	$: action = browser ? $page.url.searchParams.get("action") : undefined

	let list: Promise<undefined | FakemonListStore> | undefined
	let fakemon: Promise<undefined | SingleFakemonStore> | undefined
	let allSpecies: Promise<Readable<PokemonSpecies[]>> = browser ? SpeciesStore.completeList() : undefined

	$: {
		if (fakemonId && browser) {
			list = fakemonStore.all()
			fakemon = fakemonStore.get(fakemonId)
		} else if (!fakemonId && browser) {
			list = fakemonStore.all()
			fakemon = undefined
		} else {
			fakemon = undefined
			list = undefined
		}
	}

	onMount(() => {
		CanCreateCustomPokemonBanner.set(true)
	})
</script>

<Title value="Fakémon" />
<Page theme="pink">
	<GreatballIcon slot="icon" />
	<nav id="{MAIN_SEARCH_ID}" slot="side" class="table" aria-label="Fakémon List">
		{#await list}
			<Loader />
		{:then list}
			{#if list}
				<FakemonList fakemon={list} showGetStarted={action == null} />
			{/if}
		{:catch error}
			<ErrorMessage error="{error}" />
		{/await}
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
					<EditFakemonPage {fakemon} {allSpecies} />
				{/await}
			{:else if action === PageAction.accessKey}
				<AccessKeyPage {fakemon} />
			{:else if action === PageAction.remove}
				<RemoveFakemonPage {fakemon} />
			{:else}
				<InfoFakemonPage {fakemon} />
			{/if}
		{:catch error}
			<ErrorMessage error="{error}" />
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

<style>
	nav {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
