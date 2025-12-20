<script lang="ts">
	import type { SpeciesIdentifier } from "$lib/poke5e/species"
	import type { EvolutionForest } from "./EvolutionForest"

	export let species: SpeciesIdentifier
	export let evolutions: EvolutionForest

	$: currentStage = evolutions.currentStage(species)
	$: maxStage = evolutions.maxStage(species)
</script>

{currentStage === 0 ? "?" : currentStage} / {maxStage === Infinity ? "∞" : maxStage}