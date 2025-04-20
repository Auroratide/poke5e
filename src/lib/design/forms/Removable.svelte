<script>
	import { createEventDispatcher } from "svelte"
	import WithButton from "./WithButton.svelte"
	
	const dispatch = createEventDispatcher()

	const handleClick = () => {
		dispatch("remove")
	}
</script>

<WithButton label="Remove" on:click={handleClick} variant="danger">
	<slot></slot>
</WithButton>
