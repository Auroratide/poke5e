<script lang="ts">
	export let label: string
	export let value: string
	export let disabled: boolean

	$: id = label.toLocaleLowerCase()
</script>

<label for="{id}-input">{label}</label>
<input name="{id}" id="{id}-input" type="text" bind:value {disabled} />
