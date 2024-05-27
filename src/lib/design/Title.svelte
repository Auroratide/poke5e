<script lang="ts">
	export let value: string = ""

	$: title = value.length > 0 ? `${value} | ` : ""
</script>

<svelte:head>
	<title>{title}Pokemon 5e Reference</title>
</svelte:head>
