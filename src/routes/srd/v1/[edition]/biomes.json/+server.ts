import type { EntryGenerator, RequestHandler } from "./$types"
import { respond, SRD_ENABLED } from "$lib/srd/util"
import { BiomesSrd } from "$lib/srd/biomes/server"
import { createEntryGenerator, isEdition } from "$lib/srd/editions"
import { error } from "@sveltejs/kit"

export const prerender = SRD_ENABLED
export const entries: EntryGenerator = createEntryGenerator()

export const GET: RequestHandler = async ({ params }) => {
	if (!isEdition(params.edition)) error(404)
	
	return respond(await BiomesSrd.all())
}
