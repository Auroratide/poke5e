import fs from "node:fs/promises"
import path from "node:path"

let cache: Record<string, any> | undefined = undefined

const CACHE_FOLDER = path.join("scripts", "pokemon", ".pokeapi")
const CACHE_FILE = path.join(CACHE_FOLDER, "pokemon.json")

const getApiId = (jsonId: string) => {
	switch (jsonId) {
	case "keldeo": return "keldeo-ordinary"
	case "snowy-castform": return "castform-snowy"
	case "rainy-castform": return "castform-rainy"
	case "sunny-castform": "castform-sunny"
	case "oricorio-sensu-style": return "oricorio-sensu"
	case "oricorio-baile-style": "oricorio-baile"
	case "oricorio-pom-pom-style": "oricorio-pom-pom"
	case "oricorio-pau-style": return "oricorio-pau"
	case "meowstic-f": return "meowstic-female"
	case "meowstic-m": return "meowstic-male"
	case "darmanitan": return "darmanitan-standard"
	case "galarian-darmanitan": return "darmanitan-galar-standard"
	case "meloetta---pirouette": return "meloetta-pirouette"
	case "meloetta---aria": return "meloetta-aria"
	case "deoxys": return "deoxys-normal"
	case "wormadam-plant-cloak": return "wormadam-plant"
	case "wormadam-trash-cloak": return "wormadam-trash"
	case "wormadam-sand-cloak": return "wormadam-sandy"
	case "gourgeist": return "gourgeist-average"
	case "black-kyurem": return "kyurem-black"
	case "white-kyurem": return "kyurem-white"
	case "thundurus": return "thundurus-incarnate"
	case "landorus": return "landorus-incarnate"
	case "tornadus": return "tornadus-incarnate"
	case "wishiwashi-school-form": return "wishiwashi-school"
	case "wishiwashi-solo-form": return "wishiwashi-solo"
	case "aegislash": return "aegislash-shield"
	case "basculin": return "basculin-red-striped"
	case "zygarde-complete-forme": return "zygarde-complete"
	case "zygarde-50-forme": return "zygarde-50"
	case "zygarde-10-forme": return "zygarde-10"
	case "minior-meteor-form": return "774"
	case "minior-core-form": return "774"
	case "lycanroc-dusk-form": return "lycanroc-dusk"
	case "lycanroc-midday-form": return "lycanroc-midday"
	case "lycanroc-midnight-form": return "lycanroc-midnight"
	case "mimikyu": return "mimikyu-disguised"
	case "ultra-necrozma": return "necrozma-ultra"
	case "dusk-mane-necrozma": return "necrozma-dusk"
	case "dawn-wings-necrozma": return "necrozma-dawn"
	case "giratina-origin-forme": return "giratina-origin"
	case "giratina-altered-forme": return "giratina-altered"
	case "hoopa-confined": return "hoopa"
	case "pumpkaboo": return "pumpkaboo-average"
	case "indeedee-f": return "indeedee-female"
	case "indeedee-m": return "indeedee-male"
	case "eiscue": return "eiscue-ice"
	case "morpeko": return "morpeko-full-belly"
	}

	const alolan = jsonId.match(/^alolan-(.*)$/)
	if (alolan) {
		return `${alolan[1]}-alola`
	}
    
	const galarian = jsonId.match(/^galarian-(.*)$/)
	if (galarian) {
		return `${galarian[1]}-galar`
	}

	return jsonId
}

export async function getCachedPokemon(id: string) {
	if (cache == null) {
		cache = JSON.parse(await fs.readFile(CACHE_FILE, { encoding: "utf-8" }))
	}

	return cache?.[getApiId(id)]
}