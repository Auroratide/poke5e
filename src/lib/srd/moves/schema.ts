import * as z from "zod"
import { Attribute, PokeType } from "../common/schema"

const TableJson = z.object({
	type: z.string(),
	headers: z.array(z.string()),
	rows: z.array(z.array(z.string())),
})

export const DamageClass = z.union([
	z.literal("0"),
	z.literal("10"),
	z.literal("20"),
	z.literal("30"),
	z.literal("40"),
	z.literal("50"),
	z.literal("60"),
	z.literal("70"),
	z.literal("80"),
	z.literal("90"),
	z.literal("100"),
	z.literal("110"),
	z.literal("120"),
	z.literal("130"),
	z.literal("140"),
	z.literal("150"),
	z.literal("160"),
	z.literal("180"),
	z.literal("200"),
])

export const MoveJson = z.object({
	id: z.string().meta({
		description: "Unique identifier.",
	}),
	name: z.string().meta({
		description: "Display name, localized.",
	}),
	type: z.union([
		PokeType,
		z.literal("varies"),
		z.literal("typeless"),
		z.literal("stellar"),
	]).meta({
		description: "Pokemon type of the move.",
	}),
	power: z.union([
		z.array(Attribute),
		z.literal("varies"),
	]).meta({
		description: "List of attributes used as this move's move power.\nA value of \"varies\" means the move power depends\n on a condition in the description.",
	}),
	time: z.object({
		unit: z.union([
			z.literal("action"),
			z.literal("bonus action"),
			z.literal("reaction"),
		]),
	}).meta({
		description: "In-game time required to execute the move.",
	}),
	pp: z.int().meta({
		description: "Base max Power Points.",
	}),
	duration: z.object({
		unit: z.union([
			z.literal("minute"),
			z.literal("round"),
			z.literal("instantaneous"),
			z.literal("varies"),
		]),
		value: z.int().optional(),
		concentration: z.boolean().optional(),
	}).meta({
		description: "Length of time the move lasts, including whether\nthe move is concentration.",
	}),
	range: z.union([
		z.object({
			type: z.literal("distance"),
			value: z.int(),
			unit: z.literal("feet"),
		}),
		z.object({
			type: z.literal("melee"),
			reach: z.object({
				value: z.int(),
				unit: z.literal("feet"),
			}).optional(),
		}),
		z.object({
			type: z.literal("self"),
		}),
		z.object({
			type: z.literal("varies"),
		}),
	]).meta({
		description: "Range of the move. If the move is a self area\nof effect move, the area of effect is described\nby `shape`.",
	}),
	shape: z.object({
		type: z.union([
			z.literal("line"),
			z.literal("cone"),
			z.literal("emanation"),
			z.literal("cube"),
		]),
		value: z.int(),
		unit: z.literal("feet"),
	}).optional().meta({
		description: "Defined when the move has an Area of Effect component,\ndescribing its shape.",
	}),
	dice: z.union([
		z.object({
			class: DamageClass,
			modifier: z.string(),
			type: z.union([z.literal("damage"), z.literal("healing"), z.literal("reduction")]),
		}),
		z.object({
			class: z.literal("custom"),
			tiers: z.tuple([z.string(), z.string(), z.string(), z.string()]),
			modifier: z.string(),
			type: z.union([z.literal("damage"), z.literal("healing")]),
		}),
	]).optional().meta({
		description: "Dice used for this move, whether for damage or healing.\nThe `class` field determines which set of dice\nto use.",
	}),
	attack: z.object({
		scope: z.string(),
	}).optional().meta({
		description: "Present if the move has an attack roll.",
	}),
	save: z.object({
		attribute: Attribute,
	}).optional().meta({
		description: "Present if the move has save.",
	}),
	tm: z.object({
		id: z.int(),
		cost: z.int(),
	}).optional().meta({
		description: "Present if the move is available as a TM.",
	}),
	description: z.string().meta({
		description: "Rules text for the move, as markdown.\nSpecial text describes substitutions:\n{dice}: Damage dice depending on class.\n{type}: The move's type.\n{shape}: The move's AoE shape.\n{save}: Move's save description.",
	}),
	higherLevels: z.string().optional().meta({
		description: "Used for custom text describing how the move upgrades\nwith level up. For moves with damage dice, the higher\nlevels text can be derived, and thus is not present.",
	}),
	table: TableJson.optional().meta({
		description: "Present if the move has a reference table.",
	}),
	categories: z.string().array().meta({
		description: "Tags used by other moves or abilities to select this move.",
	}),
	optional: z.string().optional(),
	aliases: z.string().array().optional().meta({
		description: "Alternative display names for searching.\nUsually the English name for localized output.",
	}),
	beta: z.boolean().optional().meta({
		description: "Present if the move is being playtested.",
	}),
}).meta({
	id: "Move",
	title: "Move",
	description: "A Move that a Pokémon can execute.",
})

export const MovesListJson = z.object({
	values: z.array(MoveJson),
}).meta({
	id: "MoveList",
	title: "Move List",
	description: "Collection of all moves.",
})

export type MoveJson = z.infer<typeof MoveJson>
export type MovesListJson = z.infer<typeof MovesListJson>
