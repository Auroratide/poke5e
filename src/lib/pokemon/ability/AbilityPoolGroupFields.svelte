<script lang="ts">
	import { FormGroup, Removable, SelectField, type SelectFieldChangeEvent } from "$lib/design/forms"
	import { kebab } from "$lib/design/forms/kebab"
	import { abilities } from "../store"

	export let title: string
	export let values: string[]
	export let disabled = false

	$: id = kebab(title)

	$: options = $abilities?.map((it) => ({
		name: it.name,
		value: it.id,
	}))

	const add = (e: SelectFieldChangeEvent) => {
		values = [...values, e.detail.value]
	}

	const remove = (i: number) => () => {
		values = values.toSpliced(i, 1)
	}

	const update = (i: number) => (e: SelectFieldChangeEvent) => {
		values = values.toSpliced(i, 1, e.detail.value)
	}
</script>

{#if options != null}
	<FormGroup {title}>
		<ul>
			{#each values as value, index}
				<li class="no-label">
					<Removable on:remove={remove(index)}>
						<SelectField label="{index + 1}." name="{id}-{index}" {value} {options} on:change={update(index)} {disabled} />
					</Removable>
				</li>
			{/each}
			<li>
				<!-- key is a workaround to ensure the field is always empty -->
				{#key values}
					<SelectField label="Add Ability" name="{id}-add-ability" value="" {options} on:change={add} {disabled} />
				{/key}
			</li>
		</ul>
	</FormGroup>
{/if}

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75em;
	}

	.no-label :global(label) {
		font-size: 0.1px;
	}
</style>
