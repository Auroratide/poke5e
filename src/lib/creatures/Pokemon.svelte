<script lang="ts">
	import type { Pokemon } from "./types"
	import Card from "../design/Card.svelte"
	import FlatDl from "../design/FlatDl.svelte"
	import { AttributeBlock } from "$lib/dnd/attributes"
	import InlineMoveLinks from "./InlineMoveLinks.svelte"
	import InlineTmLinks from "./InlineTmLinks.svelte"
	import * as asString from "./string"
	import EvolutionSection from "./EvolutionSection.svelte"
	import PokemonArt from "./PokemonArt.svelte"
	import GenderRatio from "./GenderRatio.svelte"
	import VisuallyHidden from "$lib/design/VisuallyHidden.svelte"
	import { TypeTag, TypeEffectiveness } from "$lib/pokemon/types-2"

	export let pokemon: Pokemon

	$: hasImage = pokemon.media != null
</script>

<Card title={pokemon.name}>
	<TypeTag slot="header-extra" type={pokemon.type.data} />
	<section class="info">
		<VisuallyHidden><h2>Info</h2></VisuallyHidden>
		<div class="{hasImage ? "row" : ""}">
			<FlatDl columns={hasImage ? 1 : 2}>
					<dt>Number</dt>
					<dd>{asString.pokeIndex(pokemon.number)}</dd>
					<dt>Size</dt>
					<dd class="cap">{pokemon.size}</dd>
					<dt><abbr title="Species Rating">SR</abbr></dt>
					<dd>{asString.sr(pokemon.sr)}</dd>
					<dt>Egg Group</dt>
					<dd class="cap">{pokemon.eggGroup.join(", ")}</dd>
					<dt>Min Level</dt>
					<dd>{pokemon.minLevel}</dd>
					<dt>Gender</dt>
					<dd><GenderRatio value={pokemon.gender} /></dd>
			</FlatDl>
			<PokemonArt media={pokemon.media} alt="" />
		</div>
		<p>{pokemon.description}</p>
	</section>
	<section class="stats">
		<h2>Stats</h2>
		<FlatDl>
			<dt>Armor Class</dt>
			<dd>{pokemon.ac}</dd>
			<dt>Hit Points</dt>
			<dd>{pokemon.hp} ({pokemon.hitDice})</dd>
			<dt>Speed</dt>
			<div>
					{#each pokemon.speed as speed}
						<dd>{asString.speed(speed)}</dd>
					{/each}
			</div>
			{#if pokemon.senses.length > 0}
					<dt>Senses</dt>
					<div class="cap">
						{#each pokemon.senses as sense}
							<dd>{asString.sense(sense)}</dd>
						{/each}
					</div>
			{/if}
		</FlatDl>
		<AttributeBlock attributes={pokemon.attributes} />
	</section>
	<section class="skills">
		<FlatDl>
			<dt>Proficiencies</dt>
			<dd class="cap">{asString.list(pokemon.skills.toList())}</dd>
			<dt>Saving Throws</dt>
			<dd class="upper">{asString.list(pokemon.savingThrows)}</dd>
			<TypeEffectiveness type={pokemon.type} />
		</FlatDl>
	</section>
	<section class="abilities">
		<h2>Abilities</h2>
		{#if pokemon.specialAbilityText !== undefined}
			<p>{pokemon.specialAbilityText}</p>
		{/if}
		{#each pokemon.abilities as ability}
			<p><strong>{ability.name}:</strong> {ability.description}</p>
		{/each}
	</section>
	{#if pokemon.evolution !== undefined}
		<EvolutionSection {pokemon} />
	{/if}
	<section class="moves">
		<h2>Moves</h2>
		<FlatDl>
			<dt>Starting</dt>
			<dd><InlineMoveLinks moves={pokemon.moves.start} /></dd>
			{#if pokemon.moves.level2 !== undefined}
					<dt>Level 2</dt>
					<dd><InlineMoveLinks moves={pokemon.moves.level2} /></dd>
			{/if}
			{#if pokemon.moves.level6 !== undefined}
					<dt>Level 6</dt>
					<dd><InlineMoveLinks moves={pokemon.moves.level6} /></dd>
			{/if}
			{#if pokemon.moves.level10 !== undefined}
					<dt>Level 10</dt>
					<dd><InlineMoveLinks moves={pokemon.moves.level10} /></dd>
			{/if}
			{#if pokemon.moves.level14 !== undefined}
					<dt>Level 14</dt>
					<dd><InlineMoveLinks moves={pokemon.moves.level14} /></dd>
			{/if}
			{#if pokemon.moves.level18 !== undefined}
					<dt>Level 18</dt>
					<dd><InlineMoveLinks moves={pokemon.moves.level18} /></dd>
			{/if}
		</FlatDl>
		<FlatDl>
			{#if pokemon.moves.egg !== undefined}
					<dt class="space-after">Egg</dt>
					<dd class="space-after"><InlineMoveLinks moves={pokemon.moves.egg} /></dd>
			{/if}
			{#if pokemon.moves.tm !== undefined}
					<dt>TM</dt>
					<dd><InlineTmLinks tms={pokemon.moves.tm} /></dd>
			{/if}
		</FlatDl>
	</section>
</Card>

<style>
	p {
		font-size: var(--font-sz-venus);
	}

	.cap {
		text-transform: capitalize,
	}

	.upper {
		text-transform: uppercase;
	}

	.info .row {
		display: grid;
		grid-template-columns: 3fr 1fr;
	}

	.space-after {
		margin-block-end: 1em;
	}
</style>
