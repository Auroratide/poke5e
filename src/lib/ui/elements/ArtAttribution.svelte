<script lang="ts">
	import { type SpeciesMediaTypeAttribution } from "$lib/poke5e/species/media"
	import { isNotBlank, isUrl } from "$lib/utils/string"

	export let value: SpeciesMediaTypeAttribution
</script>

{#if value.type === "ai" && !isNotBlank(value.name)}
	AI Generated
{:else}
	{#if isNotBlank(value.name)}
		{value.type === "ai" ? "AI: " : "By "}
		{#if isNotBlank(value.href) && isUrl(value.href)}
			<a href="{value.href}">{value.name}</a>
		{:else}
			{value.name}
		{/if}
	{/if}
{/if}
