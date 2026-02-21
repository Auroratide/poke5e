<script lang="ts">
	import { Button } from "$lib/ui/elements"
	import { Details } from "$lib/ui/elements"
	import { Fieldset, InstructionText, IntField } from "$lib/ui/forms"
	import { Attributes } from "$lib/dnd/attributes"
	import type { HitDice } from "$lib/dnd/hit-dice"
	import { Bst } from "$lib/pokemon/bst"
	import type { PokemonType } from "$lib/pokemon/types"
	import { StatsEstimator } from "./StatsEstimator"
	import { m } from "$lib/site/i18n"

	export let level: number
	export let hitDice: HitDice
	export let type: PokemonType
	export let ac: number
	export let hp: number
	export let attributes: Attributes
	export let disabled: boolean

	let bst: Bst = new Bst({
		hp: 0,
		attack: 0,
		defense: 0,
		specialAttack: 0,
		specialDefense: 0,
		speed: 0,
	})

	const convert = () => {
		const conversion = new StatsEstimator()
			.withLevel(level)
			.withHitDice(hitDice)
			.withType(type)
			.fromBst(bst)

		ac = conversion.ac
		hp = conversion.hp
		attributes = new Attributes(conversion.attributes)
	}
</script>

<Fieldset title="{m.attributes()}" columns={6}>
	<div class="span-all">
		<Details title="{m["fakemon.convertPokeStatsToDnDStats"]()}">
			<div class="grid">
				<InstructionText>{m["fakemon.convertTutorialText"]()}</InstructionText>
				<IntField name="bst-hp" label="{m.hp()}" min={0} bind:value={bst.data.hp} {disabled} />
				<IntField name="bst-attack" label="{m.attack()}" min={0} bind:value={bst.data.attack} {disabled} />
				<IntField name="bst-defense" label="{m.defense()}" min={0} bind:value={bst.data.defense} {disabled} />
				<IntField name="bst-special-attack" label="{m.spAttack()}" min={0} bind:value={bst.data.specialAttack} {disabled} />
				<IntField name="bst-special-defense" label="{m.spDefense()}" min={0} bind:value={bst.data.specialDefense} {disabled} />
				<IntField name="bst-speed" label="{m.speed()}" min={0} bind:value={bst.data.speed} {disabled} />
				<div class="span-all text-center">
					<Button on:click={convert}>{m.convert()}</Button>
				</div>
			</div>
			<hr />
		</Details>
	</div>
	<IntField label="{m.ac()}" bind:value={ac} min={0} max={99} {disabled} span={3} required />
	<IntField label="{m.hp()}" bind:value={hp} min={0} {disabled} span={3} required />
	{#each Attributes.list as attr}
		<IntField label="{attr.abbr.toLocaleUpperCase()}" min={0} max={30} bind:value={attributes.data[attr.abbr]} span={2} {disabled} />
	{/each}
</Fieldset>

<style>
	.span-all {
		grid-column: 1 / -1;
	}

	.text-center { text-align: center; }
	.span-all :global(> button) {
		inline-size: calc(100% - 1em);
		margin-block: 1em;
		margin-inline: 0.5em;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5em;
	}
</style>