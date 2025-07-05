<script lang="ts">
	import { withCustomDistances, type Pokemon } from "$lib/creatures/types"
	import type { TrainerPokemon } from "../types"
	import FlatDl from "$lib/design/FlatDl.svelte"
	import { proficiencyBonus } from "$lib/dnd/proficiency"
	import * as asString from "$lib/creatures/string"
	import TeraTypeTag from "$lib/pokemon/TeraTypeTag.svelte"
	import DistancesDlItem from "$lib/design/DistancesDlItem.svelte"
	import { DndSpeedTypes } from "$lib/dnd/DndSpeeds"
	import { DndSenseTypes } from "$lib/dnd/DndSenses"

	export let pokemon: TrainerPokemon
	export let species: Pokemon

	$: pb = proficiencyBonus(pokemon.level)
	$: speeds = withCustomDistances(DndSpeedTypes, species.speed, pokemon.speeds)
	$: senses = withCustomDistances(DndSenseTypes, species.senses, pokemon.senses)
</script>

<FlatDl columns={2}>
	<dt><abbr title="Armor Class">AC</abbr></dt>
	<dd>{pokemon.ac}</dd>
	<dt>Nature</dt>
	<dd class="cap">{pokemon.nature}</dd>
	<dt>Bonus</dt>
	<dd>+{pb}</dd>
	<dt>Size</dt>
	<dd class="cap">{pokemon.customSize ?? species.size}</dd>
	<DistancesDlItem label="Speed" values={speeds} tostring={asString.speed} />
	<DistancesDlItem label="Senses" values={senses} tostring={asString.sense} />
	{#if pokemon.teraType !== ""}
		<dt>Tera</dt>
		<dd><TeraTypeTag type="{pokemon.teraType}" /></dd>
	{/if}
</FlatDl>