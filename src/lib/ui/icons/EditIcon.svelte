<script>
	import IconBase from "./IconBase.svelte"

	export let label = "Edit"
</script>

<IconBase title="{label}">
	<g transform="translate(12.5 43.5) rotate(-140 50 50) scale(1.2)">
		<rect class="stroke thin" width="15" height="40" x="65" y="50" />
		<path class="stroke thin" d="
			M 65 55
			L 65 48
			L 72.5 34
			L 80 48
			L 80 55
		" />
	</g>
</IconBase>
