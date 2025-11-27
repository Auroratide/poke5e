<script>
	import IconBase from "./IconBase.svelte"

	export let label = "Menu"
</script>

<IconBase title="{label}">
	<line class="stroke round" x1="10" y1="25" x2="90" y2="25" />
	<line class="stroke round" x1="10" y1="50" x2="90" y2="50" />
	<line class="stroke round" x1="10" y1="75" x2="90" y2="75" />
</IconBase>

