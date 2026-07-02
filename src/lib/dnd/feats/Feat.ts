import type { MarkdownString } from "$lib/ui/rendering/markdown"
import type { BaseCharacter } from "../BaseCharacter"
import type { Prerequisite } from "./Prerequisite"

export type FeatEffects = {
	onAcquire?: <T extends BaseCharacter>(subject: T) => T,
	hpIncrease?: number,
}

export type Feat = {
	name: string,
	category: FeatCategory,
	prerequisites?: Prerequisite[],
	description: MarkdownString,
	removed?: boolean,
	effects?: FeatEffects,
}

export type FeatCategory = "Origin" | "General" | "Fighting Style" | "Epic Boon"
