<script lang="ts">
	import { TagList } from "./TagList"
	import { Tag } from "$lib/ui/elements"
	import { ComboboxField, WithButton } from "$lib/ui/forms"
	import { flip } from "svelte/animate"

	let {
		label,
		value = $bindable(),
		possibleTags,
	}: {
		label: string,
		value: TagList,
		possibleTags: string[],
	} = $props()

	let comboboxValue = $state("")
	let comboboxOptions = $derived(possibleTags.filter((it) => !TagList.has(value, it)))

	const onRemove = (tag: string) => () => {
		value = TagList.remove(value, tag)
	}

	const onAdd = (tag: string) => {
		value = TagList.add(value, tag)
		comboboxValue = ""
	}

	const onAddViaButton = () => {
		value = TagList.add(value, comboboxValue)
		comboboxValue = ""
	}
</script>

<div class="tag-list-field">
	<WithButton label="Add" on:click={onAddViaButton} disabled={comboboxValue.trim().length === 0}>
		<ComboboxField {label} bind:value={comboboxValue} options={comboboxOptions} onconfirm={onAdd} />
	</WithButton>
	<ul>
		{#each value as tag (tag)}
			<li animate:flip={{ duration: 125 }}>
				<Tag>
					<button slot="icon" onclick={onRemove(tag)}>&times;</button>
					<span>{tag}</span>
				</Tag>
			</li>
		{/each}
	</ul>
</div>

<style>
	.tag-list-field {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	button {
		display: block;
		background: var(--skin-bg);
		color: var(--skin-bg-text);
		border: none;
		margin: 0;
		padding: 0;
		inline-size: 100%;
		cursor: pointer;
	} button:hover, button:focus {
		filter: brightness(1.5);
	}

	ul {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		padding: 0;
		gap: 0.125em 0.25em;
		font-size: 1.125em;
	}
</style>