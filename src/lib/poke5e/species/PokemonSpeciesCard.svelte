<script lang="ts">
	import { FlatDl } from "$lib/ui/elements"
	import { VisuallyHidden } from "$lib/ui/elements"
	import { AttributeBlock } from "$lib/dnd/attributes"
	import { DistancesDlItem } from "$lib/dnd/distance"
	import { AbilityPoolInfo } from "$lib/pokemon/ability"
	import { TypeEffectiveness, TypeTag } from "$lib/pokemon/types-2"
	import { Markdown } from "$lib/ui/rendering"
	import { GenderRatioDisplay } from "$lib/pokemon/gender"
	import InlineMoveLinks from "$lib/moves/InlineMoveLinks.svelte"
	import InlineTmLinks from "$lib/moves/InlineTmLinks.svelte"
	import type { PokemonSpecies } from "./PokemonSpecies"
	import { Card, SideArtCardSection } from "$lib/ui/page"
	import { SpeciesPortrait } from "$lib/poke5e/species/media"
	import { isNotBlank } from "$lib/utils/string"
	import { EvolutionInfo, EvolutionStore } from "$lib/pokemon/evolution"

	export let value: PokemonSpecies
	$: hasImage = value.media.data.values.normalPortrait != null
	$: useId = value.data.number <= 0

	const evolutions = value.id.isFakemon()
		? EvolutionStore.get(value.id)
		: EvolutionStore.canonList()

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
			<DistancesDlItem label="Speed" values={value.speed} />
			<DistancesDlItem label="Senses" values={value.senses} />
		</FlatDl>
		<AttributeBlock attributes={value.attributes} />
	</section>
	<section class="skills">
		<FlatDl>
			<dt>Proficiencies</dt>
			<dd class="cap">{value.skills.toString()}</dd>
			<dt>Saving Throws</dt>
			<dd class="upper">{value.data.saves.length > 0 ? value.data.saves.join(", ") : "none"}</dd>
			<TypeEffectiveness type={value.type} />
		</FlatDl>
	</section>
	<section class="abilities">
		<h2>Abilities</h2>
		{#if value.abilities.isEmpty()}
			<p>No abilities provided.</p>
		{:else}
			<AbilityPoolInfo value={value.abilities} />
		{/if}
	</section>
	{#if $evolutions?.hasEvolutionTree(value.id)}
		<EvolutionInfo species={value.id} evolutions={$evolutions} />
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
	{#if isNotBlank(value.data.notes)}
		<section>
			<h2>Notes</h2>
			<div class="small-text">
				<Markdown value="{value.data.notes}" />
			</div>
		</section>
	{/if}
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
