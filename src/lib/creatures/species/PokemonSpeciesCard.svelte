<script lang="ts">
	import FlatDl from "$lib/design/FlatDl.svelte"
	import SideArtCardSection from "$lib/design/SideArtCardSection.svelte"
	import VisuallyHidden from "$lib/design/VisuallyHidden.svelte"
	import { AttributeBlock } from "$lib/dnd/attributes"
	import { DistancesDlItem } from "$lib/dnd/distance"
	import { AbilityPoolInfo } from "$lib/pokemon/ability"
	import { TypeEffectiveness, TypeTag } from "$lib/pokemon/types-2"
	import Markdown from "$lib/rendering/Markdown.svelte"
	import { GenderRatioDisplay } from "../gender"
	import InlineMoveLinks from "../InlineMoveLinks.svelte"
	import InlineTmLinks from "../InlineTmLinks.svelte"
	import type { PokemonSpecies } from "./PokemonSpecies"
	import * as asString from "$lib/creatures/string"
	import Card from "$lib/design/Card.svelte"
	import { SpeciesPortrait } from "$lib/creatures/media"
	import EvolutionSection from "../EvolutionSection.svelte"

	export let value: PokemonSpecies
	$: hasImage = value.media.data.values.normalPortrait != null
	$: useId = value.data.number <= 0

	const exists = <T>(arr: T[] | undefined) => arr != null && arr.length > 0
</script>

<Card title={value.data.name}>
	<TypeTag slot="header-extra" type={value.type.data} />
	<SideArtCardSection {hasImage}>
		<VisuallyHidden><h2>Info</h2></VisuallyHidden>
		<FlatDl columns={hasImage ? 1 : 2}>
			<dt>{useId ? "ID" : "Number"}</dt>
			<dd>{useId ? value.data.id : value.numberAsString()}</dd>
			<dt>Size</dt>
			<dd class="cap">{value.data.size}</dd>
			<dt><abbr title="Species Rating">SR</abbr></dt>
			<dd>{value.sr.toString()}</dd>
			<dt>Egg Group</dt>
			<dd class="cap">{value.eggGroups.toString()}</dd>
			<dt>Min Level</dt>
			<dd>{value.data.minLevel}</dd>
			<dt>Gender</dt>
			<dd><GenderRatioDisplay value={value.gender} /></dd>
		</FlatDl>
		<SpeciesPortrait slot="art" media={value.media} alt="" />
	</SideArtCardSection>
	<section>
		<div class="small-text">
			<Markdown value="{value.data.description}" />
		</div>
	</section>
	<section class="stats">
		<h2>Stats</h2>
		<FlatDl>
			<dt>Armor Class</dt>
			<dd>{value.data.ac}</dd>
			<dt>Hit Points</dt>
			<dd>{value.data.hp} ({value.data.hitDice})</dd>
			<DistancesDlItem label="Speed" values={value.speed} tostring={asString.speed} />
			<DistancesDlItem label="Senses" values={value.senses} tostring={asString.sense} />
		</FlatDl>
		<AttributeBlock attributes={value.attributes} />
	</section>
	<section class="skills">
		<FlatDl>
			<dt>Proficiencies</dt>
			<dd class="cap">{asString.list(value.skills.toList())}</dd>
			<dt>Saving Throws</dt>
			<dd class="upper">{asString.list(value.data.saves)}</dd>
			<TypeEffectiveness type={value.type} />
		</FlatDl>
	</section>
	<section class="abilities">
		<h2>Abilities</h2>
		<AbilityPoolInfo value={value.abilities} />
	</section>
	{#if value.data.evolution !== undefined}
		<EvolutionSection pokemon={value} />
	{/if}
	<section class="moves">
		<h2>Moves</h2>
		<FlatDl>
			<dt>Starting</dt>
			<dd><InlineMoveLinks moves={value.data.moves.start} /></dd>
			{#if exists(value.data.moves.level2)}
				<dt>Level 2</dt>
				<dd><InlineMoveLinks moves={value.data.moves.level2} /></dd>
			{/if}
			{#if exists(value.data.moves.level6)}
				<dt>Level 6</dt>
				<dd><InlineMoveLinks moves={value.data.moves.level6} /></dd>
			{/if}
			{#if exists(value.data.moves.level10)}
				<dt>Level 10</dt>
				<dd><InlineMoveLinks moves={value.data.moves.level10} /></dd>
			{/if}
			{#if exists(value.data.moves.level14)}
				<dt>Level 14</dt>
				<dd><InlineMoveLinks moves={value.data.moves.level14} /></dd>
			{/if}
			{#if exists(value.data.moves.level18)}
				<dt>Level 18</dt>
				<dd><InlineMoveLinks moves={value.data.moves.level18} /></dd>
			{/if}
		</FlatDl>
		<FlatDl>
			{#if exists(value.data.moves.egg)}
				<dt class="space-after">Egg</dt>
				<dd class="space-after"><InlineMoveLinks moves={value.data.moves.egg} /></dd>
			{/if}
			{#if exists(value.data.moves.tm)}
				<dt>TM</dt>
				<dd><InlineTmLinks tms={value.data.moves.tm} /></dd>
			{/if}
		</FlatDl>
	</section>
	<slot name="footer"></slot>
</Card>

<style>
	.small-text {
		font-size: var(--font-sz-venus);
	}

	.upper {
		text-transform: uppercase;
	}

	.space-after {
		margin-block-end: 1em;
	}
</style>
