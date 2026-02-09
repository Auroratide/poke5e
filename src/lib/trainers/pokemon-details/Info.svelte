<script lang="ts">
	import type { LearnedMove, Trainer, TrainerPokemon } from "../types"
	import { createEventDispatcher } from "svelte"
	import BasicInfo from "./BasicInfo.svelte"
	import HealthInfo, { type UpdateDetail as HealthUpdateDetail } from "../info/HealthInfo.svelte"
	import StatsInfo from "./StatsInfo.svelte"
	import SkillsInfo from "../info/SkillsInfo.svelte"
	import { FlatDl } from "$lib/ui/elements"
	import { AttributeBlock } from "$lib/dnd/attributes"
	import MovesInfo from "./MovesInfo.svelte"
	import AbilitiesInfo from "./AbilitiesInfo.svelte"
	import NotesInfo from "./NotesInfo.svelte"
	import { SideArtCardSection } from "$lib/ui/page"
	import HeldItemsInfo from "./HeldItemsInfo.svelte"
	import { VisuallyHidden } from "$lib/ui/elements"
	import { FeatsInfo } from "$lib/dnd/feats"
	import { AllFeats } from "$lib/poke5e/feats"
	import BondInfo, { type UpdateDetail as BondUpdateDetail } from "$lib/pokemon/bond/BondInfo.svelte"
	import { TypeEffectiveness } from "$lib/pokemon/types"
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { SpeciesPortrait } from "$lib/poke5e/species/media"
	import { SpeciesFormsInfo } from "$lib/poke5e/forms"
	import { m } from "$lib/site/i18n";

	const dispatch = createEventDispatcher()

	export let trainer: Trainer
	export let pokemon: TrainerPokemon
	export let species: PokemonSpecies
	export let editable: boolean

	$: hasImage = pokemon.avatar != null || species.media != null && species.media.hasAnyMedia()

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
			exp: e.detail.exp,
		} as TrainerPokemon)
	}

	const onUpdatePp = (e: CustomEvent<LearnedMove>) => {
		dispatch("update-pp", e.detail)
	}

	const onUpdateBond = (e: CustomEvent<BondUpdateDetail>) => {
		dispatch("update-bond", {
			...pokemon,
			bond: {
				...pokemon.bond,
				points: {
					current: e.detail.currentBondPoints,
					max: pokemon.bond.points.max,
				},
			},
		})
	}
</script>

<SideArtCardSection {hasImage}>
	<VisuallyHidden><h2>Health and Status</h2></VisuallyHidden>
	<div style:margin-bottom="0.5em">
		<BasicInfo {pokemon} {species} />
		<HealthInfo
			hp={pokemon.hp}
			hitDice={pokemon.hitDice}
			level={pokemon.level}
			exp={pokemon.exp}
			dieSize={pokemon.customHitDiceSize ?? species.hitDice}
			status={pokemon.status}
			hasStatusAndExp
			{editable}
			on:update={onUpdateHealth}
		/>
	</div>
	<StatsInfo {pokemon} {species} />
	{#if !hasImage}
		<BondInfo value={pokemon.bond} {editable} on:update={onUpdateBond} />
	{/if}
	<SpeciesPortrait slot="art" media={species.media} avatar={pokemon.avatar} alt="" shiny={pokemon.isShiny} />
	<BondInfo slot="after-art" value={pokemon.bond} {editable} on:update={onUpdateBond} />
</SideArtCardSection>
<section class="stats">
	<VisuallyHidden><h2>Stats</h2></VisuallyHidden>
	<AttributeBlock attributes={pokemon.attributes} />
	<SkillsInfo
		level={pokemon.level}
		attributes={pokemon.attributes}
		savingThrows={pokemon.savingThrows}
		proficiencies={pokemon.proficiencies}
		type={pokemon.type}
		specializations={trainer.specializations}
	/>
	<FlatDl>
		<TypeEffectiveness type={pokemon.type} />
	</FlatDl>
</section>
<section>
	<h2>{m["universal.abilities&Items"]()}</h2>
	<AbilitiesInfo {pokemon} />
	<HeldItemsInfo {pokemon} />
</section>
<SpeciesFormsInfo value={species.forms} />
{#if pokemon.feats.length > 0}
	<section>
		<h2>Feats</h2>
		<FeatsInfo allFeats={$AllFeats} values={pokemon.feats} />
	</section>
{/if}
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