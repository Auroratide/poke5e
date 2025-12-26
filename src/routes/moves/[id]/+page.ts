import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { base } from "$app/paths"
import { Move } from "$lib/moves/Move"

export const load: PageLoad = async ({ fetch, params }) => {
	return fetch(`${base}/moves/${params.id}.json`).then(async res => {
		if (res.status === 404)
			error(404)
		else
			return {
				move: new Move(await res.json()),
			}
	})
}
