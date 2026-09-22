import type { Habitat } from "../Habitat"

export function stubHabitat(template: Partial<Habitat> = {}): Habitat {
	return {
		biomes: ["forest"],
		nativeRegion: "Kalos",
		regions: ["Kalos"],
		...template,
	}
}