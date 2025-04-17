<script>
	import { createEventDispatcher } from "svelte"
	import Button from "../Button.svelte"
	
	const dispatch = createEventDispatcher()

	const handleClick = () => {
		dispatch("remove")
	}
</script>

<div class="removable">
	<div class="flex">
		<slot></slot>
	</div>
	<div class="end">
		<Button on:click={handleClick} variant="danger">Remove</Button>
	</div>
</div>

<style>
	.removable {
		display: flex;
		gap: 0.5em;
	}

	.end {
		align-self: flex-end;
		padding-block: 0.25em;
	}

	.flex { flex: 1; }
</style>