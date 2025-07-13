<script lang="ts" context="module">
	export type RankFieldInputEvent = CustomEvent<{ value: number }>
</script>


<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { kebab } from "./kebab"

	export let label: string
	export let value: number
	export let name: string | undefined = undefined
	export let disabled: boolean = false
	export let placeholder: string = ""
	export let min: number = 0
	export let max: number

	const dispatch = createEventDispatcher()

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`
	$: knobTranslation = 100 * (value - min) / (max - min)
	$: notches = [...Array(max - min + 1)].map((_, i) => i)

	const onInput = (e: Event) => {
		value = parseInt((e.target as HTMLInputElement).value)

		dispatch("input", { value })
	}
</script>

<div class="ranks-field">
	<label for="{id}">{label}</label>
	<div class="container">
		<input type="range" {id} name="{kebabName}" {placeholder} {min} {max} step="1" {value} {disabled} on:input={onInput} />
		<div class="range-display" aria-hidden="true">
			<div class="track"></div>
			<div class="notches">
				{#each notches as notch}
					<div class="notch"><span class="marker">
						<span style:display="none">{notch}</span> <!-- eslint complains otherwise -->
					</span></div>
				{/each}
			</div>
			<span class="knob-container" style:transform="translateX({knobTranslation}%)">
				<span class="knob">
					{value}
				</span>
			</span>
		</div>
	</div>
</div>

<style>
	.ranks-field {
		display: flex;
		flex-direction: column;
		gap: 0.125em;
	}

	label {
		display: block;
		font-weight: bold;
		font-size: var(--font-sz-venus);
		letter-spacing: -0.04em;
	}

	input {
		inline-size: 100%;
		block-size: 100%;
		padding: 0.5em 0.5em;
		opacity: 0.001;
		cursor: grab;
	} input:active {
		cursor: grabbing;
	}

	.container {
		position: relative;
	}

	.range-display {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		pointer-events: none;
		padding: 1em;
	} input:focus-visible + .range-display {
		outline: 0.125em solid var(--skin-focus);
	}

	.knob-container {
		inline-size: 100%;
	}

	.track {
		position: absolute;
		inline-size: 100%;
		block-size: 1em;
		background: var(--skin-local-bg, var(--skin-bg-light));
		border-radius: 2em 1em;
		inset: 50% 0;
		transform: translateY(-50%);
		filter: brightness(0.7);
	}

	.knob {
		background: var(--skin-local-bg, var(--skin-bg-light));
		color: var(--skin-bg-text);
		text-shadow: 0.0625em 0.0625em 0 oklch(0% 0 0);
		box-shadow: var(--elev-cumulus);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		inline-size: 1.5em;
		block-size: 1.5em;
		border-radius: 100% 50%;
		font-weight: bold;
		transform: translateX(-50%);
		cursor: grab;
	}

	.notches {
		position: absolute;
		inset: 0 0.5em;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.notch {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.notch .marker {
		display: block;
		inline-size: 0.5em;
		block-size: 0.5em;
		border-radius: 100% 50%;
		background: var(--skin-local-bg, var(--skin-bg-light));
	}
</style>
