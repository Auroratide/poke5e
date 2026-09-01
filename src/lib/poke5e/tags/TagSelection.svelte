<script lang="ts">
	import type { TagList } from "./TagList"
	import { kebab } from "$lib/ui/forms"
	import NoTags from "./NoTags.svelte"
	import TogglePill from "$lib/ui/elements/TogglePill.svelte"
	import VisuallyHidden from "$lib/ui/elements/VisuallyHidden.svelte"
	import type { TagSelectionMode } from "./TagSelectionMode"

	let {
		checked = $bindable(),
		mode = $bindable(),
		tags,
	}: {
		checked: string[],
		mode: TagSelectionMode,
		tags: TagList,
	} = $props()

	// Every id below is namespaced per instance. Hardcoded ids were fine while
	// only one of these existed per page, but the party filter and the Box filter
	// now sit on the same page, and two inputs sharing an id means a label drives
	// whichever one the document reaches first -- silently, with no error.
	const uid = $props.id()
</script>

<div class="tag-selection">
	<fieldset>
		<legend>Tags Filter</legend>
		<div class="mode-toggle">
			<TogglePill
				id="{uid}-mode-toggle"
				leftlabel="All"
				leftvalue="all"
				rightlabel="Any"
				rightvalue="any"
				bind:group={mode}
			>
				{#snippet legend()}
					<VisuallyHidden>Tag Mode</VisuallyHidden>
				{/snippet}
			</TogglePill>
		</div>
		<div class="tags">
			{#each tags as tag}
				<input id="{uid}-{kebab(tag)}" class="visually-hidden" type="checkbox" bind:group={checked} value="{tag}" />
				<label for="{uid}-{kebab(tag)}" class="tag">
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
		display: grid;
		grid-template-columns: auto 1fr;
		row-gap: 0.5em;
	}

	fieldset {
		border: none;
		inline-size: 100%;
		padding: 0;
		display: contents;
	}

	legend {
		display: block;
		padding: 0;
		font-size: var(--font-sz-venus);
		font-weight: bold;
		margin-block-end: 0;
		place-self: center;
	}

	.mode-toggle {
		font-size: var(--font-sz-venus);
		filter: invert(1);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25em;
		grid-column: span 2;
	}

	.tag {
		position: relative;
		font-size: var(--font-sz-venus);
		display: inline-flex;
		flex-direction: row;
		background: var(--skin-bg-text);
		color: var(--skin-bg);
		text-transform: capitalize;
		overflow: hidden;
		border-radius: 0.25em;
		line-height: 1;
		padding-inline: 0.375em;
		padding-block: 0.125em;
		cursor: pointer;
	}

	input:focus + .tag {
		outline: 0.125em solid var(--skin-focus);
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