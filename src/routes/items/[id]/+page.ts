import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { base } from "$app/paths"

export const load: PageLoad = async ({ fetch, params }) => {
	return fetch(`${base}/items/${params.id}.json`).then(async res => {
		if (res.status === 404)
			error(404)
		else
			return {
				item: await res.json(),
			}
	})
}
