<script lang="ts">
	import { type Pokemon } from "$lib/creatures/types"
	import type { TrainerPokemon } from "../types"
	import FlatDl from "$lib/design/FlatDl.svelte"
	import * as asString from "$lib/creatures/string"
	import { DistancesDlItem, DistanceSet } from "$lib/dnd/distance"
	import { Speeds } from "$lib/dnd/movement"
	import { Senses } from "$lib/dnd/senses"
	import { TeraTypeTag } from "$lib/pokemon/types-2"

	export let pokemon: TrainerPokemon
	export let species: Pokemon

	$: pb = pokemon.level.proficiencyBonus
	$: speeds = DistanceSet.fromList(Speeds, species.speed).mergeWith(pokemon.speeds)
	$: senses = DistanceSet.fromList(Senses, species.senses).mergeWith(pokemon.senses)
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
	{#if pokemon.teraType != null}
		<dt>Tera</dt>
		<dd><TeraTypeTag type={pokemon.teraType} /></dd>
	{/if}
</FlatDl>