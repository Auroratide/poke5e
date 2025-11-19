<script lang="ts">
	import type { PokemonSpecies, SpeciesIdentifier } from "$lib/creatures/species"
	import Button from "$lib/design/Button.svelte"
	import { Fieldset } from "$lib/design/forms"
	import { slide } from "svelte/transition"
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

	const removeEvolution = (e: Evolution) => () => {
		evolutions = evolutions.filter((it) => it.id !== e.id)
	}
</script>

<Fieldset title="Evolution">
	{#each evolutions as evolution (evolution.data.id)}
		<div transition:slide>
			<EvolutionDefinition id="{evolution.data.id.replace(".", "")}" value={evolution} {allSpecies} on:remove={removeEvolution(evolution)} {disabled} />
		</div>
	{/each}
	<Button on:click={addEvolution}>Add Evolution</Button>
</Fieldset>
