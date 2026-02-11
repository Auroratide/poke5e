<script lang="ts">
	import { FlatDl } from "$lib/ui/elements"
	import { VisuallyHidden } from "$lib/ui/elements"
	import { AttributeBlock } from "$lib/dnd/attributes"
	import { DistancesDlItem } from "$lib/dnd/distance"
	import { AbilityPoolInfo } from "$lib/pokemon/ability"
	import { TypeEffectiveness, TypeTag } from "$lib/pokemon/types"
	import { Markdown } from "$lib/ui/rendering"
	import { GenderRatioDisplay } from "$lib/pokemon/gender"
	import InlineMoveLinks from "$lib/moves/InlineMoveLinks.svelte"
	import InlineTmLinks from "$lib/moves/tms/InlineTmLinks.svelte"
	import type { PokemonSpecies } from "./PokemonSpecies"
	import { Card, SideArtCardSection } from "$lib/ui/page"
	import { SpeciesPortrait } from "$lib/poke5e/species/media"
	import { isNotBlank } from "$lib/utils/string"
	import { EvolutionInfo, EvolutionStore } from "$lib/pokemon/evolution"
	import { SpeciesFormsInfo } from "$lib/poke5e/forms"
	import { m } from "$lib/site/i18n"

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
			<dt>{useId ? "ID" : m["universal.number"]()}</dt>
			<dd>{useId ? value.data.id : value.numberAsString()}</dd>
			<dt>{m["universal.size"]()}</dt>
			<dd class="cap">{value.data.size}</dd>
			<dt><abbr title="{m["universal.speciesRating"]()}">{m["universal.sr"]()}</abbr></dt>
			<dd>{value.sr.toString()}</dd>
			<dt>{m["universal.eggGroup"]()}</dt>
			<dd class="cap">{value.eggGroups.toString()}</dd>
			<dt>{m["universal.minLevel"]()}</dt>
			<dd>{value.data.minLevel}</dd>
			<dt>{m["universal.gender"]()}</dt>
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
		<h2>{m["universal.stats"]()}</h2>
		<FlatDl>
			<dt>{m["universal.armorClass"]()}</dt>
			<dd>{value.data.ac}</dd>
			<dt>{m["universal.hitPoints"]()}</dt>
			<dd>{value.data.hp} ({value.data.hitDice})</dd>
			<DistancesDlItem label="{m["universal.speed"]()}" values={value.speed} />
			<DistancesDlItem label="{m["universal.senses"]()}" values={value.senses} />
		</FlatDl>
		<AttributeBlock attributes={value.attributes} />
	</section>
	<section class="skills">
		<FlatDl>
			<dt>{m["universal.proficiencies"]()}</dt>
			<dd class="cap">{value.skills.toString()}</dd>
			<dt>{m["universal.savingThrows"]()}</dt>
			<dd class="upper">{value.data.saves.length > 0 ? value.data.saves.join(", ") : "none"}</dd>
			<TypeEffectiveness type={value.type} />
		</FlatDl>
	</section>
	<section class="abilities">
		<h2>{m["universal.abilities"]()}</h2>
		{#if value.abilities.isEmpty()}
			<p>{m["universal.noAbilitiesProvided"]()}</p>
		{:else}
			<AbilityPoolInfo value={value.abilities} />
		{/if}
	</section>
	<SpeciesFormsInfo value={value.forms} />
	{#if $evolutions?.hasEvolutionTree(value.id)}
		<EvolutionInfo species={value.id} evolutions={$evolutions} />
	{/if}
	<section class="moves">
		<h2>{m["universal.moves"]()}</h2>
		<FlatDl>
			<dt>{m["universal.starting"]()}</dt>
			<dd><InlineMoveLinks moves={value.data.moves.start} /></dd>
			{#if exists(value.data.moves.level2)}
				<dt>{m["universal.level"]()} 2</dt>
				<dd><InlineMoveLinks moves={value.data.moves.level2} /></dd>
			{/if}
			{#if exists(value.data.moves.level6)}
				<dt>{m["universal.level"]()} 6</dt>
				<dd><InlineMoveLinks moves={value.data.moves.level6} /></dd>
			{/if}
			{#if exists(value.data.moves.level10)}
				<dt>{m["universal.level"]()} 10</dt>
				<dd><InlineMoveLinks moves={value.data.moves.level10} /></dd>
			{/if}
			{#if exists(value.data.moves.level14)}
				<dt>{m["universal.level"]()} 14</dt>
				<dd><InlineMoveLinks moves={value.data.moves.level14} /></dd>
			{/if}
			{#if exists(value.data.moves.level18)}
				<dt>{m["universal.level"]()} 18</dt>
				<dd><InlineMoveLinks moves={value.data.moves.level18} /></dd>
			{/if}
		</FlatDl>
		<FlatDl>
			{#if exists(value.data.moves.egg)}
				<dt class="space-after">{m["universal.egg"]()}</dt>
				<dd class="space-after"><InlineMoveLinks moves={value.data.moves.egg} /></dd>
			{/if}
			{#if exists(value.data.moves.tm)}
				<dt>{m["universal.tm"]()}</dt>
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
