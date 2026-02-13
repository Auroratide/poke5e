<script lang="ts">
	import { page } from "$app/stores"
	import { browser } from "$app/environment"
	import { replaceState } from "$app/navigation"
	import { Page } from "$lib/ui/layout"
	import { IdBadgeIcon } from "$lib/ui/icons"
	import { Title } from "$lib/ui/layout"
	import { Loader } from "$lib/ui/elements"
	import TrainerCard from "$lib/trainers/trainer-details/Card.svelte"
	import PokemonCard from "$lib/trainers/pokemon-details/Card.svelte"
	import TrainerRoster from "$lib/trainers/trainer-details/Roster.svelte"
	import { trainers, type TrainerListStore, type TrainerStore } from "$lib/trainers/trainers"
	import { PageAction } from "$lib/trainers/page-action"
	import AddPokemonCard from "$lib/trainers/AddPokemonCard.svelte"
	import TrainerList from "$lib/trainers/TrainerList.svelte"
	import NewTrainerCard from "$lib/trainers/NewTrainerCard.svelte"
	import RemovePokemonCard from "$lib/trainers/pokemon-details/RemovePokemonCard.svelte"
	import EditPokemonCard from "$lib/trainers/pokemon-details/EditPokemonCard.svelte"
	import EvolvePokemonCard from "$lib/trainers/pokemon-details/EvolvePokemonCard.svelte"
	import NoTrainer from "$lib/trainers/trainer-details/NoTrainer.svelte"
	import FindTrainerCard from "$lib/trainers/FindTrainerCard.svelte"
	import EditTrainerCard from "$lib/trainers/trainer-details/EditTrainerCard.svelte"
	import DeleteTrainerCard from "$lib/trainers/trainer-details/DeleteTrainerCard.svelte"
	import AccessKeyCard from "$lib/trainers/trainer-details/AccessKeyCard.svelte"
	import RemoveTrainerCard from "$lib/trainers/trainer-details/RemoveTrainerCard.svelte"
	import { MAIN_SEARCH_ID } from "$lib/ui/layout/SkipLinks.svelte"
	import JavascriptRequired from "$lib/trainers/JavascriptRequired.svelte"
	import ErrorMessage from "$lib/trainers/ErrorMessage.svelte"
	import RestPokemonCard from "$lib/trainers/pokemon-details/RestPokemonCard.svelte"
	import RestTrainerCard from "$lib/trainers/trainer-details/RestTrainerCard.svelte"
	import type { Readable } from "svelte/store"
	import { SpeciesStore, type PokemonSpecies } from "$lib/poke5e/species"

	$: trainerId = browser ? $page.url.searchParams.get("id") : undefined
	$: accessKey = browser ? $page.url.searchParams.get("access_key") : undefined
	$: pokemonId = browser ? $page.url.searchParams.get("pokemon") : undefined
	$: action = browser ? $page.url.searchParams.get("action") : undefined

	let trainerList: Promise<undefined | TrainerListStore> | undefined
	let trainer: Promise<undefined | TrainerStore> | undefined
	let allSpecies: Promise<Readable<PokemonSpecies[]>> = browser ? SpeciesStore.completeList() : undefined
	
	$: {
		if (trainerId && browser) {
			trainerList = undefined
			trainer = trainers.get(trainerId)
			if (accessKey) {
				accessKey = accessKey.toLocaleUpperCase().replace(/[^a-zA-Z0-9]/g, "")
				trainer?.then(t => {
					if (t) {
						if (!(t.verifyAccess(accessKey))) {
							console.warn("Access Key provided is invalid for this trainer.");
						}
					});
				const url = new URL($page.url);
				url.searchParams.delete('access_key');
				replaceState(url, $page.state);
			}
		} else if (!trainerId && browser) {
			trainerList = trainers.all()
			trainer = undefined
		} else {
			trainer = undefined
			trainerList = undefined
		}
	}
</script>

<Title value="Trainers" />
<Page theme="green">
	<IdBadgeIcon slot="icon" />
	<nav id="{MAIN_SEARCH_ID}" slot="side" class="table" aria-label="Pokemon List">
		<JavascriptRequired />
		{#if trainerId}
			{#await trainer}
				<Loader />
			{:then trainer}
				{#if trainer}
					<TrainerRoster {trainer} currentPokemon={pokemonId} />
				{:else}
					<NoTrainer trainerKey={trainerId} />
				{/if}
			{:catch error}
				<ErrorMessage error="{error}" />
			{/await}
		{:else}
			{#await trainerList}
				<Loader />
			{:then trainerList}
				{#if trainerList}
					<TrainerList trainers={trainerList} showGetStarted={action == null} />
				{/if}
			{:catch error}
				<ErrorMessage error="{error}" />
			{/await}
		{/if}
	</nav>
	{#if trainerId}
		{#await trainer}
			<Loader />
		{:then trainer}
			{#if !trainer}
				<br />
			{:else if action === PageAction.addPokemon}
				{#await allSpecies}
					<Loader />
				{:then allSpecies}
					<AddPokemonCard {trainer} {allSpecies} />
				{/await}
			{:else if action === PageAction.editPokemon}
				<EditPokemonCard {trainer} id={pokemonId} />
			{:else if action === PageAction.evolvePokemon}
				{#await allSpecies}
					<Loader />
				{:then allSpecies}
					<EvolvePokemonCard {trainer} id={pokemonId} {allSpecies} />
				{/await}
			{:else if action === PageAction.restPokemon}
				<RestPokemonCard {trainer} id={pokemonId} />
			{:else if action === PageAction.removePokemon}
				<RemovePokemonCard {trainer} id={pokemonId} />
			{:else if pokemonId}
				<PokemonCard {trainer} id={pokemonId} />
			{:else if action === PageAction.restTrainer}
				{#await allSpecies}
					<Loader />
				{:then allSpecies}
					<RestTrainerCard {trainer} {allSpecies} />
				{/await}
			{:else if action === PageAction.editTrainer}
				<EditTrainerCard {trainer} />
			{:else if action === PageAction.removeTrainer}
				<RemoveTrainerCard {trainer} />
			{:else if action === PageAction.retireTrainer}
				<DeleteTrainerCard {trainer} />
			{:else if action === PageAction.accessKey}
				<AccessKeyCard {trainer} />
			{:else}
				<TrainerCard {trainer} />
			{/if}
		{:catch error}
			<ErrorMessage error="{error}" />
		{/await}
	{:else}
		{#if action === PageAction.newTrainer}
			<NewTrainerCard />
		{:else if action === PageAction.findTrainer}
			<FindTrainerCard />
		{:else}
			<Title value="Trainers" />
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
