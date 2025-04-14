import { base } from "$app/paths"

export const Url = {
	home: () => `${base}/`,
	items: (id?: string) => `${base}/items${id ? `/${id}` : ""}`,
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
	versionHistory: () => `${base}/version-history`,
	feedback: () => `${base}/feedback`,
	reference: {
		all: () => `${base}/reference`,
		abilities: () => `${base}/reference/abilities`,
		bonds: () => `${base}/reference/bonds`,
		breeding: () => `${base}/reference/breeding`,
		catchingPokemon: () => `${base}/reference/catching-pokemon`,
		combat: () => `${base}/reference/combat`,
		damageTypes: () => `${base}/reference/damage-types`,
		faintingRestingHealing: () => `${base}/reference/fainting-resting-and-healing`,
		feats: () => `${base}/reference/feats`,
		natures: () => `${base}/reference/natures`,
		pokemonLeveling: () => `${base}/reference/pokemon-leveling`,
		specializations: () => `${base}/reference/specializations`,
		status: () => `${base}/reference/status-conditions`,
		trainerClass: () => `${base}/reference/trainer-class`,
		trainerPaths: () => `${base}/reference/trainer-paths`,
		transformations: () => `${base}/reference/pokemon-transformations`,
		weather: () => `${base}/reference/weather`,
	},
	external: {
		auroratide: () => "https://auroratide.com",
		github: () => "https://github.com/Auroratide/poke5e",
		discord: () => "#",
	},
} as const
