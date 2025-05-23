<script lang="ts">
	import { kebab } from "./kebab"

	export let label: string
	export let checked: string[]
	export let values: {
		name: string,
		value: string,
		disabled?: boolean,
	}[]
	export let name: string | undefined = undefined
	export let disabled: boolean = false

	$: kebabName = name ?? kebab(label)
</script>

{#each values as value}
	{@const id = `${kebab(value.value)}-${kebabName}`}
	<div class="checkbox-field">
		<input {id} value={value.value} bind:group={checked} type="checkbox" name={kebabName} disabled={disabled || value.disabled} />
		<label for="{id}" class="cap">{value.name}</label>
	</div>
{/each}

<style>
	.checkbox-field {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5em;
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
	} input:checked + label {
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
