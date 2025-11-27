<script lang="ts">
	export let equals: string
	export let expression: string
</script>

<div class="formula">
	<p><code><strong>{equals}</strong> = {expression}</code></p>
</div>

<style>
	.formula {
		text-align: center;
		font-size: var(--font-sz-venus);
	}
</style>
