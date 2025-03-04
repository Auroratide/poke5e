import { Url } from "$lib/url"

export type ReferenceInfo = {
	name: string,
	url: string,
	keywords: string[],
}

export const References = [ {
	name: "Damage Types",
	url: Url.reference.damageTypes(),
	keywords: ["damage", "type", "resistance", "vulnerability", "immunity", "bludgeoning", "slashing", "piercing", "fire", "cold", "lightning", "force", "radiant", "necrotic", "thunder", "acid", "poison", "calculator", "convert", "conversion", "magic"],
}, {
	name: "Natures",
	url: Url.reference.natures(),
	keywords: ["nature", "personality", "hardy", "lonely", "brave", "adamant", "naughty", "bold", "docile", "relaxed", "impish", "lax", "timid", "hasty", "serious", "jolly", "naive", "modest", "mild", "quiet", "bashful", "rash", "calm", "gentle", "sassy", "careful", "quirky"],
}, {
	name: "Pokémon Leveling",
	url: Url.reference.pokemonLeveling(),
	keywords: ["pokemon leveling", "class", "table", "experience", "evolution", "evolve", "moves", "peak power"],
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
	name: "Trainer Paths",
	url: Url.reference.trainerPaths(),
	keywords: ["ace trainer", "battle master", "rapid switching", "tactical mastery", "hobbyist", "versatile", "generalist", "multitalented", "nurse", "pokechef", "warning words", "tip-top shape", "tip top shape", "researcher", "analyst", "evolution expert", "professor", "ranger", "capture styler", "partners", "poke assist"],
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