<script lang="ts">
	import { TagList } from "./TagList"
	import { Tag, TagList as ListOfTags, Button } from "$lib/ui/elements"
	import { EditIcon } from "$lib/ui/icons"
	import TagListField from "./TagListField.svelte"

	let {
		value,
		onsave,
	}: {
		value: TagList,
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
	<TagListField label="Tags" bind:value={valueToEdit} possibleTags={[]} />
	<Button variant="ghost" on:click={onCancel}>Cancel</Button>
	<Button on:click={onSave}>Save</Button>
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
