<script lang="ts">
	import { TagList } from "./TagList"
	import { Tag, TagList as ListOfTags } from "$lib/ui/elements"

	let {
		value,
	}: {
		value: TagList,
	} = $props()
</script>

<p>
	<strong>Tags:</strong>
	<ListOfTags>
		{#each value as tag}
			<Tag>{tag}</Tag>
		{/each}
	</ListOfTags>
</p>
