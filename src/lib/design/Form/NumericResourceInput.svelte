<script lang="ts" context="module">
	export type ChangeDetail = {
		value: number
	}

	const DEBOUNCE_PERIOD_MS = 500
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	export let id: string
	export let value: number
	export let disabled: boolean = false

	const debounceTimerId = { current: -1 }

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

	const onKeyDown = (e: KeyboardEvent) => {
		const target = e.target as HTMLInputElement
		const currentValue = parseInt(target.value)
		if (isNaN(currentValue)) return

		const save = () => {
			clearTimeout(debounceTimerId.current)
			debounceTimerId.current = window.setTimeout(() => {
				dispatch("change", { value } as ChangeDetail)
			}, DEBOUNCE_PERIOD_MS)
		}

		if (e.key === "ArrowDown") {
			value = currentValue - 1
			save()
		} else if (e.key === "ArrowUp") {
			value = currentValue + 1
			save()
		}
	}
</script>

<input {id} type="text" {value} on:change={onChange} on:input={onInput} on:keydown={onKeyDown} style:width="{width + 1}ch" {disabled} autocomplete="off" />

<style>
	input {
		min-width: var(--input-min-width, 100%);
		padding: 0.1em 0.25em;
	}
</style>