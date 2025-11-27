<script lang="ts">
	import type { TrainerPokemon } from "../types"
	import { FlatDl } from "$lib/ui/elements"
	import * as asString from "$lib/creatures/string"
	import { DistancesDlItem } from "$lib/dnd/distance"
	import { TeraTypeTag } from "$lib/pokemon/types-2"
	import type { PokemonSpecies } from "$lib/creatures/species"

	export let pokemon: TrainerPokemon
	export let species: PokemonSpecies

	$: pb = pokemon.level.proficiencyBonus
	$: speeds = species.speed.mergeWith(pokemon.speeds)
	$: senses = species.senses.mergeWith(pokemon.senses)
</script>

<FlatDl columns={2}>
	<dt><abbr title="Armor Class">AC</abbr></dt>
	<dd>{pokemon.ac}</dd>
	<dt>Nature</dt>
	<dd class="cap">{pokemon.nature.data}</dd>
	<dt>Bonus</dt>
	<dd>+{pb}</dd>
	<dt>Size</dt>
	<dd class="cap">{pokemon.customSize ?? species.data.size}</dd>
	<DistancesDlItem label="Speed" values={speeds} tostring={asString.speed} />
	<DistancesDlItem label="Senses" values={senses} tostring={asString.sense} />
	{#if pokemon.teraType != null}
		<dt>Tera</dt>
		<dd><TeraTypeTag type={pokemon.teraType} /></dd>
	{/if}
</FlatDl>