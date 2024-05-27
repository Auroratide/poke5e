<script lang="ts">
	import type { Pokemon } from "$lib/creatures/types"
	import type { TrainerPokemon } from "../types"
	import FlatDl from "$lib/design/FlatDl.svelte"
	import { proficiencyBonus } from "$lib/dnd/proficiency"
	import * as asString from "$lib/creatures/string"

	export let pokemon: TrainerPokemon
	export let species: Pokemon

	$: pb = proficiencyBonus(pokemon.level)
</script>

<FlatDl columns={2}>
	<dt><abbr title="Armor Class">AC</abbr></dt>
	<dd>{pokemon.ac}</dd>
	<dt>Nature</dt>
	<dd class="cap">{pokemon.nature}</dd>
	<dt>Bonus</dt>
	<dd>+{pb}</dd>
	<dt>Size</dt>
	<dd class="cap">{species.size}</dd>
	<dt>Speed</dt>
	<div>
		{#each species.speed as speed}
			<dd>{asString.speed(speed)}</dd>
		{/each}
	</div>
	{#if species.senses.length > 0}
		<dt>Senses</dt>
		<div class="cap">
			{#each species.senses as sense}
					<dd>{asString.sense(sense)}</dd>
			{/each}
		</div>
	{/if}
</FlatDl>