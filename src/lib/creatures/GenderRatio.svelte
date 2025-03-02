<script lang="ts">
	import GenderIcon from "$lib/design/GenderIcon.svelte"
	import { Gender } from "$lib/trainers/types"

	/**
	 * Gender takes a ratio format:
	 * * F:M ratio (ex: 7:1 means 7/8 pokemon are female)
	 * * 0:0 means unknown or genderless
	 * * So far, no pokemon has a third gender
	 */
	export let value: string

	$: [ f, m ] = value.split(":").map((it) => parseInt(it))
	
	const percent = (n: number) => 100 * n / (f + m)
</script>

{#key value}
	{#if f + m === 0}
		<span>Genderless <GenderIcon gender={Gender.None} /></span>
	{:else}
		<span><span>{percent(f)}% <GenderIcon gender={Gender.Female} /></span><span>:</span><span>{percent(m)}% <GenderIcon gender={Gender.Male} /></span></span>
	{/if}
{/key}

<style>
	span {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		gap: 0.25em;
	}
</style>