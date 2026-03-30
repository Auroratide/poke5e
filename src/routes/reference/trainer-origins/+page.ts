import { Url } from "$lib/site/url"
import type { TrainerOrigin } from "$lib/trainers/origins"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
	const origins = await fetch(Url.api.origins())
		.then((res) => res.json())
		.then((data: { items: TrainerOrigin[] }) => data.items)

	return { items: origins }
}
