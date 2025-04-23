<script lang="ts" context="module">
	export type ThemeColor = "blue" | "red" | "purple" | "green" | "navy" | "yellow"
</script>

<script lang="ts">
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