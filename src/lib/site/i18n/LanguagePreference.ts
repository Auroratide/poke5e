import { browser } from "$app/environment"

const KEY = "language-preference"

function getLanguagePreference(): string | undefined {
	return browser ? localStorage.getItem(KEY) ?? undefined : undefined
}

function setLanguagePreference(value: string | undefined) {
	if (browser) {
		if (value == null) {
			localStorage.removeItem(KEY)
		} else {
			localStorage.setItem(KEY, value)
		}
	}
}

export const LanguagePreference = {
	get: getLanguagePreference,
	set: setLanguagePreference,
} as const
