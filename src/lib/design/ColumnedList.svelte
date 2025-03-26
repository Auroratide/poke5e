<script lang="ts" generics="T">
	export let items: T[]
	export let columns = 3
</script>

<ul style:--column-count="{columns}">
	{#each items as item}
		<li><slot {item}>{item}</slot></li>
	{/each}
</ul>

<style>
	ul {
		font-size: var(--font-sz-venus);
		column-count: var(--column-count);
		line-height: 1.25;
	}
</style>
