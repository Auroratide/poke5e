<script lang="ts">
	import {
		Fieldset,
		IntField,
		TextField,
		ImageField,
		type ImageInputValue,
	} from "$lib/ui/forms"
	import type { TrainerBio } from "$lib/trainers/types"
	import { m } from "$lib/site/i18n"

	const FIVE_HUNDRED_KB = 524288

	export let biography: TrainerBio
	export let originalAvatarSrc: string | undefined
	export let avatar: ImageInputValue | undefined
	export let disabled: boolean = false
	export let isValid = true

	let {
		species,
		gender,
		age,
		homeRegion,
		background,
	} = biography

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

<Fieldset title="{m.biography()}">
	<div class="grid">
		<div style:grid-area="field1"><TextField label="{m.species()}" bind:value={species} placeholder="e.g. Human" {disabled} /></div>
		<div style:grid-area="field2"><TextField label="{m.gender()}" bind:value={gender} {disabled} /></div>
		<div style:grid-area="field3"><IntField label="{m.age()}" bind:value={age} {disabled} /></div>
		<div style:grid-area="field4"><TextField label="{m.homeRegion()}" bind:value={homeRegion} placeholder="{m.eG()} Sinnoh" {disabled} /></div>
		<div style:grid-area="field5"><TextField label="{m.background()}" bind:value={background} placeholder="{m.eG()} Entertainer" {disabled} /></div>
		<div style:grid-area="avatar" class="image-field"><ImageField label="{m.avatar()}" previousValue={originalAvatarSrc} bind:currentValue={avatar} maxbytes={FIVE_HUNDRED_KB} {disabled} bind:isValid /></div>
	</div>
</Fieldset>

<style>
	.grid {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.image-field {
		padding-block-start: 1.5em;
		max-width: 10em;
		margin: auto;
	}

	@media screen and (min-width: 75rem) {
		.grid {
			display: grid;
			grid-template-columns: 1fr 11.25em;
			grid-auto-rows: 3.75em;
			grid-template-areas:
				"field1 avatar"
				"field2 avatar"
				"field3 avatar"
				"field4 field4"
				"field5 field5";
			gap: 0.75em;
		}

		.image-field {
			padding-block-start: 2.25em;
			margin: 0;
			max-width: none;
		}
	}
</style>