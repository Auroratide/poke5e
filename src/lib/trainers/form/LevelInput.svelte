<script lang="ts">
	export let value: number
	export let maxHitDice: number // pls bind this
	export let disabled: boolean

	// keep level and maxHitDice in sync unless they were different
	const onLevelChange = (e: Event) => {
		const target = e.target as HTMLInputElement
		if (value === maxHitDice) {
			maxHitDice = parseInt(target.value)
		}
		value = parseInt(target.value)
	}
</script>

<label for="level-input">Level</label>
<input name="level" id="level-input" type="number" min="1" max="20" {value} on:change={onLevelChange} {disabled} />