import type { RequestHandler } from "./$types"
import { openApiDocument } from "$lib/srd/openapi"
import { respond, SRD_ENABLED } from "$lib/srd/util"

export const prerender = SRD_ENABLED

export const GET: RequestHandler = async () => {
	return respond(openApiDocument())
}
