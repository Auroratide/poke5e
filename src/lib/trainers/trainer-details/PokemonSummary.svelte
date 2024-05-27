<script lang="ts">
	import type { ReadWriteKey, TrainerPokemon } from "../types"
	import GenderIcon from "$lib/design/GenderIcon.svelte"
	import ResourceBar from "$lib/design/ResourceBar.svelte"
	import { Url } from "$lib/url"
	import { pokemon as allPokemon } from "$lib/creatures/store"
	import PokemonSprite from "$lib/creatures/PokemonSprite.svelte"

	export let trainer: ReadWriteKey
	export let pokemon: TrainerPokemon

	$: species = $allPokemon?.find((it) => it.id === pokemon.pokemonId)
</script>

<a href="{Url.trainers(trainer, pokemon.id)}" class="selectable-bubble gridded">
	<span style:grid-area="sprite" class="max-height"><PokemonSprite media={species?.media} alt={species?.name} /></span>
	<span style:grid-area="name">{pokemon.nickname}</span>
	<span style:grid-area="gender" class="right away-from-edge flex"><GenderIcon gender={pokemon.gender} /></span>
	<span style:grid-area="hpbar" class="away-from-edge"><ResourceBar current={pokemon.hp.current} max={pokemon.hp.max} /></span>
	<span style:grid-area="hp">{pokemon.hp.current}/{pokemon.hp.max}</span>
	<span style:grid-area="lv" class="right">Lv. {pokemon.level}</span>
</a>

<style>
	.gridded {
		display: grid;
		grid-template-columns: 3em 1fr auto;
		grid-template-areas:
			"sprite name gender"
			"sprite hpbar hpbar"
			"sprite hp lv";
		gap: 0.125em;
	}

	.right {
		place-self: center end;
	}

	.away-from-edge {
		padding-right: 1.5em;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	.max-height {
		max-height: 3em;
	}

	.selectable-bubble {
		background-color: var(--skin-content);
		padding: 0.375em 1.5em 0.375em 0.5em;
		border-radius: 3em;
		text-decoration: none;
		color: var(--skin-content-text);
		box-shadow: var(--elev-cumulus);
	}

	.selectable-bubble:hover,
	.selectable-bubble:focus {
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
	}

	/* Literally cannot work with the scrollbar */
	/* .selectable-bubble:hover::before,
	.selectable-bubble:focus::before {
		content: '>';
		color: var(--skin-bg-dark);
		font-weight: 900;
		position: absolute;
		left: -0.325em;
		font-size: 4em;
		-webkit-text-stroke: 0.03em var(--skin-bg-text);
		transform: translateY(-0.225em);
	} */
</style>