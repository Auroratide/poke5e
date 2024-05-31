<script lang="ts">
	export let name: string
	export let label: string
	export let value: string
	export let placeholder: string
	export let disabled: boolean
</script>

<div class="stacked">
	<label for="{name}-input">{label}</label>
	<textarea {name} id="{name}-input" bind:value rows="6" class="font-sm" {placeholder} {disabled}></textarea>
</div>

<style>
	.stacked {
		grid-column: span 2;
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	.font-sm {
		font-size: var(--font-sz-venus);
	}
</style>
