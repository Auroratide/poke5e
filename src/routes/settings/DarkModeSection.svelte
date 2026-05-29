<script lang="ts">
	import { DayNightModeToggle } from "$lib/ui/theme"
</script>

<section>
	<h2 id="light-dark-colors">Light/Dark Colors</h2>
	<p>This changes the overall theme of the website between what is commonly called "Dark Mode" and "Light Mode".</p>
	<ul>
		<li><strong>Day</strong>: Uses bright colors (default)</li>
		<li><strong>Night</strong>: Uses dark colors</li>
	</ul>
	<div class="centered larger">
		<DayNightModeToggle />
	</div>
</section>

<style>
	.centered { text-align: center; }
	.larger { font-size: var(--font-sz-neptune); }
</style>
