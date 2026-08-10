import type { RequestHandler } from "./$types"
import { BiomesListJson } from "$lib/srd/biomes"
import { respond, schema, SRD_ENABLED } from "$lib/srd/util"

export const prerender = SRD_ENABLED

export const GET: RequestHandler = async () => {
	return respond(schema(BiomesListJson))
}
