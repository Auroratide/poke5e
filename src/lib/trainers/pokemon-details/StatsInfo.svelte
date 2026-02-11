<script lang="ts">
	import type { TrainerPokemon } from "../types"
	import { FlatDl } from "$lib/ui/elements"
	import { DistancesDlItem } from "$lib/dnd/distance"
	import { TeraTypeTag } from "$lib/pokemon/types"
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { m } from "$lib/site/i18n"

	export let pokemon: TrainerPokemon
	export let species: PokemonSpecies

	$: pb = pokemon.level.proficiencyBonus
	$: speeds = species.speed.mergeWith(pokemon.speeds)
	$: senses = species.senses.mergeWith(pokemon.senses)
</script>

<FlatDl columns={2}>
	<dt><abbr title="{m["universal.armorClass"]()}">{m["universal.ac"]()}</abbr></dt>
	<dd>{pokemon.ac}</dd>
	<dt>{m["universal.nature"]()}</dt>
	<dd class="cap">{pokemon.nature.data}</dd>
	<dt>{m["universal.bonus"]()}</dt>
	<dd>+{pb}</dd>
	<dt>{m["universal.size"]()}</dt>
	<dd class="cap">{pokemon.customSize ?? species.data.size}</dd>
	<DistancesDlItem label="{m["universal.speed"]()}" values={speeds} />
	<DistancesDlItem label="{m["universal.senses"]()}" values={senses} />
	{#if pokemon.teraType != null}
		<dt>{m["universal.tera"]()}</dt>
		<dd><TeraTypeTag type={pokemon.teraType} /></dd>
	{/if}
</FlatDl>