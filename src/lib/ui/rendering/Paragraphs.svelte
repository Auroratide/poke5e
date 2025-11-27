<script lang="ts">
	export let value = ""

	$: lines = value.split(/\n+/)
</script>

{#each lines as line}
	<p>{line}</p>
{/each}
