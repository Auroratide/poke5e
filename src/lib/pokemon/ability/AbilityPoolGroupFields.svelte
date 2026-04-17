<script lang="ts">
	import { Button } from "$lib/ui/elements";
	import { focusInputField, FormGroup, HintText } from "$lib/ui/forms"
	import { AllAbilityField } from ".";
	import { Ability } from "./Ability";
	import { m } from "$lib/site/i18n"
	import { getAbilityFieldName } from "./AllAbilityField.svelte";

	export let title: string
	export let values: Ability[]
	export let disabled = false

	let newId = -1001
	const nextNewId = () => (--newId).toString()

	let withIds = values.map((it) => ({
		id: nextNewId(),
		value: it,
	}))

	const remove = (id: string) => () => {
		withIds = withIds.filter((it) => it.id !== id)
	}

	const addStandard = () => {
		const nextId = nextNewId()
		withIds = [...withIds, {
			id: nextId,
			value: Ability.createNewStandard("adaptability")
		} ],
		focusInputField(getAbilityFieldName(nextId))
	}

	const addCustom = () => {
		const nextId = nextNewId()
		withIds = [...withIds, {
			id: nextId,
			value: Ability.createNewCustom(),
		} ],
		focusInputField(getAbilityFieldName(nextId))
	}

	$: values = withIds.map((it) => it.value)
</script>

<FormGroup {title}>
	{#each withIds as ability (ability.id)}
		<AllAbilityField id={ability.id} value={ability.value} {disabled} on:remove={remove(ability.id)} />
	{/each}
	{#if values.length === 0}
		<HintText>{m.noAbilities()}</HintText>
	{/if}
	<div class="row">
		<Button on:click={addStandard}>{m.addAbility()}</Button>
		<Button on:click={addCustom}>{m.addCustomAbility()}</Button>
	</div>
</FormGroup>


<style>
	.row {
		display: flex;
		gap: 0.5em;
	} .row > :global(*) {
		flex: 1;
	}
</style>