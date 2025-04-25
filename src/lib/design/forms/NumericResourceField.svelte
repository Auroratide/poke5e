<script lang="ts" context="module">
	export type ChangeDetail = {
		value: number
	}

	const DEBOUNCE_PERIOD_MS = 500
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import ChevronUp from "../icon/ChevronUp.svelte"
	import ChevronDown from "../icon/ChevronDown.svelte"

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

	const updateValueBy = (amount: number) => {
		value += amount

		clearTimeout(debounceTimerId.current)
		debounceTimerId.current = window.setTimeout(() => {
			dispatch("change", { value } as ChangeDetail)
		}, DEBOUNCE_PERIOD_MS)
	}

	const decrement = () => updateValueBy(-1)
	const increment = () => updateValueBy(1)

	const onKeyDown = (e: KeyboardEvent) => {
		const target = e.target as HTMLInputElement
		const currentValue = parseInt(target.value)
		if (isNaN(currentValue)) return

		if (e.key === "ArrowDown") {
			decrement()
		} else if (e.key === "ArrowUp") {
			increment()
		}
	}
</script>

<span class="numeric-resource-field" style:width="{width + 2.5}ch">
	<input {id} type="text" {value} on:change={onChange} on:input={onInput} on:keydown={onKeyDown} {disabled} autocomplete="off" />
	<span class="buttons" style:--skin-local-stroke="black">
		<button on:click={increment} tabindex="-1"><ChevronUp label="increment" /></button>
		<button on:click={decrement} tabindex="-1"><ChevronDown label="decrement" /></button>
	</span>
</span>

<style>
	.numeric-resource-field {
		min-width: var(--input-min-width, 100%);
		display: inline-flex;
		position: relative;
	}

	input {
		display: inline-block;
		inline-size: 100%;
		padding: 0.1em 0.75em 0.1em 0.25em;
	}

	.buttons {
		position: absolute;
		inset-block: 0;
		inset-inline-end: 0;
		display: flex;
		flex-direction: column;
	}

	button {
		all: unset;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-inline: 0.0625em;
		flex: 1;
		height: 0;
		width: 0.5em;
		overflow: hidden;
		cursor: pointer;
	} button:hover, button:focus {
		background: oklch(100% 0 0 / 0.5);
	}

	button:first-child {
		padding-block-start: 0.15em;
	} button:last-child {
		padding-block-end: 0.15em;
	}
</style>