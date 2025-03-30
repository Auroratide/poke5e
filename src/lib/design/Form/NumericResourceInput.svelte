<script lang="ts" context="module">
	export type ChangeDetail = {
		value: number
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	export let id: string
	export let value: number
	export let disabled: boolean = false

	$: width = value?.toString()?.length ?? 0

	const onChange = (e: Event) => {
		const target = e.target as HTMLInputElement
		const addOrSubtractPattern = /(\d+)\s*(\+|-)\s*(\d+)/
		const expression = target.value.match(addOrSubtractPattern)
		if (expression != null) {
			value = parseFloat(expression[1]) + parseFloat(expression[2] + expression[3])
		} else {
			const numericValue = parseFloat(target.value)
			value = isNaN(numericValue) ? 0 : numericValue
		}

		dispatch("change", { value } as ChangeDetail)
	}

	const onInput = (e: Event) => {
		const target = e.target as HTMLInputElement
		width = target.value.length
	}
</script>

<input {id} type="text" {value} on:change={onChange} on:input={onInput} style:width="{width + 1}ch" {disabled} />

<style>
	input {
		min-width: var(--input-min-width, 100%);
	}
</style>