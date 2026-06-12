<script lang="ts">
	import { Url } from "$lib/site/url"
	import Tag from "./Tag.svelte"

	let {
		name,
	}: {
		name: string,
	} = $props()
</script>

<p class="beta-statement"><Tag>New!</Tag><span>This {name} is being playtested. If you have <a href="{Url.feedback()}">feedback</a>, let us know!</span></p>

<style>
	.beta-statement {
		font-size: var(--font-sz-venus);
	} .beta-statement span {
		padding-inline-start: 0.25em;
	}
</style>
