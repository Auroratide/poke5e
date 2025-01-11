import { base } from "$app/paths"

export const Url = {
	home: () => `${base}`,
	pokemon: (id?: string) => `${base}/pokemon${id ? `/${id}` : ""}`,
	moves: (id?: string) => `${base}/moves${id ? `/${id}` : ""}`,
	tms: (id?: string) => `${base}/tms${id ? `/${id}` : ""}`,
	trainers: (trainerKey?: string, pokemonId?: string, action?: string) => {
		const params = new URLSearchParams()
		if (trainerKey) params.append("id", trainerKey)
		if (pokemonId) params.append("pokemon", pokemonId)
		if (action) params.append("action", action)

		return `${base}/trainers?${params.toString()}`
	},
	reference: {
		all: () => `${base}/reference`,
		status: () => `${base}/reference/status-conditions`,
	},
} as const
