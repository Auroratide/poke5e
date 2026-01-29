import { resolve } from "$app/paths"
import { localizeUrl } from "$lib/site/i18n"

export const Url = {
	home: () => localizeUrl(resolve("/")).pathname,
	fakemon: (key?: string, action?: string) => {
		const params = new URLSearchParams()
		if (key) params.append("id", key)
		if (action) params.append("action", action)

		const url = localizeUrl(resolve("/fakemon") + `?${params.toString()}`)
		return url.pathname + url.search
	},
	items: (id?: string) => localizeUrl(id ? resolve("/items/[id]", { id }) : resolve("/items")).pathname,
	pokemon: (id?: string) => localizeUrl(id ? resolve("/pokemon/[id]", { id }) : resolve("/pokemon")).pathname,
	moves: (id?: string) => localizeUrl(id ? resolve("/moves/[id]", { id }) : resolve("/moves")).pathname,
	tms: (id?: string) => localizeUrl(id ? resolve("/tms/[id]", { id }) : resolve("/tms")).pathname,
	trainers: (trainerKey?: string, pokemonId?: string, action?: string) => {
		const params = new URLSearchParams()
		if (trainerKey) params.append("id", trainerKey)
		if (pokemonId) params.append("pokemon", pokemonId)
		if (action) params.append("action", action)

		const url = localizeUrl(resolve("/trainers") + `?${params.toString()}`)
		return url.pathname + url.search
	},
	versionHistory: () => localizeUrl(resolve("/version-history")).pathname,
	trainerRecovery: () => localizeUrl(resolve("/trainer-recovery")).pathname,
	feedback: () => localizeUrl(resolve("/feedback")).pathname,
	accessibility: () => localizeUrl(resolve("/accessibility")).pathname,
	privacyPolicy: () => localizeUrl(resolve("/privacy-policy")).pathname,
	reference: {
		all: () => localizeUrl(resolve("/reference")).pathname,
		introduction: () => localizeUrl(resolve("/reference/introduction")).pathname,
		abilities: () => localizeUrl(resolve("/reference/abilities")).pathname,
		bonds: () => localizeUrl(resolve("/reference/bonds")).pathname,
		breeding: () => localizeUrl(resolve("/reference/breeding")).pathname,
		catchingPokemon: () => localizeUrl(resolve("/reference/catching-pokemon")).pathname,
		combat: () => localizeUrl(resolve("/reference/combat")).pathname,
		damageTypes: () => localizeUrl(resolve("/reference/damage-types")).pathname,
		encounters: () => localizeUrl(resolve("/reference/encounters")).pathname,
		faintingRestingHealing: () => localizeUrl(resolve("/reference/fainting-resting-and-healing")).pathname,
		feats: () => localizeUrl(resolve("/reference/feats")).pathname,
		legendaryBattles: () => localizeUrl(resolve("/reference/legendary-battles")).pathname,
		natures: () => localizeUrl(resolve("/reference/natures")).pathname,
		pokemonLeveling: () => localizeUrl(resolve("/reference/pokemon-leveling")).pathname,
		shinyPokemon: () => localizeUrl(resolve("/reference/shiny-pokemon")).pathname,
		specializations: () => localizeUrl(resolve("/reference/specializations")).pathname,
		status: () => localizeUrl(resolve("/reference/status-conditions")).pathname,
		terrainEffects: () => localizeUrl(resolve("/reference/terrain-effects")).pathname,
		tms: () => localizeUrl(resolve("/reference/tms")).pathname,
		trainerClass: () => localizeUrl(resolve("/reference/trainer-class")).pathname,
		trainerLeveling: () => localizeUrl(resolve("/reference/trainer-leveling")).pathname,
		trainerPaths: () => localizeUrl(resolve("/reference/trainer-paths")).pathname,
		transformations: () => localizeUrl(resolve("/reference/pokemon-transformations")).pathname,
		weather: () => localizeUrl(resolve("/reference/weather")).pathname,
	},
	encounterTool: () => localizeUrl(resolve("/encounter-tool")).pathname,
	settings: () => localizeUrl(resolve("/settings")).pathname,
	external: {
		auroratide: () => "https://auroratide.com",
		github: () => "https://github.com/Auroratide/poke5e",
		newIssue: () => "https://github.com/Auroratide/poke5e/issues/new",
		discord: () => "https://discord.gg/6VMhR7XGqV",
		translations: () => "https://cryptpad.fr/sheet/#/2/sheet/edit/jkST5vKSm8OSzJjru3TF47xL/embed/",
	},
	api: {
		pokemon: (id?: string) => id ? resolve("/(api)/pokemon/[id]/v2.json", { id }) : resolve("/(api)/pokemon/v2.json"),
		evolutions: () => resolve("/(api)/evolutions/v1.json"),
		items: (id?: string) => localizeUrl(id ? resolve("/(api)/items/[id].json", { id }) : resolve("/(api)/items.json")).pathname,
		moves: (id?: string) => localizeUrl(id ? resolve("/(api)/moves/[id].json", { id }) : resolve("/(api)/moves.json")).pathname,
		abilities: () => localizeUrl(resolve("/(api)/abilities.json")).pathname,
	},
} as const
