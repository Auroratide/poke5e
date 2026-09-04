<script lang="ts">
	import { EditionToggle } from "$lib/site/edition"
	import { VisuallyHidden } from "$lib/ui/elements"
	import { Url } from "$lib/site/url"
</script>

<section>
	<h2 id="rules-version">Edition</h2>
	<p>There are two editions of Pokémon 5e:</p>
	<ul>
		<li><strong>2018</strong>: The original edition maintained in 2018 that was eventually discontinued.</li>
		<li><strong>2024</strong>: The current edition, updated to follow D&D 2024 and include newer Pokémon content and mechanics. This edition receives incremental updates based on player feedback.</li>
	</ul>
	<p>You may change edition using the toggle below. Refer to the <a href="{Url.reference.introduction()}">Reference</a> for more details.</p>
	<div class="centered larger">
		<EditionToggle>
			{#snippet legend()}
				<VisuallyHidden>
					Change Edition
				</VisuallyHidden>
			{/snippet}
		</EditionToggle>
	</div>
</section>

<style>
	.centered { text-align: center; }
	.larger { font-size: var(--font-sz-neptune); }
</style>
