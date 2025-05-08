<script lang="ts">
	import FlatDl from "$lib/design/FlatDl.svelte"
</script>

<p>You are a level 2 trainer trying to capture a full-health Level 2 Caterpie you just found. You use a Pokéball. The DC is calculated as follows:</p>
<div class="indent">
	<FlatDl>
		<dt>Base</dt>
		<dd>+10</dd>
		<dt>SR</dt>
		<dd>+0 (1/8 rounded down)</dd>
		<dt>Level</dt>
		<dd>+2</dd>
		<dt>Total</dt>
		<dd><strong>= 12 DC</strong></dd>
	</FlatDl>
</div>
<p>You are a level 10 trainer trying to capture a level 10 Butterfree. You weaken it to below half health before using a Great Ball. The DC is calculated as follows:</p>
<div class="indent">
	<FlatDl>
		<dt>Base</dt>
		<dd>+10</dd>
		<dt>SR</dt>
		<dd>+6</dd>
		<dt>Level</dt>
		<dd>+10</dd>
		<dt>HP</dt>
		<dd>-5 (below half)</dd>
		<dt>Ball</dt>
		<dd>-5 (Great Ball)</dd>
		<dt>Total</dt>
		<dd><strong>= 16 DC</strong></dd>
	</FlatDl>
</div>
<p>You are a level 6 trainer trying to capture a level 5 Orthworm. You attempt to use a Safari Ball; your INT score is 16, and you are proficient in Nature. The DC is calculated as follows:</p>
<div class="indent">
	<FlatDl>
		<dt>Base</dt>
		<dd>+10</dd>
		<dt>SR</dt>
		<dd>+9</dd>
		<dt>Level</dt>
		<dd>+5</dd>
		<dt>Ball</dt>
		<dd>-6 (3 from INT, 3 from proficiency)</dd>
		<dt>Total</dt>
		<dd><strong>= 18 DC</strong></dd>
	</FlatDl>
</div>

<style>
	.indent {
		padding-inline-start: 1em;
	}
</style>
