import { DEFAULT_SRD_EDITION } from "$lib/site/edition"
import { SrdClient } from "$lib/srd"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
	const client = new SrdClient(DEFAULT_SRD_EDITION, fetch)

	const biomes = await client.biomes.all()

	return { biomes: biomes.values }
}
