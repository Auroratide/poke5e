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
	} from "$lib/fakemon/page"
	import { fakemonStore } from "$lib/fakemon/store"
	import type { SingleFakemonStore } from "$lib/fakemon/store/SingleFakemonStore"
	import ErrorMessage from "$lib/trainers/ErrorMessage.svelte"

	$: fakemonId = browser ? $page.url.searchParams.get("id") : undefined
	$: action = browser ? $page.url.searchParams.get("action") : undefined

	// let list: Promise<undefined | TrainerListStore> | undefined
	let fakemon: Promise<undefined | SingleFakemonStore> | undefined

	$: {
		if (fakemonId && browser) {
			// trainerList = undefined
			fakemon = fakemonStore.get(fakemonId)
		} else if (!fakemonId && browser) {
			// trainerList = trainers.all()
			fakemon = undefined
		} else {
			fakemon = undefined
			// trainerList = undefined
		}
	}
</script>

<Title value="Fakémon" />
<Page theme="red">
	<Greatball slot="icon" />
	<nav id="{MAIN_SEARCH_ID}" slot="side" class="table" aria-label="Fakémon List">
		<FakemonList />
	</nav>
	{#if fakemonId}
		{#await fakemon}
			<Loader />
		{:then fakemon}
			{#if !fakemon}
				<br />
			{:else if action === PageAction.edit}
				<EditFakemonPage {fakemon} />
			{:else}
				<InfoFakemonPage {fakemon} />
			{/if}
		{:catch error}
			<ErrorMessage error="{error}" />
		{/await}
	{:else}
		{#if action === PageAction.add}
			<AddFakemonPage />
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
