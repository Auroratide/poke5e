import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { Url } from "$lib/site/url"

export const load: PageLoad = async ({ fetch, params }) => {
	return fetch(Url.api.items(params.id)).then(async res => {
		if (res.status === 404)
			error(404)
		else
			return {
				item: await res.json(),
			}
	})
}
