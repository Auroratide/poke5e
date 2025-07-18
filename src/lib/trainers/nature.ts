import type { Attribute } from "$lib/dnd/attributes"

export const Natures = [
	"Hardy",
	"Lonely",
	"Brave",
	"Adamant",
	"Naughty",
	"Bold",
	"Docile",
	"Relaxed",
	"Impish",
	"Lax",
	"Timid",
	"Hasty",
	"Serious",
	"Jolly",
	"Naive",
	"Modest",
	"Mild",
	"Quiet",
	"Bashful",
	"Rash",
	"Calm",
	"Gentle",
	"Sassy",
	"Careful",
	"Quirky",
] as const
export type StandardNature = (typeof Natures)[number]
export type Nature = StandardNature | string
export const CustomNatureIdentifier = "other"
export const isStandardNature = (value: string): value is StandardNature =>
	(Natures as readonly string[]).includes(value)

export const NatureEffect = {
	Hardy: { increase: "str", decrease: "str"},
	Lonely: { increase: "str", decrease: "con"},
	Brave: { increase: "str", decrease: "dex"},
	Adamant: { increase: "str", decrease: "wis"},
	Naughty: { increase: "str", decrease: "cha"},

	Bold: { increase: "con", decrease: "str"},
	Docile: { increase: "con", decrease: "con"},
	Relaxed: { increase: "con", decrease: "dex"},
	Impish: { increase: "con", decrease: "wis"},
	Lax: { increase: "con", decrease: "cha"},
	
	Timid: { increase: "dex", decrease: "str"},
	Hasty: { increase: "dex", decrease: "con"},
	Serious: { increase: "dex", decrease: "dex"},
	Jolly: { increase: "dex", decrease: "wis"},
	Naive: { increase: "dex", decrease: "cha"},

	Modest: { increase: "wis", decrease: "str"},
	Mild: { increase: "wis", decrease: "con"},
	Quiet: { increase: "wis", decrease: "dex"},
	Bashful: { increase: "wis", decrease: "wis"},
	Rash: { increase: "wis", decrease: "cha"},

	Calm: { increase: "cha", decrease: "str"},
	Gentle: { increase: "cha", decrease: "con"},
	Sassy: { increase: "cha", decrease: "dex"},
	Careful: { increase: "cha", decrease: "wis"},
	Quirky: { increase: "cha", decrease: "cha"},
} satisfies Record<StandardNature, NatureEffect>
export type NatureEffect = {
	increase: Attribute,
	decrease: Attribute,
}
