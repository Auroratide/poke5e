import type { MarkdownString } from "$lib/ui/rendering"

export type BiomeId = string

export type Biome = {
	id: BiomeId,
	name: string,
	description?: MarkdownString,
}
