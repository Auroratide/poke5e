import type { Region } from "./Region"

export type Habitat = {
	biomes: string[],
	nativeRegion: Region,
	regions: Region[],
}
