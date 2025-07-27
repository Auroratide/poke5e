<script lang="ts">
	import GenderIcon from "./GenderIcon.svelte"
	import { GenderRatio } from "./GenderRatio"
	import { PokemonGender } from "./PokemonGender"

	export let value: GenderRatio
</script>

{#key value}
	{#if value.isGenderless()}
		<span>Genderless <GenderIcon gender={PokemonGender.None} /></span>
	{:else}
		<span><span>{value.percentFemale()}% <GenderIcon gender={PokemonGender.Female} /></span><span>:</span><span>{value.percentMale()}% <GenderIcon gender={PokemonGender.Male} /></span></span>
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
