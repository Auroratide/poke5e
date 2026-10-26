import { translateData } from "$lib/site/i18n"
import { chooseEditionData, type Edition, type EditionOverrideList } from "../editions"
import type { ItemJson, ItemListJson } from "./schema"
import { TmsSrd } from "../tms/server"
import { MovesSrd } from "../moves/server"
import raw2024 from "../data/2024/items/en.json"
import raw2018 from "../data/2018/items/en.json"
import tms2024 from "../data/2024/tms/en.json"

const en2024 = raw2024 as ItemListJson
const en2018 = raw2018 as EditionOverrideList<ItemJson>

const tmItemId = (tm: number) => `tm-${tm}`

async function tmItems(edition: Edition): Promise<ItemJson[]> {
	const [tms, moves] = await Promise.all([TmsSrd.all(edition), MovesSrd.all(edition)])

	return tms.values.flatMap((tm) => {
		const move = moves.values.find((it) => it.id === tm.move)
		if (move == null) return []

		return [ {
			id: tmItemId(tm.id),
			name: `TM ${tm.id.toString().padStart(3, "0")} - ${move.name}`,
			aliases: move.aliases,
			type: "TM",
			cost: tm.cost,
			description: `When used, allows a Pokémon to learn the ${move.name} move.`,
			media: {
				sprite: `/assets/items/tm/${move.type}.png`,
			},
		} ]
	})
}

async function all(edition: Edition): Promise<ItemListJson> {
	const values2024 = await translateData(
		en2024.values,
		async (locale) => (await import(`../data/2024/items/${locale}.json`)).values,
	)

	const values2018 = await translateData(
		en2018.values,
		async (locale) => (await import(`../data/2018/items/${locale}.json`)).values,
	)

	const values = chooseEditionData<ItemJson>(edition, values2024, {
		"2018": values2018,
	})

	return { values: values.concat(await tmItems(edition)) }
}

function ids(): string[] {
	return en2024.values.map((it) => it.id)
		.concat(tms2024.values.map((it) => tmItemId(it.id)))
}

async function one(id: string, edition: Edition): Promise<ItemJson | undefined> {
	const values = await all(edition)

	const single = values.values.find((it) => it.id === id)

	return single
}

export const ItemsSrd = {
	all,
	one,
	ids,
} as const
