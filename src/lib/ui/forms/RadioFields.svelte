<script lang="ts">
	import { kebab } from "./kebab"

	export let label: string
	export let checked: string
	export let values: {
		name: string,
		value: string,
	}[]
	export let name: string | undefined = undefined
	export let disabled: boolean = false
	export let required: boolean = false

	$: kebabName = name ?? kebab(label)
</script>

{#each values as value}
	{@const id = `${kebab(value.value)}-${kebabName}`}
	<div class="radio-field">
		<input {id} value={value.value} bind:group={checked} type="radio" name={kebabName} {disabled} {required} />
		<label for="{id}" class="cap">{value.name}</label>
	</div>
{/each}

<style>
	.radio-field {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5em;
	}

	input {
		--w: 0.5625em;
		--dur: 0.05s;

		font-size: 1em;
		appearance: none;
		inline-size: 1.125em;
		block-size: 1.125em;
		border-radius: 50%;
		vertical-align: middle;
		position: relative;
		background: var(--skin-input-bg);
		transition: background-color calc(2 * var(--dur)) ease-in-out;
	}

	input::before {
		content: "";
		position: absolute;
		inset: 25%;
		display: block;
		background: var(--skin-bg-text);
		inline-size: var(--w);
		block-size: var(--w);
		border-radius: 50%;
		transform-origin: center;
		transition: transform var(--dur)
	}

	input::before {
		transform: scale(0);
		transition-timing-function: ease-in;
	}

	input:checked {
		background: var(--skin-bg);
	} input:checked + label {
		font-weight: bold;
		letter-spacing: -0.04em;
	}

	input:checked::before {
		transform: scale(1);
	}

	@media (prefers-reduced-motion: reduce) {
		input,
		input::before {
			transition: none;
		}
	}
</style>
