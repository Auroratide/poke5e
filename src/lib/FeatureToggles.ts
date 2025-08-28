import { browser } from "$app/environment"

function toggle(name: string) {
	return () => browser ? localStorage.getItem(`feature-toggle::${name}`) != null : false
}

export const FeatureToggles = {
	PokemonCustomImage: toggle("PokemonCustomImage"),
}
