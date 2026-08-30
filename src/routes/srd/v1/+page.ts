import type { PageLoad } from "./$types"
import { openApiDocument } from "$lib/srd/openapi"
import { SRD_ENABLED } from "$lib/srd/util"

export const prerender = SRD_ENABLED

export const load: PageLoad = async () => {
	const specification = openApiDocument()

	return {
		specification,
	}
}
