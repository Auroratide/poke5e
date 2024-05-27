<script lang="ts">
	import { base } from "$app/paths"

	export let pokemon: {
		id: string,
		name: string,
	}[]
</script>

<h2>Can teach this to:</h2>
<ul>
	{#each pokemon as it}
		<li><a href="{base}/pokemon/{it.id}">{it.name}</a></li>
	{/each}
</ul>

<style>
	h2 {
		font-size: var(--font-sz-earth);
		font-weight: bold;
		margin-bottom: 0.5em;
	}

	ul {
		font-size: var(--font-sz-venus);
		column-count: 2;
	}
</style>