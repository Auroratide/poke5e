import type { PageLoad } from "./$types"
import { Url } from "$lib/site/url"

export const load: PageLoad = async ({ fetch }) => {
	const items = await fetch(Url.api.items())
		.then(res => res.json())
		.then(data => data.items)

	return { itemsList: items }
}
