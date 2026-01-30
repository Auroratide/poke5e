export type Resource = {
	current: number,
	max: number,
}

function adjustMax(resource: Resource, newMax: number): Resource {
	return {
		current: Math.min(resource.current + Math.max(0, newMax - resource.max), newMax),
		max: newMax,
	}
}

export const Resource = {
	adjustMax,
} as const
