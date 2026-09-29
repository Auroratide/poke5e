import { browser } from "$app/environment"

type Status = "Hidden" | "In Development" | "Ready"

export type FeatureToggle = {
	id: string,
	name: string,
	isActive: () => boolean,
	status: Status,
	description: string,
}

function toggle(name: string, status: Status, description: string) {
	return {
		id: name,
		name: name.replace(/([A-Z])/g, " $1").trim(),
		isActive: () => isFeatureActive(name),
		status,
		description,
	}
}

// function active() {
// 	return () => true
// }

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
	OverrideMaintenance: toggle("OverrideMaintenance", "Hidden", ""),
	PreviewUpdatedMoves: toggle("PreviewUpdatedMoves", "In Development", "Some moves, abilities, and pokemon movesets are being modernized."),
	CustomMoves: toggle("CustomMoves", "In Development", "Will allow the creation and sharing of custom moves."),
	MoveCustomization: toggle("MoveCustomization", "In Development", "Will allow moves on trainer's pokemon to be customized, including modifiers, type, etc."),
}
