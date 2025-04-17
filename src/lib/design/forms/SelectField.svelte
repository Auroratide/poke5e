<script lang="ts">
	import { kebab } from "./kebab"

	export let label: string
	export let value: string
	export let options: {
		name: string,
		values: {
			name: string,
			value: string,
		}[],
	}[]
	export let name: string | undefined = undefined
	export let disabled: boolean = false

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`
</script>

<div class="select-field">
	<label for="{id}">{label}</label>
	<select {id} bind:value style:flex="1" {disabled}>
		{#each options as group}
			<optgroup label="{group.name}">
				{#each group.values as option (option.value)}
					<option value="{option.value}">{option.name}</option>
				{/each}
			</optgroup>
		{/each}
	</select>
</div>

<style>
	.select-field {
		display: flex;
		flex-direction: column;
		gap: 0.125em;
	}

	label {
		display: block;
		font-weight: bold;
		font-size: var(--font-sz-venus);
		letter-spacing: -0.04em;
	}

	select {
		inline-size: 100%;
	}
</style>
