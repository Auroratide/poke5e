import * as z from "zod"
import { translateData } from "$lib/site/i18n"
import en2024 from "./data/2024/moves/en.json"
import en2018 from "./data/2018/moves/en.json"
import { chooseEditionData, type Edition } from "./editions"

export const MoveJson = z.object({
	id: z.string(),
	name: z.string(),
	type: z.string(),
	power: z.union([
		z.array(z.string()),
		z.literal("none"),
		z.literal("varies"),
		z.literal("any"),
	]),
	time: z.string(),
	pp: z.int(),
	duration: z.string(),
	range: z.string(),
	description: z.array(z.string()),
	higherLevels: z.optional(z.string()),
	optional: z.optional(z.array(z.string())),
	damage: z.optional(z.object({
		dice: z.object({
			"1": z.string(),
			"5": z.string(),
			"10": z.string(),
			"17": z.string(),
		}),
		modifier: z.union([z.number(), z.string()]),
		type: z.array(z.string()),
	})),
	attack: z.optional(z.object({
		scope: z.string(),
	})),
	save: z.optional(z.object({
		attribute: z.array(z.string()),
		dc: z.string(),
	})),
})

export const MovesListJson = z.object({
	values: z.array(MoveJson),
})

export type MoveJson = z.infer<typeof MoveJson>
export type MovesListJson = z.infer<typeof MovesListJson>

export async function moves(edition: Edition): Promise<MovesListJson> {
	const values2024 = await translateData(
		en2024.values,
		async (locale) => (await import(`./data/2024/moves/${locale}.json`)).values,
	)

	const values2018 = await translateData(
		en2018.values,
		async (locale) => (await import(`./data/2018/moves/${locale}.json`)).values,
	)

	const values = chooseEditionData(edition, values2024, {
		"2018": values2018,
	})

	return { values }
}

export function moveIds(): string[] {
	return en2024.values.map((it) => it.id)
}

export async function move(id: string, edition: Edition): Promise<MoveJson | undefined> {
	const all = await moves(edition)

	const single = all.values.find((it) => it.id === id)

	return single
}
