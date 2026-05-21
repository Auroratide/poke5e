<script lang="ts">
	import { stringsAlike } from "$lib/utils/string"
	import { kebab } from "./kebab"

	let listbox: HTMLUListElement

	let {
		label,
		options,
		value = $bindable(),
		name,
		placeholder,
		maxlength,
		disabled = false,
		required = false,
		onconfirm,
	}: {
		label: string,
		options: string[],
		value: string,
		name?: string,
		placeholder?: string,
		maxlength?: number,
		disabled?: boolean,
		required?: boolean,
		onconfirm?: (value: string) => void,
	} = $props()

	let kebabName = $derived(name ?? kebab(label))
	let id = $derived(`${kebabName}-input`)

	let showList = $state(false)

	let filteredOptions = $derived(options.filter((it) => stringsAlike(it, value)))

	let currentFocus = $state(-1)

	const resetFocus = () => {
		currentFocus = -1
	}

	const onfocusout = (e: FocusEvent) => {
		const currentTarget = e.currentTarget as HTMLElement | null
		const relatedTarget = e.relatedTarget as HTMLElement | null
		if (!currentTarget?.contains(relatedTarget)) {
			showList = false
			resetFocus()
		}
	}

	const oninput = () => {
		showList = value.length > 0
		resetFocus()
	}

	const onSelect = (option: string) => () => {
		value = option
		confirm()
	}

	const scrollOptionIntoView = (index: number, up: boolean) => {
		const lis = Array.from(listbox?.querySelectorAll("li") ?? [])
		lis[index]?.scrollIntoView(up)
	}

	const confirm = () => {
		onconfirm?.(value)
		showList = false
		resetFocus()
	}

	const onkeydown = (e: KeyboardEvent) => {
		switch (e.key) {
		case "Enter":
			if (currentFocus >= 0) {
				showList = false
				value = filteredOptions[currentFocus]
				resetFocus()
			}

			confirm()
			e.preventDefault()
			break
		case "ArrowDown":
			showList = true
			currentFocus = Math.min(currentFocus + 1, filteredOptions.length - 1)
			scrollOptionIntoView(currentFocus, false)
			e.preventDefault()
			break
		case "ArrowUp":
			showList = true
			currentFocus = currentFocus < 0 ? filteredOptions.length - 1 : Math.max(currentFocus - 1, 0)
			scrollOptionIntoView(currentFocus, true)
			e.preventDefault()
			break
		case "Escape":
			showList = false
			resetFocus()
			e.preventDefault()
			break
		}
	}
</script>

<div class="combobox-field" {onfocusout}>
	<label for="{id}">{label}</label>
	<div class="input-container">
		<input
			{id}
			type="text"
			role="combobox"
			name="{kebabName}"
			{placeholder}
			{maxlength}
			{disabled}
			{required}
			bind:value
			autocomplete="off"
			aria-autocomplete="list"
			aria-controls="{id}-listbox"
			aria-expanded="{showList}"
			{onkeydown}
			{oninput}
		/>
		<ul bind:this={listbox} class="listbox" hidden={!showList} role="listbox" aria-label="{label}" id="{id}-listbox">
			{#each filteredOptions as option, i}
				<li role="option" aria-selected="{i === currentFocus}" class:focused={i === currentFocus}>
					<button tabindex="-1" onclick={onSelect(option)}>
						{option}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.combobox-field {
		display: flex;
		flex-direction: column;
		gap: 0.125em;
	}

	.input-container {
		position: relative;
	}

	.listbox {
		list-style: none;
		position: absolute;
		display: block;
		inset-block-start: 2.125em;
		inline-size: 100%;
		margin: 0;
		padding: 0;
		outline: 0.125em solid var(--skin-focus);
		background: var(--skin-bg-text);
		box-shadow: var(--elev-stratus);
		max-block-size: 7.5em;
		overflow-y: auto;
		overscroll-behavior: none;
		z-index: 9;
	}

	.listbox[hidden] {
		display: none;
	}

	.listbox li {
		display: block;
		padding: 0;
	}

	.listbox button {
		display: block;
		inline-size: 100%;
		cursor: pointer;
		text-align: start;
		padding: 0.125em 0.5em;
		margin: 0;
		border: none;
		background: none;
	}

	.listbox li.focused, .listbox li:hover {
		background: var(--skin-focus);
	}

	label {
		display: block;
		font-weight: bold;
		font-size: var(--font-sz-venus);
		letter-spacing: -0.04em;
	}

	input {
		inline-size: 100%;
	}
</style>
