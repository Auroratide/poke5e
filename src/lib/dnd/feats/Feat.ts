import type { MarkdownString } from "$lib/ui/rendering/markdown"
import type { Prerequisite } from "./Prerequisite"

export type Feat = {
	name: string,
	category: FeatCategory,
	prerequisites?: Prerequisite[],
	description: MarkdownString,
	removed?: boolean,
}

export type FeatCategory = "Origin" | "General" | "Fighting Style" | "Epic Boon"
