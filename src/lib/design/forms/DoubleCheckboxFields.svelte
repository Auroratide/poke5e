<script lang="ts" context="module">
	type CheckboxInfo = {
		name: string,
		value: string,
		suffix: string,
		checked: [boolean, boolean],
		disabled?: boolean,
	}

	export type DoubleCheckboxFieldsChangeEvent = CustomEvent<{ value: string, checked: [boolean, boolean] }>
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { kebab } from "./kebab"

	const dispatch = createEventDispatcher()

	export let label: string
	export let values: CheckboxInfo[]
	export let name: string | undefined = undefined
	export let disabled: boolean = false

	$: kebabName = name ?? kebab(label)

	const withSuffix = (name: string, suffix: string) => `${name} ${suffix}`

	const onChange = (info: CheckboxInfo) => (e: Event) => {
		const target = e.target as HTMLInputElement
		const isSecond = target.value.endsWith(info.suffix)
		
		dispatch("change", {
			value: info.value,
			checked: [isSecond || target.checked, isSecond && target.checked],
		})
	}
</script>

{#each values as value}
	{@const id = `${kebab(value.value)}-${kebabName}`}
	{@const id2 = `${kebab(value.value)}-${kebabName}-2`}
	<div class="double-checkbox-field" class:one-checked={value.checked[0]} class:two-checked={value.checked[1]}>
		<div class="checkbox-container">
			<input {id} value={value.value} type="checkbox" checked={value.checked[0]} name={kebabName} disabled={disabled || value.disabled} on:change={onChange(value)} />
			<input id="{id2}" value={withSuffix(value.value, value.suffix)} type="checkbox" checked={value.checked[1]} name={kebabName} disabled={disabled || value.disabled} on:change={onChange(value)} />
		</div>
		<label for="{id}" class="cap">{value.name}</label>
		<label for="{id2}" class="visually-hidden">{withSuffix(value.name, value.suffix)}</label>
	</div>
{/each}

<style>
	.double-checkbox-field {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5em;
	}

	.checkbox-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.25em;
		position: relative;
	}

	.checkbox-container::before {
		content: "";
		position: absolute;
		display: block;
		background: var(--skin-input-bg);
		inline-size: 0.3em;
		block-size: 0.7em;
		inset: 50% 0 0 50%;
		transform: translate(-50%, -50%);
	}

	.two-checked .checkbox-container::before {
		background: var(--skin-bg);
	}

	input {
		--w: 0.5em;
		--h: 0.2em;
		--r2: 1.4142;
		--x0: 0.5em;
		--y0: 0.667em;
		--dur: 0.05s;

		font-size: 1em;
		appearance: none;
		inline-size: 1.125em;
		block-size: 1.125em;
		vertical-align: middle;
		position: relative;
		background: var(--skin-input-bg);
		transition: background-color calc(2 * var(--dur)) ease-in-out;
	}

	input:disabled { opacity: 0.5; }

	input::before,
	input::after {
		content: "";
		position: absolute;
		inset: 0;
		display: block;
		background: var(--skin-bg-text);
		width: var(--w);
		height: var(--h);
		transform-origin: center left;
		transition: transform var(--dur)
	}

	input::before {
		--translation: calc((var(--w) - var(--h) / 2) / 1.4142);
		transform:
			translate(calc(var(--x0) - var(--translation)), calc(var(--y0) - var(--translation)))
			rotate(45deg)
			scaleX(0);
		transition-timing-function: ease-in;
		transition-delay: var(--dur);
	}

	input::after {
		--translation: calc(var(--h) / 2.8284);
		transform:
			translate(calc(var(--x0) - var(--translation)), calc(var(--y0) + var(--translation)))
			rotate(-45deg)
			scaleX(0);
		transition-timing-function: ease-out;
		transition-delay: 0s;
	}

	input:checked {
		background: var(--skin-bg);
	}
	
	.one-checked label {
		font-weight: bold;
		letter-spacing: -0.04em;
	}

	input:checked::before {
		transition-delay: 0s;
		transform:
			translate(calc(var(--x0) - var(--translation)), calc(var(--y0) - var(--translation)))
			rotate(45deg)
			scaleX(1);
	}

	input:checked::after {
		transition-delay: var(--dur);
		transform:
			translate(calc(var(--x0) - var(--translation)), calc(var(--y0) + var(--translation)))
			rotate(-45deg)
			scaleX(1.5);
	}

	@media (prefers-reduced-motion: reduce) {
		input,
		input::before,
		input::after {
			transition: none;
		}
	}
</style>
