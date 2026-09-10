<script lang="ts" context="module">
	export type MarkdownFieldChangeEvent = CustomEvent<{ value: string }>
</script>

<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte"
	import { kebab } from "./kebab"

	const dispatch = createEventDispatcher()

	export let label: string
	export let value: string
	export let name: string | undefined = undefined
	export let disabled: boolean = false
	export let placeholder: string = ""
	export let rows: number = 4

	let isReady = false

	// textarea-markdown reads its initial value from its text content, so that text must
	// stop changing once the element exists; the value flows back out through events instead.
	let initialValue = value
	$: if (!isReady) initialValue = value

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`

	const valueOf = (e: Event) =>
		(e.target as HTMLElement & { value: string | null }).value ?? ""

	const onInput = (e: Event) => {
		value = valueOf(e)
	}

	const onChange = (e: Event) => {
		value = valueOf(e)

		dispatch("change", { value })
	}

	onMount(() => {
		customElements.whenDefined("textarea-markdown").then(() => {
			isReady = true
		})
	})
</script>

<div class="markdown-field">
	<label for="{id}">{label}</label>
	{#if isReady}
		<textarea-markdown {id} name="{kebabName}" {placeholder} {rows} {disabled} on:input={onInput} on:change={onChange}>{initialValue}</textarea-markdown>
	{:else}
		<textarea {id} name="{kebabName}" {placeholder} {rows} bind:value {disabled}></textarea>
	{/if}
</div>

<style>
	.markdown-field {
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

	textarea {
		inline-size: 100%;
		font-size: var(--font-sz-venus);
	}

	textarea-markdown {
		font-size: var(--font-sz-venus);
	}

	/* The shadow root is out of reach of the global input styles, so they are restated here. */
	textarea-markdown::part(textarea) {
		border: none;
		background-color: var(--skin-input-bg);
		padding: 0.5em 0.75em;
	}

	textarea-markdown::part(textarea):focus {
		background-color: var(--skin-content);
		outline: 0.125em solid var(--skin-focus);
	}

	:global(body.dark-mode) textarea-markdown::part(textarea) {
		color: var(--skin-bg-text);
	}

	textarea-markdown::part(button) {
		border: none;
		border-radius: 0.25em;
		background: none;
		color: inherit;
		opacity: 0.6;
	}

	textarea-markdown::part(button):hover,
	textarea-markdown::part(button):focus {
		background-color: var(--skin-input-bg);
		opacity: 1;
	}
</style>
