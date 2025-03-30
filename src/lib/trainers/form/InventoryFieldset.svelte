<script lang="ts">
	import Fieldset from "$lib/design/Form/Fieldset.svelte"

	export let money: number
	export let disabled: boolean
</script>

<Fieldset title="Inventory">
	<label for="money-input">Money</label>
	<span>
		<span>₽</span>
		<input id="money-input" type="number" name="money" bind:value={money} step="1" max="2000000000" min="-2000000000" {disabled} required />
	</span>
</Fieldset>
