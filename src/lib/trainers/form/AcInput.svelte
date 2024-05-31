<script lang="ts">
	export let value: number
	export let disabled: boolean
</script>

<label for="ac-input">AC</label>
<input name="ac" id="ac-input" min="0" max="30" type="number" bind:value {disabled} />
