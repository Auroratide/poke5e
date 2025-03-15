<script lang="ts">
	import { onDestroy } from "svelte"

	export let name: string
	export let label: string
	export let disabled: boolean = false
	export let previousValue: string | undefined = undefined
	export let currentValue: File | undefined

	let previewSrc = ""

	$: srcToShow = previewSrc ? previewSrc : previousValue

	const onChange = (e: Event) => {
		const input = e.target as HTMLInputElement
		const [file] = input.files
		if (previewSrc) URL.revokeObjectURL(previewSrc)
		if (file) previewSrc = URL.createObjectURL(file)
		else previewSrc = ""
		currentValue = file
	}

	onDestroy(() => {
		if (previewSrc) URL.revokeObjectURL(previewSrc)
	})
</script>

<div class="image-uploader">
	<div class="placeholder"></div>
	<div class="text">
		<label for="{name}-input">{label}</label>
		<span>Select File</span>
	</div>
	<input id="{name}-input" {name} type="file" accept="image/*" on:change={onChange} {disabled} />
	{#if srcToShow}
		<img src="{srcToShow}" alt="Upload Preview" />
	{/if}
</div>

<style>
	.image-uploader {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		inline-size: 100%;
		block-size: 100%;
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
	}

	img {
		display: block;
		inline-size: 100%;
		block-size: 100%;
		object-fit: cover;
		transition: opacity 0.125s ease-in-out;
	}

	input:hover ~ img {
		opacity: 0.175;
	}
</style>
