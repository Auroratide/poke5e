import type { PageLoad } from "./$types"
import { base } from "$app/paths"

export const load: PageLoad = async ({ fetch }) => {
	const items = await fetch(`${base}/items.json`)
		.then(res => res.json())
		.then(data => data.items)

	return { itemsList: items }
}
