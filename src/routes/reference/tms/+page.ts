import type { PageLoad } from "./$types"
import { resolve } from "$app/paths"
import type { Tm } from "$lib/moves/types"

export const load: PageLoad = async ({ fetch }) => {
	const tms: Tm[] = await fetch(resolve("/tms.json"))
		.then(res => res.json())
		.then(data => data.items)

	return { tmList: tms }
}
