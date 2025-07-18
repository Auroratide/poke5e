<script lang="ts">
	import type { Attribute } from "$lib/dnd/attributes"

	export let index: number
	export let name: string
	export let increase: Attribute
	export let decrease: Attribute

	$: min = 4 * index + 1
	$: max = 4 * index + 4
	$: isNeutral = increase === decrease
</script>

<tr>
	<td>{min}-{max}</td>
	<td><strong>{name}</strong></td>
	<td class="upper">{#if isNeutral}-{:else}+1 {increase}{/if}</td>
	<td class="upper">{#if isNeutral}-{:else}-1 {decrease}{/if}</td>
</tr>
