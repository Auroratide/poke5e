import type { EntryGenerator, RequestHandler } from "./$types"
import { respond } from "$lib/srd/util"
import { biomes } from "$lib/srd/biomes"
import { createEntryGenerator, isEdition } from "$lib/srd/editions"
import { error } from "@sveltejs/kit"

export const prerender = true
export const entries: EntryGenerator = createEntryGenerator()

export const GET: RequestHandler = async ({ params }) => {
	if (!isEdition(params.edition)) error(404)
	
	return respond(await biomes())
}
