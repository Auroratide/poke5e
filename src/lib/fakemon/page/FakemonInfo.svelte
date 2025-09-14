<script lang="ts">
	import { GenderRatioDisplay } from "$lib/creatures/gender"
	import InlineMoveLinks from "$lib/creatures/InlineMoveLinks.svelte"
	import InlineTmLinks from "$lib/creatures/InlineTmLinks.svelte"
	import PokemonArt from "$lib/creatures/PokemonArt.svelte"
	import * as asString from "$lib/creatures/string"
	import FlatDl from "$lib/design/FlatDl.svelte"
	import SideArtCardSection from "$lib/design/SideArtCardSection.svelte"
	import VisuallyHidden from "$lib/design/VisuallyHidden.svelte"
	import { AttributeBlock } from "$lib/dnd/attributes"
	import { DistancesDlItem } from "$lib/dnd/distance"
	import { AbilityPoolInfo } from "$lib/pokemon/ability"
	import { TypeEffectiveness } from "$lib/pokemon/types-2"
	import Markdown from "$lib/rendering/Markdown.svelte"
	import { Fakemon } from "../Fakemon"

	export let fakemon: Fakemon
	let hasImage = fakemon.media.data.normalPortrait != null
</script>

<SideArtCardSection {hasImage}>
	<VisuallyHidden><h2>Info</h2></VisuallyHidden>
	<FlatDl columns={hasImage ? 1 : 2}>
		<dt>ID</dt>
		<dd>{fakemon.data.readKey}</dd>
		<dt>Size</dt>
		<dd class="cap">{fakemon.data.size}</dd>
		<dt><abbr title="Species Rating">SR</abbr></dt>
		<dd>{fakemon.sr.toString()}</dd>
		<dt>Egg Group</dt>
		<dd class="cap">{fakemon.data.eggGroups.join(", ")}</dd>
		<dt>Min Level</dt>
		<dd>{fakemon.data.minLevel}</dd>
		<dt>Gender</dt>
		<dd><GenderRatioDisplay value={fakemon.gender} /></dd>
	</FlatDl>
	<PokemonArt slot="art" media={{
		main: fakemon.media.data.normalPortrait.href,
	}} alt="" />
	<div class="small-text">
		<Markdown value="{fakemon.data.description}" />
	</div>
</SideArtCardSection>
<section class="stats">
	<h2>Stats</h2>
	<FlatDl>
		<dt>Armor Class</dt>
		<dd>{fakemon.data.ac}</dd>
		<dt>Hit Points</dt>
		<dd>{fakemon.data.hp} ({fakemon.data.hitDice})</dd>
		<DistancesDlItem label="Speed" values={fakemon.speed} tostring={asString.speed} />
		<DistancesDlItem label="Senses" values={fakemon.senses} tostring={asString.sense} />
	</FlatDl>
	<AttributeBlock attributes={fakemon.attributes} />
</section>
<section class="skills">
	<FlatDl>
		<dt>Proficiencies</dt>
		<dd class="cap">{asString.list(fakemon.skills.toList())}</dd>
		<dt>Saving Throws</dt>
		<dd class="upper">{asString.list(fakemon.data.saves)}</dd>
		<TypeEffectiveness type={fakemon.type} />
	</FlatDl>
</section>
<section class="abilities">
	<h2>Abilities</h2>
	<AbilityPoolInfo value={fakemon.abilities} />
</section>
<section class="moves">
	<h2>Moves</h2>
	<FlatDl>
		<dt>Starting</dt>
		<dd><InlineMoveLinks moves={fakemon.data.moves.start} /></dd>
		{#if fakemon.data.moves.level2 !== undefined}
			<dt>Level 2</dt>
			<dd><InlineMoveLinks moves={fakemon.data.moves.level2} /></dd>
		{/if}
		{#if fakemon.data.moves.level6 !== undefined}
			<dt>Level 6</dt>
			<dd><InlineMoveLinks moves={fakemon.data.moves.level6} /></dd>
		{/if}
		{#if fakemon.data.moves.level10 !== undefined}
			<dt>Level 10</dt>
			<dd><InlineMoveLinks moves={fakemon.data.moves.level10} /></dd>
		{/if}
		{#if fakemon.data.moves.level14 !== undefined}
			<dt>Level 14</dt>
			<dd><InlineMoveLinks moves={fakemon.data.moves.level14} /></dd>
		{/if}
		{#if fakemon.data.moves.level18 !== undefined}
			<dt>Level 18</dt>
			<dd><InlineMoveLinks moves={fakemon.data.moves.level18} /></dd>
		{/if}
	</FlatDl>
	<FlatDl>
		{#if fakemon.data.moves.egg !== undefined}
			<dt class="space-after">Egg</dt>
			<dd class="space-after"><InlineMoveLinks moves={fakemon.data.moves.egg} /></dd>
		{/if}
		{#if fakemon.data.moves.tm !== undefined}
			<dt>TM</dt>
			<dd><InlineTmLinks tms={fakemon.data.moves.tm} /></dd>
		{/if}
	</FlatDl>
</section>

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