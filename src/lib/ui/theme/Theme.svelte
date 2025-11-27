<script lang="ts">
	import type { ThemeColor } from "./ThemeOptions"

	export let id: string | undefined = undefined
	export let theme: ThemeColor
</script>

<!-- theme colors defined with css variables -->
<div {id} class="theme theme-{theme}">
	<slot></slot>
</div>

<style>
	.theme {
		block-size: 100%;
	}
</style>