<script lang="ts">
	export let value: string
	export let matches: number

	const noop = (e: Event) => { e.preventDefault() }
</script>

<form on:submit={noop}>
	<div class="input-group">
		<label for="ability-filter">Filter Abilities</label>
		<input name="ability-filter" id="ability-filter" type="text" placeholder="Type here..." bind:value />
	</div>
	<div class="output-group" class:hide={value.length === 0}>
		<output id="ability-filter-matches" for="ability-filter">
			{matches > 0 ? matches : "No"}
		</output>
		<label for="ability-filter-matches">
			{matches === 1 ? "match" : "matches"}
		</label>
	</div>
</form>
{#if matches > 0}
	<hr />
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		margin-block-end: 1em;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.125em;
	} .input-group label {
		font-size: var(--font-sz-venus);
		font-weight: bold;
	}

	.output-group {
		text-align: center;
	}

	.hide { visibility: hidden; }
</style>
