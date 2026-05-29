import { browser } from "$app/environment"
import { writable } from "svelte/store"

export type DayNightMode = "day" | "night"

const DAYNIGHT_MODE_STORAGE_KEY = "daynight"

const getCurrentMode = (): DayNightMode => {
	const mode = browser ? localStorage.getItem(DAYNIGHT_MODE_STORAGE_KEY) as DayNightMode : "day"
	return mode === "night" || mode === "day" ? mode : "day"
}

export const dayNightMode = writable<DayNightMode>(getCurrentMode() ?? "day")

if (browser) {
	dayNightMode.subscribe((value) => {
		localStorage.setItem(DAYNIGHT_MODE_STORAGE_KEY, value)

		document.body.classList.toggle("dark-mode", value === "night")
	})
}
