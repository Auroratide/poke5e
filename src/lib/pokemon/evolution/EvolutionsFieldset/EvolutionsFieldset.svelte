<script lang="ts">
	import type { PokemonSpecies, SpeciesIdentifier } from "$lib/poke5e/species"
	import { Button } from "$lib/ui/elements"
	import { Fieldset, HintText, InstructionText } from "$lib/ui/forms"
	import { slide } from "svelte/transition"
	import { Evolution, tmpEvolutionId } from "../Evolution"
	import EvolutionDefinition from "./EvolutionDefinition.svelte"
	import { Tab } from "$lib/ui/elements"
	import { m } from "$lib/site/i18n";

	export let species: SpeciesIdentifier
	export let evolutions: Evolution[]
	export let allSpecies: PokemonSpecies[]
	export let disabled: boolean = false

	$: evolvesFrom = evolutions.filter((it) => it.data.to === species.data)
	$: evolvesTo = evolutions.filter((it) => it.data.from === species.data)

	const addEvolution = (fromOrTo: "from" | "to") => () => {
		const newEvolution = new Evolution({
			id: tmpEvolutionId(),
			from: fromOrTo === "to" ? species.data : "",
			to: fromOrTo === "from" ? species.data : "",
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

<Fieldset title={m["universal.evolution"]()}>
	<InstructionText><strong>{m["universal.note"]()}:</strong> {m["fakemon.evolutionNoteText"]()}</InstructionText>
	<div>
		<Tab.List activation="automatic">
			<Tab.Item selected for="evolves-to-tabpanel">{m["universal.evolvesTo"]()}</Tab.Item>
			<Tab.Item for="evolves-from-tabpanel">{m["universal.evolvesFrom"]()}</Tab.Item>
		</Tab.List>
		<Tab.Panel id="evolves-to-tabpanel">
			{#each evolvesTo as evolution (evolution.data.id)}
				<div class="definition-list" transition:slide>
					<EvolutionDefinition direction="to" id="{evolution.data.id.replace(".", "")}" value={evolution} {allSpecies} {species} on:remove={removeEvolution(evolution)} {disabled} />
				</div>
			{/each}
			{#if evolvesTo.length === 0}
				<HintText>{m["fakemon.thisFakemonDesNotEvolveIntoAnything"]()}</HintText>
			{/if}
			<Button width="full" on:click={addEvolution("to")}>{m["universal.addEvolution"]()}</Button>
		</Tab.Panel>
		<Tab.Panel id="evolves-from-tabpanel">
			{#each evolvesFrom as evolution (evolution.data.id)}
				<div class="definition-list" transition:slide>
					<EvolutionDefinition direction="from" id="{evolution.data.id.replace(".", "")}" value={evolution} {allSpecies} {species} on:remove={removeEvolution(evolution)} {disabled} />
				</div>
			{/each}
			{#if evolvesFrom.length === 0}
				<HintText>{m["fakemon.thisFakemonDesNotEvolveFromAnything"]()}</HintText>
			{/if}
			<Button width="full" on:click={addEvolution("from")}>{m["universal.addEvolution"]()}</Button>
		</Tab.Panel>
	</div>
</Fieldset>
