<script>
	import { createEventDispatcher } from "svelte"
	import WithButton from "./WithButton.svelte"
	import { m } from "$lib/site/i18n"
	
	const dispatch = createEventDispatcher()

	const handleClick = () => {
		dispatch("remove")
	}
</script>

<WithButton label="{m["universal.remove"]()}" on:click={handleClick} variant="danger">
	<slot></slot>
</WithButton>
