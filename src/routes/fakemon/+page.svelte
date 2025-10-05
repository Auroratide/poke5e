<script lang="ts">
	import { browser } from "$app/environment"
	import { page } from "$app/stores"
	import Greatball from "$lib/design/icon/Greatball.svelte"
	import Loader from "$lib/design/Loader.svelte"
	import Page from "$lib/design/Page.svelte"
	import { MAIN_SEARCH_ID } from "$lib/design/SkipLinks.svelte"
	import Title from "$lib/design/Title.svelte"
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

	$: fakemonId = browser ? $page.url.searchParams.get("id") : undefined
	$: action = browser ? $page.url.searchParams.get("action") : undefined

	let list: Promise<undefined | FakemonListStore> | undefined
	let fakemon: Promise<undefined | SingleFakemonStore> | undefined

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
	<Greatball slot="icon" />
	<nav id="{MAIN_SEARCH_ID}" slot="side" class="table" aria-label="Fakémon List">
		{#await list}
			<Loader />
		{:then list}
			{#if list}
				<FakemonList fakemon={list} />
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
				<EditFakemonPage {fakemon} />
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
