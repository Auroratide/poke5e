<script lang="ts">
	import IconBase from "./IconBase.svelte"

	let { label = "External" }: { label?: string } = $props()

	const arrowEnd = { x: 82.5, y: 17.5 }
	const tipLength = 15
	const boxSize = 25
	const tl = 50 - boxSize
	const br = 50 + boxSize
</script>

<IconBase title={label}>
	<path class="stroke" d="
		M 50 {tl}
		L {tl + 5} {tl}
		Q {tl} {tl} {tl} {tl + 5}
		L {tl} {br - 5}
		Q {tl} {br} {tl + 5} {br}
		L {br - 5} {br}
		Q {br} {br} {br} {br - 5}
		L {br} 50
	" />
	<line class="stroke round" x1="50" y1="50" x2="{arrowEnd.x}" y2="{arrowEnd.y}" />
	<line class="stroke round" x1="{arrowEnd.x}" y1="{arrowEnd.y}" x2="{arrowEnd.x}" y2="{arrowEnd.y + tipLength}" />
	<line class="stroke round" x1="{arrowEnd.x}" y1="{arrowEnd.y}" x2="{arrowEnd.x - tipLength}" y2="{arrowEnd.y}" />
</IconBase>
