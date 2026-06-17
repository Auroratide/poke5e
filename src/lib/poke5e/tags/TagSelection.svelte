<script lang="ts">
	import type { TagList } from "./TagList"
	import { kebab } from "$lib/ui/forms"
	import NoTags from "./NoTags.svelte"

	let {
		checked = $bindable(),
		tags,
	}: {
		checked: string[],
		tags: TagList,
	} = $props()
</script>

<div class="tag-selection">
<fieldset>
	<legend>Tags Filter</legend>
	<div class="tags">
		{#each tags as tag}
			<input id="tag-selection-{kebab(tag)}" class="visually-hidden" type="checkbox" bind:group={checked} value="{tag}" />
			<label for="tag-selection-{kebab(tag)}" class="tag">
				<span class="tag-text">{tag}</span>
				<span class="simulate-bold-space">{tag}</span>
			</label>
		{/each}
		{#if tags.length === 0}
			<NoTags />
		{/if}
	</div>
</fieldset>
</div>

<style>
	.tag-selection {
		position: relative;
		margin-block-end: 0.5em;
		grid-column: span 2;
	}

	fieldset {
		border: none;
		inline-size: 100%;
		padding: 0;
	}

	legend {
		display: block;
		padding: 0;
		font-size: var(--font-sz-venus);
		font-weight: bold;
		margin-block-end: 0.5em;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25em;
	}

	.tag {
		position: relative;
		font-size: var(--font-sz-venus);
		display: inline-flex;
		flex-direction: row;
		color: var(--skin-bg);
		text-transform: capitalize;
		overflow: hidden;
		border-radius: 0.25em;
		line-height: 1;
		padding-inline: 0.375em;
		padding-block: 0.125em;
		background: var(--skin-input-bg);
		color: var(--skin-bg);
		cursor: pointer;
	}

	input:checked + .tag {
		background: var(--skin-bg);
		color: var(--skin-bg-text);
		opacity: 1;
		font-weight: bold;
	}

	.simulate-bold-space {
		visibility: hidden;
		font-weight: bold;
	}

	.tag-text {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>