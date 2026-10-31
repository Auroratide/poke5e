<script lang="ts">
	import type { SpeciesForms } from "./SpeciesForms"
	import { m } from "$lib/site/i18n"
	import { Markdown } from "$lib/ui/rendering"

	export let value: SpeciesForms | undefined
</script>

{#if value != null}
	<section>
		<h2>{m["pokemon.forms"]()}</h2>
		<div class="smaller">
			<Markdown value={value.description} />
		</div>
	</section>
{/if}

<style>
	.smaller { font-size: var(--font-sz-venus); }
</style>
