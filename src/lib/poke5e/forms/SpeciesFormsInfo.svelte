<script lang="ts">
	import type { SpeciesForms } from "./SpeciesForms"
	import { m } from "$lib/site/i18n"

	export let value: SpeciesForms | undefined
</script>

{#if value != null}
	<section>
		<h2>{m["pokemon.forms"]()}</h2>
		<p>{value.description}</p>
	</section>
{/if}

<style>
	p { font-size: var(--font-sz-venus); }
</style>
