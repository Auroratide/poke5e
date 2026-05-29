<script lang="ts">
	import { TogglePill, VisuallyHidden } from "$lib/ui/elements"
	import { dayNightMode } from "./DayNightMode"

	let {
		id = "dark-mode-fieldset",
	}: {
		id?: string,
	} = $props()
</script>

<TogglePill
	{id}
	rightlabel="Day"
	rightvalue="day"
	leftlabel="Night"
	leftvalue="night"
	bind:group={$dayNightMode}
>
	{#snippet legend()}
		<VisuallyHidden>
			Light/Dark Mode
		</VisuallyHidden>
	{/snippet}
</TogglePill>
