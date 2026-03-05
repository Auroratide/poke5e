<script lang="ts">
	import { Tag, TagList } from "$lib/ui/elements"
	import { capitalize } from "$lib/utils/string"
	import type { BiomeId } from "./Biome"
	import { BiomesStore } from "./store"

	export let values: BiomeId[]
</script>

<TagList>
	{#each values as value}
		<Tag color="{value}">{$BiomesStore?.find((it) => it.id === value)?.name ?? capitalize(value)}</Tag>
	{/each}
</TagList>
