import { Url } from "$lib/site/url"
import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
	const biomes = await fetch(Url.api.biomes()).then(async res => {
		if (res.status === 404)
			error(404)
		else
			return {
				item: await res.json(),
			}
	})

	return { biomes }
}