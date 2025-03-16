<script lang="ts">
	import Fieldset from "$lib/design/Form/Fieldset.svelte"
	import ImageInput, { type ImageInputValue } from "$lib/design/Form/ImageInput.svelte"
	import TextInput from "$lib/design/Form/TextInput.svelte"
	import type { TrainerBio } from "../types"
	import NumberInput from "./NumberInput.svelte"
	
	export let biography: TrainerBio
	export let originalAvatarSrc: string | undefined
	export let avatar: ImageInputValue | undefined
	export let disabled: boolean
	export let isValid = true

	let species = biography.species
	let gender = biography.gender
	let age = biography.age
	let homeRegion = biography.homeRegion
	let background = biography.background

	const FIVE_HUNDRED_KB = 524288

	$: {
		biography = {
			species,
			gender,
			age,
			homeRegion,
			background,
		}
	}
</script>

<Fieldset title="Biography" columns={1}>
	<div class="grid">
		<TextInput name="species" label="Species" bind:value={species} placeholder="e.g. Human" {disabled} />
		<TextInput name="gender" label="Gender" bind:value={gender} {disabled} />
		<NumberInput name="age" label="Age" bind:value={age} {disabled} />
		<TextInput name="region" label="Home Region" bind:value={homeRegion} placeholder="e.g. Sinnoh" {disabled} />
		<TextInput name="Background" label="Background" bind:value={background} placeholder="e.g. Entertainer" {disabled} />
		<div class="image-input">
			<ImageInput name="avatar" label="Avatar" previousValue={originalAvatarSrc} bind:currentValue={avatar} maxbytes={FIVE_HUNDRED_KB} bind:isValid {disabled} />
		</div>
	</div>
</Fieldset>

<style>
	.grid {
		display: grid;
		grid-template-columns: auto 1fr;
		column-gap: 0.5em;
		row-gap: 0.5em;
		align-items: center;
		grid-column: span 2;
	}

	.image-input {
		grid-column: span 2;
		inline-size: 100%;
		block-size: 100%;
		max-inline-size: 9em;
		place-self: center;
	}

	@media screen and (min-width: 75rem) {
		.grid {
			grid-template-columns: auto 1fr 9em;
			block-size: 10em;
		}

		.image-input {
			grid-area: 1 / 3 / 7 / 3;
			inline-size: 100%;
			block-size: 100%;
		}
	}
</style>