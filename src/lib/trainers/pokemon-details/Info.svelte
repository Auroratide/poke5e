<script lang="ts">
	import type { LearnedMove, TrainerPokemon } from "../types"
	import type { Pokemon } from "$lib/creatures/types"
	import { createEventDispatcher } from "svelte"
	import BasicInfo from "./BasicInfo.svelte"
	import HealthInfo, { type UpdateDetail as HealthUpdateDetail } from "../info/HealthInfo.svelte"
	import StatsInfo from "./StatsInfo.svelte"
	import SkillsInfo from "../info/SkillsInfo.svelte"
	import FlatDl from "$lib/design/FlatDl.svelte"
	import AttributeBlock from "$lib/dnd/AttributeBlock.svelte"
	import TypeEffectiveness from "$lib/creatures/TypeEffectiveness.svelte"
	import MovesInfo from "./MovesInfo.svelte"
	import FeatsInfo from "./FeatsInfo.svelte"
	import NotesInfo from "./NotesInfo.svelte"
	import PokemonArt from "$lib/creatures/PokemonArt.svelte"
	import SideArtCardSection from "$lib/design/SideArtCardSection.svelte"
	import HeldItemsInfo from "./HeldItemsInfo.svelte"

	const dispatch = createEventDispatcher()

	export let pokemon: TrainerPokemon
	export let species: Pokemon
	export let editable: boolean

	$: hasImage = species.media != null

	const onUpdateHealth = (e: CustomEvent<HealthUpdateDetail>) => {
		dispatch("update-health", {
			...pokemon,
			hp: {
				current: e.detail.currentHp,
				max: pokemon.hp.max,
			},
			hitDice: {
				current: e.detail.currentHitDice,
				max: pokemon.hitDice.max,
			},
			status: e.detail.currentStatus,
		} as TrainerPokemon)
	}

	const onUpdatePp = (e: CustomEvent<LearnedMove>) => {
		dispatch("update-pp", e.detail)
	}
</script>

<SideArtCardSection {hasImage}>
	<div style:margin-bottom="0.5em">
		<BasicInfo {pokemon} {species} />
		<HealthInfo
			hp={pokemon.hp}
			hitDice={pokemon.hitDice}
			dieSize={species.hitDice}
			status={pokemon.status}
			hasStatus
			{editable}
			on:update={onUpdateHealth}
		/>
	</div>
	<StatsInfo {pokemon} {species} />
	<PokemonArt slot="art" media={species.media} alt="" shiny={pokemon.isShiny} />
</SideArtCardSection>
<section class="stats">
	<AttributeBlock attributes={pokemon.attributes} />
	<SkillsInfo level={pokemon.level} attributes={pokemon.attributes} savingThrows={pokemon.savingThrows} proficiencies={pokemon.proficiencies} />
	<FlatDl>
		<TypeEffectiveness type={pokemon.type} />
	</FlatDl>
	<FeatsInfo {pokemon} {species} />
	<HeldItemsInfo {pokemon} />
</section>
<hr />
<section>
	<MovesInfo {pokemon} {editable} on:update={onUpdatePp} />
</section>
{#if pokemon.notes?.length > 0}
	<hr />
	<section>
		<NotesInfo {pokemon} />
	</section>
{/if}

<style>
	section {
		margin-bottom: 0.5em;
	}
</style>