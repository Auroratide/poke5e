<script lang="ts">
	import type { LearnedMove, Trainer, TrainerPokemon } from "../types"
	import type { Pokemon } from "$lib/creatures/types"
	import { createEventDispatcher } from "svelte"
	import BasicInfo from "./BasicInfo.svelte"
	import HealthInfo, { type UpdateDetail as HealthUpdateDetail } from "../info/HealthInfo.svelte"
	import StatsInfo from "./StatsInfo.svelte"
	import SkillsInfo from "../info/SkillsInfo.svelte"
	import FlatDl from "$lib/design/FlatDl.svelte"
	import { AttributeBlock } from "$lib/dnd/attributes"
	import MovesInfo from "./MovesInfo.svelte"
	import AbilitiesInfo from "./AbilitiesInfo.svelte"
	import NotesInfo from "./NotesInfo.svelte"
	import PokemonArt from "$lib/creatures/PokemonArt.svelte"
	import SideArtCardSection from "$lib/design/SideArtCardSection.svelte"
	import HeldItemsInfo from "./HeldItemsInfo.svelte"
	import VisuallyHidden from "$lib/design/VisuallyHidden.svelte"
	import FeatsInfo from "$lib/feats/FeatsInfo.svelte"
	import BondInfo, { type UpdateDetail as BondUpdateDetail } from "$lib/pokemon/bond/BondInfo.svelte"
	import { TypeEffectiveness } from "$lib/pokemon/types-2"

	const dispatch = createEventDispatcher()

	export let trainer: Trainer
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
	<PokemonArt slot="art" media={species.media} alt="" shiny={pokemon.isShiny} />
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
	<h2>Abilities & Items</h2>
	<AbilitiesInfo {pokemon} {species} />
	<HeldItemsInfo {pokemon} />
</section>
{#if pokemon.feats.length > 0}
	<section>
		<h2>Feats</h2>
		<FeatsInfo values={pokemon.feats} />
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