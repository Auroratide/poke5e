import { resolve } from "$app/paths"
import { localizeUrl } from "$lib/site/i18n"

export const Url = {
	home: () => localizeUrl(resolve("/")),
	fakemon: (key?: string, action?: string) => {
		const params = new URLSearchParams()
		if (key) params.append("id", key)
		if (action) params.append("action", action)

		return localizeUrl(resolve("/fakemon") + `?${params.toString()}`)
	},
	items: (id?: string) => localizeUrl(id ? resolve("/items/[id]", { id }) : resolve("/items")),
	pokemon: (id?: string) => localizeUrl(id ? resolve("/pokemon/[id]", { id }) : resolve("/pokemon")),
	moves: (id?: string) => localizeUrl(id ? resolve("/moves/[id]", { id }) : resolve("/moves")),
	tms: (id?: string) => localizeUrl(id ? resolve("/tms/[id]", { id }) : resolve("/tms")),
	trainers: (trainerKey?: string, pokemonId?: string, action?: string) => {
		const params = new URLSearchParams()
		if (trainerKey) params.append("id", trainerKey)
		if (pokemonId) params.append("pokemon", pokemonId)
		if (action) params.append("action", action)

		return localizeUrl(resolve("/trainers") + `?${params.toString()}`)
	},
	versionHistory: () => localizeUrl(resolve("/version-history")),
	trainerRecovery: () => localizeUrl(resolve("/trainer-recovery")),
	feedback: () => localizeUrl(resolve("/feedback")),
	accessibility: () => localizeUrl(resolve("/accessibility")),
	privacyPolicy: () => localizeUrl(resolve("/privacy-policy")),
	reference: {
		all: () => localizeUrl(resolve("/reference")),
		introduction: () => localizeUrl(resolve("/reference/introduction")),
		abilities: () => localizeUrl(resolve("/reference/abilities")),
		bonds: () => localizeUrl(resolve("/reference/bonds")),
		breeding: () => localizeUrl(resolve("/reference/breeding")),
		catchingPokemon: () => localizeUrl(resolve("/reference/catching-pokemon")),
		combat: () => localizeUrl(resolve("/reference/combat")),
		damageTypes: () => localizeUrl(resolve("/reference/damage-types")),
		encounters: () => localizeUrl(resolve("/reference/encounters")),
		faintingRestingHealing: () => localizeUrl(resolve("/reference/fainting-resting-and-healing")),
		feats: () => localizeUrl(resolve("/reference/feats")),
		legendaryBattles: () => localizeUrl(resolve("/reference/legendary-battles")),
		natures: () => localizeUrl(resolve("/reference/natures")),
		pokemonLeveling: () => localizeUrl(resolve("/reference/pokemon-leveling")),
		shinyPokemon: () => localizeUrl(resolve("/reference/shiny-pokemon")),
		specializations: () => localizeUrl(resolve("/reference/specializations")),
		status: () => localizeUrl(resolve("/reference/status-conditions")),
		terrainEffects: () => localizeUrl(resolve("/reference/terrain-effects")),
		tms: () => localizeUrl(resolve("/reference/tms")),
		trainerClass: () => localizeUrl(resolve("/reference/trainer-class")),
		trainerLeveling: () => localizeUrl(resolve("/reference/trainer-leveling")),
		trainerPaths: () => localizeUrl(resolve("/reference/trainer-paths")),
		transformations: () => localizeUrl(resolve("/reference/pokemon-transformations")),
		weather: () => localizeUrl(resolve("/reference/weather")),
	},
	settings: () => localizeUrl(resolve("/settings")),
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
		items: (id?: string) => localizeUrl(id ? resolve("/items/[id].json", { id }) : resolve("/items.json")),
		moves: (id?: string) => id ? resolve("/moves/[id].json", { id }) : resolve("/moves.json"),
		abilities: () => resolve("/abilities.json"),
	},
} as const
