<script>
	import IconBase from "./IconBase.svelte"

	export let label = "Id Badge"
</script>

<IconBase title="{label}">
	<rect class="stroke" x="15" y="10" width="70" height="80" rx="10" />
	<line class="stroke thin" x1="50" y1="79" x2="75" y2="79" />
	<line class="stroke thin" x1="15" y1="75" x2="85" y2="65" />
	<path class="stroke thin" d="
		M 35 72
		L 35 57
		C 35 50 39 46 42 45
		A 12.5 12.5 0 1 1 58 45
		C 61 46 65 50 65 57
		L 65 68
	" />
</IconBase>
