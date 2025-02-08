import { Url } from "$lib/url"

export type ReferenceInfo = {
	name: string,
	url: string,
	keywords: string[],
}

export const References = [ {
	name: "Pokémon Leveling",
	url: Url.reference.pokemonLeveling(),
	keywords: ["class", "table", "experience", "evolution", "evolve", "moves", "peak power"],
}, {
	name: "Pokémon Transformations",
	url: Url.reference.transformations(),
	keywords: ["mega evolution", "z-move", "z move", "dynamax", "gigantamax", "terastallization", "terastallize", "stellar", "tera"],
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