<script lang="ts" context="module">
	export type ImageInputValue = {
		type: "new",
		value: File,
		href: string,
	} | {
		type: "remove",
	}
</script>

<script lang="ts">
	import { onDestroy } from "svelte"
	import { Button } from "$lib/ui/elements"
	import { kebab } from "./kebab"

	const DEFAULT_MAX_BYTES = 524288 // 500 KB

	export let label: string
	export let name: string | undefined = undefined
	export let disabled: boolean = false
	export let previousValue: string | undefined = undefined
	export let currentValue: ImageInputValue | undefined
	export let maxbytes: number = DEFAULT_MAX_BYTES
	export let isValid = true

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`
	
	let inputElem: HTMLInputElement | null = null
	let previewSrc = ""
	let error: string | undefined = undefined

	$: srcToShow = currentValue?.type === "remove" ? "" : (previewSrc ? previewSrc : previousValue)
	$: canRemove = (previousValue != null || currentValue != null) && currentValue?.type !== "remove"
	$: isDragging = false

	const prettyPrintBytes = (bytes: number) => {
		if (bytes < 1024) {
			return `${bytes} bytes`
		} else if (bytes < 1048576) {
			return `${(bytes / 1024).toFixed(0)} KB`
		} else {
			return `${(bytes / 1048576).toFixed(0)} MB`
		}
	}

	const loadFile = (file: File) => {
		if (previewSrc) URL.revokeObjectURL(previewSrc)
		if (file) previewSrc = URL.createObjectURL(file)
		else previewSrc = ""
		currentValue = {
			type: "new",
			value: file,
			href: previewSrc,
		}

		if (file.size > maxbytes) {
			isValid = false
			error = `File is too large. Must be less than ${prettyPrintBytes(maxbytes)}.`
		} else {
			isValid = true
			error = undefined
		}
	}

	const onChange = (e: Event) => {
		const input = e.target as HTMLInputElement
		const [file] = input.files
		loadFile(file);
	}

	const onDrop = (e: DragEvent) => {
		e.preventDefault()
		if (!e.dataTransfer) return
		const [file] = e.dataTransfer.files
		loadFile(file);
		isDragging = false
	}

	const onDragEnter = (e: DragEvent) => {
		e.preventDefault()
		isDragging = true
	}

	const onDragLeave = (e: DragEvent) => {
		e.preventDefault()
		isDragging = false
	}

	const onRemove = () => {
		currentValue = {
			type: "remove",
		}
		isValid = true
		error = undefined
		if (previewSrc) URL.revokeObjectURL(previewSrc)
		previewSrc = ""
		
		if (inputElem) inputElem.value = null
	}

	onDestroy(() => {
		if (previewSrc) URL.revokeObjectURL(previewSrc)
	})
</script>

<div class="image-uploader-container">
	<div class="image-uploader">
		<div class="placeholder"></div>
		{#if isDragging}
			<div class="text">
				<span>Drop it here!</span>
			</div>
		{:else}
			<div class="text">
				<label for="{id}">{label}</label>
				<span>Select File</span>
				{#if maxbytes}
					<span class="smaller">(Max {prettyPrintBytes(maxbytes)})</span>
				{/if}
			</div>
		{/if}
		<input bind:this={inputElem} {id} name="{kebabName}" type="file" accept="image/*" on:change={onChange} on:drop={onDrop} on:dragenter={onDragEnter} on:dragleave={onDragLeave} {disabled} />
		{#if srcToShow && !isDragging}
			<img src="{srcToShow}" alt="Upload Preview" />
		{/if}
		{#if error}
			<div class="error">
				<p>{error}</p>
			</div>
		{/if}
	</div>
	<div class="remove-image" class:hide={!canRemove}>
		<Button variant="ghost" on:click={onRemove}>Remove Avatar</Button>
	</div>
</div>

<style>
	.image-uploader-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.25em;
		inline-size: 100%;
		block-size: 100%;
	}

	.image-uploader {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		inline-size: 100%;
		aspect-ratio: 1;
		place-items: center;
		border: 0.125em solid var(--skin-input-bg);
		padding: 0.25em;
	}

	.image-uploader:focus-within {
		border-color: var(--skin-focus);
	}

	.image-uploader > * {
		grid-area: 1 / 1;
		position: relative;
	}

	.placeholder {
		background: var(--skin-input-bg);
		inline-size: 100%;
		block-size: 100%;
	}

	input {
		opacity: 0.001;
		inline-size: 100%;
		block-size: 100%;
		cursor: pointer;
		z-index: 2;
	}

	label {
		font-weight: bold;
	}

	.text {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.125em;
	}

	img {
		display: block;
		inline-size: 100%;
		block-size: 100%;
		aspect-ratio: 1;
		object-fit: contain;
		transition: opacity 0.125s ease-in-out;
		background-color: var(--skin-input-bg);
	}

	input:hover ~ img {
		opacity: 0.175;
	}

	.error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 0.25em;
		inline-size: 100%;
		block-size: 100%;
		background: hsl(var(--red-hsl) / 0.75);
	}

	.error p {
		font-size: var(--font-sz-venus);
		background: var(--skin-bg-text);
		border: 0.125em solid var(--red-dark);
		padding: 0.25em;
		margin: 0;
	}

	.remove-image {
		font-size: var(--font-sz-venus);
	}

	.hide { visibility: hidden; }

	.smaller { font-size: var(--font-sz-venus); }
</style>
