import { Url } from "$lib/url"

export type ReferenceInfo = {
	name: string,
	url: string,
	keywords: string[],
}

export const References = [ {
	name: "Introduction",
	url: Url.reference.introduction(),
	keywords: ["introduction", "rules", "version", "2018", "2024", "original", "handbook", "updates"],
}, {
	name: "Abilities",
	url: Url.reference.abilities(),
	keywords: ["ability", "pokemon", "feature", "list", "filter"],
}, {
	name: "Bonds",
	url: Url.reference.bonds(),
	keywords: ["bond", "bond level", "loyalty", "relationship", "disloyal", "disobey", "trust"],
}, {
	name: "Breeding",
	url: Url.reference.breeding(),
	keywords: ["breed", "egg", "baby", "babies", "incubate", "incubation", "hatch", "egg moves"],
}, {
	name: "Catching Pokémon",
	url: Url.reference.catchingPokemon(),
	keywords: ["catch", "capture", "capturing", "pokeball", "ball", "throw", "great ball", "ultra ball", "master ball", "safari ball", "level ball", "fast ball", "lure ball", "heavy ball", "love ball", "friend ball", "moon ball", "sport ball", "net ball", "dive ball", "nest ball", "repeat ball", "timer ball", "luxury ball", "premier ball", "dusk ball", "heal ball", "quick ball", "dream ball"],
}, {
	name: "Combat",
	url: Url.reference.combat(),
	keywords: ["combat", "battle", "intitiative", "command", "moves", "move power", "power points", "pp", "attack roll", "save dc", "saving throw dc", "stab", "same type attack bonus", "same-type attack bonus", "damage bonus", "struggle", "switching", "recalling", "attack of opportunity", "ready an action", "readying actions"],
}, {
	name: "Damage Types",
	url: Url.reference.damageTypes(),
	keywords: ["damage", "type", "resistance", "vulnerability", "immunity", "bludgeoning", "slashing", "piercing", "fire", "cold", "lightning", "force", "radiant", "necrotic", "thunder", "acid", "poison", "calculator", "convert", "conversion", "magic"],
}, {
	name: "Fainting, Resting, and Healing",
	url: Url.reference.faintingRestingHealing(),
	keywords: ["fainting", "downed", "short rest", "long rest", "heal", "pokecenter", "potions", "food", "0 hp", "death", "lethal", "stabilization", "stabilize", "restore"],
}, {
	name: "Feats",
	url: Url.reference.feats(),
	keywords: ["ambidextrous", "combo master", "extra ac", "extra move", "gifted", "natural mount", "power sculptor", "terrain adept", "tireless"],
}, {
	name: "Natures",
	url: Url.reference.natures(),
	keywords: ["nature", "personality", "hardy", "lonely", "brave", "adamant", "naughty", "bold", "docile", "relaxed", "impish", "lax", "timid", "hasty", "serious", "jolly", "naive", "modest", "mild", "quiet", "bashful", "rash", "calm", "gentle", "sassy", "careful", "quirky"],
}, {
	name: "Pokémon Leveling",
	url: Url.reference.pokemonLeveling(),
	keywords: ["pokemon leveling", "class", "table", "experience", "evolution", "evolve", "moves", "peak power", "milestones"],
}, {
	name: "Pokémon Transformations",
	url: Url.reference.transformations(),
	keywords: ["pokemon transformations", "mega evolution", "z-move", "z move", "dynamax", "gigantamax", "terastallization", "terastallize", "stellar", "tera"],
}, {
	name: "Specializations",
	url: Url.reference.specializations(),
	keywords: ["proficiency", "skill", "poke fan", "black belt", "bird keeper", "punk", "camper", "hiker", "bug maniac", "mystic", "worker", "kindler", "swimmer", "gardener", "engineer", "psychic", "skier", "dragon tamer", "delinquent", "actor"],
}, {
	name: "Status Conditions",
	url: Url.reference.status(),
	keywords: ["asleep", "burned", "paralyzed", "paralysis", "frozen", "poisoned", "badly", "confused", "confusion", "flinched"],
}, {
	name: "Trainer Class",
	url: Url.reference.trainerClass(),
	keywords: ["class", "traits", "abilities", "equipment", "multiclass", "table", "features", "specializations", "paths", "license", "pokedex", "pokeslots", "control upgrade", "trainer's resolve", "pokemon tracker", "master trainer"],
}, {
	name: "Trainer Leveling",
	url: Url.reference.trainerLeveling(),
	keywords: ["class", "trainer", "table", "experience", "milestones", "pokedex", "registered", "pokeslots", "levels"],
}, {
	name: "Trainer Paths",
	url: Url.reference.trainerPaths(),
	keywords: ["ace trainer", "battle master", "rapid switching", "tactical mastery", "hobbyist", "versatile", "generalist", "multitalented", "nurse", "pokechef", "warning words", "tip-top shape", "tip top shape", "researcher", "analyst", "evolution expert", "professor", "ranger", "capture styler", "partners", "poke assist"],
}, {
	name: "Weather",
	url: Url.reference.weather(),
	keywords: ["weather", "harsh sunlight", "rain", "sandstorm", "hail", "snow", "fog"],
} ] satisfies ReferenceInfo[]

export function search(value: string): ReferenceInfo[] {
	const lowerValue = value.trim().toLocaleLowerCase()
	if (lowerValue === "") return References

	const byTitle = References.filter((it) => includesEachOther(it.name.toLocaleLowerCase(), lowerValue))
	const byKeyword = References.filter((it) => it.keywords.some((keyword) => includesEachOther(keyword, lowerValue)))

	// prioritize title search over keyword search
	const noDuplicates = new Set([...byTitle, ...byKeyword])

	return [...noDuplicates]
}

function includesEachOther(left: string, right: string) {
	return left.includes(right) || right.includes(left)
}