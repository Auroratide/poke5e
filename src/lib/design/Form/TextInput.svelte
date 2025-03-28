<script lang="ts">
	export let name: string
	export let label: string
	export let value: string
	export let disabled: boolean = false
	export let placeholder: string = ""
</script>

<label for="{name}-input">{label}</label>
<input {name} id="{name}-input" type="text" {placeholder} bind:value {disabled} />
