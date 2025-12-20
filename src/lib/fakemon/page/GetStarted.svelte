<script lang="ts">
	import { Button } from "$lib/ui/elements"
	import { Url } from "$lib/site/url"
	import { PageAction } from "./actions"
</script>

<div class="scrollable">
	<section class="larger center more-space">
		<p>Here, you can manage custom Pokémon for your campaign!</p>
		<p>Create a fakémon to get started:</p>
		<p class="larger more-space"><Button href={Url.fakemon(undefined, PageAction.add)}>Create Fakémon</Button></p>
	</section>
</div>

<style>
	.scrollable { overflow-y: auto; }

	.larger {
		font-size: var(--font-sz-neptune);
	}

	.center { text-align: center; }

	.more-space { margin-block: 2em; }
</style>
