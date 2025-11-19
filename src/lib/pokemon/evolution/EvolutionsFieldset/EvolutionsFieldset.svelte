<script lang="ts">
	import type { PokemonSpecies, SpeciesIdentifier } from "$lib/creatures/species"
	import Button from "$lib/design/Button.svelte"
	import { Fieldset } from "$lib/design/forms"
	import { Evolution, tmpEvolutionId } from "../Evolution"
	import EvolutionDefinition from "./EvolutionDefinition.svelte"

	export let species: SpeciesIdentifier
	export let evolutions: Evolution[]
	export let allSpecies: PokemonSpecies[]
	export let disabled: boolean = false

	// let evolvesTo = evolutions.evolvesTo(species)
	// section for evolves from
	// section for evolves to
	// can add and remove conditions, somehow...?
	// and... can add MULTIPLE, and delete them


	// for each evolvesTo
	// 

	const addEvolution = () => {
		const newEvolution = new Evolution({
			id: tmpEvolutionId(),
			from: species.data,
			to: "",
			conditions: [ {
				type: "level",
				value: 8,
			} ],
			effects: [ {
				type: "asi",
				value: 8,
			} ],
		})

		evolutions = [...evolutions, newEvolution]
	}
</script>

<Fieldset title="Evolution">
	{#each evolutions as evolution (evolution.data.id)}
		<EvolutionDefinition id="{evolution.data.id.replace(".", "")}" value={evolution} {allSpecies} />
	{/each}
	<Button on:click={addEvolution}>Add Evolution</Button>
</Fieldset>
