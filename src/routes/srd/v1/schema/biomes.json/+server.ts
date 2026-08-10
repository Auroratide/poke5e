import type { RequestHandler } from "./$types"
import { BiomesListJson } from "$lib/srd/biomes"
import { respond, schema } from "$lib/srd/util"

export const GET: RequestHandler = async () => {
	return respond(schema(BiomesListJson))
}
