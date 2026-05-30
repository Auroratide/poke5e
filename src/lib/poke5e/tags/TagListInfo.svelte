<script lang="ts">
	import { TagList } from "./TagList"
	import { Tag, TagList as ListOfTags, Button, ButtonRow } from "$lib/ui/elements"
	import { EditIcon } from "$lib/ui/icons"
	import TagListField from "./TagListField.svelte"
	import { FormGroup } from "$lib/ui/forms"
	import { m } from "$lib/site/i18n"

	let {
		value,
		possibleTags,
		onsave,
	}: {
		value: TagList,
		possibleTags: string[],
		onsave?: (newList: TagList) => Promise<void>,
	} = $props()

	let showEditor = $state(false)
	let valueToEdit = $derived(TagList.copy(value))

	const onEdit = () => {
		showEditor = true
		valueToEdit = TagList.copy(value)
	}

	const onCancel = () => {
		showEditor = false
	}

	const onSave = async () => {
		await onsave?.(valueToEdit)
		showEditor = false
	}
</script>

{#if showEditor}
	<FormGroup>
		<TagListField label={m.tags()} bind:value={valueToEdit} {possibleTags} />
		<ButtonRow>
			<Button variant="subtle" on:click={onCancel}>Cancel</Button>
			<Button on:click={onSave}>Save Tags</Button>
		</ButtonRow>
	</FormGroup>
{:else}
	<p>
		<strong>Tags:</strong>
		<ListOfTags>
			{#each value as tag}
				<Tag>{tag}</Tag>
			{/each}
			{#if onsave}
				<button onclick={onEdit}>
					<Tag color="success">
						<EditIcon slot="icon" />
						<span>Edit</span>
					</Tag>
				</button>
			{/if}
		</ListOfTags>
	</p>
{/if}

<style>
	button {
		cursor: pointer;
		display: inline;
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		block-size: 1.25em;
	}

	button:hover, button:focus {
		filter: brightness(1.25);
	}
</style>
