<script lang="ts">
	export let value: number
</script>

<span class="level">
	<span class="level-text">Lv.</span>
	<span class="level-number">{value}</span>
</span>

<style>
	.level { justify-self: right; }
	.level-text { font-size: var(--font-sz-venus); }
	.level-number { font-size: var(--font-sz-neptune); }
</style>
