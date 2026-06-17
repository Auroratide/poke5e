<script lang="ts">
	import { TextField, WithButton } from "$lib/ui/forms"
	import type { TransferCode } from "./TransferCode"

	let {
		onsubmit,
		searching = false,
		error,
	}: {
		onsubmit: (code: TransferCode) => void
		searching?: boolean,
		error?: string,
	} = $props()

	let id = $state("")
	let upperedId = $derived(id.toLocaleUpperCase().replace(/[^a-zA-Z0-9.]/g, ""))

	const handleFormSubmit = (e: Event) => {
		e.preventDefault()
		onsubmit(upperedId)
	}
</script>

<form onsubmit={handleFormSubmit} class="vertical spaced-lg">
	<WithButton label="Search" type="submit">
		<TextField label="Transfer Code" bind:value={id} maxlength={15} placeholder="e.g. T.UD7NMQQD1LDE0M" disabled={searching} required />
	</WithButton>
	{#if error}
		<p class="font-sm error">{error}</p>
	{/if}
</form>

<style>
	.spaced-lg {
		margin-bottom: 1em;
	}

	.font-sm {
		font-size: 1rem;
	}

	.error {
		font-style: italic;
		color: var(--skin-danger-text);
	}

	.vertical {
		display: flex;
		flex-direction: column;
	}
</style>
