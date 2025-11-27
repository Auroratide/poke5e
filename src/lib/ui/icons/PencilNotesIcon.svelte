<script>
	import IconBase from "./IconBase.svelte"

	export let label = "Pencil Notes"
</script>

<IconBase title="{label}">
	<path class="stroke round" d="M 81.5 74.5 A 40 40 0 1 0 63.5 87.5" />
	<line class="stroke thin round" x1="32.5" y1="32.5" x2="64" y2="32.5" />
	<line class="stroke thin round" x1="32.5" y1="44.167" x2="58" y2="44.167" />
	<line class="stroke thin round" x1="32.5" y1="55.833" x2="56" y2="55.833" />
	<line class="stroke thin round" x1="32.5" y1="67.5" x2="56" y2="67.5" />
	<rect class="stroke thin" width="15" height="40" x="65" y="50" />
	<path class="stroke thin" d="
		M 65 55
		L 65 48
		L 72.5 34
		L 80 48
		L 80 55
	" />
</IconBase>
