<script lang="ts" context="module">
	export type RelativeValue = "<" | "=" | ">"

	export function relativeNumberCompare(relative: RelativeValue, lhs: number, rhs: number): boolean {
		switch (relative) {
		case "<": return lhs < rhs
		case "=": return lhs === rhs
		case ">": return lhs > rhs
		default: return lhs === rhs
		}
	}
</script>

<script lang="ts">
	import { VisuallyHidden } from "../elements"
	import { kebab } from "./kebab"

	export let label: string
	export let relative: RelativeValue
	export let value: number
	export let name: string | undefined = undefined
	export let disabled: boolean = false
	export let required: boolean = false
	export let placeholder: string = ""
	export let min: number | undefined = undefined
	export let max: number | undefined = undefined
	export let span: number = 1

	$: kebabName = name ?? kebab(label)
	$: id = `${kebabName}-input`
	$: relativeId = `${kebabName}-relative`
</script>

<div class="relative-number-field" style:--span="{span}">
	<label for="{id}">{label}</label>
	<div class="row">
		<VisuallyHidden>
			<label for="{relativeId}">Relative</label>
		</VisuallyHidden>
		<select id="{relativeId}" bind:value={relative}>
			<option value="<">&lt;</option>
			<option value="=">=</option>
			<option value=">">&gt;</option>
		</select>
		<input type="number" {id} name="{kebabName}" {placeholder} {min} {max} bind:value {disabled} {required} />
	</div>
</div>

<style>
	.relative-number-field {
		display: flex;
		flex-direction: column;
		gap: 0.125em;
		grid-column: span var(--span);
	}

	label {
		display: block;
		font-weight: bold;
		font-size: var(--font-sz-venus);
		letter-spacing: -0.04em;
	}

	input {
		flex: 1;
		inline-size: 100%;
	}

	.row {
		display: flex;
		gap: 0.25em;
		inline-size: 100%;
	}
</style>
