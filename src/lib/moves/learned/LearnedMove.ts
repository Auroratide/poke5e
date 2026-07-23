import type { Resource } from "$lib/poke5e/resource"

export type LearnedMove = {
	id: string,
	moveId: string,
	pp: Resource,
	notes?: string,
}
