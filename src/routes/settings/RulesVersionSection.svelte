<script lang="ts">
	import { RulesVersionToggle } from "$lib/design/rules-version"
	import VisuallyHidden from "$lib/design/VisuallyHidden.svelte"
	import { Url } from "$lib/url"
</script>

<section>
	<h2>Rules Version</h2>
	<p>There are two versions of Pokémon 5e:</p>
	<ul>
		<li><strong>2018</strong>: The original version maintained in 2018 that was eventually discontnued.</li>
		<li><strong>2024</strong>: The current version, updated to follow D&D 2024 and include newer Pokémon content and mechanics.</li>
	</ul>
	<p>You may change version using the toggle below. Refer to the <a href="{Url.reference.introduction()}">Reference</a> for more details.</p>
	<p class="centered larger">
		<RulesVersionToggle>
			<VisuallyHidden slot="legend">
				Change Version
			</VisuallyHidden>
		</RulesVersionToggle>
	</p>
</section>

<style>
	.centered { text-align: center; }
	.larger { font-size: var(--font-sz-neptune); }
</style>
