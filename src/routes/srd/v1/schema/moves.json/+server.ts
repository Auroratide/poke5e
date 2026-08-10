import type { RequestHandler } from "./$types"
import { MovesListJson } from "$lib/srd/moves"
import { respond, schema, SRD_ENABLED } from "$lib/srd/util"

export const prerender = SRD_ENABLED

export const GET: RequestHandler = async () => {
	return respond(schema(MovesListJson))
}
