<script lang="ts">
	export let name: string
	export let label: string
	export let value: number
	export let disabled: boolean
</script>

<label for="{name}-input">{label}</label>
<input name="{name}" id="{name}-input" min="1" type="number" bind:value {disabled} />