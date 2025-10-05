import { browser } from "$app/environment"
import { writable } from "svelte/store"

const key = "canCreateCustomPokemonBannerVisibility"
const initialValue = browser ? localStorage.getItem(key) === "true" : undefined

export const CanCreateCustomPokemonBanner = writable<boolean>(initialValue ?? false)
if (browser) {
	CanCreateCustomPokemonBanner.subscribe((value) => localStorage.setItem(key, value.toString()))
}
