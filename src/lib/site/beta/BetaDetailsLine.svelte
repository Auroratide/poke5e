<script lang="ts">
	import { Tag } from "$lib/ui/elements"
	import { Url } from "../url"
	import type { BetaDetails } from "./BetaDetails"

	let {
		value,
	}: {
		value: BetaDetails,
	} = $props()
</script>

<p class="beta-details-line"><Tag>{value.tag}!</Tag><span>{value.details} If you have <a href="{Url.feedback()}">feedback</a>, let us know!</span></p>

<style>
	.beta-details-line {
		font-size: var(--font-sz-venus);
	} .beta-details-line span {
		padding-inline-start: 0.25em;
	}
</style>