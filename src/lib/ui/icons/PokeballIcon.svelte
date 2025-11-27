<script>
	import IconBase from "./IconBase.svelte"

	export let label = "Pokeball"
</script>

<IconBase title="{label}">
	<circle class="stroke" cx="50" cy="50" r="40" />
	<circle class="stroke thin" cx="50" cy="50" r="12.5" />
	<line class="stroke thin" x1="62.5" y1="50" x2="90" y2="50" />
	<line class="stroke thin" x1="37.5" y1="50" x2="10" y2="50" />
</IconBase>
