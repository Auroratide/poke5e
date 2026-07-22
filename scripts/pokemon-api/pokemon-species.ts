import fs from "node:fs/promises"
import path from "node:path"
import { superconsole } from "../superconsole.ts"

export type PokemonSpecies = {
	name: string,
	generation: {
		name: string,
	},
	pokedex_numbers: {
		entry_number: number,
		pokedex: {
			name: string,
		},
	}[],
}

let cache: Record<string, any> | undefined = undefined

const CACHE_FOLDER = path.join(import.meta.dirname, "cache")
const CACHE_FILE = path.join(CACHE_FOLDER, "pokemon-species.json")

const getApiId = (jsonId: string) => {
	switch (jsonId) {
	case "sunny-castform": return "castform"
	case "rainy-castform": return "castform"
	case "snowy-castform": return "castform"
	case "kyogre-primal": return "kyogre"
	case "groudon-primal": return "groudon"
	case "wormadam-plant-cloak": return "wormadam"
	case "wormadam-sand-cloak": return "wormadam"
	case "wormadam-trash-cloak": return "wormadam"
	case "rotom-heat": return "rotom"
	case "rotom-wash": return "rotom"
	case "rotom-frost": return "rotom"
	case "rotom-fan": return "rotom"
	case "rotom-mow": return "rotom"
	case "dialga-origin": return "dialga"
	case "palkia-origin": return "palkia"
	case "giratina-altered-forme": return "giratina"
	case "giratina-origin-forme": return "giratina"
	case "shaymin-land": return "shaymin"
	case "shaymin-sky": return "shaymin"
	case "basculin-blue-striped": return "basculin"
	case "basculin-white-striped": return "basculin"
	case "tornadus-therian": return "tornadus"
	case "thundurus-therian": return "thundurus"
	case "landorus-therian": return "landorus"
	case "white-kyurem": return "kyurem"
	case "black-kyurem": return "kyurem"
	case "meloetta---aria": return "meloetta"
	case "meloetta---pirouette": return "meloetta"
	case "floette-eternal": return "floette"
	case "meowstic-m": return "meowstic"
	case "meowstic-f": return "meowstic"
	case "zygarde-10-forme": return "zygarde"
	case "zygarde-50-forme": return "zygarde"
	case "zygarde-complete-forme": return "zygarde"
	case "hoopa-confined": return "hoopa"
	case "hoopa-unbound": return "hoopa"
	case "oricorio-baile-style": return "oricorio"
	case "oricorio-pom-pom-style": return "oricorio"
	case "oricorio-pau-style": return "oricorio"
	case "oricorio-sensu-style": return "oricorio"
	case "lycanroc-midday-form": return "lycanroc"
	case "lycanroc-midnight-form": return "lycanroc"
	case "lycanroc-dusk-form": return "lycanroc"
	case "wishiwashi-solo-form": return "wishiwashi"
	case "wishiwashi-school-form": return "wishiwashi"
	case "minior-meteor-form": return "minior"
	case "minior-core-form": return "minior"
	case "dusk-mane-necrozma": return "necrozma"
	case "dawn-wings-necrozma": return "necrozma"
	case "ultra-necrozma": return "necrozma"
	case "articuno-galar": return "articuno"
	case "zapdos-galar": return "zapdos"
	case "moltres-galar": return "moltres"
	case "toxtricity-amped": return "toxtricity"
	case "toxtricity-low-key": return "toxtricity"
	case "indeedee-m": return "indeedee"
	case "indeedee-f": return "indeedee"
	case "zacian-crowned": return "zacian"
	case "zamazenta-crowned": return "zamazenta"
	case "eternatus-eternamax": return "eternatus"
	case "urshifu-single": return "urshifu"
	case "urshifu-rapid": return "urshifu"
	case "calyrex-ice": return "calyrex"
	case "calyrex-shadow": return "calyrex"
	case "growlithe-hisui": return "growlithe"
	case "arcanine-hisui": return "arcanine"
	case "voltorb-hisui": return "voltorb"
	case "electrode-hisui": return "electrode"
	case "typhlosion-hisui": return "typhlosion"
	case "qwilfish-hisui": return "qwilfish"
	case "sneasel-hisui": return "sneasel"
	case "samurott-hisui": return "samurott"
	case "lilligant-hisui": return "lilligant"
	case "zorua-hisui": return "zorua"
	case "zoroark-hisui": return "zoroark"
	case "braviary-hisui": return "braviary"
	case "sliggoo-hisui": return "sliggoo"
	case "goodra-hisui": return "goodra"
	case "avalugg-hisui": return "avalugg"
	case "decidueye-hisui": return "decidueye"
	case "ursaluna-bloodmoon": return "ursaluna"
	case "basculegion-m": return "basculegion"
	case "basculegion-f": return "basculegion"
	case "enamorus-therian": return "enamorus"
	case "tauros-paldea-combat-breed": return "tauros"
	case "tauros-paldea-blaze-breed": return "tauros"
	case "tauros-paldea-aqua-breed": return "tauros"
	case "wooper-paldea": return "wooper"
	case "oinkologne-male": return "oinkologne"
	case "oinkologne-female": return "oinkologne"
	case "gimmighoul-roaming": return "gimmighoul"
	case "ogerpon-wellspring-mask": return "ogerpon"
	case "ogerpon-heartflame-mask": return "ogerpon"
	case "ogerpon-cornerstone-mask": return "ogerpon"
	case "terapagos-terastal-form": return "terapagos"
	case "terapagos-stellar-form": return "terapagos"
	}

	const alolan = jsonId.match(/^alolan-(.*)$/)
	if (alolan) {
		return `${alolan[1]}`
	}
    
	const galarian = jsonId.match(/^galarian-(.*)$/)
	if (galarian) {
		return `${galarian[1]}`
	}

	return jsonId
}

export async function getOnePokemonSpecies(id: string): Promise<PokemonSpecies | undefined> {
	superconsole.debug(`Fetching pokemon species from cache: ${id}`)

	if (cache == null) {
		cache = JSON.parse(await fs.readFile(CACHE_FILE, { encoding: "utf-8" }))
	}

	return cache?.[getApiId(id)]
}
