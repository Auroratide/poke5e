import { resolve } from "$app/paths"

export const Url = {
	home: () => resolve("/"),
	fakemon: (key?: string, action?: string) => {
		const params = new URLSearchParams()
		if (key) params.append("id", key)
		if (action) params.append("action", action)

		return resolve("/fakemon") + `?${params.toString()}`
	},
	items: (id?: string) => id ? resolve("/items/[id]", { id }) : resolve("/items"),
	pokemon: (id?: string) => id ? resolve("/pokemon/[id]", { id }) : resolve("/pokemon"),
	moves: (id?: string) => id ? resolve("/moves/[id]", { id }) : resolve("/moves"),
	tms: (id?: string) => id ? resolve("/tms/[id]", { id }) : resolve("/tms"),
	trainers: (trainerKey?: string, pokemonId?: string, action?: string) => {
		const params = new URLSearchParams()
		if (trainerKey) params.append("id", trainerKey)
		if (pokemonId) params.append("pokemon", pokemonId)
		if (action) params.append("action", action)

		return resolve("/trainers") + `?${params.toString()}`
	},
	versionHistory: () => resolve("/version-history"),
	trainerRecovery: () => resolve("/trainer-recovery"),
	feedback: () => resolve("/feedback"),
	accessibility: () => resolve("/accessibility"),
	privacyPolicy: () => resolve("/privacy-policy"),
	reference: {
		all: () => resolve("/reference"),
		introduction: () => resolve("/reference/introduction"),
		abilities: () => resolve("/reference/abilities"),
		bonds: () => resolve("/reference/bonds"),
		breeding: () => resolve("/reference/breeding"),
		catchingPokemon: () => resolve("/reference/catching-pokemon"),
		combat: () => resolve("/reference/combat"),
		damageTypes: () => resolve("/reference/damage-types"),
		encounters: () => resolve("/reference/encounters"),
		faintingRestingHealing: () => resolve("/reference/fainting-resting-and-healing"),
		feats: () => resolve("/reference/feats"),
		legendaryBattles: () => resolve("/reference/legendary-battles"),
		natures: () => resolve("/reference/natures"),
		pokemonLeveling: () => resolve("/reference/pokemon-leveling"),
		shinyPokemon: () => resolve("/reference/shiny-pokemon"),
		specializations: () => resolve("/reference/specializations"),
		status: () => resolve("/reference/status-conditions"),
		terrainEffects: () => resolve("/reference/terrain-effects"),
		tms: () => resolve("/reference/tms"),
		trainerClass: () => resolve("/reference/trainer-class"),
		trainerLeveling: () => resolve("/reference/trainer-leveling"),
		trainerPaths: () => resolve("/reference/trainer-paths"),
		transformations: () => resolve("/reference/pokemon-transformations"),
		weather: () => resolve("/reference/weather"),
	},
	settings: () => resolve("/settings"),
	external: {
		auroratide: () => "https://auroratide.com",
		github: () => "https://github.com/Auroratide/poke5e",
		newIssue: () => "https://github.com/Auroratide/poke5e/issues/new",
		discord: () => "https://discord.gg/6VMhR7XGqV",
		translations: () => "https://cryptpad.fr/sheet/#/2/sheet/edit/jkST5vKSm8OSzJjru3TF47xL/embed/",
	},
	api: {
		pokemon: (id?: string) => id ? resolve("/pokemon/[id]/v2.json", { id }) : resolve("/pokemon/v2.json"),
		evolutions: () => resolve("/evolutions/v1.json"),
		items: (id?: string) => id ? resolve("/items/[id].json", { id }) : resolve("/items.json"),
		moves: (id?: string) => id ? resolve("/moves/[id].json", { id }) : resolve("/moves.json"),
		abilities: () => resolve("/abilities.json"),
	},
} as const
