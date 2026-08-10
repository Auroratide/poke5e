import type { RequestHandler } from "./$types"
import { MovesListJson } from "$lib/srd/moves"
import { respond, schema } from "$lib/srd/util"

export const GET: RequestHandler = async () => {
	return respond(schema(MovesListJson))
}
