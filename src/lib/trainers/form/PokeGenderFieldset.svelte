<script lang="ts">
	import Fieldset from "$lib/design/Form/Fieldset.svelte"
	import { Gender } from "../types"

	export let value: Gender
	export let disabled: boolean
</script>

<Fieldset title="Gender" columns={4}>
	<input value={Gender.Male} type="radio" id="gender-input-male" name="gender" bind:group={value} {disabled} />
	<label for="gender-input-male">Male</label>
	<input value={Gender.Female} type="radio" id="gender-input-female" name="gender" bind:group={value} {disabled} />
	<label for="gender-input-female">Female</label>
	<input value={Gender.None} type="radio" id="gender-input-none" name="gender" bind:group={value} {disabled} />
	<label for="gender-input-none">None</label>
	<input value={Gender.Other} type="radio" id="gender-input-other" name="gender" bind:group={value} {disabled} />
	<label for="gender-input-other">Other</label>
</Fieldset>
