<script lang="ts">
	import Button from "$lib/design/Button.svelte"
	
	export let label: string
	export let variant: "solid" | "ghost" | "danger" = "solid"
	export let type: "submit" | "button" | "reset" = "button"
	export let disabled: boolean = false
</script>

<div class="with-button">
	<div class="flex">
		<slot></slot>
	</div>
	<div class="end">
		<Button on:click {variant} {type} {disabled}>{label}</Button>
	</div>
</div>

<style>
	.with-button {
		display: flex;
		gap: 0.5em;
	}

	.end {
		align-self: flex-end;
		padding-block: 0.25em;
	}

	.flex { flex: 1; }
</style>