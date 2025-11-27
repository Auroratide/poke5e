<script lang="ts">
	import type { ThemeColor } from "./ThemeColor"

	export let id: string | undefined = undefined
	export let theme: ThemeColor
</script>

<!-- theme colors defined with css variables -->
<div {id} class="theme theme-{theme}">
	<slot></slot>
</div>

<style>
	.theme {
		height: 100%;
	}
</style>