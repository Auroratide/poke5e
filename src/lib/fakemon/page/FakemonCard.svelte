<script lang="ts">
	import Card from "$lib/design/Card.svelte"
	import FlatDl from "$lib/design/FlatDl.svelte"
	import Title from "$lib/design/Title.svelte"
	import VisuallyHidden from "$lib/design/VisuallyHidden.svelte"
	import { TypeEffectiveness, TypeTag } from "$lib/pokemon/types-2"
	import { Fakemon } from "../Fakemon"
	import * as asString from "$lib/creatures/string"
	import { GenderRatioDisplay } from "$lib/creatures/gender"
	import Markdown from "$lib/rendering/Markdown.svelte"
	import { DistancesDlItem } from "$lib/dnd/distance"
	import { AttributeBlock } from "$lib/dnd/attributes"
	import InlineMoveLinks from "$lib/creatures/InlineMoveLinks.svelte"
	import InlineTmLinks from "$lib/creatures/InlineTmLinks.svelte"
	import { ActionArea } from "$lib/design/forms"
	import Button from "$lib/design/Button.svelte"
	import { Url } from "$lib/url"
	import { PageAction } from "./actions"

	let fakemon: Fakemon = new Fakemon({
		id: "1232343424",
		readKey: "29384902384",
		speciesName: "Belseraph",
		type: ["fairy", "flying"],
		size: "small",
		sr: 14,
		minLevel: 15,
		eggGroups: ["undiscovered"],
		gender: "1:0",
		description: "The Angel Pokémon. One kind of Ultra Beast. Belseraph's song is thought to gradually \"shift\" people into the afterlife if they listen for too long.",
		ac: 18,
		hp: 98,
		hitDice: "d10",
		speed: {
			flying: 30,
		},
		senses: {},
		attributes: {
			str: 12,
			dex: 16,
			con: 11,
			int: 14,
			wis: 20,
			cha: 20,
		},
		skills: {
			"athletics": 0,
			"acrobatics": 0,
			"sleight of hand": 0,
			"stealth": 0,
			"arcana": 0,
			"history": 0,
			"investigation": 0,
			"nature": 0,
			"religion": 1,
			"animal handling": 0,
			"insight": 0,
			"medicine": 0,
			"perception": 0,
			"survival": 0,
			"deception": 0,
			"intimidation": 0,
			"performance": 0,
			"persuasion": 1,
		},
		saves: ["dex", "cha"],
		abilities: [],
		moves: {
			start: [
				"halo-song",
				"mystical-fire",
				"fairy-wind",
				"air-cutter",
				"defog",
				"safeguard",
				"captivate",
				"sing",
			],
			level18: [
				"endeavor",
				"perish-song",
				"hurricane",
			],
		},
	})

	let hasImage = false
	let canEdit = true
</script>

<Title value="" />
<Card title="{fakemon.data.speciesName}">
	<TypeTag slot="header-extra" type={fakemon.type.data} />
	<section class="info">
		<VisuallyHidden><h2>Info</h2></VisuallyHidden>
		<div class="{hasImage ? "row" : ""}">
			<FlatDl columns={hasImage ? 1 : 2}>
				<dt>ID</dt>
				<dd>{fakemon.data.id}</dd>
				<dt>Size</dt>
				<dd class="cap">{fakemon.data.size}</dd>
				<dt><abbr title="Species Rating">SR</abbr></dt>
				<dd>{asString.sr(fakemon.data.sr)}</dd>
				<dt>Egg Group</dt>
				<dd class="cap">{fakemon.data.eggGroups.join(", ")}</dd>
				<dt>Min Level</dt>
				<dd>{fakemon.data.minLevel}</dd>
				<dt>Gender</dt>
				<dd><GenderRatioDisplay value={fakemon.gender} /></dd>
			</FlatDl>
			<!-- <PokemonArt media={pokemon.media} alt="" /> -->
		</div>
		<div class="small-text">
			<Markdown value="{fakemon.data.description}" />
		</div>
	</section>
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
	<!-- <section class="abilities">
		<h2>Abilities</h2>
		{#each fakemon.data.abilities as ability}
			<p>TODO</p>
			<p><strong>{ability.name}:</strong> {ability.description}</p>
		{/each}
	</section> -->
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
	{#if canEdit}
		<ActionArea>
			<Button href="{Url.fakemon(fakemon.data.id, PageAction.edit)}">Edit</Button>
		</ActionArea>
	{/if}
</Card>

<style>
	p, .small-text {
		font-size: var(--font-sz-venus);
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