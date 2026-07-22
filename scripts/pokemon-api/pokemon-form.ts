import fs from "node:fs/promises"
import path from "node:path"
import { superconsole } from "../superconsole.ts"

export type PokemonForm = {
	name: string,
	version_group: {
		name: string,
	},
}

let cache: Record<string, any> | undefined = undefined

const CACHE_FOLDER = path.join(import.meta.dirname, "cache")
const CACHE_FILE = path.join(CACHE_FOLDER, "pokemon-form.json")

const getApiId = (jsonId: string) => {
	switch (jsonId) {
	case "keldeo": return "keldeo-ordinary"
	case "snowy-castform": return "castform-snowy"
	case "rainy-castform": return "castform-rainy"
	case "sunny-castform": return "castform-sunny"
	case "oricorio-sensu-style": return "oricorio-sensu"
	case "oricorio-baile-style": return "oricorio-baile"
	case "oricorio-pom-pom-style": return "oricorio-pom-pom"
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
	case "unown": return "unown-a"
	case "burmy": return "burmy-plant"
	case "mothim": return "mothim-plant"
	case "cherrim": return "cherrim-overcast"
	case "shellos": return "shellos-west"
	case "gastrodon": return "gastrodon-west"
	case "arceus": return "arceus-normal"
	case "deerling": return "deerling-spring"
	case "sawsbuck": return "sawsbuck-spring"
	case "frillish": return "frillish-female"
	case "jellicent": return "jellicent-female"
	case "scatterbug": return "scatterbug-continental"
	case "spewpa": return "spewpa-continental"
	case "vivillon": return "vivillon-continental"
	case "pyroar": return "pyroar-male"
	case "flabebe": return "flabebe-red"
	case "floette": return "floette-red"
	case "florges": return "florges-red"
	case "furfrou": return "furfrou-natural"
	case "xerneas": return "xerneas-neutral"
	case "silvally": return "silvally-normal"
	case "minior-meteor-form": return "minior-red-meteor"
	case "minior-core-form": return "minior-red-meteor"
	case "sinistea": return "sinistea-phony"
	case "polteageist": return "polteageist-phony"
	case "alcremie": return "alcremie-vanilla-cream-strawberry-sweet"
	case "urshifu-single": return "urshifu-single-strike"
	case "urshifu-rapid": return "urshifu-rapid-strike"
	case "basculegion-m": return "basculegion-male"
	case "basculegion-f": return "basculegion-female"
	case "enamorus": return "enamorus-incarnate"
	case "maushold": return "maushold-family-of-four"
	case "squawkabilly": return "squawkabilly-green-plumage"
	case "palafin": return "palafin-zero"
	case "tatsugiri": return "tatsugiri-curly"
	case "dudunsparce": return "dudunsparce-two-segment"
	case "gimmighoul": return "gimmighoul-chest"
	case "koraidon": return "koraidon-apex-build"
	case "miraidon": return "miraidon-ultimate-mode"
	case "poltchageist": return "poltchageist-counterfeit"
	case "sinistcha": return "sinistcha-unremarkable"
	case "ogerpon-heartflame-mask": return "ogerpon"
	case "terapagos-terastal-form": return "terapagos"
	case "terapagos-stellar-form": return "terapagos"
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

export async function getOnePokemonForm(id: string): Promise<PokemonForm | undefined> {
	superconsole.debug(`Fetching pokemon form from cache: ${id}`)

	if (cache == null) {
		cache = JSON.parse(await fs.readFile(CACHE_FILE, { encoding: "utf-8" }))
	}

	return cache?.[getApiId(id)]
}
