<script lang="ts">
	import { Removable, SelectField, type SelectFieldChangeEvent } from "$lib/design/forms"

	export let title: string
	export let values: string[]
	export let disabled = false
	export let moves: { id: string, name: string }[] = []

	$: options = moves.map((it) => ({
		name: it.name,
		value: it.id,
		disabled: values.includes(it.id),
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

{#if options.length > 0}
	<div class="move-pool-group">
		<p><strong>{title}</strong></p>
		<ul>
			{#each values as value, index}
				<li class="no-label">
					<Removable on:remove={remove(index)}>
						<SelectField label="{index + 1}." {value} {options} on:change={update(index)} {disabled} />
					</Removable>
				</li>
			{/each}
			<li>
				<!-- key is a workaround to ensure the field is always empty -->
				{#key values}
					<SelectField label="Add Move" value="" {options} on:change={add} {disabled} />
				{/key}
			</li>
		</ul>
	</div>
{/if}

<style>
	.move-pool-group {
		border-inline-start: 0.25em solid var(--skin-bg);
		padding-inline-start: 0.75em;
		margin-block-end: 0.75em;
	}

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
