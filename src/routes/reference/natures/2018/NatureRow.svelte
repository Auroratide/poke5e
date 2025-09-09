<script lang="ts">
	import PlusMinus from "$lib/design/PlusMinus.svelte"

	export let index: number
	export let name: string
	export let effect: Record<string, number>

	$: inc = Object.entries(effect).find((it) => it[1] > 0)
	$: dec = Object.entries(effect).find((it) => it[1] < 0)
</script>

<tr>
	<td>{index + 1}</td>
	<td><strong>{name}</strong></td>
	<td class="upper">{#if inc == null}-{:else}<PlusMinus value={inc[1]} /> {inc[0]}{/if}</td>
	<td class="upper">{#if dec == null}-{:else}<PlusMinus value={dec[1]} /> {dec[0]}{/if}</td>
</tr>
