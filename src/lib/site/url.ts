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
	trainers: (trainerKey?: string, pokemonId?: string, action?: string, accessKey?: string) => {
		const params = new URLSearchParams()
		if (trainerKey) params.append("id", trainerKey)
		if (pokemonId) params.append("pokemon", pokemonId)
		if (action) params.append("action", action)
		if (accessKey) params.append("access_key", accessKey)

		const url = localizeUrl(resolve("/trainers") + `?${params.toString()}`)
		return url.pathname + url.search
	},
	versionHistory: () => localizeUrl(resolve("/version-history")).pathname,
	trainerRecovery: () => localizeUrl(resolve("/trainer-recovery")).pathname,
	feedback: () => localizeUrl(resolve("/feedback")).pathname,
	accessibility: () => localizeUrl(resolve("/accessibility")).pathname,
	privacyPolicy: () => localizeUrl(resolve("/privacy-policy")).pathname,
	backups: {
		home: () => localizeUrl(resolve("/backups")).pathname,
		schemas: {
			"202602": () => resolve("/backups/schemas/2026-02"),
		},
	},
	rules: {
		all: () => localizeUrl(resolve("/rules")).pathname,
		introduction: () => localizeUrl(resolve("/rules/introduction")).pathname,
		coreRules: () => localizeUrl(resolve("/rules/core-rules")).pathname,
		appendix: () => localizeUrl(resolve("/rules/appendix")).pathname,
		supplements: () => localizeUrl(resolve("/rules/supplements")).pathname,
		abilities: () => localizeUrl(resolve("/rules/abilities")).pathname,
		biomes: () => localizeUrl(resolve("/rules/biomes-and-habitats")).pathname,
		bonds: () => localizeUrl(resolve("/rules/bonds")).pathname,
		breeding: () => localizeUrl(resolve("/rules/breeding")).pathname,
		catchingPokemon: () => localizeUrl(resolve("/rules/catching-pokemon")).pathname,
		chainmailAndCharizards: () => localizeUrl(resolve("/rules/chainmail-and-charizards")).pathname,
		combat: () => localizeUrl(resolve("/rules/combat")).pathname,
		contests: () => localizeUrl(resolve("/rules/contests")).pathname,
		damageTypes: () => localizeUrl(resolve("/rules/damage-types")).pathname,
		encounters: () => localizeUrl(resolve("/rules/encounters")).pathname,
		faintingRestingHealing: () => localizeUrl(resolve("/rules/fainting-resting-and-healing")).pathname,
		faq: () => localizeUrl(resolve("/rules/faq")).pathname,
		feats: () => localizeUrl(resolve("/rules/feats")).pathname,
		legendaryBattles: () => localizeUrl(resolve("/rules/legendary-battles")).pathname,
		natures: () => localizeUrl(resolve("/rules/natures")).pathname,
		oaksParcel: () => localizeUrl(resolve("/rules/oaks-parcel")).pathname,
		pokemonLeveling: () => localizeUrl(resolve("/rules/pokemon-leveling")).pathname,
		shinyPokemon: () => localizeUrl(resolve("/rules/shiny-pokemon")).pathname,
		specializations: () => localizeUrl(resolve("/rules/specializations")).pathname,
		status: () => localizeUrl(resolve("/rules/status-conditions")).pathname,
		terrainEffects: () => localizeUrl(resolve("/rules/terrain-effects")).pathname,
		tms: () => localizeUrl(resolve("/rules/tms")).pathname,
		trainerClass: () => localizeUrl(resolve("/rules/trainer-class")).pathname,
		trainerLeveling: () => localizeUrl(resolve("/rules/trainer-leveling")).pathname,
		trainerOrigins: () => localizeUrl(resolve("/rules/trainer-origins")).pathname,
		trainerPaths: () => localizeUrl(resolve("/rules/trainer-paths")).pathname,
		transformations: () => localizeUrl(resolve("/rules/pokemon-transformations")).pathname,
		weather: () => localizeUrl(resolve("/rules/weather")).pathname,
	},
	resources: () => localizeUrl(resolve("/resources")).pathname,
	encounterTool: () => localizeUrl(resolve("/encounter-tool")).pathname,
	settings: () => localizeUrl(resolve("/settings")).pathname,
	edition: () => localizeUrl(resolve("/settings")).pathname + "#rules-version",
	betaTesting: () => localizeUrl(resolve("/beta-testing")).pathname,
	external: {
		auroratide: () => "https://auroratide.com",
		github: () => "https://github.com/Auroratide/poke5e",
		newIssue: () => "https://github.com/Auroratide/poke5e/issues/new",
		discord: () => "https://discord.gg/6VMhR7XGqV",
		translations: () => "https://cryptpad.fr/sheet/#/2/sheet/edit/jkST5vKSm8OSzJjru3TF47xL/embed/",
	},
	api: {
		origins: () => localizeUrl(resolve("/(api)/origins.json")).pathname,
	},
} as const
