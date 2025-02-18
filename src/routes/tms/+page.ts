import type { PageLoad } from "./$types"
import { base } from "$app/paths"

export const load: PageLoad = async ({ fetch }) => {
	const tms = await fetch(`${base}/tms.json`)
		.then(res => res.json())
		.then(data => data.items)

	return { tmsList: tms }
}
