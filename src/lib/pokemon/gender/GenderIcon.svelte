<script lang="ts">
	import { PokemonGender } from "./PokemonGender"

	export let gender: PokemonGender
</script>

<span class="gender {gender}" title="{gender}">
	<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
		<title>{gender}</title>
		{#if gender === PokemonGender.Male}
			<circle class="path" r="2.25" cx="4.5" cy="7.5"  />
			<line class="path" x1="6" y1="6" x2="9.25" y2="2.75" />
			<line class="path" x1="9" y1="2.75" x2="6" y2="2.75" />
			<line class="path" x1="9.25" y1="2" x2="9.25" y2="6" />
		{:else if gender === PokemonGender.Female}
			<circle class="path" r="2.25" cx="6" cy="4"  />
			<line class="path" x1="6" y1="5.5" x2="6" y2="10.5" />
			<line class="path" x1="3.75" y1="8.25" x2="8.25" y2="8.25" />
		{/if}
	</svg>
</span>

<style>
	.gender {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.25em;
		height: 1.25em;
		background-color: var(--skin-local-bg);
		border-radius: 1em;
		font-size: 75%;
		line-height: 1;

		&::before {
			color: var(--skin-gender-text);
			font-weight: bold;
		}
	}

	.male {
		--skin-local-bg: var(--skin-male-bg);
	}

	.female {
		--skin-local-bg: var(--skin-female-bg);
	}

	.none, .other {
		visibility: hidden;
	}

	svg {
		display: inline-block;
		color: var(--skin-bg-text);
		inline-size: 1em;
		block-size: 1em;
		overflow: visible;
	}

	.path {
		stroke: currentColor;
		stroke-width: 1.5;
		fill: none;
	}
</style>