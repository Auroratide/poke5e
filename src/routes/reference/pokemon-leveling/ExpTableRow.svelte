<script lang="ts">
	import { formatExp } from "$lib/creatures/experience"

	export let level: number
	export let exp: number
</script>

<tr>
	<td>{level}</td>
	<td>{formatExp(exp)}</td>
</tr>

<style>
	td:nth-child(1) {
		text-align: center;
	}
</style>
