import { browser } from "$app/environment"

 
function toggle(name: string) {
	return () => isFeatureActive(name)
}

export function isFeatureActive(feature: string): boolean {
	return browser ? localStorage.getItem(`feature-toggle::${feature}`) != null : false
}

export function setFeatureActive(feature: string, isActive: boolean) {
	if (!browser) return
	if (isActive) {
		localStorage.setItem(`feature-toggle::${feature}`, "true")
	} else {
		localStorage.removeItem(`feature-toggle::${feature}`)
	}
}

// example: FakemonEvolutions: toggle("FakemonEvolutions"),
export const FeatureToggles = {
	MoreTms: toggle("MoreTms"),
}
