import { browser } from "$app/environment"
import { writable } from "svelte/store"
import { FeatureToggles } from "../FeatureToggles"

export const Editions = ["2018", "2024"] as const
export type Edition = "2018" | "2024"
const LATEST_EDITION = "2024"

const EDITION_STORAGE_KEY = "rules-version" // NOTE: use to be called rules version, and cannot change without breaking current users

// Just in case this is somehow very wrong, force it to be right
const getCurrentEdition = (): Edition => {
	const version = browser ? localStorage.getItem(EDITION_STORAGE_KEY) as Edition : "2024"
	return version === "2018" || version === "2024" ? version : "2024"
}

export const currentEdition = writable<Edition>(getCurrentEdition() ?? "2024")

if (browser) {
	currentEdition.subscribe((value) => {
		localStorage.setItem(EDITION_STORAGE_KEY, value)
	})

	if (FeatureToggles.PreviewUpdatedMoves()) {
		currentEdition.subscribe((value) => {
			document.documentElement.dataset.edition = value
		})
	}
}

export const Edition = {
	abbr: (v: Edition) => `'${v.substring(2)}`,
	isLatest: (v: Edition) => v === LATEST_EDITION,
} as const
