<script lang="ts">
	import { TextField, MarkdownField } from "$lib/ui/forms"

	export let level: string
	export let name: string | undefined = undefined
	export let description: string
	export let disabled: boolean = false
</script>

{#if name != null}
	<TextField label="Level {level} Feature Name" bind:value={name} {disabled} />
{/if}
<MarkdownField label="Level {level} Feature Description" bind:value={description} {disabled} />
