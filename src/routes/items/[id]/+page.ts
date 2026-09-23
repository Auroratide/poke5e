import { Item } from "$lib/items"
import { SrdClient } from "$lib/srd"
import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch, params }) => {
	const json = await SrdClient.forEachEdition((client) => client.items.one(params.id), fetch)

	const json2018 = json["2018"]
	const json2024 = json["2024"]

	if (json2018 == null || json2024 == null) {
		error(404)
	}

	return {
		item: {
			"2018": Item.fromJson(json2018),
			"2024": Item.fromJson(json2024),
		},
	}
}
