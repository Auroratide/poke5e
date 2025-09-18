<script lang="ts">
	import GenderIcon from "./GenderIcon.svelte"
	import { GenderRatio } from "./GenderRatio"
	import { PokemonGender } from "./PokemonGender"

	export let value: GenderRatio

	$: f = value.percentFemale()
	$: m = value.percentMale()
</script>

<span class="gender-ratio-display">
	{#key value}
		{#if value.isGenderless()}
			<span class="bar genderless" style:--percent="100%">
				<span class="percent">Genderless</span>
			</span>
		{:else}
			{#if f > 0}
				<span class="bar female" style:--percent="{f}%">
					<span class="icon">
						<GenderIcon gender={PokemonGender.Female} />
					</span>
					<span class="percent">{f}%</span>
				</span>
			{/if}
			{#if m > 0}
				<span class="bar male" style:--percent="{m}%">
					<span class="icon">
						<GenderIcon gender={PokemonGender.Male} />
					</span>
					<span class="percent">{m}%</span>
				</span>
			{/if}
		{/if}
	{/key}
</span>

<style>
	.gender-ratio-display {
		display: inline-flex;
		max-inline-size: 10em;
		inline-size: 100%;
		block-size: 1.25em;
		background: gray;
		border-radius: 0.25em;
		overflow: hidden;
	}

	.bar {
		flex: 1 1 var(--percent);
		block-size: 100%;
		background: var(--skin-local-bg);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 0.5em;
		color: var(--skin-bg-text);
	}

	.male { --skin-local-bg: var(--skin-male-bg); }
	.female { --skin-local-bg: var(--skin-female-bg); }
	.genderless { --skin-local-bg: var(--skin-agender-bg); }

	.icon {
		font-size: 1.125em;
	}

	.percent {
		font-size: var(--font-sz-venus);
		font-weight: bold;
	}
</style>
