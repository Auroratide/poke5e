import type { PageServerLoad } from "./$types"
import { DEFAULT_SRD_EDITION } from "$lib/site/edition"
import { SrdClient } from "$lib/srd"

export const load: PageServerLoad = async ({ fetch }) => {
	const client = new SrdClient(DEFAULT_SRD_EDITION, fetch)

	const items = await client.items.all()

	return {
		itemsList: items.values,
	}
}
