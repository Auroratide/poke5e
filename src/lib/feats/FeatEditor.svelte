<script lang="ts">
	import { Removable, SelectField, MarkdownField, TextField, Divider } from "$lib/design/forms"
	import type { ChosenFeat } from "./ChosenFeat"

	export let value: ChosenFeat
	export let custom: boolean = false
	export let options: { name: string, value: string, placeholder: string }[]
	export let disabled: boolean = false
</script>

<div class="feat-editor">
	<Removable on:remove>
		{#if custom}
			<TextField label="Feat" name="feat-name-{value.id}" bind:value={value.name} {disabled} />
		{:else}
			<SelectField label="Feat" name="feat-name-{value.id}" bind:value={value.name} {options} {disabled} />
		{/if}
	</Removable>
	{#if custom}
		<MarkdownField label="Feat Description" name="feat-description-{value.id}" bind:value={value.description} placeholder="Provide a custom description" rows={6} {disabled} />
	{:else}
		<MarkdownField label="Notes" name="feat-description-{value.id}" bind:value={value.description} placeholder="Any additional notes" rows={3} {disabled} />
	{/if}
	<Divider />
</div>

<style>
	.feat-editor {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>