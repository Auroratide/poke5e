import { browser } from "$app/environment"
import { writable } from "svelte/store"

export type RulesVersion = "2018" | "2024"

const RULES_VERSION_STORAGE_KEY = "rules-version"

// Just in case this is somehow very wrong, force it to be right
const getCurrentVersion = (): RulesVersion => {
	const version = browser ? localStorage.getItem(RULES_VERSION_STORAGE_KEY) as RulesVersion : "2024"
	return version === "2018" || version === "2024" ? version : "2024"
}

export const rulesVersion = writable<RulesVersion>(getCurrentVersion() ?? "2024")

if (browser) {
	rulesVersion.subscribe((value) => {
		localStorage.setItem(RULES_VERSION_STORAGE_KEY, value)
	})
}
