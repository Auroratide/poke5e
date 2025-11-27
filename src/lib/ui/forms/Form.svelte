<script lang="ts">
	import Saveable from "./Saveable.svelte"

	export let onsubmit: () => void
	export let saving: boolean = false
</script>

<Saveable {saving}>
	<form on:submit|preventDefault={onsubmit}>
		<slot></slot>
	</form>
</Saveable>
