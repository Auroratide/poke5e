<script lang="ts">
	import { Tag, TagList } from "$lib/ui/elements"

	export let values: string[]
</script>

<TagList>
	{#each values as value}
		<Tag>{value}</Tag>
	{/each}
</TagList>
