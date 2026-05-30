<script lang="ts">
	import { m } from "$lib/site/i18n"

	let {
		inline = false,
	}: {
		inline?: boolean,
	} = $props()
</script>

<p class="no-tags" class:inline>{m.noTagsYet()}</p>

<style>
	.no-tags {
		font-size: var(--font-sz-venus);
		font-style: italic;
		opacity: 0.875;
	}

	.no-tags.inline {
		display: inline;
		margin: 0;
	}
</style>