<script lang="ts">
	import { experienceAwarded, formatExp } from "$lib/poke5e/experience"
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { FlatDl } from "$lib/ui/elements"
	import type { TrainerPokemon } from "../types"
	import { CatchDc } from "$lib/poke5e/catching"
	import { rulesVersion } from "$lib/site/rules-version"

	export let pokemon: TrainerPokemon
	export let species: PokemonSpecies

	$: catchDc = CatchDc.calculate({
		level: pokemon.level,
		sr: species.sr,
		hp: pokemon.hp,
		version: $rulesVersion
	})
	$: exp = formatExp(experienceAwarded(pokemon.level.data, species.sr.data))
</script>

<FlatDl>
	<dt>Catch DC</dt>
	<dd>{catchDc}</dd>
	<dt>EXP Award</dt>
	<dd>{exp}</dd>
</FlatDl>